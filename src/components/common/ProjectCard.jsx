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
    <div className="relative group overflow-hidden rounded-xl h-96 w-full">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-black/20" />

      <div
        className={`absolute top-6 bottom-6 w-1/3 flex flex-col ${
          isRight ? "right-6" : "left-6"
        }`}
      >
        <div className="bg-white rounded-lg p-6 shadow-lg backdrop-blur-sm bg-opacity-95 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-4 bg-brand-dark rounded-sm flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-sm"></div>
            </div>
            <span className="text-sm text-gray-700 font-medium">
              {category}
            </span>
          </div>
          <div className="rounded-lg overflow-hidden mb-4 h-64">
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${image})` }}
              role="img"
              aria-label={title}
            />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
            {description}
          </p>

          <div className="flex justify-end">
            <Button variant="outline" size="sm" href={link}>
              View Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
