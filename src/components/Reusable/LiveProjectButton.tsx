import React from 'react';

interface LiveProjectButtonProps {
  label?: string;
  href?: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  label = 'Live Project',
  href = '#',
  className = '',
  onClick,
}) => {
  return (
    <a
      onClick={onClick}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest transition-all duration-300 hover:bg-[#D7E2EA] hover:text-[#0C0C0C] active:scale-95 px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base inline-block ${className}`}
    >
      {label}
    </a>
  );
};
