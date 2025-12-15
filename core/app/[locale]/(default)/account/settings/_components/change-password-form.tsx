'use client';

import { getFormProps, getInputProps, SubmissionResult, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { ReactNode, useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

import { Button } from '@/vibes/soul/primitives/button';
import { changePasswordSchema } from '@/vibes/soul/sections/account-settings/schema';

type Action<S, P> = (state: Awaited<S>, payload: P) => S | Promise<S>;

interface State {
    lastResult: SubmissionResult | null;
    successMessage?: string;
}

export type ChangePasswordAction = Action<State, FormData>;

export interface ChangePasswordFormProps {
    action: ChangePasswordAction;
    currentPasswordLabel?: string;
    newPasswordLabel?: string;
    confirmPasswordLabel?: string;
    submitLabel?: string;
}

export function ChangePasswordForm({
    action,
    currentPasswordLabel = 'Current password',
    newPasswordLabel = 'New password',
    confirmPasswordLabel = 'Confirm password',
    submitLabel = 'Update Password',
}: ChangePasswordFormProps) {
    const [state, formAction] = useActionState(action, { lastResult: null });
    const [form, fields] = useForm({
        constraint: getZodConstraint(changePasswordSchema),
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: changePasswordSchema });
        },
    });

    useEffect(() => {
        if (state.lastResult?.status === 'success' && state.successMessage != null) {
            toast.success(state.successMessage);
        }
    }, [state]);

    const inputClasses = "w-full h-11 px-3 py-2 border rounded-md border-slate-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-slate-50/50 outline-none transition-all";
    const labelClasses = "text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2";

    return (
        <form {...getFormProps(form)} action={formAction} className="space-y-6">
            <div className="space-y-1">
                <label htmlFor={fields.currentPassword.id} className={labelClasses}>{currentPasswordLabel}</label>
                <input
                    {...getInputProps(fields.currentPassword, { type: 'password' })}
                    className={inputClasses}
                />
                <div className="text-red-500 text-sm">{fields.currentPassword.errors}</div>
            </div>

            <div className="space-y-1">
                <label htmlFor={fields.password.id} className={labelClasses}>{newPasswordLabel}</label>
                <input
                    {...getInputProps(fields.password, { type: 'password' })}
                    className={inputClasses}
                />
                <div className="text-red-500 text-sm">{fields.password.errors}</div>
            </div>

            <div className="space-y-1">
                <label htmlFor={fields.confirmPassword.id} className={labelClasses}>{confirmPasswordLabel}</label>
                <input
                    {...getInputProps(fields.confirmPassword, { type: 'password' })}
                    className={inputClasses}
                />
                <div className="text-red-500 text-sm">{fields.confirmPassword.errors}</div>
            </div>

            <div className="pt-2">
                <SubmitButton>{submitLabel}</SubmitButton>
            </div>
        </form>
    );
}

function SubmitButton({ children }: { children: ReactNode }) {
    const { pending } = useFormStatus();

    return (
        <Button
            loading={pending}
            type="submit"
            variant="secondary"
            size="small"
            className="px-8 w-auto shadow-md shadow-slate-900/10"
        >
            {children}
        </Button>
    );
}
