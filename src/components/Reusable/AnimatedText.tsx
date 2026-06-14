import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  // Track scroll position of the paragraph element with offset ['start 0.8', 'end 0.2']
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const characters = text.split('');

  return (
    <p ref={containerRef} className={className}>
      {characters.map((char, index) => {
        // Distribute the reveal ranges across the characters
        const start = index / characters.length;
        const end = (index + 1) / characters.length;
        
        return (
          <Character 
            key={index} 
            char={char} 
            progress={scrollYProgress} 
            range={[start, end]} 
          />
        );
      })}
    </p>
  );
};

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ char, progress, range }) => {
  // Map scroll progress range to opacity from 0.2 to 1
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      {/* Invisible placeholder to hold the character size */}
      <span className="opacity-0 select-none whitespace-pre">{char === ' ' ? '\u00A0' : char}</span>
      {/* Absolute positioned animated character */}
      <motion.span 
        style={{ opacity }} 
        className="absolute left-0 top-0 select-none whitespace-pre"
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  );
};
