import GenericHero from "@/components/common/GenericHero";

const CraftedCornersPage = () => {
  const heroImages = [
    "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  ];

  return (
    <>
      <GenericHero
        title="Crafted Corners"
        images={heroImages}
        className="pt-20 md:pt-24"
        height="min-h-screen"
        showCursor={true}
      />
      
      {/* Crafted Corners Content Section */}
      <section className="bg-brand-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Crafted Corner Solution"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Bespoke Corner Solutions
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Transform every corner of your home into a functional and beautiful space. Our crafted corner solutions make the most of often-overlooked areas with intelligent design and premium craftsmanship.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-identity rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Space Utilization</h3>
                    <p className="text-gray-600">Maximize every inch with clever corner storage and display solutions.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-identity rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Custom Fit</h3>
                    <p className="text-gray-600">Perfectly tailored to your specific corner dimensions and requirements.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-identity rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Functional Beauty</h3>
                    <p className="text-gray-600">Combining practical storage with aesthetic appeal for seamless integration.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CraftedCornersPage;
