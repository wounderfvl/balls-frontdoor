import "./styles/auth.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-overlay">
      <div className="auth-container">{children}</div>
    </div>
  );
}
