import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import { GraduationCap, Briefcase, School, ArrowDown } from 'lucide-react';

const journey = [
  {
    id: 'diploma',
    year: '2021 – 2024',
    title: 'Diploma in Information Technology',
    institution: 'Government Polytechnic College, Jammu',
    description: 'Built strong foundations in computer science, programming, and database systems. Completed with a CGPA of 7.35/10.',
    details: ['Core CS fundamentals', 'Programming & DBMS', 'CGPA: 7.35/10'],
    icon: School,
    color: '#B600A8',
  },
  {
    id: 'btech',
    year: '2024 – 2027 (Expected)',
    title: 'B.E. in Information Technology',
    institution: 'Parul Institute of Engineering & Technology',
    description: 'Advanced studies in AI/ML, software engineering, and enterprise architecture. Specializing in intelligent systems.',
    details: ['AI/ML specialization', 'Software engineering', 'Enterprise architecture'],
    icon: GraduationCap,
    color: '#7621B0',
  },
  {
    id: 'internship',
    year: 'Feb – Mar 2026',
    title: 'Internship',
    institution: 'Cognifyz Technologies',
    description: 'Worked as a Software Developer Intern, gaining hands-on experience in backend development and real-world software engineering practices.',
    details: ['Software Developer Intern', 'Backend development focus', '2-month intensive program'],
    icon: Briefcase,
    color: '#BE4C00',
    highlights: [
      { label: 'Duration', value: '2 Months' },
      { label: 'Role', value: 'SDE Intern' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Connector with particle burst between cards                        */
/* ------------------------------------------------------------------ */
const ConnectorLine: React.FC<{ color: string }> = ({ color }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const lineScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const dotY = useTransform(scrollYProgress, [0, 1], ['-20%', '120%']);

  return (
    <div ref={ref} className="relative flex flex-col items-center py-8 sm:py-12">
      {/* Vertical line */}
      <motion.div
        className="w-[2px] h-20 sm:h-24 rounded-full"
        style={{
          background: `linear-gradient(180deg, ${color}, transparent)`,
          scaleY: lineScale,
          transformOrigin: 'top',
        }}
      />

      {/* Flowing dot */}
      <motion.div
        className="absolute w-3 h-3 rounded-full"
        style={{
          background: color,
          top: dotY,
          boxShadow: `0 0 8px ${color}80, 0 0 20px ${color}40`,
        }}
      />

      {/* Arrow */}
      <motion.div className="mt-2" style={{ opacity: lineScale }}>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4" style={{ color }} />
        </motion.div>
      </motion.div>

      {/* Particle burst */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ background: color, boxShadow: `0 0 4px ${color}` }}
            animate={{
              x: [0, Math.cos(i * 45 * Math.PI / 180) * 40],
              y: [0, Math.sin(i * 45 * Math.PI / 180) * 40],
              opacity: [0.8, 0],
              scale: [1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Floating rings                                                    */
/* ------------------------------------------------------------------ */
const BackgroundRings: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {Array.from({ length: 8 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: 60 + i * 50,
          height: 60 + i * 50,
          border: '1px solid',
          borderColor: [ '#B600A8', '#7621B0', '#BE4C00', '#B600A8', '#7621B0', '#BE4C00', '#B600A8', '#7621B0'][i],
          left: `${(i * 13 + 7) % 100}%`,
          top: `${(i * 19 + 12) % 100}%`,
        }}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 360],
          opacity: [0.015, 0.04, 0.015],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10 + i * 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: i * 0.6,
        }}
      />
    ))}
  </div>
);

/* ------------------------------------------------------------------ */
/*  Card                                                               */
/* ------------------------------------------------------------------ */
const JourneyCard: React.FC<{
  item: (typeof journey)[number];
  index: number;
}> = ({ item, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = item.icon;
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });

  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.55], [0, 0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.25, 0.55], [100, 100, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.55], [0.8, 0.8, 1]);

  /* Mouse tilt */
  const tiltX = useSpring(0, { damping: 6, stiffness: 50 });
  const tiltY = useSpring(0, { damping: 6, stiffness: 50 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    tiltX.set(((e.clientY - rect.top) / rect.height - 0.5) * -12);
    tiltY.set(((e.clientX - rect.left) / rect.width - 0.5) * 12);
  };

  const handleTouch = () => {
    setIsTapped(!isTapped);
    tiltX.set(-3);
    tiltY.set(3);
    setTimeout(() => { tiltX.set(0); tiltY.set(0); }, 300);
  };

  return (
    <motion.div
      ref={ref}
      className="relative w-full"
      style={{ opacity, y, scale, perspective: 1200 }}
    >
      <motion.div
        onMouseMove={(e) => { handleMouse(e); setIsHovered(true); }}
        onMouseLeave={() => { setIsHovered(false); tiltX.set(0); tiltY.set(0); }}
        onTouchStart={handleTouch}
        style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}
        className="relative bg-[var(--bg-card)] border-2 rounded-2xl overflow-hidden cursor-default group touch-manipulation"
        animate={{ borderColor: isHovered || isTapped ? `${item.color}50` : 'transparent' }}
        transition={{ duration: 0.3 }}
      >
        {/* Gradient border via pseudo-layer */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            border: '2px solid var(--border)',
            borderRadius: 'inherit',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '2px',
          }}
        />

        {/* Animated glow border on hover */}
        <motion.div
          className="absolute -inset-[1px] rounded-2xl pointer-events-none z-[1]"
          style={{
            background: `conic-gradient(from var(--angle, 0deg), transparent, transparent 270deg, ${item.color} 300deg, ${item.color}40 315deg, transparent 340deg)`,
            filter: 'blur(2px)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '1.5px',
            opacity: isHovered || isTapped ? 1 : 0,
          }}
          animate={{ '--angle': ['0deg', '360deg'] } as any}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />

        {/* Cursor glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-[2]"
          style={{
            background: isHovered || isTapped
              ? `radial-gradient(350px circle at var(--mx, 50%) var(--my, 50%), ${item.color}12, transparent 60%)`
              : 'transparent',
            transition: 'background 0.3s',
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
            e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
          }}
        />

        {/* Ghost number */}
        <motion.div
          className="absolute -bottom-3 -right-3 text-[100px] sm:text-[140px] font-black leading-none select-none pointer-events-none z-[1]"
          style={{ color: `${item.color}06` }}
          animate={isHovered || isTapped ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.div>

        {/* Top accent bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[3px] z-[3]"
          style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}88, transparent)` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.15 }}
        />

        {/* Content */}
        <div className="relative z-10 p-6 sm:p-8" style={{ transformStyle: 'preserve-3d' }}>
          {/* Icon + Year */}
          <div className="flex items-center gap-3 mb-4" style={{ transform: 'translateZ(35px)' }}>
            <motion.div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${item.color}15` }}
              animate={isHovered || isTapped
                ? { scale: [1, 1.15, 1], background: [`${item.color}15`, `${item.color}25`, `${item.color}15`] }
                : { scale: 1, background: `${item.color}15` }
              }
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Icon className="w-5 h-5" style={{ color: item.color }} />
            </motion.div>
            <span
              className="text-xs font-mono font-semibold tracking-wider px-2.5 py-1 rounded-full border"
              style={{ color: item.color, borderColor: `${item.color}30`, background: `${item.color}08` }}
            >
              {item.year}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold mb-1" style={{ color: 'var(--text)', transform: 'translateZ(30px)' }}>
            {item.title.split(' ').map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.3em]"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
              >
                {word}
              </motion.span>
            ))}
          </h3>

          {/* Institution */}
          <p className="text-xs sm:text-sm mb-3" style={{ color: 'var(--text-muted)', transform: 'translateZ(25px)' }}>
            {item.institution}
          </p>

          {/* Description */}
          <p className="text-xs sm:text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)', transform: 'translateZ(20px)' }}>
            {item.description}
          </p>

          {/* Details */}
          <div className="flex flex-wrap gap-x-6 gap-y-1.5 mb-4" style={{ transform: 'translateZ(15px)' }}>
            {item.details.map((d, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: item.color, boxShadow: `0 0 4px ${item.color}80` }}
                  animate={isHovered || isTapped
                    ? { scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }
                    : {}
                  }
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                />
                <span className="text-[11px] sm:text-xs" style={{ color: 'var(--text-muted)' }}>{d}</span>
              </motion.div>
            ))}
          </div>

          {/* Highlights */}
          {item.highlights && (
            <motion.div
              className="flex gap-6 pt-3 border-t"
              style={{ borderColor: 'var(--border)', transform: 'translateZ(10px)' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              {item.highlights.map((h, i) => (
                <div key={i}>
                  <motion.span
                    className="text-base sm:text-lg font-bold block"
                    style={{ color: item.color }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 100 }}
                  >
                    {h.value}
                  </motion.span>
                  <span className="text-[9px] uppercase tracking-wider" style={{ color: 'var(--text-dim)' }}>{h.label}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */
export const JourneySection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden" style={{ background: 'var(--bg)' }}>
      <BackgroundRings />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.012]"
        style={{
          backgroundImage: `linear-gradient(rgba(215,226,234,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(215,226,234,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Header */}
      <div className="relative z-10 text-center mb-12 sm:mb-16">
        <motion.span
          className="inline-block text-xs uppercase tracking-[0.3em] font-light mb-3"
          style={{ color: 'var(--text-dim)' }}
          initial={{ opacity: 0, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          My Path
        </motion.span>

        <h2 className="hero-heading font-black uppercase select-none" style={{ fontSize: 'clamp(2.5rem, 8vw, 80px)' }}>
          {'Journey'.split('').map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 60, rotateX: -90, scale: 0.5 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {ch}
            </motion.span>
          ))}
        </h2>

        {/* Animated bar */}
        <motion.div
          className="h-[3px] mx-auto mt-4 rounded-full relative overflow-hidden"
          style={{
            width: 'clamp(80px, 20vw, 160px)',
            background: 'linear-gradient(90deg, transparent, #B600A8, #7621B0, #BE4C00, transparent)',
            backgroundSize: '200% 100%',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>

      {/* Cards */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 md:px-10">
        {journey.map((item, index) => (
          <div key={item.id} className="flex flex-col items-center">
            <JourneyCard item={item} index={index} />
            {index < journey.length - 1 && (
              <ConnectorLine color={journey[index + 1].color} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
