import Link from "next/link";

const BentoCard = ({ service, className = "" }) => {
  return (
    <Link
      href={service.href}
      className={`
        relative rounded-2xl overflow-hidden
        hover:shadow-xl transition-all duration-500 ease-out
        flex flex-col justify-end
        h-full
        group cursor-pointer
        transform hover:scale-[1.02]
        ${className}
      `}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat 
                   transition-transform duration-700 ease-out
                   group-hover:scale-110"
        style={{ backgroundImage: `url(${service.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300"></div>
      </div>

      <div className="relative z-10 p-4 lg:p-6 text-white transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
        <h3 className="text-lg lg:text-xl font-bold mb-2 group-hover:text-brand-identity transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-white/90 group-hover:text-white text-xs lg:text-sm leading-relaxed transition-colors duration-300">
          {service.description}
        </p>

        {/* Hover indicator */}
        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-brand-identity text-sm font-medium">
            Learn More →
          </span>
        </div>
      </div>
    </Link>
  );
};
export default BentoCard;