import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLenisScroll } from './Reusable/LenisProvider';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollTo } = useLenisScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sectionIds = navItems.map(item => item.href.slice(1));
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      scrollTo(href);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-4 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0C0C0C]/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
            : 'bg-transparent'
        }`}
      >
        <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
          <a
            href="#"
            onClick={(e) => handleNavClick(e, '#')}
            className="text-[#D7E2EA] font-black uppercase tracking-tight text-lg select-none"
          >
            SS<span className="text-[#B600A8]">.</span>
          </a>

          <ul className="hidden md:flex items-center gap-8 lg:gap-12">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative text-[#D7E2EA] font-medium uppercase tracking-wider text-sm lg:text-base transition-all duration-300 hover:opacity-100 ${
                    activeSection === item.href.slice(1)
                      ? 'opacity-100 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#B600A8] after:to-[#BE4C00]'
                      : 'opacity-60'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[#D7E2EA] ml-auto z-50 p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-[#0C0C0C]/95 backdrop-blur-2xl flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col items-center gap-10">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-4xl font-medium uppercase tracking-wider text-[#D7E2EA] transition-all duration-300 hover:opacity-70 ${
                  activeSection === item.href.slice(1) ? 'opacity-100' : 'opacity-50'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
