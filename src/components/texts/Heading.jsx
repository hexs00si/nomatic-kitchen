
const variantMap = {
  sm: "text-lg md:text-xl font-semibold",
  md: "text-2xl md:text-3xl font-bold",
  lg: "text-4xl md:text-5xl font-extrabold",
  xl: "text-6xl md:text-7xl font-black",
};

export const Heading = ({
  children,
  variant = "md",
  isSlashed = false,
  dark = false,
  className = "",
}) => {
  const textColor = dark ? "text-white" : "text-black";
  const slashColor = "text-red-500";
  return (
    <div
      className={`flex items-center gap-2 ${variantMap[variant]} ${textColor} ${className}`}
    >
      {isSlashed && <span className={`${slashColor} select-none`}>/</span>}
      <span>{children}</span>
    </div>
  );
};

export default Heading;
