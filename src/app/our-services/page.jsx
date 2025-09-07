import GenericHero from "@/components/common/GenericHero";

const OurServicesPage = () => {
  const heroImages = [
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  ];

  return (
    <>
      <GenericHero
        title="Our Services"
        images={heroImages}
        className="pt-20 md:pt-24"
        height="min-h-screen"
        showCursor={true}
      />
      
      {/* Services Content Section */}
      <section className="bg-brand-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Premium Interior Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From modular kitchens to custom wardrobes, we create spaces that blend functionality with elegance. Each service is crafted with precision and designed to evolve with your lifestyle.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Kitchen Service */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Modular Kitchens"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Kitchens</h3>
                <p className="text-gray-600 mb-4">
                  Premium modular kitchen solutions crafted for your lifestyle with German precision and Indian soul.
                </p>
                <a href="/services/kitchens" className="text-brand-identity font-semibold hover:underline">
                  Learn More →
                </a>
              </div>
            </div>

            {/* Wardrobe Service */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Custom Wardrobes"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Wardrobes</h3>
                <p className="text-gray-600 mb-4">
                  Elegant storage solutions designed for modern living with customizable layouts and premium finishes.
                </p>
                <a href="/services/wardrobes" className="text-brand-identity font-semibold hover:underline">
                  Learn More →
                </a>
              </div>
            </div>

            {/* Partitions Service */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Room Partitions"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Partitions</h3>
                <p className="text-gray-600 mb-4">
                  Stylish room dividers that maximize space and functionality while maintaining aesthetic appeal.
                </p>
                <a href="/services/partitions" className="text-brand-identity font-semibold hover:underline">
                  Learn More →
                </a>
              </div>
            </div>

            {/* Crafted Corners Service */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src="https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Crafted Corners"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Crafted Corners</h3>
                <p className="text-gray-600 mb-4">
                  Bespoke corner solutions that utilize every inch of space with intelligent design and premium materials.
                </p>
                <a href="/services/crafted-corners" className="text-brand-identity font-semibold hover:underline">
                  Learn More →
                </a>
              </div>
            </div>

            {/* Furniture Service */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Custom Furniture"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Furniture</h3>
                <p className="text-gray-600 mb-4">
                  Custom furniture pieces that complement your interior design with attention to detail and quality.
                </p>
                <a href="/services/furniture" className="text-brand-identity font-semibold hover:underline">
                  Learn More →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurServicesPage;
