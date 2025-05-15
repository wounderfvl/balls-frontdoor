"use client";

import React from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default AdminLayout;
