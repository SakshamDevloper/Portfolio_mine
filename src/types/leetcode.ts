export interface LeetCodeUserCalendar {
  streak: number;
  totalActiveDays: number;
  submissionCalendar: string;
}

export interface SubmissionStat {
  difficulty: string;
  count: number;
}

export interface LeetCodeSubmitStats {
  acSubmissionNum: SubmissionStat[];
  totalSubmissionNum: SubmissionStat[];
}

export interface LeetCodeProfile {
  ranking: number;
}

export interface LeetCodeMatchedUser {
  userCalendar: LeetCodeUserCalendar;
  submitStats: LeetCodeSubmitStats;
  profile: LeetCodeProfile;
}

export interface LeetCodeResponse {
  data: {
    matchedUser: LeetCodeMatchedUser | null;
  };
}

export interface DayData {
  day: number;
  count: number;
  date: Date;
  isFuture: boolean;
  isToday: boolean;
}

export interface MonthData {
  year: number;
  month: number;
  name: string;
  days: DayData[];
  totalSubmissions: number;
  activeDays: number;
}
