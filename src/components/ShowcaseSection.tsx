import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { FadeIn } from './Reusable/FadeIn';
import { Brain, Network, Bot, Database, BarChart3, Container, Code2, X } from 'lucide-react';

const skillCategories = [
  {
    id: 'ml', title: 'AI/ML Engineering', tagline: 'PyTorch · TensorFlow · Scikit-learn',
    description: 'Building and training predictive models using PyTorch, TensorFlow, and Scikit-learn with custom feature engineering pipelines.',
    icon: Brain, color: '#38BDF8', orbit: 0,
    tags: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Python', 'Model Training', 'Hyperparameter Tuning'],
  },
  {
    id: 'dl', title: 'Deep Learning & CV', tagline: 'CNN · OpenCV · Transfer Learning',
    description: 'Engineering CNN architectures with transfer learning (MobileNetV2) for computer vision, achieving 82%+ test accuracy.',
    icon: Network, color: '#B600A8', orbit: 1,
    tags: ['CNN', 'OpenCV', 'MobileNetV2', 'Transfer Learning', 'Data Augmentation', 'Image Classification'],
  },
  {
    id: 'genai', title: 'GenAI & LLMs', tagline: 'LangChain · RAG · HuggingFace',
    description: 'Building advanced RAG pipelines, LangGraph multi-agent systems, and fine-tuning LLMs using LoRA/QLoRA.',
    icon: Bot, color: '#BE4C00', orbit: 2,
    tags: ['LangChain', 'LangGraph', 'RAG', 'OpenAI API', 'HuggingFace', 'LoRA/QLoRA'],
  },
  {
    id: 'dataeng', title: 'Data Engineering', tagline: 'Python · SQL · ETL Pipelines',
    description: 'Designing data pipelines, feature engineering strategies, and database architectures for ML workloads.',
    icon: Database, color: '#22C55E', orbit: 3,
    tags: ['Python', 'SQL', 'Pandas', 'ETL', 'Feature Engineering', 'ChromaDB'],
  },
  {
    id: 'datasci', title: 'Data Science & Analytics', tagline: 'ARIMA · Statsmodels · BI',
    description: 'Developing time-series forecasting with ARIMA, statistical analysis, and business intelligence insights.',
    icon: BarChart3, color: '#EAB308', orbit: 4,
    tags: ['ARIMA', 'Statsmodels', 'Forecasting', 'Business Intelligence', 'Matplotlib', 'Pandas'],
  },
  {
    id: 'mlops', title: 'MLOps & Deployment', tagline: 'Docker · FastAPI · AWS',
    description: 'Deploying ML model endpoints as scalable REST APIs with Docker, Streamlit, and HuggingFace Spaces.',
    icon: Container, color: '#0A66C2', orbit: 5,
    tags: ['Docker', 'FastAPI', 'Streamlit', 'AWS', 'REST APIs', 'HuggingFace Spaces'],
  },
  {
    id: 'dsa', title: 'DSA & Problem Solving', tagline: '300+ LeetCode · Algorithms',
    description: 'Strong foundation in data structures and algorithms with 300+ problems solved across Arrays, Trees, Graphs, and DP.',
    icon: Code2, color: '#7621B0', orbit: 6,
    tags: ['DSA', 'LeetCode 300+', 'Arrays', 'Trees', 'Graphs', 'Dynamic Programming'],
  },
];

const S = 200;
const CENTER = { x: S, y: S };
const RADIUS = S - 40;

function orbitPosition(index: number, total: number, radius: number, offset = 0) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2 + offset;
  return {
    x: CENTER.x + Math.cos(angle) * radius,
    y: CENTER.y + Math.sin(angle) * radius,
  };
}

