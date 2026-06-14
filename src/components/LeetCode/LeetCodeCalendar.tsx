import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Flame, CheckCircle, Zap, CalendarDays } from 'lucide-react';
import { useLeetCodeData } from '../../hooks/useLeetCodeData';
import type { DayData, MonthData } from '../../types/leetcode';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS_SHORT = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const now = new Date();
const CURRENT_YEAR = now.getFullYear();
const CURRENT_MONTH = now.getMonth();
const TODAY = now.getDate();

function buildMonthData(
  year: number,
  month: number,
  raw: Record<string, number> | null
): MonthData {
  const days: DayData[] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  let totalSubmissions = 0;
  let activeDays = 0;

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const ts = Math.floor(date.getTime() / 1000);
    const count = raw?.[String(ts)] ?? 0;
    const isFuture = date > now;
    const isToday = year === CURRENT_YEAR && month === CURRENT_MONTH && d === TODAY;

    days.push({ day: d, count, date, isFuture, isToday });
    if (!isFuture) {
      totalSubmissions += count;
      if (count > 0) activeDays++;
    }
  }

  return {
    year,
    month,
    name: MONTHS[month],
    days,
    totalSubmissions,
    activeDays,
  };
}

function getGlowClass(count: number, maxCount: number): string {
  if (count === 0) return 'bg-[#1a1a1a] text-[#D7E2EA]/20';
  const intensity = Math.min(count / Math.max(maxCount, 1), 1);
  if (intensity > 0.66)
    return 'bg-green-400/20 text-green-300 shadow-[0_0_12px_rgba(74,222,128,0.8)] ring-2 ring-green-400/50';
  if (intensity > 0.33)
    return 'bg-green-600/20 text-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]';
  return 'bg-green-800/30 text-green-500 shadow-[0_0_4px_rgba(74,222,128,0.25)]';
}

