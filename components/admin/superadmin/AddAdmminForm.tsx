// components/admin/superadmin/AddAdminForm.tsx
import { useState } from "react";
import { Admin } from "@/lib/types/admin";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/layout";

interface AddAdminFormProps {
  onSubmit: (admin: Admin | Omit<Admin, "id">) => void;
  onCancel: () => void;
  initialData?: Admin;
}

const AddAdminForm = ({
  onSubmit,
  onCancel,
  initialData,
}: AddAdminFormProps) => {
  const [formData, setFormData] = useState({
    id: initialData?.id || "",
    name: initialData?.name || "",
    email: initialData?.email || "",
    verified: initialData?.verified || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      verified: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="p-6 border">
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? "Edit Admin" : "Add New Admin"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        <div className="mb-6 flex items-center space-x-2">
          <Switch
            id="verified"
            checked={formData.verified}
            onCheckedChange={handleSwitchChange}
          />
          <Label htmlFor="verified">Verified</Label>
        </div>

        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="border-gray-300 text-gray-700"
          >
            Cancel
          </Button>
          <Button type="submit" className="bg-red-600 hover:bg-red-700">
            {initialData ? "Update" : "Add Admin"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AddAdminForm;
