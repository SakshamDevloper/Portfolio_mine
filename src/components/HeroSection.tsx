import React from 'react';
import { Navbar } from './Navbar';
import { Magnet } from './Reusable/Magnet';
import { FadeIn } from './Reusable/FadeIn';
import { ContactButton } from './Reusable/ContactButton';
import { DynamicText } from './Reusable/DynamicText';
import { Github, Linkedin } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen flex flex-col justify-between overflow-hidden bg-[#0C0C0C] w-full">
      <Navbar />

      <div className="flex-1 flex items-center justify-center w-full z-0 px-4 md:px-8 pt-16 md:pt-20">
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4 md:gap-8">
          <FadeIn
            delay={0.6}
            y={30}
            className="flex-shrink-0 w-[200px] sm:w-[260px] md:w-[320px] lg:w-[380px]"
          >
            <Magnet
              padding={150}
              strength={3}
              activeTransition="transform 0.3s ease-out"
              inactiveTransition="transform 0.6s ease-in-out"
              className="w-full h-full flex justify-center items-end"
            >
              <img
                src="/saksham_metro.jpg"
                alt="Saksham Portrait"
                className="w-full h-auto object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px] border-2 border-[#D7E2EA]/30 shadow-2xl select-none pointer-events-none"
                loading="eager"
              />
            </Magnet>
          </FadeIn>
          <div className="text-center lg:text-left">
            <FadeIn delay={0.15} y={40}>
              <h1 className="hero-heading font-black uppercase tracking-tight leading-none text-[13vw] sm:text-[14vw] md:text-[15vw] lg:text-[12vw] xl:text-[14vw] mt-4 sm:mt-2 lg:mt-0 select-none">
                Hi, i&apos;m saksham
              </h1>
            </FadeIn>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 z-20">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-left select-none max-w-[180px] sm:max-w-[240px] md:max-w-[320px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            <DynamicText />
          </p>
        </FadeIn>

          <div className="flex items-center gap-3 flex-wrap">
          <FadeIn delay={0.5} y={20}>
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

          <FadeIn delay={0.55} y={20} className="flex gap-2">
            <a
              href="https://github.com/SakshamDevloper"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-[#D7E2EA]/20 flex items-center justify-center text-[#D7E2EA] transition-all hover:bg-[#D7E2EA] hover:text-[#0C0C0C] hover:scale-110"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/SakshamDevloper"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-[#D7E2EA]/20 flex items-center justify-center text-[#D7E2EA] transition-all hover:bg-[#D7E2EA] hover:text-[#0C0C0C] hover:scale-110"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://leetcode.com/SakshamDevloper"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-[#D7E2EA]/20 flex items-center justify-center text-[#D7E2EA] transition-all hover:bg-[#D7E2EA] hover:text-[#0C0C0C] hover:scale-110"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.47-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.322 2.771c.573.478 1.407.48 1.982.005.574-.475.576-1.277.006-1.755l-3.298-2.753-.01-.01a5.738 5.738 0 0 0-1.45-.866 5.596 5.596 0 0 0-1.78-.309 5.614 5.614 0 0 0-1.48.201c.123-.424.328-.82.612-1.154l.005-.005 3.422-3.692A1.376 1.376 0 0 0 13.483 0zM9.349 19.298h10.318a1.382 1.382 0 0 0 1.382-1.382 1.382 1.382 0 0 0-1.382-1.382H9.349a1.382 1.382 0 0 0-1.382 1.382 1.382 1.382 0 0 0 1.382 1.382z"/>
              </svg>
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
