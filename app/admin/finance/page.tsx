import MonthlyReportComponent from "@/components/admin/reports/MonthlyReportComponent";
import AdminLayout from "@/components/ui/adminlayout";
import { NextPage } from "next";

const MonthlyReportPage: NextPage = () => {
  return (
    <AdminLayout>
      <MonthlyReportComponent />
    </AdminLayout>
  );
};

export default MonthlyReportPage;
