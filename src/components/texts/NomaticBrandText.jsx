
const NomaticBrandText = ({
  variant = "dark",
  caps = true,
  className = "",
}) => {
  const textColor = variant === "dark" ? "text-white" : "text-brand-dark";
  const text = caps ? "NOMATIC" : "nomatic";

  return (
    <span className={`${textColor} ${className} text-4xl font-black`}>
      {text.slice(0, 3)}
      <span className="text-brand-identity">{text.slice(3, 4)}</span>
      {text.slice(4)}
    </span>
  );
};

export default NomaticBrandText;
