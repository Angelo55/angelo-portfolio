import { ArrowUpRight, Flame, Github, GitBranch, LockKeyhole, Star } from "lucide-react";
import { GitHubCalendar } from "@/components/github-calendar";
import { getGitHubActivity } from "@/lib/github-activity";

const profileUrl = "https://github.com/Angelo55";

export function GitHubActivityFallback() {
  return <div className="githubActivityLoading" role="status" aria-label="Loading GitHub activity">
    <div className="githubStatsSkeleton" /><div className="githubCalendarSkeleton" />
  </div>;
}

export async function GitHubActivity() {
  const data = await getGitHubActivity();
  const stats = [
    { label: "Contributions", value: data.contributions, detail: "In the displayed year", icon: GitBranch },
    { label: "Public repositories", value: data.publicRepositories, detail: "On GitHub", icon: Github },
    { label: "Private repositories", value: data.privateRepositories, detail: "Count only · no details", icon: LockKeyhole },
    { label: "Longest streak", value: data.longestStreak, detail: "Within this calendar", icon: Flame, suffix: " days" },
    { label: "Stars earned", value: data.stars, detail: "Owned public repositories", icon: Star },
  ];

  return <div className="githubActivityBody">
    <div className="githubActivityIntro"><div><small>03 / ON GITHUB</small><h2>GitHub activity<span>.</span></h2><p>My contribution history and repository statistics. Private work is shown as a count only.</p></div><a href={profileUrl} target="_blank" rel="noreferrer">Visit @Angelo55 <ArrowUpRight aria-hidden="true" /></a></div>
    <div className="githubStats">{stats.map(({ label, value, detail, icon: Icon, suffix }) => <div className="githubStat" key={label}><span className="githubStatIcon"><Icon aria-hidden="true" /></span><div><small>{label}</small><strong>{value === null ? "—" : `${value.toLocaleString()}${suffix ?? ""}`}</strong><span>{detail}</span></div></div>)}</div>
    {data.days.length ? <GitHubCalendar days={data.days} /> : <div className="githubCalendar githubCalendarEmpty" role="status"><h3>Contribution calendar unavailable</h3><p>My GitHub profile has the latest activity. The calendar will appear here when its secure data connection is available.</p><a href={profileUrl} target="_blank" rel="noreferrer">View activity on GitHub <ArrowUpRight aria-hidden="true" /></a></div>}
    <p className="githubActivityFoot">Available GitHub data refreshes about hourly · <a href={profileUrl} target="_blank" rel="noreferrer">View profile on GitHub</a></p>
  </div>;
}
