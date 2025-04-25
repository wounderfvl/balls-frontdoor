import AuthForm from "../components/AuthForm";
import { resetPassword } from "../../lib/auth/actions";

export default function ForgotPasswordPage() {
  return (
    <div className="auth-page">
      <div className="auth-header">
        <h1>Reset Password</h1>
        <p className="auth-subtitle">Enter your email to reset your password</p>
      </div>

      <AuthForm
        action={resetPassword}
        fields={[
          {
            name: "email",
            type: "email",
            placeholder: "Your Email",
            required: true,
            icon: "email",
          },
        ]}
        submitText="Send Reset Link"
        footer={
          <p className="auth-footer-text">
            Remember your password?{" "}
            <a href="/sign-in" className="auth-footer-link">
              Sign In
            </a>
          </p>
        }
      />
    </div>
  );
}
