import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CursorFollower } from './components/Reusable/CursorFollower';
import { ScrollProgress } from './components/Reusable/ScrollProgress';
import { FloatingBackToTop } from './components/Reusable/FloatingBackToTop';
import { FadeIn } from './components/Reusable/FadeIn';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';

function App() {
  return (
    <div className="w-full bg-[#0C0C0C] text-[#D7E2EA] font-kanit overflow-x-clip flex flex-col min-h-screen relative">
      <CursorFollower />
      <ScrollProgress />
      <FloatingBackToTop />

      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />

      <footer
        id="contact"
        className="w-full bg-[#0C0C0C] py-20 px-6 md:px-10 border-t border-[#D7E2EA]/10 flex flex-col items-center text-center relative z-20"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center w-full">
          <FadeIn delay={0.1} y={20}>
            <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-light mb-4 block select-none">
              Get in touch
            </span>
          </FadeIn>

          <FadeIn delay={0.15} y={20}>
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight mb-8 select-none"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
            >
              Let&apos;s Create
            </h2>
          </FadeIn>

          <FadeIn delay={0.2} y={20} className="w-full max-w-3xl border border-[#D7E2EA]/15 rounded-3xl p-6 bg-[#0C0C0C]/50 backdrop-blur-sm mb-12 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-bold mb-3 select-none">Recent Experience</h3>
                <h4 className="text-sm sm:text-base font-semibold text-[#D7E2EA] uppercase">Software Development Intern</h4>
                <p className="text-xs text-[#D7E2EA]/70 mt-1">Cognifyz Technologies (Feb – Mar 2026, Remote)</p>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-bold mb-3 select-none">Currently Building</h3>
                <h4 className="text-sm sm:text-base font-semibold text-[#D7E2EA] uppercase">LangGraph Multi-Agent System</h4>
                <p className="text-xs text-[#D7E2EA]/70 mt-1">Fine-tuning Mistral-7B (LoRA) for domain tasks</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.25} y={20} className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 mb-10 w-full text-sm sm:text-base">
            <a
              href="mailto:sakshamsethi353@gmail.com"
              className="text-[#D7E2EA] font-medium hover:opacity-75 transition-opacity flex items-center gap-2 justify-center"
            >
              <Mail className="w-5 h-5 text-[#B600A8]" />
              sakshamsethi353@gmail.com
            </a>

            <a
              href="tel:+917889914194"
              className="text-[#D7E2EA] font-medium hover:opacity-75 transition-opacity flex items-center gap-2 justify-center"
            >
              <Phone className="w-5 h-5 text-[#7621B0]" />
              +91-7889914194
            </a>

            <div className="text-[#D7E2EA] font-medium flex items-center gap-2 justify-center select-none">
              <MapPin className="w-5 h-5 text-[#BE4C00]" />
              Jammu, India (Open to BLR, HYD, Remote)
            </div>
          </FadeIn>

          <FadeIn delay={0.3} y={20} className="flex gap-6 sm:gap-8 justify-center mb-12">
            {[
              { icon: <Linkedin className="w-5 h-5 sm:w-6 h-6" />, href: 'https://www.linkedin.com/in/SakshamDevloper' },
              { icon: <Github className="w-5 h-5 sm:w-6 h-6" />, href: 'https://github.com/SakshamDevloper' },
              { icon: <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.47-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.322 2.771c.573.478 1.407.48 1.982.005.574-.475.576-1.277.006-1.755l-3.298-2.753-.01-.01a5.738 5.738 0 0 0-1.45-.866 5.596 5.596 0 0 0-1.78-.309 5.614 5.614 0 0 0-1.48.201c.123-.424.328-.82.612-1.154l.005-.005 3.422-3.692A1.376 1.376 0 0 0 13.483 0zM9.349 19.298h10.318a1.382 1.382 0 0 0 1.382-1.382 1.382 1.382 0 0 0-1.382-1.382H9.349a1.382 1.382 0 0 0-1.382 1.382 1.382 1.382 0 0 0 1.382 1.382z"/></svg>, href: 'https://leetcode.com/SakshamDevloper' },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full border border-[#D7E2EA]/20 flex items-center justify-center text-[#D7E2EA] transition-all hover:bg-[#D7E2EA] hover:text-[#0C0C0C] hover:scale-110 hover:shadow-[0_0_20px_rgba(215,226,234,0.15)]"
              >
                {social.icon}
              </a>
            ))}
          </FadeIn>

          <FadeIn delay={0.4} y={10} className="mt-16 text-[10px] sm:text-xs uppercase tracking-widest text-[#D7E2EA]/40 select-none">
            © 2026 Saksham Sethi. All rights reserved.
          </FadeIn>
        </div>
      </footer>
    </div>
  );
}

export default App;
