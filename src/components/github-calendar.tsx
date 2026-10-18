"use client";

import { useRef, useState } from "react";
import type { ContributionDay } from "@/lib/github-activity";

export function GitHubCalendar({ days }: { days: ContributionDay[] }) {
  const [selected, setSelected] = useState(days.length - 1);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const first = days[0]?.date;
  const last = days[days.length - 1]?.date;
  const firstWeekday = first ? new Date(`${first}T00:00:00Z`).getUTCDay() : 0;

  function move(index: number) {
    const next = Math.max(0, Math.min(days.length - 1, index));
    setSelected(next);
    buttons.current[next]?.focus();
  }

  return <div className="githubCalendar">
    <div className="githubCalendarTop"><h3>Contribution calendar</h3><span>{first} – {last}</span></div>
    <p className="githubCalendarHint">Select a day for its count. Use arrow keys to explore.</p>
    <div className="githubCalendarScroll" role="group" aria-label="GitHub contributions by day">
      <div className="githubCalendarGrid">
        {days.map((day, index) => <button
          key={day.date}
          ref={(element) => { buttons.current[index] = element; }}
          type="button"
          className={`githubDay githubLevel${day.level}${selected === index ? " githubDaySelected" : ""}`}
          style={{ gridColumn: Math.floor((index + firstWeekday) / 7) + 1, gridRow: new Date(`${day.date}T00:00:00Z`).getUTCDay() + 1 }}
          aria-label={`${day.count} ${day.count === 1 ? "contribution" : "contributions"} on ${day.date}`}
          aria-pressed={selected === index}
          tabIndex={selected === index ? 0 : -1}
          title={`${day.count} contributions on ${day.date}`}
          onClick={() => setSelected(index)}
          onKeyDown={(event) => {
            const offset = event.key === "ArrowRight" ? 7 : event.key === "ArrowLeft" ? -7 : event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0;
            if (offset) { event.preventDefault(); move(index + offset); }
          }}
        />)}
      </div>
    </div>
    <div className="githubCalendarBottom"><p aria-live="polite">{days[selected]?.count ?? 0} contributions on {days[selected]?.date ?? "this day"}</p><span className="githubLegend" aria-hidden="true">Less <i /><i /><i /><i /><i /> More</span></div>
  </div>;
}
