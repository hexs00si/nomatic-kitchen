const ThreeBrandingDots = ({
  className = "",
}) => {
  return (
    <div className={`flex items-center space-x-2 sm:space-x-3 ${className}`}>
      <div className="w-4 h-4 sm:w-6 sm:h-6 bg-brand-identity rounded-full"></div>
      <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gray-400 rounded-full"></div>
      <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gray-600 rounded-full"></div>
    </div>
  );
};

export default ThreeBrandingDots;
