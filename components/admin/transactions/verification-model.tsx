"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Transaction {
  id: string;
  date: string;
  paymentMethod: string;
  customer: string;
  amount: string;
  paymentId: string;
  status: "Lunas" | "Belum";
}

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
  onVerificationComplete: () => void;
}

export default function VerificationModal({
  isOpen,
  onClose,
  transaction,
  onVerificationComplete,
}: VerificationModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>("Lunas");

  const handleConfirm = () => {
    // Here you would typically make an API call to update the transaction status
    console.log(
      "Transaction confirmed:",
      transaction.id,
      "with status:",
      paymentMethod
    );
    onVerificationComplete();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Verifikasi Pembayaran
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-lg font-medium mb-4">
            ID Pembayaran: {transaction.paymentId}
          </p>

          <RadioGroup
            defaultValue={paymentMethod}
            onValueChange={setPaymentMethod}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Lunas" id="lunas" />
              <Label htmlFor="lunas">Lunas</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="DP" id="dp" />
              <Label htmlFor="dp">DP</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-between gap-4 mt-4">
          <Button variant="outline" onClick={handleCancel} className="flex-1">
            Batal
          </Button>
          <Button
            onClick={handleConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            Konfirmasi
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
