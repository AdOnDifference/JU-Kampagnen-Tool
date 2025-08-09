export function autoPlanContent(eDayISO: string) {
  const e = new Date(eDayISO);
  const mk = (days: number, channel: string, title: string) => ({
    channel,
    title,
    scheduledAt: new Date(e.getTime() + days * 86400000).toISOString(),
  });
  return [
    mk(-60, "instagram", "Team vorstellen"),
    mk(-45, "press", "Themenpresse: Jugend & Vereine"),
    mk(-14, "newsletter", "Briefwahl‑Reminder"),
    mk(-1, "instagram", "E‑Day Call‑to‑Action"),
  ];
}
