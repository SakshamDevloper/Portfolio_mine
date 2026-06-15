import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './Reusable/FadeIn';
import { Briefcase, GraduationCap, Code, Users } from 'lucide-react';

const journey = [
  {
    year: '2021 – 2024',
    title: 'Diploma in IT',
    subtitle: 'Government Polytechnic College, Jammu',
    description: 'Built foundational knowledge in computer science, programming, and database systems.',
    icon: GraduationCap,
    color: '#B600A8',
  },
  {
    year: '2024 – 2027',
    title: 'B.E. in Information Technology',
    subtitle: 'Parul Institute of Engineering & Technology',
    description: 'Advanced studies in AI/ML, software engineering, and enterprise architecture.',
    icon: GraduationCap,
    color: '#7621B0',
  },
  {
    year: 'Feb – Mar 2026',
    title: 'Software Development Intern',
    subtitle: 'Cognifyz Technologies (Remote)',
    description: 'Developed backend modules, debugged production bugs, collaborated in agile sprints.',
    icon: Briefcase,
    color: '#BE4C00',
  },
  {
    year: '2025 – Present',
    title: 'Full-Stack Developer',
    subtitle: 'Personal & Projects (Global)',
    description: 'Building full-stack apps with React, Node, and cloud tooling for various clients.',
    icon: Code,
    color: '#0A66C2',
  },
  {
    year: '2025 – Present',
    title: 'Management Team Member',
    subtitle: 'PIERC - Parul University',
    description: 'On-site leadership role coordinating events and managing team operations.',
    icon: Users,
    color: '#22C55E',
  },
];

export const JourneySection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#0C0C0C] py-20 sm:py-28 md:py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 md:px-10">
        <FadeIn delay={0.1} y={20} className="text-center mb-16 sm:mb-20">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-light select-none">
            My Path
          </span>
          <h2 className="hero-heading font-black uppercase text-center mt-2 select-none" style={{ fontSize: 'clamp(2rem, 6vw, 60px)' }}>
            Journey
          </h2>
        </FadeIn>

        <div className="relative">
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#B600A8] via-[#7621B0] to-[#BE4C00] transform sm:-translate-x-1/2" />

          <div className="space-y-12 sm:space-y-16">
            {journey.map((item, index) => {
              const Icon = item.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className={`relative flex flex-col sm:flex-row items-start gap-6 sm:gap-8 ${
                    isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 sm:left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 bg-[#0C0C0C] border-2 z-10"
                    style={{ borderColor: item.color }}
                  />

                  {/* Content card */}
                  <div className={`w-full sm:w-[calc(50%-2rem)] ${isLeft ? 'sm:pr-8' : 'sm:pl-8'} ml-10 sm:ml-0`}>
                    <div className="relative group">
                      <div
                        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-30 blur transition-all duration-500"
                        style={{ background: `linear-gradient(135deg, ${item.color}, transparent)` }}
                      />
                      <div className="relative bg-[#0C0C0C] border border-[#D7E2EA]/10 rounded-2xl p-5 sm:p-6 hover:border-[#D7E2EA]/20 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ background: `${item.color}20` }}
                          >
                            <Icon className="w-4 h-4" style={{ color: item.color }} />
                          </div>
                          <span className="text-[10px] sm:text-xs font-mono font-medium tracking-wider"
                            style={{ color: item.color }}
                          >
                            {item.year}
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base font-semibold text-[#D7E2EA]">{item.title}</h3>
                        <p className="text-xs text-[#D7E2EA]/60 mt-0.5">{item.subtitle}</p>
                        <p className="text-xs sm:text-sm text-[#D7E2EA]/70 mt-3 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
