import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/projectsData';
import type { Project } from '../data/projectsData';
import { LiveProjectButton } from './Reusable/LiveProjectButton';
import { X, ExternalLink, ChevronRight } from 'lucide-react';

const GLOW_COLORS = ['#38BDF8', '#FB923C', '#EC4899'];

const stylesId = 'projects-glow-styles';
const keyframes = `
@keyframes orbit-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes glow-pulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.02); }
}
@keyframes reflection-shimmer {
  0% { opacity: 0.3; }
  50% { opacity: 0.6; }
  100% { opacity: 0.3; }
}
`;

if (typeof document !== 'undefined' && !document.getElementById(stylesId)) {
  const style = document.createElement('style');
  style.id = stylesId;
  style.textContent = keyframes;
  document.head.appendChild(style);
}

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 w-full text-[#D7E2EA] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <h2
          className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-28 select-none"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>

        <div className="w-full flex flex-col gap-12 sm:gap-16 md:gap-20">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              totalCards={projectsData.length}
              onSelect={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
  totalCards: number;
  onSelect: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, totalCards, onSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const color = GLOW_COLORS[index];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { damping: 15, stiffness: 150 });
  const smoothRotateY = useSpring(rotateY, { damping: 15, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-y * 6);
    rotateY.set(x * 6);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[85vh] flex justify-center items-start"
    >
      <motion.div
        ref={cardRef}
        style={{
          scale,
          top: `calc(${index * 28}px + 6rem)`,
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onSelect}
        className="sticky w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-2xl cursor-pointer"
      >
        <div
          className="absolute inset-0 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] pointer-events-none z-0"
          style={{
            boxShadow: `inset 0 0 60px ${color}15, inset 0 0 120px ${color}08`,
            animation: 'glow-pulse 5s ease-in-out infinite',
          }}
        />

        <div
          className="absolute -inset-[2px] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] pointer-events-none z-[1] overflow-hidden"
          style={{
            background: `conic-gradient(from 0deg, transparent, transparent 280deg, ${color} 310deg, ${color}ee 325deg, ${color}60 340deg, transparent 360deg)`,
            animation: 'orbit-spin 4s linear infinite',
            willChange: 'transform',
            WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '2px',
            filter: 'blur(1.5px)',
          }}
        />

        <div
          className="absolute -inset-[2px] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] pointer-events-none z-[1] overflow-hidden"
          style={{
            background: `conic-gradient(from 0deg, transparent, transparent 290deg, ${color}40 320deg, ${color}20 335deg, transparent 360deg)`,
            animation: 'orbit-spin 4s linear infinite',
            animationDelay: '-0.6s',
            willChange: 'transform',
            WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '2px',
            filter: 'blur(4px)',
          }}
        />

        <div
          className="absolute inset-0 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] pointer-events-none z-[2]"
          style={{
            background: `linear-gradient(135deg, ${color}08 0%, transparent 40%, transparent 60%, ${color}04 100%)`,
            animation: 'reflection-shimmer 6s ease-in-out infinite',
          }}
        />

        <div className="relative z-[3] flex flex-col justify-between w-full h-full">
          <div className="flex justify-between items-center w-full mb-6 sm:mb-8 md:mb-10">
            <div className="flex items-center">
              <div
                className="font-black text-[#D7E2EA] select-none leading-none mr-4 md:mr-6"
                style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
              >
                {project.num}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs md:text-sm uppercase tracking-widest text-[#D7E2EA] opacity-60 font-light mb-1 select-none">
                  {project.category}
                </span>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-[#D7E2EA] uppercase select-none leading-tight">
                  {project.name}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:flex text-xs text-[#D7E2EA]/40 items-center gap-1">
                Click for details <ChevronRight className="w-3 h-3" />
              </span>
              <LiveProjectButton href={project.liveUrl} onClick={(e) => e.stopPropagation()} />
            </div>
          </div>

          <div className="flex gap-3 sm:gap-4 md:gap-5 w-full flex-grow items-stretch">
            <div className="w-[40%] flex flex-col gap-3 sm:gap-4 md:gap-5">
              <div
                className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden flex-shrink-0 group"
                style={{ height: 'clamp(130px, 16vw, 230px)' }}
              >
                <img
                  src={project.col1Image1}
                  alt={`${project.name} preview 1`}
                  className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] select-none transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div
                className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden flex-grow group"
                style={{ height: 'clamp(160px, 22vw, 340px)' }}
              >
                <img
                  src={project.col1Image2}
                  alt={`${project.name} preview 2`}
                  className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] select-none transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="w-[60%] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden flex-grow group">
              <img
                src={project.col2Image}
                alt={`${project.name} showcase`}
                className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] select-none transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </motion.div>
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
            {/* Glow header */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ background: `linear-gradient(90deg, ${color}, ${color}88, transparent)` }}
            />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-[#D7E2EA]/5 hover:bg-[#D7E2EA]/10 text-[#D7E2EA]/50 hover:text-[#D7E2EA] transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6 sm:p-8">
              {/* Number + Category */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-black text-[#D7E2EA]/20 select-none">{project.num}</span>
                <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border"
                  style={{ borderColor: `${color}30`, color, background: `${color}08` }}
                >
                  {project.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#D7E2EA] mb-4">
                {project.name}
              </h2>

              {/* Description */}
              <p className="text-sm text-[#D7E2EA]/70 leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Details */}
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

              {/* Tools */}
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

              {/* Live link */}
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${color}, ${color}88)`,
                  color: '#fff',
                  boxShadow: `0 0 20px ${color}30`,
                }}
                whileHover={{ boxShadow: `0 0 30px ${color}50` }}
              >
                <ExternalLink className="w-4 h-4" />
                View Live Project
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
