"use client";

import { useState } from "react";
import { PlusCircle, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import GiftForm from "./gift-form";

interface Gift {
  id: number;
  name: string;
  stampRequired: number;
  imageUrl: string;
}

const initialGifts: Gift[] = [
  {
    id: 1,
    name: "25% Off Booking Hour",
    stampRequired: 7,
    imageUrl: "/img/placeholder.png",
  },
  {
    id: 2,
    name: "Fried Rise",
    stampRequired: 8,
    imageUrl: "/img/placeholder.png",
  },
  {
    id: 3,
    name: "Burger BAS",
    stampRequired: 6,
    imageUrl: "/img/placeholder.png",
  },
  {
    id: 4,
    name: "Gratis sewa sepatu 1 game",
    stampRequired: 5,
    imageUrl: "/img/placeholder.png",
  },
];

export default function GiftsManagement() {
  const [gifts, setGifts] = useState<Gift[]>(initialGifts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGift, setEditingGift] = useState<Gift | null>(null);

  const handleAddGift = () => {
    setEditingGift(null);
    setIsDialogOpen(true);
  };

  const handleEditGift = (gift: Gift) => {
    setEditingGift(gift);
    setIsDialogOpen(true);
  };

  const handleDeleteGift = (id: number) => {
    setGifts(gifts.filter((gift) => gift.id !== id));
  };

  const handleSaveGift = (gift: Gift) => {
    if (editingGift) {
      setGifts(gifts.map((g) => (g.id === gift.id ? gift : g)));
    } else {
      setGifts([
        ...gifts,
        { ...gift, id: Math.max(0, ...gifts.map((g) => g.id)) + 1 },
      ]);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="bg-white rounded-md shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Rewards & Gifts</h2>
        <Button onClick={handleAddGift} className="bg-red-600 hover:bg-red-700">
          Add New Gift
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {gifts.map((gift) => (
          <Card key={gift.id} className="border overflow-hidden">
            <div className="aspect-square bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600">Gambar Produk</span>
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium">{gift.name}</h3>
              <p className="font-semibold mt-2">{gift.stampRequired} Stamp</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-end gap-2">
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 text-blue-600"
                onClick={() => handleEditGift(gift)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 text-red-600"
                onClick={() => handleDeleteGift(gift.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}

        <Card
          className="border border-dashed flex items-center justify-center cursor-pointer h-full"
          onClick={handleAddGift}
        >
          <div className="flex flex-col items-center justify-center p-6">
            <PlusCircle className="h-12 w-12 text-red-600 mb-2" />
            <span className="text-gray-600">Add New Gift</span>
          </div>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingGift ? "Edit Gift" : "Add New Gift"}
            </DialogTitle>
          </DialogHeader>
          <GiftForm
            initialData={editingGift}
            onSave={handleSaveGift}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
