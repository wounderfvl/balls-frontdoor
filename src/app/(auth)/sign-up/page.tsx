import AuthForm from "../components/AuthForm";
import { signUp } from "../../lib/auth/actions";

export default function SignUpPage() {
  return (
    <div className="auth-page">
      <div className="auth-header">
        <h1>Create Account</h1>
        <p className="auth-subtitle">Sign up to get started</p>
      </div>

      <AuthForm
        action={signUp}
        fields={[
          {
            name: "name",
            type: "text",
            placeholder: "Your Name",
            required: true,
            icon: "person",
          },
          {
            name: "email",
            type: "email",
            placeholder: "Your Email",
            required: true,
            icon: "email",
          },
          {
            name: "password",
            type: "password",
            placeholder: "Create Password",
            required: true,
            icon: "lock",
          },
          {
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
            required: true,
            icon: "lock-check",
          },
        ]}
        submitText="Sign Up"
        footer={
          <>
            <div className="auth-divider">
              <span>or continue with</span>
            </div>
            <button type="button" className="auth-provider-btn">
              <span className="auth-provider-icon">G</span>
              Google
            </button>
            <p className="auth-footer-text">
              Already have an account?{" "}
              <a href="/sign-in" className="auth-footer-link">
                Sign In
              </a>
            </p>
          </>
        }
      />
    </div>
  );
}
