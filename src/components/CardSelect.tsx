"use client";

import {
  Plus,
  ImageIcon,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Users,
  Calendar,
  BarChart3,
  Clock,
  FileText,
  Zap,
  Copy,
  Download,
  Share2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

interface FormCardProps {
  isPlus: boolean;
  image?: string;
  title: string;
  id?: string;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  onDuplicate?: () => void;
  onShare?: () => void;
  onDownload?: () => void;
  // Detail info props
  viewCount?: number;
  responseCount?: number;
  lastModified?: string;
  status?: "active" | "inactive" | "draft";
  createdAt?: string;
  description?: string;
  category?: string;
  author?: string;
}

export default function FormCard({
  isPlus,
  image,
  title,
  id,
  onClick,
  onEdit,
  onDelete,
  onView,
  viewCount = 0,
  responseCount = 0,
  lastModified = "",
  status = "active",
  createdAt = "",
  description,
}: FormCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const linkUrl = isPlus
    ? "/dashboard/manage-card/create"
    : `/dashboard/manage-card/${id}`;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "inactive":
        return "bg-red-50 text-red-700 border-red-200";
      case "draft":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Aktif";
      case "inactive":
        return "Tidak Aktif";
      case "draft":
        return "Draft";
      default:
        return "Unknown";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Zap className="w-3 h-3" />;
      case "inactive":
        return <Clock className="w-3 h-3" />;
      case "draft":
        return <FileText className="w-3 h-3" />;
      default:
        return <FileText className="w-3 h-3" />;
    }
  };

  const handleConfirmDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMenu(false);

    const result = await Swal.fire({
      title: "Are you sure you want to delete?",
      text: "Deleted data cannot be recovered.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed && onDelete) {
      onDelete();
    }
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMenu(false);

    if (!id) return;

    const url = `${window.location.origin}/card/${id}`;

    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link berhasil disalin!");
    } catch (err) {
      toast.error(err.message || "Gagal menyalin link.");
    }
  };

  if (isPlus) {
    return (
      <div
        onClick={onClick}
        className="group flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50/30 cursor-pointer transition-all duration-300 min-h-[80px] bg-gray-50/50"
      >
        <div className="flex flex-col items-center gap-2 text-gray-500 group-hover:text-blue-500 transition-colors duration-300">
          <div className="p-3 rounded-full bg-white group-hover:bg-blue-100 shadow-sm group-hover:shadow-md transition-all duration-300">
            <Plus className="w-6 h-6" />
          </div>
          <div className="text-center">
            <p className="text-xs font-semibold">Make a Card</p>
            <p className="text-[10px] text-gray-400 mt-0.5">
              Click to make a card
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300">
      <div className="flex items-center p-4 gap-3">
        {/* Thumbnail */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
              {image ? (
                <Image
                  src={image}
                  alt="Form Template"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-gray-400" />
                </div>
              )}
            </div>
            {/* Status overlay */}
            <div
              className={`absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium border ${getStatusColor(
                status
              )} flex items-center gap-0.5`}
            >
              {getStatusIcon(status)}
              <span>{getStatusText(status)}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow min-w-0">
          <div className="flex items-start justify-between gap-4">
            {/* Title and Info */}
            <div className="flex-grow min-w-0">
              <Link href={linkUrl} className="group/link block">
                <h3 className="text-base font-semibold text-gray-900 group-hover/link:text-blue-600 transition-colors duration-200 truncate">
                  {title}
                </h3>
              </Link>

              {description && (
                <p className="text-xs text-gray-600 mt-0.5 line-clamp-1">
                  {description}
                </p>
              )}
            </div>

            {/* Statistics */}
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1 text-gray-600">
                <Eye className="w-3 h-3" />
                <span className="font-medium">
                  {viewCount.toLocaleString()}
                </span>
                <span className="text-[10px] text-gray-500">views</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <BarChart3 className="w-3 h-3" />
                <span className="font-medium">{responseCount}</span>
                <span className="text-[10px] text-gray-500">responses</span>
              </div>
            </div>
          </div>

          {/* Date Info */}
          <div className="flex items-center gap-4 mt-2 text-[10px] text-gray-500">
            {createdAt && (
              <div className="flex items-center gap-1">
                <Calendar className="w-2.5 h-2.5" />
                <span>Dibuat: {createdAt}</span>
              </div>
            )}
            {lastModified && (
              <div className="flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" />
                <span>Diubah: {lastModified}</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex-shrink-0 relative" ref={menuRef}>
          <button
            onClick={handleMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 opacity-0 group-hover:opacity-100"
          >
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute top-10 right-0 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[180px] z-20">
              <button
                onClick={onView}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors duration-150"
              >
                <Eye className="w-4 h-4" />
                View
              </button>
              <button
                onClick={onEdit}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors duration-150"
              >
                <Edit className="w-4 h-4" />
                Edit Card
              </button>

              <button
                onClick={handleCopy}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors duration-150"
              >
                <Copy className="w-4 h-4" />
                Share Link
              </button>

              <hr className="my-1 border-gray-200" />
              <button
                onClick={handleConfirmDelete}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors duration-150"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
