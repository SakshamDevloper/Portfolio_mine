import { useQuery } from '@tanstack/react-query';
import type { LeetCodeResponse } from '../types/leetcode';

const LEETCODE_USERNAME = 'SakshamDevloper';

const fetchLeetCodeData = async (year: number): Promise<LeetCodeResponse> => {
  const res = await fetch('/api/leetcode', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query userProfile($username: String!, $year: Int) {
        matchedUser(username: $username) {
          userCalendar(year: $year) { streak totalActiveDays submissionCalendar }
          submitStats { acSubmissionNum { difficulty count } totalSubmissionNum { difficulty count } }
          profile { ranking }
        }
      }`,
      variables: { username: LEETCODE_USERNAME, year }
    })
  });
  const json = await res.json();
  if (!res.ok || json.errors) throw new Error(json.errors?.[0]?.message || 'Failed to fetch LeetCode data');
  return json;
};

export const useLeetCodeData = (year: number) => {
  return useQuery({
    queryKey: ['leetcode', year],
    queryFn: () => fetchLeetCodeData(year),
    refetchInterval: 300_000,
    staleTime: 240_000,
    retry: 2,
  });
};
