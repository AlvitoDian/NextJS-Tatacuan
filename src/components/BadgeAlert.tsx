import { AlertCircle, CheckCircle, XCircle } from "lucide-react";

export default function BadgeAlert({ variant, message, onClose }) {
  const variants = {
    error: {
      bgColor: "bg-red-100",
      borderColor: "border-red-400",
      textColor: "text-red-700",
      icon: <AlertCircle className="w-4 h-4" />,
    },
    success: {
      bgColor: "bg-green-100",
      borderColor: "border-green-400",
      textColor: "text-green-700",
      icon: <CheckCircle className="w-4 h-4" />,
    },
    danger: {
      bgColor: "bg-yellow-100",
      borderColor: "border-yellow-400",
      textColor: "text-yellow-700",
      icon: <XCircle className="w-4 h-4" />,
    },
  };

  const { bgColor, borderColor, textColor, icon } =
    variants[variant] || variants.error;

  return (
    <div
      className={`${bgColor} border ${borderColor} ${textColor} px-3 py-2 rounded relative flex items-center mb-2`}
    >
      <span className="mr-2">{icon}</span>
      <span className="flex-grow text-sm">{message}</span>
      {onClose && (
        <button onClick={onClose} className="ml-2 font-bold" aria-label="Close">
          &times;
        </button>
      )}
    </div>
  );
}
