import ThreeBrandingDots from "@/components/common/ThreeBrandingDots";
import Heading from "@/components/texts/Heading";
import { aboutStoryData } from "@/data/aboutStory";

const AboutStoryHero = () => {
  const { heroCard } = aboutStoryData;

  return (
    <section className="bg-brand-light min-h-screen pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Full-width hero card */}
        <div className="bg-brand-dark rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
            {/* Left side - Content */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <div className="space-y-6">
                {/* Brand Identity */}
                <div className="mb-4">
                  <div className="text-sm md:text-base text-gray-400 tracking-widest uppercase mb-2">
                    {heroCard.brandName}
                  </div>
                </div>

                {/* Title with slash */}
                <Heading variant="xl" isSlashed dark className="mb-4">
                  {heroCard.title}
                </Heading>

                {/* Main tagline */}
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  {heroCard.subtitle}
                </h2>

                {/* Secondary tagline */}
                <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
                  {heroCard.tagline}
                </p>

                {/* Description */}
                <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                  {heroCard.description}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {heroCard.stats.map((stat, index) => (
                    <div key={index} className="text-left">
                      <div className="text-2xl md:text-3xl font-bold text-brand-identity mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs md:text-sm text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Three Branding Dots */}
                <ThreeBrandingDots className="mt-auto" />
              </div>
            </div>

            {/* Right side - Image */}
            <div className="relative">
              <img
                src={heroCard.image}
                alt="Our Story - Nomatic Interiors"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>

              {/* Optional overlay text */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="text-white text-sm md:text-base opacity-80">
                  "Spaces that evolve with you"
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStoryHero;
