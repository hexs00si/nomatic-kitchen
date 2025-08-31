import BentoCard from "./BentoCard";

const BentoGrid = ({ services }) => {
  return (
    <div className="grid grid-cols-12 gap-4 w-full h-[60vh]">
      {services.map((service, index) => {
        let gridClass = "";

        if (index === 0) {
          gridClass = "col-span-12 md:col-span-6 lg:col-span-4 row-span-2";
        } else if (index === 1) {
          gridClass = "col-span-12 md:col-span-6 lg:col-span-4";
        } else if (index === 2) {
          gridClass = "col-span-12 md:col-span-6 lg:col-span-4 row-span-2";
        } else if (index === 3) {
          gridClass = "col-span-12 sm:col-span-6 lg:col-span-4";
        } else if (index === 4) {
          gridClass = "col-span-12 sm:col-span-6 lg:col-span-4";
        } else if (index === 5) {
          gridClass = "col-span-12 lg:col-span-8";
        } else {
          gridClass = "col-span-12 sm:col-span-6 lg:col-span-4";
        }

        return (
          <BentoCard key={service.id} service={service} className={gridClass} />
        );
      })}
    </div>
  );
};

export default BentoGrid;
