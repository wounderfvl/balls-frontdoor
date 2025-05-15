export interface FieldBooking {
  id: string;
  phone: string;
  field: string;
  customer: string;
  date: string;
  amount: string;
  paymentMode: string;
  status: "Delivered" | "Process" | "Cancelled";
}
