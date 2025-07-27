import * as lucideIcons from "lucide-react";
import { ButtonHTMLAttributes } from "react";

// Define button variants
type ButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "gradient"
  | "outlinePrimary"
  | "outlineDanger"
  | "dark"
  | "light"
  | "disabled";

// Define button sizes
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  isLoading?: boolean;
  icon?: string;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export default function Button({
  onClick = () => {},
  label,
  variant = "default",
  size = "md",
  className = "",
  isLoading = false,
  type = "button",
  icon,
  iconPosition = "left",
  fullWidth = false,
  disabled = false,
  ...rest
}: ButtonProps) {
  // Get the icon component dynamically if it exists
  const IconComponent = icon && lucideIcons[icon] ? lucideIcons[icon] : null;

  // Updated variant styles with #e44b37 theme
  const variantStyles = {
    default:
      "bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 shadow-sm",

    primary:
      "bg-[#e44b37] hover:bg-[#d03e2b] text-white border border-[#e44b37] shadow-sm",

    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200 shadow-sm",

    tertiary:
      "bg-transparent hover:bg-gray-100 text-gray-700 border border-gray-400",

    success:
      "bg-green-600 hover:bg-green-700 text-white border border-green-600 shadow-sm",

    warning:
      "bg-amber-500 hover:bg-amber-600 text-white border border-amber-500 shadow-sm",

    danger:
      "bg-red-600 hover:bg-red-700 text-white border border-red-600 shadow-sm",

    info: "bg-sky-500 hover:bg-sky-600 text-white border border-sky-500 shadow-sm",

    gradient:
      "bg-gradient-to-r from-[#e44b37] to-[#f86d5d] text-white border-0 shadow-sm hover:from-[#d03e2b] hover:to-[#e85c4c]",

    outlinePrimary:
      "bg-white hover:bg-[#fff8f7] text-[#e44b37] border border-[#e44b37]",

    outlineDanger:
      "bg-transparent hover:bg-red-50 text-red-600 border border-red-600",

    dark: "bg-gray-800 hover:bg-gray-900 text-white border border-gray-800 shadow-sm",

    light: "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200",

    disabled:
      "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed",
  };

  // Define size styles
  const sizeStyles = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  // Base styles for all buttons
  const baseStyle =
    "font-medium rounded-lg transition-all duration-200 ease-in-out flex items-center justify-center gap-2 focus:ring-2 focus:ring-offset-2 focus:outline-none";

  // Disabled style
  const disabledStyle = "opacity-60 cursor-not-allowed pointer-events-none";

  // Focus ring colors based on variant (updated for #e44b37 theme)
  const focusRingColors = {
    default: "focus:ring-gray-200",
    primary: "focus:ring-[#e44b37]/30",
    secondary: "focus:ring-gray-200",
    tertiary: "focus:ring-gray-200",
    success: "focus:ring-green-300",
    warning: "focus:ring-amber-300",
    danger: "focus:ring-red-300",
    info: "focus:ring-sky-300",
    gradient: "focus:ring-[#e44b37]/30",
    outlinePrimary: "focus:ring-[#e44b37]/30",
    outlineDanger: "focus:ring-red-300",
    dark: "focus:ring-gray-500",
    light: "focus:ring-gray-200",
    disabled: "",
  };

  // Combine all styles
  const buttonClasses = [
    baseStyle,
    variantStyles[variant],
    sizeStyles[size],
    focusRingColors[variant],
    fullWidth ? "w-full" : "",
    isLoading || disabled ? disabledStyle : "",
    className,
  ].join(" ");

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={buttonClasses}
      aria-busy={isLoading}
      {...rest}
    >
      {isLoading ? (
        <span className="inline-flex items-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>{label}</span>
        </span>
      ) : (
        <>
          {IconComponent && iconPosition === "left" && (
            <IconComponent className="w-4 h-4" />
          )}
          <span>{label}</span>
          {IconComponent && iconPosition === "right" && (
            <IconComponent className="w-4 h-4" />
          )}
        </>
      )}
    </button>
  );
}
