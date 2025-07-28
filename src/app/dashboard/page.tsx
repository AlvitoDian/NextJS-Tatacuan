"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Wallet, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { useEffect, useState } from "react";
import {
  fetchDashboard,
  fetchDashboardMonthly,
  fetchDashboardRecent,
} from "@/lib/api/dashboard";
import Loader from "@/components/Loader";

export default function Dashboard() {
  const breadcrumb = [{ label: "Dashboard", href: "/" }];

  const [data, setData] = useState(null);
  const [dataMonthly, setDataMonthly] = useState([]);
  const [recent, setRecent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //? Fetch Data
  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [walletData, monthly, recent] = await Promise.all([
        fetchDashboard(),
        fetchDashboardMonthly(),
        fetchDashboardRecent(),
      ]);
      setData(walletData);
      setDataMonthly(monthly);
      setRecent(recent);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{`${label} 2024`}</p>
          <div className="space-y-1">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Pemasukan: </span>
              <span className="text-sm font-semibold text-green-600 ml-1">
                {formatCurrency(payload[0].value)}
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Pengeluaran: </span>
              <span className="text-sm font-semibold text-red-600 ml-1">
                {formatCurrency(payload[1].value)}
              </span>
            </div>
            <div className="border-t pt-1 mt-2">
              <span className="text-sm text-gray-600">Net: </span>
              <span
                className={`text-sm font-semibold ml-1 ${
                  payload[0].value - payload[1].value >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {formatCurrency(payload[0].value - payload[1].value)}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Breadcrumb breadcrumb={breadcrumb} title="Dashboard" />
      {isLoading ? (
        <Loader screen={true} />
      ) : (
        <div className="p-4">
          {/* Header Section */}
          <div className="mb-6">
            <div className="bg-gradient-to-r from-white to-green-50 rounded-xl shadow-sm border border-green-100 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    Selamat Datang di TataCuan!
                  </h1>
                  <p className="text-gray-600 text-sm">
                    Berikut ringkasan keuangan Anda hari ini.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Total Balance */}
            <div className="bg-white rounded-xl shadow-sm border border-green-100 p-4 hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-50 to-green-100 text-green-600">
                  <Wallet className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-500 text-xs font-medium">
                    Total Saldo
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    {formatCurrency(data?.total_saldo)}
                  </p>
                </div>
              </div>
            </div>

            {/* Total Income */}
            <div className="bg-white rounded-xl shadow-sm border border-green-100 p-4 hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-50 to-green-100 text-green-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-500 text-xs font-medium">
                    Total Pemasukan
                  </p>
                  <p className="text-xl font-bold text-green-600">
                    {formatCurrency(data?.total_pemasukan)}
                  </p>
                </div>
              </div>
            </div>

            {/* Total Expense */}
            <div className="bg-white rounded-xl shadow-sm border border-red-100 p-4 hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-gradient-to-br from-red-50 to-red-100 text-red-600">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-500 text-xs font-medium">
                    Total Pengeluaran
                  </p>
                  <p className="text-xl font-bold text-red-600">
                    {formatCurrency(data?.total_pengeluaran)}
                  </p>
                </div>
              </div>
            </div>

            {/* This Month Net */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-4 text-white hover:shadow-xl transition-all duration-300">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <p className="text-green-100 text-xs font-medium">
                    Bulan Ini
                  </p>
                  <p className="text-xl font-bold">
                    {formatCurrency(data?.saldo_bulan_ini)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-green-100 mb-6 overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-white p-4 border-b border-green-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">
                    Analisis Keuangan Bulanan
                  </h2>
                  <p className="text-gray-600 text-xs">
                    Pantau pemasukan dan pengeluaran sepanjang tahun
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-medium text-gray-700">
                      Pemasukan
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-xs font-medium text-gray-700">
                      Pengeluaran
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dataMonthly}
                    margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 11 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 11 }}
                      tickFormatter={(value) =>
                        `${(value / 1000000).toFixed(0)}M`
                      }
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="income"
                      fill="#10B981"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={30}
                    />
                    <Bar
                      dataKey="expense"
                      fill="#EF4444"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={30}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Latest Transaction List */}
          <div className="bg-white rounded-xl shadow-sm border border-green-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-white p-4 border-b border-green-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">
                    Transaksi Terbaru
                  </h2>
                  <p className="text-gray-600 text-xs">
                    Riwayat transaksi terkini dari semua dompet Anda
                  </p>
                </div>
                <button className="text-sm text-green-600 hover:text-green-800 font-medium">
                  Lihat Semua
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Kategori
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Jumlah
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Waktu
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {recent.map((transaction, index) => (
                    <tr
                      key={index}
                      className="hover:bg-green-50 transition-colors duration-150"
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          {transaction.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div
                          className={`text-base font-bold ${
                            transaction.type === "C"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {formatCurrency(transaction.amount)}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-600 text-sm">
                        {transaction.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
