"use client";

import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoyaltyForm from "./loyalty-form";

interface LoyaltyTransaction {
  id: number;
  product: string;
  customer: string;
  date: string;
  stampExchanged: number;
  remainingStamp: number;
  status: "exchanged" | "process";
}

const initialData: LoyaltyTransaction[] = [
  {
    id: 1,
    product: "Dsc. Harga Booking",
    customer: "Azhka",
    date: "12/05/2025",
    stampExchanged: 7,
    remainingStamp: 10,
    status: "exchanged",
  },
  {
    id: 2,
    product: "Burger BAS",
    customer: "Khanza",
    date: "15/06/2025",
    stampExchanged: 6,
    remainingStamp: 5,
    status: "process",
  },
  {
    id: 3,
    product: "Fried Rise",
    customer: "Haqi",
    date: "25/09/2025",
    stampExchanged: 8,
    remainingStamp: 7,
    status: "process",
  },
];

export default function LoyaltyTable() {
  const [transactions, setTransactions] =
    useState<LoyaltyTransaction[]>(initialData);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<LoyaltyTransaction | null>(null);

  const handleDelete = (id: number) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  const handleEdit = (transaction: LoyaltyTransaction) => {
    setEditingTransaction(transaction);
    setIsAddDialogOpen(true);
  };

  const handleSave = (transaction: LoyaltyTransaction) => {
    if (editingTransaction) {
      setTransactions(
        transactions.map((t) => (t.id === transaction.id ? transaction : t))
      );
    } else {
      setTransactions([
        ...transactions,
        {
          ...transaction,
          id: Math.max(0, ...transactions.map((t) => t.id)) + 1,
        },
      ]);
    }
    setIsAddDialogOpen(false);
    setEditingTransaction(null);
  };

  return (
    <div className="bg-white rounded-md shadow">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Loyalty Transactions</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setEditingTransaction(null)}
              className="bg-red-600 hover:bg-red-700"
            >
              Add New Transaction
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingTransaction
                  ? "Edit Transaction"
                  : "Add New Transaction"}
              </DialogTitle>
            </DialogHeader>
            <LoyaltyForm
              initialData={editingTransaction}
              onSave={handleSave}
              onCancel={() => {
                setIsAddDialogOpen(false);
                setEditingTransaction(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produk</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Stampel yang ditukarkan</TableHead>
            <TableHead>Sisa Stampel</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.product}</TableCell>
              <TableCell>{transaction.customer}</TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.stampExchanged}</TableCell>
              <TableCell>{transaction.remainingStamp}</TableCell>
              <TableCell>
                <Badge
                  status={
                    transaction.status === "exchanged" ? "Delivered" : "Process"
                  }
                />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-8 h-8 text-blue-600"
                    onClick={() => handleEdit(transaction)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-8 h-8 text-red-600"
                    onClick={() => handleDelete(transaction.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
