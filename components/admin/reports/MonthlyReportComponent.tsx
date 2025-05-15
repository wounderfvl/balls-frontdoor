"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data generator functions
const generateMonthlyData = (year: number, month: number) => {
  const days = new Date(year, month, 0).getDate();
  const data = [];

  let totalBookings = 0;
  let totalRevenue = 0;
  let lastBooking = Math.floor(Math.random() * 5) + 2;
  let lastRevenue = Math.floor(Math.random() * 500000) + 300000;

  for (let i = 1; i <= days; i++) {
    // Create some random variation but with a trend
    const bookings = Math.max(
      1,
      Math.floor(lastBooking + (Math.random() * 4 - 2))
    );
    const revenue = Math.max(
      200000,
      Math.floor(lastRevenue + (Math.random() * 200000 - 100000))
    );

    lastBooking = bookings;
    lastRevenue = revenue;
    totalBookings += bookings;
    totalRevenue += revenue;

    data.push({
      date: `${year}-${String(month).padStart(2, "0")}-${String(i).padStart(
        2,
        "0"
      )}`,
      bookings,
      revenue,
    });
  }

  return {
    dailyData: data,
    summary: {
      totalBookings,
      completedBookings: Math.floor(totalBookings * 0.85),
      cancelledBookings: Math.floor(totalBookings * 0.15),
      totalRevenue,
    },
  };
};

const generateFieldUsageData = (year: number, month: number) => {
  return [
    {
      id: "field-123abc",
      name: "Lapangan A",
      bookings: Math.floor(Math.random() * 50) + 10,
      hours: Math.floor(Math.random() * 100) + 30,
      revenue: Math.floor(Math.random() * 5000000) + 3000000,
    },
    {
      id: "field-456def",
      name: "Lapangan B",
      bookings: Math.floor(Math.random() * 40) + 5,
      hours: Math.floor(Math.random() * 80) + 20,
      revenue: Math.floor(Math.random() * 4000000) + 2000000,
    },
    {
      id: "field-789ghi",
      name: "Lapangan C",
      bookings: Math.floor(Math.random() * 30) + 5,
      hours: Math.floor(Math.random() * 60) + 15,
      revenue: Math.floor(Math.random() * 3000000) + 1500000,
    },
  ];
};

