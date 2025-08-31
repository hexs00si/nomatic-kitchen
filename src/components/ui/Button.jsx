import Link from "next/link";

const variantStyles = {
  primary: "bg-brand-identity text-white hover:bg-brand-identity/90",
  secondary: "bg-brand-dark text-white hover:bg-brand-dark/90",
  outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  ghost: "text-gray-700 hover:bg-gray-100",
  arrowed:
    "bg-transparent border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white transition-all duration-300 rounded-full flex items-center justify-between px-8 py-6 text-lg font-semibold min-w-[200px]",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs font-medium",
  md: "px-4 py-2 text-sm font-medium",
  lg: "px-6 py-3 text-base font-medium",
  xl: "px-8 py-4 text-lg font-semibold",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  href,
  disabled = false,
  type = "button",
}) => {
  const baseClasses =
    "rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-identity disabled:opacity-50 disabled:cursor-not-allowed";

  // For arrowed variant, we'll use different base classes
  const classes =
    variant === "arrowed"
      ? `${variantStyles[variant]} ${className}`
      : `${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const renderContent = () => {
    if (variant === "arrowed") {
      return (
        <>
          <span>{children}</span>
          <div className="ml-4 flex items-center">
            <svg
              width="40"
              height="16"
              viewBox="0 0 40 16"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-2"
            >
              <path
                d="M32 1L39 8L32 15M39 8H1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </>
      );
    }
    return children;
  };

  if (href) {
    return (
      <Link href={href}>
        <button
          className={`${classes} ${variant === "arrowed" ? "group" : ""}`}
          disabled={disabled}
          type={type}
        >
          {renderContent()}
        </button>
      </Link>
    );
  }

  return (
    <button
      className={`${classes} ${variant === "arrowed" ? "group" : ""}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
