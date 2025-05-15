// Updated AdminLayout component
import React, { PropsWithChildren } from "react";

const AdminLayout: React.FC<PropsWithChildren> = ({ children }) => {
  // ...existing code
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar content */}
      <div className="main-content">
        {children} {/* Now it properly accepts children */}
      </div>
    </div>
  );
};

export default AdminLayout;
