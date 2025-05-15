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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TransactionForm from "./transaction-form";

interface Transaction {
  id: string;
  date: string;
  paymentMethod: string;
  customer: string;
  amount: string;
  paymentId: string;
  status: "Lunas" | "Belum";
}

interface TransactionsTableProps {
  onVerify: (transaction: Transaction) => void;
}

const initialTransactions: Transaction[] = [
  {
    id: "1",
    date: "20 April 2025",
    paymentMethod: "Transfer bank",
    customer: "Azhka",
    amount: "Rp. 300.000",
    paymentId: "541gs676",
    status: "Lunas",
  },
  {
    id: "2",
    date: "26 April 2025",
    paymentMethod: "Qris",
    customer: "Khanza",
    amount: "Rp. 250.000",
    paymentId: "47she766",
    status: "Lunas",
  },
  {
    id: "3",
    date: "27 April 2025",
    paymentMethod: "COD",
    customer: "Haqi",
    amount: "Rp. 200.000",
    paymentId: "86e37193",
    status: "Belum",
  },
];

export default function TransactionsTable({
  onVerify,
}: TransactionsTableProps) {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const handleDelete = (id: string) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsAddDialogOpen(true);
  };

  const handleSave = (transaction: Transaction) => {
    if (editingTransaction) {
      setTransactions(
        transactions.map((t) => (t.id === transaction.id ? transaction : t))
      );
    } else {
      const newId = (
        Math.max(0, ...transactions.map((t) => parseInt(t.id))) + 1
      ).toString();
      setTransactions([...transactions, { ...transaction, id: newId }]);
    }
    setIsAddDialogOpen(false);
    setEditingTransaction(null);
  };

  return (
    <div className="bg-white rounded-md shadow">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Transactions</h2>
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
            <TransactionForm
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
            <TableHead>Tanggal</TableHead>
            <TableHead>Metode pembayaran</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Jumlah</TableHead>
            <TableHead>ID Pembayaran</TableHead>
            <TableHead>Status Pembayaran</TableHead>
            <TableHead>Verifikasi</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} className="bg-gray-50 even:bg-white">
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.paymentMethod}</TableCell>
              <TableCell>{transaction.customer}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.paymentId}</TableCell>
              <TableCell>
                <Badge
                  className={
                    transaction.status === "Lunas"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                  }
                >
                  {transaction.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-200"
                  onClick={() => onVerify(transaction)}
                >
                  Verifikasi
                </Button>
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
