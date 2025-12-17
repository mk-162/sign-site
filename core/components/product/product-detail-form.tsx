'use client';

import {
    FieldMetadata,
    FormProvider,
    FormStateInput,
    getFormProps,
    SubmissionResult,
    useForm,
    useInputControl,
} from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { createSerializer, parseAsString, useQueryStates } from 'nuqs';
import { ReactNode, startTransition, useActionState, useCallback, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { z } from 'zod';
import { toast } from '@/vibes/soul/primitives/toaster';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Checkbox } from '~/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Textarea } from '~/components/ui/textarea';

import { useEvents } from '~/components/analytics/events';
import { usePathname, useRouter } from '~/i18n/routing';

import { revalidateCart } from '@/vibes/soul/sections/product-detail/actions/revalidate-cart';
import { Field, schema, SchemaRawShape } from '@/vibes/soul/sections/product-detail/schema';

type Action<S, P> = (state: Awaited<S>, payload: P) => S | Promise<S>;

interface State<F extends Field> {
    fields: F[];
    lastResult: SubmissionResult | null;
    successMessage?: ReactNode;
}

export type ProductDetailFormAction<F extends Field> = Action<State<F>, FormData>;

export interface ProductDetailFormProps<F extends Field> {
    fields: F[];
    action: ProductDetailFormAction<F>;
    productId: string;
    ctaLabel?: string;
    quantityLabel?: string;
    incrementLabel?: string;
    decrementLabel?: string;
    emptySelectPlaceholder?: string;
    ctaDisabled?: boolean;
    prefetch?: boolean;
    additionalActions?: ReactNode;
    minQuantity?: number;
    maxQuantity?: number;
}

export function ProductDetailForm<F extends Field>({
    action,
    fields,
    productId,
    ctaLabel = 'Add to basket',
    quantityLabel = 'Quantity',
    emptySelectPlaceholder = 'Select an option',
    ctaDisabled = false,
    prefetch = false,
    additionalActions,
    minQuantity,
    maxQuantity,
}: ProductDetailFormProps<F>) {
    const router = useRouter();
    const pathname = usePathname();
    const events = useEvents();

    const searchParams = fields.reduce<Record<string, typeof parseAsString>>((acc, field) => {
        return field.persist === true ? { ...acc, [field.name]: parseAsString } : acc;
    }, {});

    const [params] = useQueryStates(searchParams, { shallow: false });

    const onPrefetch = (fieldName: string, value: string) => {
        if (prefetch) {
            const serialize = createSerializer(searchParams);
            const newUrl = serialize(pathname, { ...params, [fieldName]: value });
            router.prefetch(newUrl);
        }
    };

    const defaultValue = fields.reduce<{
        [Key in keyof SchemaRawShape]?: z.infer<SchemaRawShape[Key]>;
    }>(
        (acc, field) => ({
            ...acc,
            [field.name]: params[field.name] ?? field.defaultValue,
        }),
        { quantity: minQuantity ?? 1 },
    );

    const [{ lastResult, successMessage }, formAction] = useActionState(action, {
        fields,
        lastResult: null,
    });

    useEffect(() => {
        if (lastResult?.status === 'success') {
            toast.success(successMessage as string);

            startTransition(async () => {
                await revalidateCart();
            });
        }
    }, [lastResult, successMessage, router]);

    const [form, formFields] = useForm({
        lastResult,
        constraint: getZodConstraint(schema(fields, minQuantity, maxQuantity)),
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: schema(fields, minQuantity, maxQuantity) });
        },
        onSubmit(event, { formData }) {
            event.preventDefault();
            startTransition(() => {
                formAction(formData);
                events.onAddToCart?.(formData);
            });
        },
        // @ts-expect-error: `defaultValue` types are conflicting with `onValidate`.
        defaultValue,
        shouldValidate: 'onSubmit',
        shouldRevalidate: 'onInput',
    });

    const quantityControl = useInputControl(formFields.quantity);

    return (
        <FormProvider context={form.context}>
            <FormStateInput />
            <form {...getFormProps(form)} action={formAction} className="py-8">
                <input name="id" type="hidden" value={productId} />
                <div className="space-y-6">
                    {fields.map((field) => (
                        <div key={field.name}>
                            <FormField
                                emptySelectPlaceholder={emptySelectPlaceholder}
                                field={field}
                                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                formField={formFields[field.name]!}
                                onPrefetch={onPrefetch}
                            />
                            {formFields[field.name]?.errors?.map((error) => (
                                <p key={error} className="text-sm text-destructive mt-1">{error}</p>
                            ))}
                        </div>
                    ))}

                    {form.errors?.map((error, index) => (
                        <p className="text-sm text-destructive" key={index}>
                            {error}
                        </p>
                    ))}

                    <div className="flex gap-x-3 pt-3 items-end">
                        <div className="w-24">
                            <Label htmlFor={formFields.quantity.id}>{quantityLabel}</Label>
                            <Input
                                id={formFields.quantity.id}
                                type="number"
                                min={minQuantity ?? 1}
                                max={maxQuantity}
                                name={formFields.quantity.name}
                                value={quantityControl.value}
                                onBlur={quantityControl.blur}
                                onChange={(e) => quantityControl.change(e.currentTarget.value)}
                                onFocus={quantityControl.focus}
                                required
                                className="mt-1"
                            />
                        </div>
                        <SubmitButton disabled={ctaDisabled}>{ctaLabel}</SubmitButton>
                        {additionalActions}
                    </div>
                </div>
            </form>
        </FormProvider>
    );
}

