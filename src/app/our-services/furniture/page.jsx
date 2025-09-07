import GenericHero from "@/components/common/GenericHero";

const FurniturePage = () => {
  const heroImages = [
    "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  ];

  return (
    <>
      <GenericHero
        title="Custom Furniture"
        images={heroImages}
        className="pt-20 md:pt-24"
        height="min-h-screen"
        showCursor={true}
      />
      
      {/* Furniture Content Section */}
      <section className="bg-brand-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Bespoke Furniture Pieces
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Complete your interior with our custom furniture collection. Each piece is crafted with attention to detail and designed to complement your unique style while providing lasting functionality.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-identity rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Artisan Craftsmanship</h3>
                    <p className="text-gray-600">Handcrafted by skilled artisans with decades of experience.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-identity rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Premium Materials</h3>
                    <p className="text-gray-600">Finest quality woods, metals, and finishes for durability and beauty.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-identity rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Custom Design</h3>
                    <p className="text-gray-600">Tailored to your specifications and interior design vision.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Custom Furniture Showcase"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FurniturePage;
