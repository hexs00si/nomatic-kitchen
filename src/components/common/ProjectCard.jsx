import Button from "../ui/Button";

const ProjectCard = ({
  id,
  title,
  category,
  description,
  image,
  link,
  isLarge = false,
  index,
}) => {
  const isRight = index % 2 === 1;

  return (
    <div className="relative group overflow-hidden rounded-xl h-96 sm:h-[28rem] lg:h-96 w-full">
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      <div className="absolute inset-0 bg-black/20" />

      <div
        className={`absolute top-4 bottom-4 left-4 right-4 sm:top-6 sm:bottom-6 md:w-1/3 flex flex-col ${
          isRight ? "md:right-6 md:left-auto" : "md:left-6 md:right-auto"
        }`}
      >
        <div className="bg-white rounded-lg p-6 shadow-lg backdrop-blur-sm bg-opacity-95 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-brand-dark rounded-sm flex items-center justify-center">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-sm"></div>
            </div>
            <span className="text-xs sm:text-sm text-gray-700 font-medium">
              {category}
            </span>
          </div>
          <div className="rounded-lg overflow-hidden mb-3 sm:mb-4 h-48 sm:h-64">
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${image})` }}
              role="img"
              aria-label={title}
            />
          </div>
                  <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 leading-relaxed">{title}</h3>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 flex-1">
            {description}
          </p>

          <div className="flex justify-end">
            <Button variant="outline" size="sm" href={link}>
              <span className="text-xs sm:text-sm">View Project</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
