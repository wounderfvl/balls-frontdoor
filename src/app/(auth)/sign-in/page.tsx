import AuthForm from "../components/AuthForm";
import { signIn } from "../../lib/auth/actions";

export default function SignInPage() {
  return (
    <div className="auth-page">
      <div className="auth-header">
        <h1>Welcome Back</h1>
        <p className="auth-subtitle">Sign in to continue to your account</p>
      </div>

      <AuthForm
        action={signIn}
        fields={[
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
            placeholder: "Your Password",
            required: true,
            icon: "lock",
          },
        ]}
        options={{
          rememberMe: true,
          forgotPassword: true,
        }}
        submitText="Sign In"
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
              Don't have an account?{" "}
              <a href="/sign-up" className="auth-footer-link">
                Sign Up
              </a>
            </p>
          </>
        }
      />
    </div>
  );
}
