"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoyaltyTable from "@/components/admin/loyalty/loyalty-table";
import GiftsManagement from "@/components/admin/loyalty/gifts-management";
import AdminLayout from "@/components/ui/adminlayout";

export default function AdminLoyaltyPage() {
  const [activeTab, setActiveTab] = useState<string>("gifts");

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Loyalty Management</h1>

        <Tabs
          defaultValue={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger
              value="gifts"
              className={`py-3 text-base font-medium ${
                activeTab === "gifts"
                  ? "bg-red-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              Manajemen Menu Hadiah
            </TabsTrigger>
            <TabsTrigger
              value="loyalty"
              className={`py-3 text-base font-medium ${
                activeTab === "loyalty"
                  ? "bg-red-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              Manajemen Loyalty
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gifts" className="mt-2">
            <GiftsManagement />
          </TabsContent>

          <TabsContent value="loyalty" className="mt-2">
            <LoyaltyTable />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
