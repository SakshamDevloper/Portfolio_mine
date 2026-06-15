import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/projectsData';
import type { Project } from '../data/projectsData';
import { X, ExternalLink, ChevronRight } from 'lucide-react';
import { FadeIn } from './Reusable/FadeIn';

const GLOW_COLORS = ['#38BDF8', '#FB923C', '#EC4899'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 w-full text-[#D7E2EA] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <FadeIn y={20} className="text-center mb-16 sm:mb-20">
          <h2
            className="hero-heading font-black uppercase select-none mb-4"
            style={{ fontSize: 'clamp(2.5rem, 10vw, 120px)' }}
          >
            Projects
          </h2>
          <p className="text-sm sm:text-base text-[#D7E2EA]/50 max-w-lg mx-auto">
            Real-world ML/AI systems I've built from scratch — click any card to explore the full story.
          </p>
        </FadeIn>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const color = GLOW_COLORS[index];

  return (
    <div className="relative h-full">
      {/* Glow border on hover */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}00, ${color}88)` }}
      />

      <div
        className="relative h-full bg-[#0C0C0C] border border-[#D7E2EA]/10 rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-transparent group-hover:scale-[1.02]"
      >
        {/* Image */}
        <div className="relative w-full h-52 sm:h-56 bg-[#D7E2EA]/5 flex items-center justify-center overflow-hidden">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/40 to-transparent" />

          {/* Number badge */}
          <div
            className="absolute top-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black select-none"
            style={{ background: `${color}20`, color }}
          >
            {project.num}
          </div>

          {/* Category badge */}
          <div
            className="absolute bottom-3 left-3 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full select-none"
            style={{ background: `${color}dd`, color: '#0C0C0C' }}
          >
            {project.category}
          </div>

          {/* Hover arrow */}
          <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-[#0C0C0C]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ChevronRight className="w-4 h-4 text-[#D7E2EA]" />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-semibold text-[#D7E2EA] mb-2 leading-tight group-hover:opacity-90 transition-opacity">
            {project.name}
          </h3>
          <p className="text-xs sm:text-sm text-[#D7E2EA]/60 leading-relaxed line-clamp-2 mb-3">
            {project.description}
          </p>

          {/* Tools */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {project.tools.slice(0, 3).map((tool) => (
              <span
                key={tool}
                className="text-[9px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full border select-none"
                style={{
                  borderColor: `${color}20`,
                  color: `${color}bb`,
                  background: `${color}08`,
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const color = GLOW_COLORS[projectsData.findIndex(p => p.id === project.id)] || '#38BDF8';

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#0C0C0C] border rounded-3xl shadow-2xl"
            style={{ borderColor: `${color}30` }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ background: `linear-gradient(90deg, ${color}, ${color}88, transparent)` }}
            />

            <button
              onClick={onClose}
              className="fixed top-4 right-4 z-10 p-2 rounded-xl bg-[#D7E2EA]/5 hover:bg-[#D7E2EA]/10 text-[#D7E2EA]/50 hover:text-[#D7E2EA] transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-black text-[#D7E2EA]/20 select-none">{project.num}</span>
                <span
                  className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border select-none"
                  style={{ borderColor: `${color}30`, color, background: `${color}08` }}
                >
                  {project.category}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#D7E2EA] mb-4">
                {project.name}
              </h2>

              <p className="text-sm text-[#D7E2EA]/70 leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="relative w-full rounded-2xl overflow-hidden mb-6 border border-[#D7E2EA]/10 bg-[#D7E2EA]/5">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-auto max-h-[50vh] object-contain mx-auto"
                  loading="lazy"
                />
              </div>

              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-widest text-[#D7E2EA]/40 font-semibold mb-3">Key Highlights</h4>
                <div className="space-y-2">
                  {project.details.map((detail, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-2.5"
                    >
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: color }} />
                      <span className="text-xs sm:text-sm text-[#D7E2EA]/80">{detail}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-widest text-[#D7E2EA]/40 font-semibold mb-3">Tools & Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, i) => (
                    <motion.span
                      key={tool}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider rounded-full border"
                      style={{ borderColor: `${color}25`, color: `${color}cc`, background: `${color}08` }}
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </div>

              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${color}, ${color}88)`,
                  color: '#fff',
                  boxShadow: `0 0 20px ${color}30`,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 30px ${color}50`; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = `0 0 20px ${color}30`; }}
              >
                <ExternalLink className="w-4 h-4" />
                View Live Project
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
