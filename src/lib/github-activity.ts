const username = "Angelo55";
const cacheSeconds = 60 * 60;

export type ContributionDay = { date: string; count: number; level: number };
export type GitHubActivityData = {
  publicRepositories: number | null;
  privateRepositories: number | null;
  stars: number | null;
  contributions: number | null;
  longestStreak: number | null;
  days: ContributionDay[];
};

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "Angelo-Lacsao-Portfolio",
};

async function publicStatistics() {
  const [profileResult, reposResult] = await Promise.allSettled([
    fetch(`https://api.github.com/users/${username}`, { headers, next: { revalidate: cacheSeconds }, signal: AbortSignal.timeout(8000) }),
    fetch(`https://api.github.com/users/${username}/repos?type=owner&per_page=100`, { headers, next: { revalidate: cacheSeconds }, signal: AbortSignal.timeout(8000) }),
  ]);

  let publicRepositories: number | null = null;
  let stars: number | null = null;
  if (profileResult.status === "fulfilled" && profileResult.value.ok) {
    try {
      const profile: unknown = await profileResult.value.json();
      if (profile && typeof profile === "object" && "public_repos" in profile && Number.isSafeInteger(profile.public_repos) && Number(profile.public_repos) >= 0) {
        publicRepositories = Number(profile.public_repos);
      }
    } catch {
      publicRepositories = null;
    }
  }
  if (reposResult.status === "fulfilled" && reposResult.value.ok) {
    try {
      const repos: unknown = await reposResult.value.json();
      if (Array.isArray(repos) && publicRepositories !== null && repos.length >= publicRepositories && repos.every((repo) => Number.isSafeInteger(repo?.stargazers_count) && repo.stargazers_count >= 0)) {
        stars = repos.reduce((total, repo) => total + repo.stargazers_count, 0);
      }
    } catch {
      stars = null;
    }
  }
  return { publicRepositories, stars };
}

async function authenticatedActivity(): Promise<{ privateRepositories: number | null; contributions: number | null; longestStreak: number | null; days: ContributionDay[] }> {
  const token = process.env.GITHUB_ACTIVITY_TOKEN;
  const unavailable = { privateRepositories: null, contributions: null, longestStreak: null, days: [] };
  if (!token) return unavailable;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { ...headers, Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: "query($login: String!) { viewer { login repositories(first: 1, privacy: PRIVATE) { totalCount } } user(login: $login) { contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount contributionLevel } } } } } }", variables: { login: username } }),
      next: { revalidate: cacheSeconds },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return unavailable;
    const body: unknown = await response.json();
    const data = (body as { data?: { viewer?: { login?: unknown; repositories?: { totalCount?: unknown } }; user?: { contributionsCollection?: { contributionCalendar?: { totalContributions?: unknown; weeks?: { contributionDays?: { date?: unknown; contributionCount?: unknown; contributionLevel?: unknown }[] }[] } } } } })?.data;
    const privateCount = data?.viewer?.repositories?.totalCount;
    const privateRepositories = typeof data?.viewer?.login === "string" && data.viewer.login.toLowerCase() === username.toLowerCase() && Number.isSafeInteger(privateCount) && Number(privateCount) >= 0 ? Number(privateCount) : null;
    const calendar = data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar || !Number.isSafeInteger(calendar.totalContributions) || !Array.isArray(calendar.weeks)) return { ...unavailable, privateRepositories };
    const levels: Record<string, number> = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };
    const days = calendar.weeks.flatMap((week) => week.contributionDays ?? []).map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: levels[String(day.contributionLevel)],
    }));
    if (days.length < 300 || days.some((day) => typeof day.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(day.date) || !Number.isSafeInteger(day.count) || Number(day.count) < 0 || !Number.isInteger(day.level))) {
      return { ...unavailable, privateRepositories };
    }
    let current = 0;
    let longestStreak = 0;
    for (const day of days) {
      current = Number(day.count) > 0 ? current + 1 : 0;
      longestStreak = Math.max(longestStreak, current);
    }
    return { privateRepositories, contributions: Number(calendar.totalContributions), longestStreak, days: days as ContributionDay[] };
  } catch {
    return unavailable;
  }
}

export async function getGitHubActivity(): Promise<GitHubActivityData> {
  const [statistics, activity] = await Promise.all([publicStatistics(), authenticatedActivity()]);
  return { ...statistics, ...activity };
}
