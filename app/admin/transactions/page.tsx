"use client";

import { useState } from "react";
import AdminLayout from "@/components/ui/adminlayout";
import TransactionsTable from "@/components/admin/transactions/transactions-table";
import VerificationModal from "@/components/admin/transactions/verification-model";

interface Transaction {
  id: string;
  date: string;
  paymentMethod: string;
  customer: string;
  amount: string;
  paymentId: string;
  status: "Lunas" | "Belum";
}

export default function AdminTransactionsPage() {
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const handleVerify = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsVerificationModalOpen(true);
  };

  const handleVerificationComplete = () => {
    setIsVerificationModalOpen(false);
    setSelectedTransaction(null);
    // Here you would typically refresh the transactions data from your API
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Manajemen Transaksi</h1>

        <TransactionsTable onVerify={handleVerify} />

        {selectedTransaction && (
          <VerificationModal
            isOpen={isVerificationModalOpen}
            onClose={() => setIsVerificationModalOpen(false)}
            transaction={selectedTransaction}
            onVerificationComplete={handleVerificationComplete}
          />
        )}
      </div>
    </AdminLayout>
  );
}
