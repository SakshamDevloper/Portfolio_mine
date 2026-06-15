import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { projectsData } from '../data/projectsData';
import type { Project } from '../data/projectsData';
import { LiveProjectButton } from './Reusable/LiveProjectButton';

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
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
  totalCards: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, totalCards }) => {
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
        className="sticky w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-2xl"
      >
        {/* Static edge glow — light leaking from borders toward center */}
        <div
          className="absolute inset-0 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] pointer-events-none z-0"
          style={{
            boxShadow: `inset 0 0 60px ${color}15, inset 0 0 120px ${color}08`,
            animation: 'glow-pulse 5s ease-in-out infinite',
          }}
        />

        {/* Orbiting border glow ring */}
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

        {/* Trailing glow — second delayed orbit for reflection trail */}
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

        {/* Glass reflection highlight */}
        <div
          className="absolute inset-0 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] pointer-events-none z-[2]"
          style={{
            background: `linear-gradient(135deg, ${color}08 0%, transparent 40%, transparent 60%, ${color}04 100%)`,
            animation: 'reflection-shimmer 6s ease-in-out infinite',
          }}
        />

        {/* Content layer */}
        <div className="relative z-[3] flex flex-col justify-between w-full h-full">
          {/* Top Row: Number, Details, Live Button */}
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

            <LiveProjectButton href={project.liveUrl} />
          </div>

          {/* Bottom Row: Two-Column Image Grid */}
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
