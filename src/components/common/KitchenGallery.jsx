'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const KitchenGallery = ({ galleryData }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const galleryRef = useRef(null);

  // Extract unique categories from gallery data
  const categories = ['All', ...new Set(galleryData.map(item => item.category))];

  // Filter images based on active category
  const filteredImages = activeCategory === 'All' 
    ? galleryData 
    : galleryData.filter(item => item.category === activeCategory);

  // Scroll to gallery function (called from external components)
  const scrollToGallery = (category = 'All') => {
    setActiveCategory(category);
    if (galleryRef.current) {
      galleryRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Expose scroll function globally (for stacking cards to use)
  useEffect(() => {
    window.scrollToKitchenGallery = scrollToGallery;
    return () => {
      delete window.scrollToKitchenGallery;
    };
  }, []);

  return (
    <section ref={galleryRef} className="bg-brand-background py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Gallery Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
            Kitchen Gallery
          </h2>
          <p className="text-lg text-brand-dark opacity-70 max-w-3xl mx-auto leading-relaxed">
            Explore our diverse collection of kitchen finishes and designs. Each piece crafted to perfection, 
            reflecting our commitment to quality and aesthetic excellence.
          </p>
        </div>

        {/* Category Filter Bubbles */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 border-2 ${
                activeCategory === category
                  ? 'bg-brand-identity text-white border-brand-identity shadow-lg'
                  : 'bg-white text-brand-dark border-gray-300 hover:border-brand-identity hover:text-brand-identity'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Gallery Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredImages.map((item, index) => (
              <motion.div
                key={`${item.id}-${activeCategory}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="text-xs font-semibold text-brand-identity mb-2 uppercase tracking-wider">
                        {item.category}
                      </div>
                      <h3 className="text-white font-bold text-lg mb-2 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-brand-dark">
                      {item.type}
                    </span>
                  </div>

                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" 
                              stroke="#1F1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8.5 10.5H12.5M10.5 8.5V12.5" 
                              stroke="#1F1E1E" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results Message */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-brand-dark opacity-60 text-lg">
              No images found for this category.
            </p>
          </div>
        )}

        {/* Gallery Stats */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 bg-white rounded-2xl px-8 py-4 shadow-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-dark">{filteredImages.length}</div>
              <div className="text-sm text-brand-dark opacity-60">Images</div>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-dark">{categories.length - 1}</div>
              <div className="text-sm text-brand-dark opacity-60">Categories</div>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-dark">8+</div>
              <div className="text-sm text-brand-dark opacity-60">Finishes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KitchenGallery;