export const LeetCodeCalendar: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(CURRENT_MONTH);
  const [selectedYear] = useState(CURRENT_YEAR);
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);

  const canGoPrev = selectedMonth > 0 || selectedYear > CURRENT_YEAR - 1;
  const canGoNext = selectedMonth < CURRENT_MONTH && selectedYear === CURRENT_YEAR;

  const goPrev = () => {
    if (selectedMonth === 0) {
      // Would need to fetch previous year - for now stay
      return;
    }
    setSelectedMonth(prev => prev - 1);
  };
  const goNext = () => {
    if (selectedMonth === CURRENT_MONTH && selectedYear === CURRENT_YEAR) return;
    setSelectedMonth(prev => prev + 1);
  };

  const { data, isLoading, isError, error } = useLeetCodeData(selectedYear);

  const calendar = useMemo<MonthData | null>(() => {
    if (!data?.data?.matchedUser?.userCalendar) return null;
    try {
      const raw: Record<string, number> = JSON.parse(
        data.data.matchedUser.userCalendar.submissionCalendar || '{}'
      );
      return buildMonthData(selectedYear, selectedMonth, raw);
    } catch {
      return null;
    }
  }, [data, selectedYear, selectedMonth]);

  const cal = data?.data?.matchedUser?.userCalendar;
  const submitStats = data?.data?.matchedUser?.submitStats;
  const profile = data?.data?.matchedUser?.profile;

  const maxCount = calendar ? Math.max(...calendar.days.filter(d => !d.isFuture).map(d => d.count), 1) : 1;

  const solvedCounts = submitStats?.acSubmissionNum ?? [];
  const totalSolved = solvedCounts.reduce((sum, s) => sum + s.count, 0);
  const rank = profile?.ranking;

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[300px]">
        <span className="text-[#D7E2EA]/40 text-sm animate-pulse">Loading LeetCode Activity...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[300px]">
        <span className="text-red-400/60 text-sm text-center px-4">
          Unable to fetch LeetCode activity. Please try again later.
          {error && <span className="block text-[10px] text-red-400/30 mt-1">{error.message}</span>}
        </span>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Month Navigation Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <CalendarDays className="w-5 h-5 text-[#BE4C00]" />
          <span className="text-sm font-medium text-[#D7E2EA] uppercase tracking-wider">
            {calendar?.name} {calendar?.year}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={goPrev}
            disabled={!canGoPrev}
            className="p-1.5 rounded-lg text-[#D7E2EA]/40 hover:text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goNext}
            disabled={!canGoNext}
            className="p-1.5 rounded-lg text-[#D7E2EA]/40 hover:text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex gap-2 mb-5 flex-wrap">
        <div className="flex items-center gap-1.5 bg-[#D7E2EA]/5 rounded-lg px-3 py-2">
          <Flame className="w-4 h-4 text-[#BE4C00]" />
          <span className="text-xs text-[#D7E2EA]">{cal?.streak ?? 0}<span className="text-[#D7E2EA]/50 ml-1">day streak</span></span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#D7E2EA]/5 rounded-lg px-3 py-2">
          <CheckCircle className="w-4 h-4 text-[#B600A8]" />
          <span className="text-xs text-[#D7E2EA]">{cal?.totalActiveDays ?? 0}<span className="text-[#D7E2EA]/50 ml-1">active days</span></span>
        </div>
        <div className="flex items-center gap-1.5 bg-green-500/10 rounded-lg px-3 py-2">
          <Zap className="w-4 h-4 text-green-400" />
          <span className="text-xs text-green-400">
            {calendar?.days.find(d => d.isToday && d.count > 0) ? 'Solved today!' : 'Not yet today'}
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-green-500/10 rounded-lg px-3 py-2">
          <Flame className="w-4 h-4 text-green-400" />
          <span className="text-xs text-green-400">{calendar?.totalSubmissions ?? 0}<span className="text-green-400/50 ml-1">submissions this month</span></span>
        </div>
      </div>

      {/* Solved Breakdown */}
      {solvedCounts.length > 0 && (
        <div className="flex items-center gap-3 mb-4 text-[10px]">
          <span className="text-[#D7E2EA]/50">Solved:</span>
          {solvedCounts.map(s => (
            <span key={s.difficulty} className="text-[#D7E2EA]/70">
              {s.difficulty}: <strong className={
                s.difficulty === 'Easy' ? 'text-green-400' :
                s.difficulty === 'Medium' ? 'text-yellow-400' :
                'text-red-400'
              }>{s.count}</strong>
            </span>
          ))}
          <span className="text-[#D7E2EA]/30">|</span>
          <span className="text-[#D7E2EA]/50">Total: <strong className="text-[#D7E2EA]">{totalSolved}</strong></span>
          {rank && (
            <>
              <span className="text-[#D7E2EA]/30">|</span>
              <span className="text-[#D7E2EA]/50">Rank: <strong className="text-[#D7E2EA]">#{rank.toLocaleString()}</strong></span>
            </>
          )}
        </div>
      )}

      {/* Calendar Grid */}
      {calendar && (
        <div className="grid grid-cols-7 gap-[3px] sm:gap-1">
          {DAYS_SHORT.map(d => (
            <div key={d} className="text-[9px] sm:text-[10px] text-[#D7E2EA]/40 text-center uppercase tracking-wider font-medium mb-1">
              {d[0]}
            </div>
          ))}
          {Array.from({ length: new Date(calendar.year, calendar.month, 1).getDay() }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {calendar.days.map((d, i) => {
            if (d.isFuture) {
              return (
                <div
                  key={i}
                  className="aspect-square rounded-md flex items-center justify-center text-[10px] sm:text-[11px] font-medium bg-[#1a1a1a]/50 text-[#D7E2EA]/10 cursor-default"
                >
                  {d.day}
                </div>
              );
            }
            return (
              <div
                key={i}
                className={`aspect-square rounded-md flex items-center justify-center text-[10px] sm:text-[11px] font-medium transition-all duration-300 cursor-pointer hover:scale-110 hover:z-10 ${getGlowClass(d.count, maxCount)} ${d.isToday ? 'ring-2 ring-white/40 animate-pulse' : ''} ${selectedDay?.day === d.day ? 'ring-2 ring-green-400' : ''}`}
                title={`${d.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} — ${d.count} submission${d.count !== 1 ? 's' : ''}`}
                onClick={() => setSelectedDay(d)}
              >
                {d.day}
              </div>
            );
          })}
        </div>
      )}

      {/* Legend */}
      {calendar && (
        <div className="flex items-center gap-2 mt-4 justify-end">
          <span className="text-[9px] sm:text-[10px] text-[#D7E2EA]/40">Less</span>
          <div className="w-3 h-3 rounded-sm bg-[#1a1a1a]" />
          <div className="w-3 h-3 rounded-sm bg-green-800/30 shadow-[0_0_4px_rgba(74,222,128,0.25)] ring-1 ring-green-500/30" />
          <div className="w-3 h-3 rounded-sm bg-green-600/20 shadow-[0_0_6px_rgba(74,222,128,0.5)] ring-1 ring-green-400/30" />
          <div className="w-3 h-3 rounded-sm bg-green-400/20 shadow-[0_0_8px_rgba(74,222,128,0.7)] ring-2 ring-green-400/40" />
          <span className="text-[9px] sm:text-[10px] text-[#D7E2EA]/40">More</span>
        </div>
      )}

      {/* Selected Day Info */}
      {selectedDay && (
        <div className="mt-3 flex items-center justify-between bg-[#D7E2EA]/5 rounded-lg px-4 py-2.5 border border-[#D7E2EA]/10 cursor-pointer" onClick={() => setSelectedDay(null)}>
          <span className="text-xs text-[#D7E2EA]/70">
            {selectedDay.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="text-xs font-medium">
            {selectedDay.count > 0 ? (
              <span className="text-green-400">{selectedDay.count} submission{selectedDay.count !== 1 ? 's' : ''}</span>
            ) : (
              <span className="text-[#D7E2EA]/30">No submissions</span>
            )}
          </span>
        </div>
      )}
    </div>
  );
};
