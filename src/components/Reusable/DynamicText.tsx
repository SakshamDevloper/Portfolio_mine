import React, { useState, useEffect } from 'react';

const words = [
  'AI/ML Engineer',
  'Data Engineer',
  'Data Scientist',
  'Business Analyst',
  'Deep Learning',
  'GenAI Developer',
];

export const DynamicText: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 40);
      } else {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, index]);

  return (
    <span className="relative inline-block min-w-[200px]">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B600A8] via-[#7621B0] to-[#BE4C00]">
        {displayed}
      </span>
      <span className="absolute -right-[3px] top-0 bottom-0 w-[2px] bg-[#B600A8] animate-pulse" />
    </span>
  );
};
