import TestimonialCard from "./TestimonialCard";

const VerticalMarquee = ({
  testimonials,
  direction = "up",
  speed = 40,
}) => {
  const animationClass =
    direction === "up" ? "animate-marquee-up" : "animate-marquee-down";

  return (
    <div className="relative h-[600px] sm:h-[700px] lg:h-[800px] overflow-hidden">
      <div className={`flex flex-col space-y-3 sm:space-y-4 ${animationClass}`}>
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={`first-${testimonial.id}`}
            category={testimonial.category}
            text={testimonial.text}
            rating={testimonial.rating}
            author={testimonial.author}
            className="w-64 sm:w-72 lg:w-80 flex-shrink-0"
          />
        ))}
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={`second-${testimonial.id}`}
            category={testimonial.category}
            text={testimonial.text}
            rating={testimonial.rating}
            author={testimonial.author}
            className="w-64 sm:w-72 lg:w-80 flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default VerticalMarquee;
