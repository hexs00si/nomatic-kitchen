'use client';
import MediaGallery from '@/components/common/MediaGallery';
import Heading from '@/components/texts/Heading';
import { aboutStoryData } from '@/data/aboutStory';
import { motion } from 'framer-motion';

const AboutStoryFactory = () => {
  const { manufacturingFactory } = aboutStoryData;

  return (
    <section className="py-6 sm:py-8 lg:py-10 bg-white">
      <div className="w-full mx-auto">
        {/* Header - Perfectly Centered */}
        <motion.div
          className="text-center mb-6 sm:mb-8 w-full flex justify-center items-center px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Heading
            variant="lg"
            isSlashed={true}
            dark={false}
            className="mx-auto text-center"
          >
            {manufacturingFactory.title}
          </Heading>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative w-full flex justify-center"
        >
          <MediaGallery 
            items={manufacturingFactory.gallery}
            expandedWidth={700}
            collapsedWidth={100}
            height={600}
            gap={2}
            initialIndex={2}
          />
        </motion.div>
        <motion.div
          className="text-center w-full flex justify-center px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed text-center">
            Our state-of-the-art manufacturing facility combines traditional craftsmanship with cutting-edge technology to deliver unparalleled quality in every project.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
        </motion.div>
      </div>
    </section>
  );
};

export default AboutStoryFactory;