function SubmitButton({ children, disabled }: { children: ReactNode; disabled?: boolean }) {
    const { pending } = useFormStatus();

    return (
        <Button
            className="w-full @xl:w-auto"
            disabled={disabled || pending}
            type="submit"
        >
            {pending ? 'Adding...' : children}
        </Button>
    );
}

// eslint-disable-next-line complexity
function FormField({
    field,
    formField,
    onPrefetch,
    emptySelectPlaceholder,
}: {
    field: Field;
    formField: FieldMetadata<string | number | boolean | Date | undefined>;
    onPrefetch: (fieldName: string, value: string) => void;
    emptySelectPlaceholder?: string;
}) {
    const controls = useInputControl(formField);

    const [params, setParams] = useQueryStates(
        field.persist === true ? { [field.name]: parseAsString.withOptions({ shallow: false }) } : {},
    );

    const handleChange = useCallback(
        (value: string) => {
            const fieldValue = value || params[field.name];
            void setParams({ [field.name]: fieldValue || null });
            controls.change(fieldValue ?? '');
        },
        [setParams, field, controls, params],
    );

    const handleOnOptionMouseEnter = (value: string) => {
        if (field.persist === true) {
            onPrefetch(field.name, value);
        }
    };

    switch (field.type) {
        case 'number':
        case 'text':
            return (
                <div className="space-y-1">
                    <Label htmlFor={formField.id}>{field.label}</Label>
                    <Input
                        id={formField.id}
                        type={field.type}
                        name={formField.name}
                        value={controls.value ?? ''}
                        onChange={(e) => handleChange(e.currentTarget.value)}
                        onBlur={controls.blur}
                        onFocus={controls.focus}
                        required={formField.required}
                    />
                </div>
            );

        case 'textarea':
            return (
                <div className="space-y-1">
                    <Label htmlFor={formField.id}>{field.label}</Label>
                    <Textarea
                        id={formField.id}
                        name={formField.name}
                        value={controls.value ?? ''}
                        onChange={(e) => handleChange(e.currentTarget.value)}
                        onBlur={controls.blur}
                        onFocus={controls.focus}
                        required={formField.required}
                    />
                </div>
            );

        case 'checkbox':
            return (
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id={formField.id}
                        name={formField.name}
                        checked={controls.value === 'true'}
                        onCheckedChange={(c) => handleChange(c ? 'true' : '')}
                        onBlur={controls.blur}
                        onFocus={controls.focus}
                        required={formField.required}
                    />
                    <Label htmlFor={formField.id}>{field.label}</Label>
                </div>
            );

        case 'select':
            return (
                <div className="space-y-1">
                    <Label htmlFor={formField.id}>{field.label}</Label>
                    <Select
                        name={formField.name}
                        value={controls.value ?? ''}
                        onValueChange={handleChange}
                        required={formField.required}
                    >
                        <SelectTrigger id={formField.id}>
                            <SelectValue placeholder={emptySelectPlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {field.options.map(opt => (
                                <SelectItem
                                    key={opt.value}
                                    value={opt.value}
                                    onMouseEnter={() => handleOnOptionMouseEnter(opt.value)}
                                >
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            );

        case 'radio-group':
        case 'swatch-radio-group':
        case 'card-radio-group':
        case 'button-radio-group':
            // Fallback all radio/swatch types to standard RadioGroup for now
            // Can enhance this later with specific styling for swatches/cards
            return (
                <div className="space-y-3">
                    <Label>{field.label}</Label>
                    <RadioGroup
                        name={formField.name}
                        value={controls.value ?? ''}
                        onValueChange={handleChange}
                        required={formField.required}
                    >
                        <div className="flex flex-wrap gap-2">
                            {field.options.map(opt => (
                                <div key={opt.value} className="flex items-center space-x-2 border p-2 rounded cursor-pointer hover:bg-slate-50">
                                    <RadioGroupItem
                                        value={opt.value}
                                        id={`${formField.id}-${opt.value}`}
                                        onMouseEnter={() => handleOnOptionMouseEnter(opt.value)}
                                    />
                                    <Label htmlFor={`${formField.id}-${opt.value}`} className="cursor-pointer">
                                        {opt.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </RadioGroup>
                </div>
            );

        case 'date':
            // Simulating Date picker with standard date input
            return (
                <div className="space-y-1">
                    <Label htmlFor={formField.id}>{field.label}</Label>
                    <Input
                        id={formField.id}
                        type="date"
                        name={formField.name}
                        value={controls.value ?? ''}
                        onChange={(e) => handleChange(e.currentTarget.value)}
                        onBlur={controls.blur}
                        onFocus={controls.focus}
                        required={formField.required}
                    />
                </div>
            );
    }
}
