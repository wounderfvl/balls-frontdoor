// app/admin/superadmin/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminList from "@/components/admin/superadmin/AdminList";
import AddAdminForm from "@/components/admin/superadmin/AddAdmminForm";
import { Admin } from "@/lib/types/admin";

export default function SuperAdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: "1",
      name: "Alfian - Admin BAS 1",
      email: "adika@example.com",
      verified: true,
    },
    {
      id: "2",
      name: "Khanza - Admin BAS 2",
      email: "budi@example.com",
      verified: false,
    },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);

  const router = useRouter();

  useEffect(() => {
    // Check if the admin is authenticated
    const isAuthenticated =
      sessionStorage.getItem("superAdminAuthenticated") === "true";

    if (!isAuthenticated) {
      router.push("/admin/super-admin");
    } else {
      setAuthenticated(true);
    }

    // Load admins from localStorage if available
    const savedAdmins = localStorage.getItem("adminUsers");
    if (savedAdmins) {
      setAdmins(JSON.parse(savedAdmins));
    }
  }, [router]);

  const handleAddAdmin = (admin: Omit<Admin, "id">) => {
    const newAdmin = {
      ...admin,
      id: Date.now().toString(),
    };

    const updatedAdmins = [...admins, newAdmin];
    setAdmins(updatedAdmins);
    localStorage.setItem("adminUsers", JSON.stringify(updatedAdmins));
    setShowAddForm(false);
  };

  const handleUpdateAdmin = (updatedAdmin: Admin | Omit<Admin, "id">) => {
    if ("id" in updatedAdmin) {
      const updatedAdmins = admins.map((admin) =>
        admin.id === updatedAdmin.id ? updatedAdmin : admin
      );
      setAdmins(updatedAdmins);
      localStorage.setItem("adminUsers", JSON.stringify(updatedAdmins));
    }
    setEditingAdmin(null);
  };

  const handleDeleteAdmin = (id: string) => {
    const updatedAdmins = admins.filter((admin) => admin.id !== id);
    setAdmins(updatedAdmins);
    localStorage.setItem("adminUsers", JSON.stringify(updatedAdmins));
  };

  const handleVerifyAdmin = (id: string) => {
    const updatedAdmins = admins.map((admin) =>
      admin.id === id ? { ...admin, verified: !admin.verified } : admin
    );

    setAdmins(updatedAdmins);
    localStorage.setItem("adminUsers", JSON.stringify(updatedAdmins));
  };

  const handleLogout = () => {
    sessionStorage.removeItem("superAdminAuthenticated");
    router.push("/admin/super-admin");
  };

  if (!authenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold mb-6">Manajemen Admin BAS</h1>

          {editingAdmin ? (
            <AddAdminForm
              onSubmit={handleUpdateAdmin}
              onCancel={() => setEditingAdmin(null)}
              initialData={editingAdmin}
            />
          ) : showAddForm ? (
            <AddAdminForm
              onSubmit={handleAddAdmin}
              onCancel={() => setShowAddForm(false)}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {admins.map((admin) => (
                <AdminList
                  key={admin.id}
                  admin={admin}
                  onEdit={() => setEditingAdmin(admin)}
                  onDelete={() => handleDeleteAdmin(admin.id)}
                  onVerify={() => handleVerifyAdmin(admin.id)}
                />
              ))}

              <button
                onClick={() => setShowAddForm(true)}
                className="h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="mt-2 text-sm text-gray-500">Tambah Admin</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
