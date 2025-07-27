"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { useEffect, useState } from "react";
import { User, Mail, Lock, Camera, Save, Eye, EyeOff } from "lucide-react";
import { fetchUserByEmail } from "@/lib/api/user";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";
import Swal from "sweetalert2";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import Button from "@/components/Button";

export default function AccountSettings() {
  const { data: session } = useSession();
  const breadcrumb = [{ label: "Account Settings", href: "/" }];

  const [formData, setFormData] = useState({
    usrid: "",
    email: "",
    curpw: "",
    newpw: "",
    conpw: "",
    primg: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //? Fetch Data
  const fetchData = async () => {
    try {
      const [cardsData] = await Promise.all([
        fetchUserByEmail(session.user.email),
      ]);
      setFormData(cardsData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [cardsData] = await Promise.all([
        fetchUserByEmail(session.user.email),
      ]);
      setFormData(cardsData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadAllData();
  }, []);
  //? Fetch Data End

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          primg: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newpw && formData.newpw !== formData.conpw) {
      await Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Password baru dan konfirmasi tidak cocok.",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      await axios.put(`/api/user/${formData.usrid}`, formData);

      toast.success("Profile successfully updated");

      window.location.reload();
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text:
          err.response?.data?.message ||
          err.message ||
          "An unexpected error has occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Breadcrumb breadcrumb={breadcrumb} title="Settings" />
      <div className=""></div>
      {/* Main Content */}
      <div className="p-4 w-full">
        {isLoading ? (
          <Loader screen={true} />
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <form onSubmit={handleSubmit}>
              {/* Profile Image Section */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-sm font-semibold text-gray-900 mb-3">
                  Profile Picture
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 relative">
                      <Image
                        src={
                          formData.primg ||
                          "https://www.w3schools.com/howto/img_avatar.png"
                        }
                        alt="Profile"
                        fill
                        className="rounded-full object-cover border-4 border-gray-100"
                      />
                    </div>

                    <label className="absolute bottom-0 right-0 bg-[#e44b37] hover:bg-[#d63c2a] text-white p-1.5 rounded-full cursor-pointer transition-colors shadow-md">
                      <Camera className="w-3 h-3" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div>
                    <h3 className="text-xs font-medium text-gray-900">
                      Change profile picture
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Upload a new photo to personalize your account
                    </p>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-sm font-semibold text-gray-900 mb-4">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e44b37] focus:border-transparent transition-all duration-200"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Password Section */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-sm font-semibold text-gray-900 mb-4">
                  Change Password
                </h2>
                <div className="space-y-4">
                  {/* Current Password */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        name="curpw"
                        value={formData.curpw}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e44b37] focus:border-transparent transition-all duration-200"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* New Password */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type={showNewPassword ? "text" : "password"}
                          name="newpw"
                          value={formData.newpw}
                          onChange={handleInputChange}
                          className="w-full pl-9 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e44b37] focus:border-transparent transition-all duration-200"
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="conpw"
                          value={formData.conpw}
                          onChange={handleInputChange}
                          className="w-full pl-9 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e44b37] focus:border-transparent transition-all duration-200"
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-xs text-amber-800">
                      <strong>Password Requirements:</strong> Minimum 8
                      characters with at least one uppercase letter, one
                      lowercase letter, and one number.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-gray-50 rounded-b-xl">
                <div className="flex justify-end space-x-3">
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    variant="primary"
                    label="Save"
                    icon="Save"
                  />
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