export const ShowcaseSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeId) return;
    const interval = setInterval(() => {
      setRotation(prev => prev + 0.003);
    }, 16);
    return () => clearInterval(interval);
  }, [activeId]);

  const handleCardClick = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  const activeSkill = activeId ? skillCategories.find(s => s.id === activeId) : null;

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="relative w-full bg-[#0C0C0C] overflow-hidden py-20 sm:py-28 md:py-32"
    >
      {/* Ambient gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#B600A8]/5 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-[#38BDF8]/5 blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#BE4C00]/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 md:px-10">
        <FadeIn delay={0.1} y={20} className="text-center mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/40 font-light select-none">
            A showcase of my craft
          </span>
          <h2 className="hero-heading font-black uppercase text-center mt-2 select-none" style={{ fontSize: 'clamp(2rem, 6vw, 60px)' }}>
            Expertise
          </h2>
        </FadeIn>

        {/* Orbit viewer */}
        <div className="relative w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Orbit canvas */}
          <motion.div
            className="relative flex-shrink-0 w-[400px] h-[400px]"
            style={{
              scale: useSpring(useMotionValue(1), { damping: 15, stiffness: 100 }),
            }}
          >
            {/* Orbit rings */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
              <circle cx="200" cy="200" r="80" fill="none" stroke="rgba(215,226,234,0.04)" strokeWidth="1" strokeDasharray="4 6" />
              <circle cx="200" cy="200" r="140" fill="none" stroke="rgba(215,226,234,0.03)" strokeWidth="1" strokeDasharray="3 8" />
              <circle cx="200" cy="200" r="190" fill="none" stroke="rgba(215,226,234,0.02)" strokeWidth="1" strokeDasharray="2 10" />
            </svg>

            {/* Center glow */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full pointer-events-none"
              style={{
                background: activeSkill
                  ? `radial-gradient(circle, ${activeSkill.color}30, transparent 70%)`
                  : 'radial-gradient(circle, rgba(182,0,168,0.15), transparent 70%)',
                boxShadow: activeSkill
                  ? `0 0 60px ${activeSkill.color}20`
                  : '0 0 60px rgba(182,0,168,0.1)',
              }}
            >
              <div className="absolute inset-4 rounded-full bg-[#0C0C0C] border border-[#D7E2EA]/10 flex items-center justify-center">
                <span className="text-[8px] uppercase tracking-widest text-[#D7E2EA]/30 font-light select-none">core</span>
              </div>
            </motion.div>

            {/* Orbiting skill nodes */}
            {skillCategories.map((skill, i) => {
              const pos = orbitPosition(i, skillCategories.length, RADIUS, rotation);
              const isActive = activeId === skill.id;
              const isHovered = hoveredId === skill.id;
              const Icon = skill.icon;

              return (
                <motion.button
                  key={skill.id}
                  onClick={() => handleCardClick(skill.id)}
                  onMouseEnter={() => setHoveredId(skill.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="absolute cursor-pointer"
                  style={{
                    left: pos.x - 28,
                    top: pos.y - 28,
                    zIndex: isActive || isHovered ? 20 : 10,
                  }}
                  animate={{
                    scale: isActive ? 1.3 : isHovered ? 1.15 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  {/* Glow ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: `2px solid ${skill.color}`,
                      opacity: isActive || isHovered ? 0.6 : 0,
                      boxShadow: `0 0 20px ${skill.color}40`,
                    }}
                    animate={{ scale: isActive || isHovered ? 1.2 : 1, opacity: isActive || isHovered ? 0.6 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Node circle */}
                  <div
                    className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, ${skill.color}, ${skill.color}88)`
                        : `radial-gradient(circle at 30% 30%, ${skill.color}25, ${skill.color}10)`,
                      border: `1.5px solid ${isActive ? skill.color : skill.color + '40'}`,
                      boxShadow: isActive
                        ? `0 0 30px ${skill.color}40, inset 0 0 20px ${skill.color}20`
                        : isHovered
                          ? `0 0 15px ${skill.color}20`
                          : 'none',
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: isActive ? '#fff' : skill.color }} />
                  </div>

                  {/* Label */}
                  <AnimatePresence>
                    {(isHovered || isActive) && (
                      <motion.span
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium uppercase tracking-wider whitespace-nowrap select-none"
                        style={{ color: skill.color }}
                      >
                        {skill.title}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}

            {/* Connecting lines between nodes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 400 400">
              {skillCategories.map((skill, i) => {
                const pos = orbitPosition(i, skillCategories.length, RADIUS, rotation);
                const next = orbitPosition((i + 1) % skillCategories.length, skillCategories.length, RADIUS, rotation);
                const isActive = activeId === skill.id || activeId === skillCategories[(i + 1) % skillCategories.length].id;
                return (
                  <line
                    key={i}
                    x1={pos.x} y1={pos.y}
                    x2={next.x} y2={next.y}
                    stroke={isActive ? skill.color + '30' : 'rgba(215,226,234,0.04)'}
                    strokeWidth={isActive ? 1.5 : 0.5}
                    className="transition-all duration-500"
                  />
                );
              })}
            </svg>
          </motion.div>

          {/* Detail panel */}
          <div className="flex-1 w-full max-w-md">
            <AnimatePresence mode="wait">
              {activeSkill ? (
                <motion.div
                  key={activeSkill.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="relative"
                >
                  {/* Decorative glow */}
                  <div
                    className="absolute -inset-10 rounded-3xl opacity-20 blur-3xl pointer-events-none"
                    style={{ background: activeSkill.color }}
                  />

                  <div
                    className="relative bg-[#0C0C0C] border rounded-3xl p-6 sm:p-8"
                    style={{
                      borderColor: activeSkill.color + '30',
                      boxShadow: `0 0 40px ${activeSkill.color}10`,
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center"
                          style={{ background: activeSkill.color + '20' }}
                        >
                          <activeSkill.icon className="w-7 h-7" style={{ color: activeSkill.color }} />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-[#D7E2EA]">{activeSkill.title}</h3>
                          <p className="text-xs text-[#D7E2EA]/50 mt-0.5">{activeSkill.tagline}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveId(null)}
                        className="p-1.5 rounded-lg text-[#D7E2EA]/30 hover:text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[#D7E2EA]/70 leading-relaxed mb-6">
                      {activeSkill.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {activeSkill.tags.map((tag, i) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.06 }}
                          className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider rounded-full border"
                          style={{
                            borderColor: activeSkill.color + '30',
                            color: activeSkill.color,
                            background: activeSkill.color + '08',
                          }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* Connecting line animation */}
                    <motion.div
                      className="h-[2px] mt-6 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      style={{
                        background: `linear-gradient(90deg, ${activeSkill.color}, transparent)`,
                      }}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="prompt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-6"
                >
                  <p className="text-sm text-[#D7E2EA]/30 font-light select-none">
                    Click a node to explore
                  </p>
                  <motion.div
                    className="mt-4 flex justify-center gap-2"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {['ml', 'genai', 'mlops'].map(id => {
                      const s = skillCategories.find(c => c.id === id)!;
                      return (
                        <button
                          key={id}
                          onClick={() => handleCardClick(id)}
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                          style={{
                            background: s.color + '15',
                            border: `1px solid ${s.color}30`,
                          }}
                        >
                          <s.icon className="w-3.5 h-3.5" style={{ color: s.color }} />
                        </button>
                      );
                    })}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
