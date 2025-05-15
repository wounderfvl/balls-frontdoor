// app/admin/superadmin/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SuperAdminAuth from "@/components/admin/superadmin/SuperAdminAuth";

export default function SuperAdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if the admin is already authenticated
    const isAuthenticated =
      sessionStorage.getItem("superAdminAuthenticated") === "true";

    if (isAuthenticated) {
      router.push("/admin/super-admin/dashboard");
    }
  }, [router]);

  return <SuperAdminAuth />;
}
