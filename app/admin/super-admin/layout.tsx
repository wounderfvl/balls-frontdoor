// app/admin/superadmin/layout.tsx
export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-gray-100">{children}</div>;
}
