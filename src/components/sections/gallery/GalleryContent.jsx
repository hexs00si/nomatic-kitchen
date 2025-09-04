'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import { galleryData } from "@/data/gallerydetail";

const filterButtons = ["All", "Modular Kitchens", "Wardrobes", "Vanities", "Furniture"]

export default function GalleryContent() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [modalOpen, setModalOpen] = useState(false)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(null)

  const filteredProjects = activeFilter === "All"
    ? galleryData
    : galleryData.filter(project => project.category === activeFilter);

  const openModal = (index) => {
    setCurrentProjectIndex(index)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setCurrentProjectIndex(null)
  }

  const navigateProject = (direction) => {
    if (direction === 'next') {
      setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % filteredProjects.length);
    } else {
      setCurrentProjectIndex((prevIndex) => (prevIndex - 1 + filteredProjects.length) % filteredProjects.length);
    }
  }

  const currentProject = currentProjectIndex !== null ? filteredProjects[currentProjectIndex] : null;

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      style={{
        background: 'linear-gradient(135deg, #E3E3E3 0%, #FFFFFF 100%)'
      }}
    >
      {/* Section Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
          Explore Our Gallery
        </h2>
        <p className="mt-4 text-base sm:text-lg text-gray-700">
          Discover the quality and craftsmanship in our work.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {filterButtons.map(filter => (
          <motion.button
            key={filter}
            className={`
              px-6 py-2 rounded-full font-semibold transition-colors duration-300
              ${activeFilter === filter
                ? 'bg-[#EB1B26] text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-[#EB1B26] hover:text-white'
              }
            `}
            onClick={() => setActiveFilter(filter)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {filter}
          </motion.button>
        ))}
      </div>

      {/* Gallery Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="relative bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer group"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              onClick={() => openModal(index)}
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <motion.div
                    className="flex items-center space-x-2 px-6 py-3 rounded-full bg-white text-gray-800 font-semibold"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    <span>View Details</span>
                  </motion.div>
                </div>
                {/* Category Tag */}
                <span className="absolute top-4 left-4 text-xs font-semibold px-4 py-1 rounded-full bg-[#EB1B26] text-white">
                  {project.category}
                </span>
              </div>
              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#000000]">{project.title}</h3>
                <p className="mt-2 text-gray-600 line-clamp-2">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal View */}
      <AnimatePresence>
        {modalOpen && currentProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative w-full max-w-5xl h-auto rounded-xl overflow-hidden shadow-2xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // Prevent modal from closing on inner click
            >
              {/* Modal Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 bg-[#1A1A1A] text-white">
                {/* Image Section */}
                <div className="relative w-full aspect-[4/3] md:aspect-auto">
                  <Image
                    src={currentProject.image}
                    alt={currentProject.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <span className="absolute top-4 left-4 text-xs font-semibold px-4 py-1 rounded-full bg-[#EB1B26] text-white">
                    {currentProject.category}
                  </span>
                </div>
                {/* Details Section */}
                <div className="p-8 md:p-12 space-y-6">
                  {/* Close and Navigation Buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button onClick={() => navigateProject('prev')} className="p-2 rounded-full bg-[#333] hover:bg-[#EB1B26] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={() => navigateProject('next')} className="p-2 rounded-full bg-[#333] hover:bg-[#EB1B26] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                    <button onClick={closeModal} className="p-2 rounded-full bg-[#333] hover:bg-white hover:text-gray-800 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>

                  <h3 className="text-3xl font-bold text-white leading-tight mt-10 md:mt-0">{currentProject.title}</h3>
                  <p className="text-gray-400">{currentProject.description}</p>
                  
                  {/* Location & Date */}
                  <div className="flex items-center space-x-4 text-gray-400">
                    <div className="flex items-center space-x-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#EB1B26]" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                      <span>{currentProject.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#EB1B26]" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                      <span>{currentProject.date}</span>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-2">Key Features</h4>
                    <ul className="list-disc list-inside text-gray-400 space-y-2">
                      {currentProject.keyFeatures.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}