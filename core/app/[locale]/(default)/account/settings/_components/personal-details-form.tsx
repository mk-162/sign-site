'use client';

import { getFormProps, getInputProps, SubmissionResult, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { useActionState, useEffect, useOptimistic, useTransition } from 'react';
import { z } from 'zod'; // Import z from zod
import { clsx } from 'clsx'; // Import clsx

import { Button } from '@/vibes/soul/primitives/button';
import { toast } from 'sonner';

import { updateAccountSchema } from '@/vibes/soul/sections/account-settings/schema';

// Define Account type from schema
export type Account = z.infer<typeof updateAccountSchema>;

type Action<S, P> = (state: Awaited<S>, payload: P) => S | Promise<S>;

export type UpdateAccountAction = Action<State, FormData>;

interface State {
    account: Account;
    successMessage?: string;
    lastResult: SubmissionResult | null;
}

export interface Props {
    action: UpdateAccountAction;
    account: Account;
    firstNameLabel?: string;
    lastNameLabel?: string;
    emailLabel?: string;
    companyLabel?: string;
    submitLabel?: string;
}

export function PersonalDetailsForm({
    action,
    account,
    firstNameLabel = 'First name',
    lastNameLabel = 'Last name',
    emailLabel = 'Email',
    companyLabel = 'Company',
    submitLabel = 'Update Details',
}: Props) {
    const [state, formAction] = useActionState(action, { account, lastResult: null });
    const [pending, startTransition] = useTransition();

    const [optimisticState, setOptimisticState] = useOptimistic<State, FormData>(
        state,
        (prevState, formData) => {
            const intent = formData.get('intent');
            const submission = parseWithZod(formData, { schema: updateAccountSchema });

            if (submission.status !== 'success') return prevState;

            switch (intent) {
                case 'update': {
                    return {
                        ...prevState,
                        account: submission.value,
                    };
                }

                default:
                    return prevState;
            }
        },
    );

    const [form, fields] = useForm({
        lastResult: state.lastResult,
        defaultValue: optimisticState.account,
        constraint: getZodConstraint(updateAccountSchema),
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: updateAccountSchema });
        },
    });

    useEffect(() => {
        if (state.lastResult?.status === 'success' && typeof state.successMessage === 'string') {
            toast.success(state.successMessage);
        }
    }, [state, state.lastResult?.status, state.successMessage]);

    const inputClasses = "w-full h-11 px-3 py-2 border rounded-md border-slate-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-slate-50/50 outline-none transition-all";
    const labelClasses = "text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2";

    return (
        <form
            {...getFormProps(form)}
            action={(formData) => {
                startTransition(() => {
                    formAction(formData);
                    setOptimisticState(formData);
                });
            }}
            className="space-y-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                    <label htmlFor={fields.firstName.id} className={labelClasses}>{firstNameLabel}</label>
                    <input
                        {...getInputProps(fields.firstName, { type: 'text' })}
                        className={inputClasses}
                    />
                    <div className="text-red-500 text-sm">{fields.firstName.errors}</div>
                </div>
                <div className="space-y-1">
                    <label htmlFor={fields.lastName.id} className={labelClasses}>{lastNameLabel}</label>
                    <input
                        {...getInputProps(fields.lastName, { type: 'text' })}
                        className={inputClasses}
                    />
                    <div className="text-red-500 text-sm">{fields.lastName.errors}</div>
                </div>
            </div>

            <div className="space-y-1">
                <label htmlFor={fields.email.id} className={labelClasses}>{emailLabel}</label>
                <input
                    {...getInputProps(fields.email, { type: 'text' })}
                    className={inputClasses}
                />
                <div className="text-red-500 text-sm">{fields.email.errors}</div>
            </div>

            <div className="space-y-1">
                <label htmlFor={fields.company.id} className={labelClasses}>{companyLabel}</label>
                <input
                    {...getInputProps(fields.company, { type: 'text' })}
                    className={inputClasses}
                />
                <div className="text-red-500 text-sm">{fields.company.errors}</div>
            </div>

            <div className="pt-2">
                <Button
                    loading={pending}
                    name="intent"
                    type="submit"
                    value="update"
                    variant="secondary"
                    size="small"
                    className="px-8 w-auto shadow-md shadow-slate-900/10"
                >
                    {submitLabel}
                </Button>
            </div>
        </form>
    );
}
