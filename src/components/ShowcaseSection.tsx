import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './Reusable/FadeIn';
import { Code, Palette, Server, Cloud, Bot, Smartphone, Sparkles } from 'lucide-react';

const skillCategories = [
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    description: 'Building robust applications with React, Next.js, and Node.js.',
    icon: Code,
    color: '#38BDF8',
    tags: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'REST APIs'],
  },
  {
    id: 'uiux',
    title: 'UI/UX Design',
    description: 'Creating aesthetic and user-centered digital experiences.',
    icon: Palette,
    color: '#B600A8',
    tags: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Framer'],
  },
  {
    id: 'backend',
    title: 'Backend Engineering',
    description: 'Designing scalable databases and secure APIs.',
    icon: Server,
    color: '#7621B0',
    tags: ['Spring Boot', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    description: 'Deploying and managing apps with AWS and Docker.',
    icon: Cloud,
    color: '#0A66C2',
    tags: ['Docker', 'AWS', 'Kubernetes', 'CI/CD', 'Linux'],
  },
  {
    id: 'ai',
    title: 'AI & Automation',
    description: 'Leveraging LLMs and automation for modern workflows.',
    icon: Bot,
    color: '#BE4C00',
    tags: ['LangChain', 'RAG', 'OpenAI', 'HuggingFace', 'LoRA'],
  },
  {
    id: 'mobile',
    title: 'Mobile App Dev',
    description: 'Cross-platform mobile experiences with React Native.',
    icon: Smartphone,
    color: '#22C55E',
    tags: ['React Native', 'Expo', 'Firebase', 'Flutter'],
  },
  {
    id: 'animation',
    title: 'Web Animation',
    description: 'Bringing websites to life with GSAP and Framer Motion.',
    icon: Sparkles,
    color: '#EAB308',
    tags: ['Framer Motion', 'GSAP', 'Three.js', 'CSS Animations'],
  },
];

export const ShowcaseSection: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  return (
    <section className="relative w-full bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 text-[#0C0C0C] z-0 -mt-10 sm:-mt-12 md:-mt-14">
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0.1} y={20} className="text-center mb-16 sm:mb-20">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[#0C0C0C]/40 font-light select-none">
            A showcase of my craft
          </span>
          <h2
            className="font-black uppercase text-center mt-2 select-none text-[#0C0C0C]"
            style={{ fontSize: 'clamp(2rem, 6vw, 60px)' }}
          >
            Expertise
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {skillCategories.map((skill, i) => {
            const Icon = skill.icon;
            const isActive = activeSkill === skill.id;

            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onMouseEnter={() => setActiveSkill(skill.id)}
                onMouseLeave={() => setActiveSkill(null)}
                className="relative group cursor-pointer"
              >
                <div
                  className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"
                  style={{
                    background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${skill.color}20, transparent 40%)`,
                  }}
                />
                <div
                  className={`relative rounded-2xl p-5 sm:p-6 border transition-all duration-300 h-full ${
                    isActive
                      ? 'border-[#0C0C0C]/20 shadow-xl bg-white'
                      : 'border-[#0C0C0C]/5 bg-white/50 hover:border-[#0C0C0C]/10 hover:shadow-lg'
                  }`}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${skill.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: skill.color }} />
                  </div>

                  <h3 className="text-sm font-bold text-[#0C0C0C] mb-1.5">{skill.title}</h3>
                  <p className="text-xs text-[#0C0C0C]/60 leading-relaxed mb-3">{skill.description}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded-full border border-[#0C0C0C]/10 text-[#0C0C0C]/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
