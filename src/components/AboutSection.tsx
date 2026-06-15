import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './Reusable/FadeIn';
import { AnimatedText } from './Reusable/AnimatedText';
import { AnimatedCounter } from './Reusable/AnimatedCounter';
import { ContactButton } from './Reusable/ContactButton';

const skills = [
  'Python', 'PyTorch', 'TensorFlow', 'LangChain', 'LangGraph',
  'FastAPI', 'Docker', 'RAG', 'LoRA/QLoRA', 'ChromaDB', 'Scikit-learn',
  'HuggingFace', 'OpenCV', 'spaCy', 'NLTK', 'FAISS', 'Streamlit',
  'Java', 'JavaScript', 'SQL', 'Spring Boot', 'MongoDB', 'Git',
];

export const AboutSection: React.FC = () => {
  const { scrollY } = useScroll();

  const moonY = useTransform(scrollY, [0, 2000], [0, -60]);
  const legoY = useTransform(scrollY, [0, 2000], [0, 40]);
  const bottomLeftY = useTransform(scrollY, [0, 2000], [0, 70]);
  const bottomRightY = useTransform(scrollY, [0, 2000], [0, -50]);

  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Top Left: Moon */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ y: moonY }}
        className="absolute top-[6%] left-[6%] z-10 w-[80px] sm:w-[100px] md:w-[120px] hidden sm:block"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="3D Moon Icon"
          className="w-full h-auto object-contain select-none pointer-events-none opacity-15"
        />
      </motion.div>

      {/* Bottom Left: 3D Object */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ y: bottomLeftY }}
        className="absolute bottom-[8%] left-[8%] z-10 w-[70px] sm:w-[85px] md:w-[100px] hidden sm:block"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="3D Object Icon"
          className="w-full h-auto object-contain select-none pointer-events-none opacity-12"
        />
      </motion.div>

      {/* Top Right: Lego Icon */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ y: legoY }}
        className="absolute top-[6%] right-[6%] z-10 w-[80px] sm:w-[100px] md:w-[120px] hidden sm:block"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt="3D Lego Icon"
          className="w-full h-auto object-contain select-none pointer-events-none opacity-15"
        />
      </motion.div>

      {/* Bottom Right: 3D Group (smile) */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ y: bottomRightY }}
        className="absolute bottom-[8%] right-[8%] z-10 w-[80px] sm:w-[100px] md:w-[120px] hidden sm:block"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt="3D Group Icon"
          className="w-full h-auto object-contain select-none pointer-events-none opacity-12"
        />
      </motion.div>

      {/* About Content Wrapper */}
      <div className="flex flex-col items-center text-center z-20 max-w-4xl mx-auto w-full">
        {/* Heading */}
        <FadeIn delay={0} y={40} className="mb-10 sm:mb-14 md:mb-16">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Animated Paragraph */}
        <div className="mb-8 sm:mb-10 max-w-[560px] mx-auto">
          <AnimatedText
            text="AI/ML Engineer with hands-on expertise in Python, Machine Learning, NLP, Computer Vision, and GenAI application development. Built and deployed production-grade projects including LLM-powered assistants, Computer Vision models, and Time-Series Forecasting pipelines. Proficient in LangChain, HuggingFace, RAG pipelines, and REST API development — seeking to build intelligent, scalable systems that drive real-world impact."
            className="text-[#D7E2EA] font-medium leading-relaxed select-none"
          />
        </div>

        {/* Skills/Tech Stack Tags */}
        <FadeIn delay={0.2} y={20} className="mb-10 sm:mb-14 md:mb-16 max-w-3xl mx-auto w-full">
          <div className="flex flex-wrap justify-center gap-2.5">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-wider border border-[#D7E2EA]/15 rounded-full text-[#D7E2EA]/70 hover:border-[#B600A8]/40 hover:text-[#D7E2EA] hover:bg-[#B600A8]/5 transition-all duration-300 hover:scale-105 cursor-default select-none"
              >
                {skill}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* Core AI/ML Metrics Counters */}
        <FadeIn
          delay={0.35}
          y={20}
          className="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-16 mb-12"
        >
          {[
            { value: '300+', label: 'LeetCode Solved' },
            { value: '82%+', label: 'CV Accuracy' },
            { value: '12%', label: 'Sales MAPE' },
            { value: '2+', label: 'Live Space Apps' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <AnimatedCounter
                value={stat.value}
                className="font-black text-[#D7E2EA] text-2xl sm:text-3xl md:text-4xl"
              />
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#D7E2EA]/60 mt-1 select-none">
                {stat.label}
              </span>
            </div>
          ))}
        </FadeIn>

        {/* Education & Certifications Row */}
        <FadeIn
          delay={0.4}
          y={20}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl text-left mt-4 mb-16"
        >
          <div className="border border-[#D7E2EA]/15 rounded-3xl p-6 bg-[#0C0C0C]/50 backdrop-blur-sm hover:border-[#D7E2EA]/30 transition-all duration-300">
            <h3 className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-semibold mb-4 select-none">
              Education
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm sm:text-base font-semibold text-[#D7E2EA]">
                  B.E. in Information Technology (Lateral Entry)
                </h4>
                <p className="text-xs text-[#D7E2EA]/60 mt-1">
                  Parul Institute of Engineering & Tech — 2024–2027 (Expected)
                </p>
              </div>
              <div className="border-t border-[#D7E2EA]/10 pt-3">
                <h4 className="text-sm sm:text-base font-semibold text-[#D7E2EA]">
                  Diploma in Information Technology
                </h4>
                <p className="text-xs text-[#D7E2EA]/60 mt-1">
                  Government Polytechnic College, Jammu — 2021–2024
                </p>
                <span className="inline-block mt-1.5 text-[10px] font-semibold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">CGPA: 7.35/10</span>
              </div>
            </div>
          </div>

          <div className="border border-[#D7E2EA]/15 rounded-3xl p-6 bg-[#0C0C0C]/50 backdrop-blur-sm hover:border-[#D7E2EA]/30 transition-all duration-300">
            <h3 className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-semibold mb-4 select-none">
              Certifications
            </h3>
            <ul className="text-xs sm:text-sm space-y-2 text-[#D7E2EA]/85">
              <li>• AWS ML Engineer Associate</li>
              <li>• Data Engineering Foundations</li>
              <li>• Graphs Camp — AlgoUniversity (2025)</li>
              <li>• AI for Techies Certification (2025)</li>
              <li>• Computer Networks — NPTEL (2024)</li>
              <li>• CIIIT - Tata Technologies (2024)</li>
            </ul>
          </div>
        </FadeIn>

        {/* Contact Button */}
        <FadeIn delay={0.45} y={20}>
          <ContactButton
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
              }
            }}
          />
        </FadeIn>
      </div>
    </section>
  );
};