// Format currency to Indonesian Rupiah
const formatRupiah = (amount: number) => {
  return `Rp ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

const MonthlyReportComponent = () => {
  // State for filter and data
  const [year, setYear] = useState<number>(2024);
  const [month, setMonth] = useState<number>(4);
  const [reportData, setReportData] = useState<any>(null);
  const [fieldData, setFieldData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showReport, setShowReport] = useState<boolean>(false);

  // Generate the years dropdown options (last 5 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  // Generate the months dropdown options
  const months = [
    { value: 1, label: "Januari" },
    { value: 2, label: "Februari" },
    { value: 3, label: "Maret" },
    { value: 4, label: "April" },
    { value: 5, label: "Mei" },
    { value: 6, label: "Juni" },
    { value: 7, label: "Juli" },
    { value: 8, label: "Agustus" },
    { value: 9, label: "September" },
    { value: 10, label: "Oktober" },
    { value: 11, label: "November" },
    { value: 12, label: "Desember" },
  ];

  // Function to generate the report
  const generateReport = () => {
    setLoading(true);

    // Simulate an API call with a timeout
    setTimeout(() => {
      const data = generateMonthlyData(year, month);
      const fields = generateFieldUsageData(year, month);

      setReportData(data);
      setFieldData(fields);
      setLoading(false);
      setShowReport(true);
    }, 800);
  };

  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-bold mb-6">Report</h1>

      <div className="mb-8 bg-gray-50 p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-4">Filter Laporan Bulanan</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tahun
            </label>
            <select
              className="w-full border border-gray-300 rounded-md p-2"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bulan
            </label>
            <select
              className="w-full border border-gray-300 rounded-md p-2"
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
            >
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <button
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
            onClick={generateReport}
            disabled={loading}
          >
            {loading ? "Memproses..." : "Tampilkan Laporan"}
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Menghasilkan laporan...</p>
        </div>
      )}

      {showReport && reportData && (
        <>
          {/* Success message */}
          <div className="bg-green-100 border border-green-200 text-green-800 px-4 py-3 rounded mb-6">
            Laporan bulanan berhasil dibuat (Data Simulasi)
          </div>

          {/* Report Summary */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Ringkasan Laporan</h2>
            <p className="text-gray-600 mb-4">{`${
              months.find((m) => m.value === month)?.label
            } ${year}`}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-md text-center">
                <h3 className="text-sm text-gray-500 mb-1">Total Booking</h3>
                <p className="text-xl font-bold">
                  {reportData.summary.totalBookings}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md text-center">
                <h3 className="text-sm text-gray-500 mb-1">Booking Selesai</h3>
                <p className="text-xl font-bold">
                  {reportData.summary.completedBookings}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md text-center">
                <h3 className="text-sm text-gray-500 mb-1">
                  Booking Dibatalkan
                </h3>
                <p className="text-xl font-bold">
                  {reportData.summary.cancelledBookings}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md text-center">
                <h3 className="text-sm text-gray-500 mb-1">Total Pendapatan</h3>
                <p className="text-xl font-bold">
                  {formatRupiah(reportData.summary.totalRevenue)}
                </p>
              </div>
            </div>
          </div>

          {/* Field Usage */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Penggunaan Lapangan</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-2 px-3 text-left text-sm font-semibold text-gray-700">
                        ID Lapangan
                      </th>
                      <th className="py-2 px-3 text-left text-sm font-semibold text-gray-700">
                        Nama Lapangan
                      </th>
                      <th className="py-2 px-3 text-left text-sm font-semibold text-gray-700">
                        Jumlah Booking
                      </th>
                      <th className="py-2 px-3 text-left text-sm font-semibold text-gray-700">
                        Total Jam
                      </th>
                      <th className="py-2 px-3 text-left text-sm font-semibold text-gray-700">
                        Pendapatan
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {fieldData.map((field) => (
                      <tr key={field.id}>
                        <td className="py-2 px-3 text-sm text-gray-800">
                          {field.id}
                        </td>
                        <td className="py-2 px-3 text-sm text-gray-800">
                          {field.name}
                        </td>
                        <td className="py-2 px-3 text-sm text-gray-800">
                          {field.bookings}
                        </td>
                        <td className="py-2 px-3 text-sm text-gray-800">
                          {field.hours}
                        </td>
                        <td className="py-2 px-3 text-sm text-gray-800">
                          {formatRupiah(field.revenue)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-white p-4 border rounded-md">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Perbandingan Lapangan
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={fieldData}
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#1d4ed8" />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#10b981"
                    />
                    <Tooltip />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="bookings"
                      name="Jumlah Booking"
                      fill="#1d4ed8"
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="hours"
                      name="Total Jam"
                      fill="#10b981"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Daily Booking Details */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Detail Booking Harian
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-2 overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-2 px-3 text-left text-sm font-semibold text-gray-700">
                        Tanggal
                      </th>
                      <th className="py-2 px-3 text-left text-sm font-semibold text-gray-700">
                        Jumlah Booking
                      </th>
                      <th className="py-2 px-3 text-left text-sm font-semibold text-gray-700">
                        Pendapatan
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {reportData.dailyData.slice(0, 10).map((day: any) => (
                      <tr key={day.date}>
                        <td className="py-2 px-3 text-sm text-gray-800">
                          {day.date}
                        </td>
                        <td className="py-2 px-3 text-sm text-gray-800">
                          {day.bookings}
                        </td>
                        <td className="py-2 px-3 text-sm text-gray-800">
                          {formatRupiah(day.revenue)}
                        </td>
                      </tr>
                    ))}
                    {reportData.dailyData.length > 10 && (
                      <tr>
                        <td
                          colSpan={3}
                          className="py-2 px-3 text-sm text-center text-gray-500"
                        >
                          Menampilkan 10 dari {reportData.dailyData.length} hari
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="lg:col-span-3 bg-white p-4 border rounded-md">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Tren Booking & Pendapatan Bulan Ini
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={reportData.dailyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(value) => value.split("-")[2]} // Show only day
                    />
                    <YAxis yAxisId="left" orientation="left" stroke="#1d4ed8" />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#ef4444"
                    />
                    <Tooltip labelFormatter={(value) => `Tanggal: ${value}`} />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="bookings"
                      name="Jumlah Booking"
                      stroke="#1d4ed8"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="revenue"
                      name="Pendapatan (Rp)"
                      stroke="#ef4444"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Export options */}
          <div className="flex justify-end space-x-4 mt-8">
            <button className="bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Unduh PDF
            </button>

            <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Unduh Excel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MonthlyReportComponent;
