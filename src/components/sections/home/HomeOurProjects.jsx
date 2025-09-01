"use client";
import { motion } from "framer-motion";
import { projectsData } from "../../../data/projects";
import ProjectCard from "../../common/ProjectCard";
import Heading from "../../texts/Heading";

const HomeOurProjects = () => {
  return (
    <motion.section
      className="bg-brand-background py-8 sm:py-12 lg:py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-8 sm:mb-10 lg:mb-12"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Heading variant="lg" isSlashed={true} dark={false} className="mb-4 text-center sm:text-left">
            Our Recent projects
          </Heading>
        </motion.div>

        <motion.div
          className="space-y-8"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: { duration: 0.3 },
              }}
              className="cursor-pointer"
            >
              <ProjectCard
                id={project.id}
                title={project.title}
                category={project.category}
                description={project.description}
                image={project.image}
                link={project.link}
                isLarge={false}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HomeOurProjects;
