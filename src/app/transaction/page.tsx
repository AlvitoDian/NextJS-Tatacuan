"use client";

import { useState, useCallback, useEffect } from "react";

import {
  Calendar,
  DollarSign,
  Save,
  Tag,
  TrendingDown,
  TrendingUp,
  User,
  User2Icon,
} from "lucide-react";
import { fetchCategory } from "@/lib/api/category";
import {
  createTransaction,
  createTransactionPublic,
} from "@/lib/api/transaction";
import toast from "react-hot-toast";

export default function ManageCard() {
  const [formData, setFormData] = useState({
    email: "",
    usrpw: "",
    category: "",
    type: "",
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  //? Fetch Data
  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [categoriesData] = await Promise.all([fetchCategory()]);
      const formattedCategories = categoriesData.map((catg) => ({
        value: catg.catid,
        label: catg.name1,
      }));

      setCategories(formattedCategories);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadAllData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.usrpw) newErrors.usrpw = "Password is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.type) newErrors.type = "Transaction type is required";
    if (!formData.amount || formData.amount <= 0)
      newErrors.amount = "Valid amount is required";
    if (!formData.date) newErrors.date = "Date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, setErrors]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await createTransactionPublic(formData);

      toast.success("Transaksi sukses");

      setFormData({
        category: "",
        type: "",
        amount: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      console.error("Failed to submit transaction:", error);
      toast.error(
        error.response.data.message || "Failed to create transaction"
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

  const formatPreviewAmount = (amount) => {
    if (!amount) return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getSelectedCategory = () => {
    return categories.find((cat) => cat.value === formData.category);
  };

  return (
    <div className="p-4 md:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 shadow-lg rounded-lg md:p-10">
        {/* Form Utama */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <User2Icon className="h-6 w-6 text-green-600" />
              Akun
            </h2>

            <div className="space-y-4">
              {/* Username */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Email *
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none focus:border-transparent ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Password *
                </div>
                <input
                  type="password"
                  name="usrpw"
                  value={formData.usrpw}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 focus:outline-none text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.usrpw ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.usrpw && (
                  <p className="text-red-500 text-xs mt-1">{errors.usrpw}</p>
                )}
              </div>
            </div>

            <h2 className="text-xl font-semibold mt-6 text-gray-800 mb-6 flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-green-600" />
              Detail Transaksi
            </h2>

            <div className="space-y-4">
              {/* Jenis Transaksi */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">
                  Jenis Transaksi *
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {/* Pemasukan - Credit */}
                  <div
                    onClick={() =>
                      handleInputChange({
                        target: { name: "type", value: "C" },
                      })
                    }
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.type === "C"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      <div>
                        <div className="text-sm font-medium">Pemasukan</div>
                        <div className="text-xs text-gray-500">Credit</div>
                      </div>
                    </div>
                  </div>

                  {/* Pengeluaran - Debit */}
                  <div
                    onClick={() =>
                      handleInputChange({
                        target: { name: "type", value: "D" },
                      })
                    }
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.type === "D"
                        ? "border-red-500 bg-red-50 text-red-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-5 w-5" />
                      <div>
                        <div className="text-sm font-medium">Pengeluaran</div>
                        <div className="text-xs text-gray-500">Debit</div>
                      </div>
                    </div>
                  </div>
                </div>
                {errors.type && (
                  <p className="text-red-500 text-xs mt-1">{errors.type}</p>
                )}
              </div>

              {/* Kategori */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Kategori *
                </div>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full focus:outline-none px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.icon} {category.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                )}
              </div>

              {/* Jumlah */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">
                  Jumlah *
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    Rp
                  </span>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="0"
                    className={`w-full pl-10 focus:outline-none pr-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.amount ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.amount && (
                  <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
                )}
              </div>

              {/* Tanggal */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Tanggal *
                </div>
                <input
                  type="datetime-local"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 focus:outline-none text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.date ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.date && (
                  <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                )}
              </div>

              {/* Deskripsi */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">
                  Deskripsi
                </div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Tambahkan catatan tentang transaksi ini (opsional)"
                  rows={3}
                  className="w-full px-3 py-2 focus:outline-none text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Kartu Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Preview Transaksi
            </h3>

            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg ${
                  formData.type === "C"
                    ? "bg-green-50 border border-green-200"
                    : formData.type === "D"
                    ? "bg-red-50 border border-red-200"
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  {formData.type === "C" && (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  )}
                  {formData.type === "D" && (
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  )}
                  {!formData.type && (
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  )}
                  <span className="font-medium capitalize">
                    {formData.type === "C"
                      ? "Pemasukan"
                      : formData.type === "D"
                      ? "Pengeluaran"
                      : "Jenis Transaksi"}
                  </span>
                </div>

                <div
                  className={`text-2xl font-bold ${
                    formData.type === "C"
                      ? "text-green-600"
                      : formData.type === "D"
                      ? "text-red-600"
                      : "text-gray-400"
                  }`}
                >
                  {formData.type === "C" && "+"}
                  {formData.type === "D" && "-"}
                  {formatPreviewAmount(formData.amount)}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Kategori:</span>
                  <span className="font-medium">
                    {getSelectedCategory()
                      ? `${getSelectedCategory().label}`
                      : "-"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tanggal:</span>
                  <span className="font-medium">{formData.date || "-"}</span>
                </div>

                {formData.description && (
                  <div className="pt-2 border-t border-gray-200">
                    <span className="text-gray-600">Catatan:</span>
                    <p className="font-medium mt-1">{formData.description}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tombol Submit */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Save className="h-4 w-4" />
              )}
              {isSubmitting ? "Menyimpan..." : "Simpan Transaksi"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
