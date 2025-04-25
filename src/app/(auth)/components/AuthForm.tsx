"use client";

import { useFormState, useFormStatus } from "react-dom";
import AuthInput from "./AuthInput";
import { useActionState } from "react";

type Field = {
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  icon?: string;
};

type FormOptions = {
  rememberMe?: boolean;
  forgotPassword?: boolean;
};

export default function AuthForm({
  action,
  fields,
  options,
  submitText,
  footer,
}: {
  action: (prevState: any, formData: FormData) => Promise<any>;
  fields: Field[];
  options?: FormOptions;
  submitText: string;
  footer?: React.ReactNode;
}) {
  const [state, formAction] = useActionState(action, null);
  const { pending } = useFormStatus();

  return (
    <form action={formAction} className="auth-form">
      {state?.error && <div className="auth-message error">{state.error}</div>}
      {state?.success && (
        <div className="auth-message success">{state.success}</div>
      )}

      <div className="auth-fields">
        {fields.map((field) => (
          <AuthInput
            key={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
            icon={field.icon}
          />
        ))}
      </div>

      {(options?.rememberMe || options?.forgotPassword) && (
        <div className="auth-options">
          {options.rememberMe && (
            <label className="auth-remember">
              <input type="checkbox" name="remember" />
              <span>Remember me</span>
            </label>
          )}
          {options.forgotPassword && (
            <a href="/forgot-password" className="auth-forgot-link">
              Forgot password?
            </a>
          )}
        </div>
      )}

      <button
        type="submit"
        className="auth-submit-btn"
        disabled={pending}
        aria-disabled={pending}
      >
        {pending ? <span className="auth-spinner"></span> : submitText}
      </button>

      {footer}
    </form>
  );
}
