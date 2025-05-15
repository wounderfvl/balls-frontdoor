// components/admin/superadmin/AdminList.tsx
import { Admin } from "@/lib/types/admin";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AdminListProps {
  admin: Admin;
  onEdit: () => void;
  onDelete: () => void;
  onVerify: () => void;
}

const AdminList = ({ admin, onEdit, onDelete, onVerify }: AdminListProps) => {
  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className={`p-4 ${admin.verified ? "bg-green-50" : "bg-red-50"}`}>
        <div className="flex items-center justify-center">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center ${
              admin.verified ? "bg-green-500" : "bg-red-500"
            } text-white`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>
        <div className="mt-3 text-center">
          <h3 className="font-medium">{admin.name}</h3>
          <p className="text-sm text-gray-500">{admin.email}</p>
        </div>
      </div>

      <div className="p-4 bg-gray-50">
        <div className="flex justify-between">
          <Button
            onClick={onEdit}
            variant="outline"
            className="px-3 py-1 bg-blue-500 text-white hover:bg-blue-600 text-sm"
          >
            Edit
          </Button>
          <Button
            onClick={onVerify}
            variant="outline"
            className={`px-3 py-1 ${
              admin.verified
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-green-500 hover:bg-green-600"
            } text-white text-sm`}
          >
            {admin.verified ? "Unverify" : "Verify"}
          </Button>
          <Button
            onClick={onDelete}
            variant="outline"
            className="px-3 py-1 bg-red-500 text-white hover:bg-red-600 text-sm"
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AdminList;
