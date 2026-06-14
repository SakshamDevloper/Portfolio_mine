import React, { useEffect, useState } from 'react';

export const CursorFollower: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window) return;

    const handleMouse = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
      const target = e.target as HTMLElement;
      const isHoverable = target.closest('a, button, [data-cursor-hover]');
      setHovering(!!isHoverable);
    };

    const handleLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', handleMouse);
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouse);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`,
        width: hovering ? '56px' : '16px',
        height: hovering ? '56px' : '16px',
        borderRadius: '50%',
        border: hovering ? '1.5px solid rgba(215, 226, 234, 0.4)' : '1.5px solid rgba(215, 226, 234, 0.2)',
        background: hovering ? 'rgba(182, 0, 168, 0.08)' : 'transparent',
        backdropFilter: hovering ? 'blur(6px)' : 'none',
        opacity: visible ? 1 : 0,
        transition: 'width 0.35s ease-out, height 0.35s ease-out, background 0.35s ease-out, border 0.35s ease-out, opacity 0.3s ease-out',
        willChange: 'transform',
      }}
    />
  );
};
