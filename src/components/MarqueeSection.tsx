import React, { useEffect, useState } from 'react';
import { FadeIn } from './Reusable/FadeIn';
import { ExternalLink, Code, BarChart3, Flame, CheckCircle, CalendarDays, Zap } from 'lucide-react';

interface DayData {
  day: number;
  count: number;
  date: Date;
}

const DAYS_SHORT = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const LeetCodeCalendar: React.FC = () => {
  const [last14, setLast14] = useState<DayData[]>([]);
  const [streak, setStreak] = useState(0);
  const [totalActive, setTotalActive] = useState(0);
  const [lastActiveDay, setLastActiveDay] = useState<string>('');
  const [submittedToday, setSubmittedToday] = useState(false);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [loading, setLoading] = useState(true);

  const now = new Date();
  const year = now.getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/leetcode', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `query userProfileCalendar($username: String!, $year: Int) {
              matchedUser(username: $username) {
                userCalendar(year: $year) { streak totalActiveDays submissionCalendar }
              }
            }`,
            variables: { username: 'SakshamDevloper', year }
          })
        });
        const json = await res.json();
        const cal = json.data?.matchedUser?.userCalendar;
        if (!cal) { setLoading(false); return; }

        setStreak(cal.streak || 0);
        setTotalActive(cal.totalActiveDays || 0);

        const raw: Record<string, number> = JSON.parse(cal.submissionCalendar || '{}');
        const days: DayData[] = [];
        let lastTs = 0;
        let total = 0;

        for (let i = 13; i >= 0; i--) {
          const d = new Date(now);
          d.setDate(d.getDate() - i);
          const ts = Math.floor(d.getTime() / 1000);
          const count = raw[String(ts)] || 0;
          days.push({ day: d.getDate(), count, date: d });
          total += count;
          if (count > 0 && ts > lastTs) lastTs = ts;
        }
        setLast14(days);
        setTotalSubmissions(total);

        if (lastTs > 0) {
          const d = new Date(lastTs * 1000);
          setLastActiveDay(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        }

        const todayTs = Math.floor(now.getTime() / 1000);
        setSubmittedToday((raw[String(todayTs)] || 0) > 0);
      } catch {
        // fallback
      }
      setLoading(false);
    };
    fetchData();
  }, [year]);

  const maxCount = Math.max(...last14.map(d => d.count), 1);

  const getColor = (count: number) => {
    if (count === 0) return 'bg-[#1a1a1a]';
    const intensity = Math.min(count / maxCount, 1);
    if (intensity > 0.66) return 'bg-[#B600A8]';
    if (intensity > 0.33) return 'bg-[#7621B0]';
    return 'bg-[#BE4C00]';
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center gap-3 mb-5">
        <CalendarDays className="w-5 h-5 text-[#BE4C00]" />
        <span className="text-sm font-medium text-[#D7E2EA] uppercase tracking-wider">Last 14 Days</span>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center text-[#D7E2EA]/40 text-sm">Loading...</div>
      ) : (
        <>
          {/* Stats Row */}
          <div className="flex gap-2 mb-5 flex-wrap">
            <div className="flex items-center gap-1.5 bg-[#D7E2EA]/5 rounded-lg px-3 py-2">
              <Flame className="w-4 h-4 text-[#BE4C00]" />
              <span className="text-xs text-[#D7E2EA]">{streak}<span className="text-[#D7E2EA]/50 ml-1">day streak</span></span>
              {lastActiveDay && (
                <span className="text-[10px] text-[#D7E2EA]/40 ml-1">· last {lastActiveDay}</span>
              )}
            </div>
            <div className="flex items-center gap-1.5 bg-[#D7E2EA]/5 rounded-lg px-3 py-2">
              <CheckCircle className="w-4 h-4 text-[#B600A8]" />
              <span className="text-xs text-[#D7E2EA]">{totalActive}<span className="text-[#D7E2EA]/50 ml-1">active days</span></span>
            </div>
            <div className={`flex items-center gap-1.5 rounded-lg px-3 py-2 ${submittedToday ? 'bg-green-500/10' : 'bg-[#D7E2EA]/5'}`}>
              <Zap className={`w-4 h-4 ${submittedToday ? 'text-green-400' : 'text-[#D7E2EA]/30'}`} />
              <span className={`text-xs ${submittedToday ? 'text-green-400' : 'text-[#D7E2EA]/30'}`}>
                {submittedToday ? 'Solved today!' : 'Not yet today'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-green-500/10 rounded-lg px-3 py-2">
              <Flame className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400">{totalSubmissions}<span className="text-green-400/50 ml-1">submissions (14d)</span></span>
            </div>
          </div>

          {/* 14-Day Grid */}
          <div className="grid grid-cols-7 gap-1">
            {last14.slice(0, 7).map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-[10px] text-[#D7E2EA]/40 uppercase tracking-wider">{DAYS_SHORT[d.date.getDay()]}</span>
                <div
                  className={`w-full aspect-square rounded-md flex items-center justify-center text-[11px] font-medium transition-colors duration-200 ${getColor(d.count)} ${d.count > 0 ? 'text-white' : 'text-[#D7E2EA]/30'}`}
                  title={`${d.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}: ${d.count} submissions`}
                >
                  {d.day}
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 mt-1">
            {last14.slice(7, 14).map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-[10px] text-[#D7E2EA]/40 uppercase tracking-wider">{DAYS_SHORT[d.date.getDay()]}</span>
                <div
                  className={`w-full aspect-square rounded-md flex items-center justify-center text-[11px] font-medium transition-colors duration-200 ${getColor(d.count)} ${d.count > 0 ? 'text-white' : 'text-[#D7E2EA]/30'}`}
                  title={`${d.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}: ${d.count} submissions`}
                >
                  {d.day}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-4 justify-end">
            <span className="text-[10px] text-[#D7E2EA]/40">Less</span>
            <div className="w-3 h-3 rounded-sm bg-[#1a1a1a]" />
            <div className="w-3 h-3 rounded-sm bg-[#BE4C00]" />
            <div className="w-3 h-3 rounded-sm bg-[#7621B0]" />
            <div className="w-3 h-3 rounded-sm bg-[#B600A8]" />
            <span className="text-[10px] text-[#D7E2EA]/40">More</span>
          </div>
        </>
      )}
    </div>
  );
};

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
