import React from 'react';
import { FadeIn } from './Reusable/FadeIn';
import { ExternalLink, Code, BarChart3 } from 'lucide-react';
import { LeetCodeCalendar } from './LeetCode/LeetCodeCalendar';

export const MarqueeSection: React.FC = () => {
  return (
    <section className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-24 w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#B600A8]/5 via-transparent to-[#BE4C00]/5 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-10 relative z-10">
        <FadeIn delay={0.1} y={20} className="mb-10 sm:mb-14 md:mb-16 text-center">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-light select-none">
            Coding Profiles
          </span>
          <h2 className="hero-heading font-black uppercase text-center mt-2 select-none" style={{ fontSize: 'clamp(2rem, 6vw, 60px)' }}>
            Stats &amp; Analytics
          </h2>
        </FadeIn>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-center lg:items-stretch justify-center">
          {/* GitHub Card */}
          <FadeIn delay={0.2} y={20} className="w-full lg:w-1/2">
            <div className="relative group h-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#B600A8] to-[#7621B0] rounded-2xl opacity-20 group-hover:opacity-40 blur transition-all duration-500" />
              <div className="relative bg-[#0C0C0C] border border-[#D7E2EA]/10 rounded-2xl p-6 sm:p-8 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#D7E2EA]/10 flex items-center justify-center">
                    <Code className="w-5 h-5 text-[#D7E2EA]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#D7E2EA] uppercase tracking-wide">GitHub</h3>
                    <a href="https://github.com/SakshamDevloper" target="_blank" rel="noopener noreferrer" className="text-xs text-[#D7E2EA]/50 hover:text-[#B600A8] transition-colors flex items-center gap-1">
                      @SakshamDevloper <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                  <img
                    src="https://github-readme-stats.vercel.app/api?username=SakshamDevloper&theme=dark&show_icons=true&bg_color=0C0C0C&border_color=2a2a2a&text_color=D7E2EA&title_color=D7E2EA&icon_color=B600A8&hide_border=true"
                    alt="GitHub Stats"
                    className="w-full rounded-xl"
                    loading="lazy"
                  />
                  <img
                    src="https://streak-stats.demolab.com/?user=SakshamDevloper&theme=dark&bg_color=0C0C0C&hide_border=true&stroke=2a2a2a&ring=B600A8&fire=BE4C00&currStreakNum=D7E2EA&sideNums=D7E2EA&currStreakLabel=D7E2EA&sideLabels=D7E2EA&dates=666666"
                    alt="GitHub Streak"
                    className="w-full rounded-xl"
                    loading="lazy"
                  />
                  <img
                    src="https://github-readme-stats.vercel.app/api/top-langs/?username=SakshamDevloper&theme=dark&layout=compact&bg_color=0C0C0C&border_color=2a2a2a&text_color=D7E2EA&title_color=D7E2EA&hide_border=true"
                    alt="Top Languages"
                    className="w-full rounded-xl"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </FadeIn>

          {/* LeetCode Card */}
          <FadeIn delay={0.3} y={20} className="w-full lg:w-1/2">
            <div className="relative group h-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#BE4C00] to-[#B600A8] rounded-2xl opacity-20 group-hover:opacity-40 blur transition-all duration-500" />
              <div className="relative bg-[#0C0C0C] border border-[#D7E2EA]/10 rounded-2xl p-6 sm:p-8 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#D7E2EA]/10 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-[#D7E2EA]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#D7E2EA] uppercase tracking-wide">LeetCode</h3>
                    <a href="https://leetcode.com/SakshamDevloper" target="_blank" rel="noopener noreferrer" className="text-xs text-[#D7E2EA]/50 hover:text-[#BE4C00] transition-colors flex items-center gap-1">
                      @SakshamDevloper <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <LeetCodeCalendar />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
