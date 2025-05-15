"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface Gift {
  id: number;
  name: string;
  stampRequired: number;
  imageUrl: string;
}

interface GiftFormProps {
  initialData: Gift | null;
  onSave: (data: Gift) => void;
  onCancel: () => void;
}

export default function GiftForm({
  initialData,
  onSave,
  onCancel,
}: GiftFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.imageUrl || null
  );

  const form = useForm<Gift>({
    defaultValues: initialData || {
      id: 0,
      name: "",
      stampRequired: 5,
      imageUrl: "/img/placeholder.png",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
      setImagePreview(initialData.imageUrl);
    }
  }, [initialData, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (data: Gift) => {
    onSave({
      ...data,
      id: initialData?.id || 0,
      imageUrl: imagePreview || "/img/placeholder.png",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Gift Image</label>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-sm aspect-square bg-gray-100 rounded-md overflow-hidden">
              {imagePreview ? (
                <div
                  className="w-full h-full bg-center bg-cover flex items-center justify-center"
                  style={{ backgroundImage: `url(${imagePreview})` }}
                >
                  <span className="text-gray-600">Gambar Produk</span>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-600">Gambar Produk</span>
                </div>
              )}

              <label className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                <Upload className="h-8 w-8 text-white mb-2" />
                <span className="text-white text-sm">Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gift Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter gift name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stampRequired"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Required Stamps</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-red-600 hover:bg-red-700">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
