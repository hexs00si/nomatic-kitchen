import GenericHero from "@/components/common/GenericHero";

const PartitionsPage = () => {
  const heroImages = [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  ];

  return (
    <>
      <GenericHero
        title="Room Partitions"
        images={heroImages}
        className="pt-20 md:pt-24"
        height="min-h-screen"
        showCursor={true}
      />
      
      {/* Partitions Content Section */}
      <section className="bg-brand-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Stylish Room Dividers
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Create defined spaces without compromising on style. Our custom partitions offer the perfect balance of functionality and aesthetic appeal, allowing you to maximize your space efficiently.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-identity rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Flexible Designs</h3>
                    <p className="text-gray-600">From sliding panels to fixed dividers, customized for your needs.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-identity rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Space Maximization</h3>
                    <p className="text-gray-600">Smart solutions that create distinct areas without reducing space.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-identity rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Modern Materials</h3>
                    <p className="text-gray-600">Contemporary materials including glass, wood, and metal combinations.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Modern Room Partition"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PartitionsPage;
