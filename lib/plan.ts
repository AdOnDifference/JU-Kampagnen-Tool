export type SeedSpec = { offsetDays: number; title: string; desc?: string };
export function seedCampaignPlan(eDayISO: string) {
  const eDay = new Date(eDayISO);
  const toISO = (d: Date) => new Date(d).toISOString();
  const add = (d: Date, n: number) => new Date(d.getTime() + n*24*60*60*1000);
  const spec: SeedSpec[] = [
    { offsetDays: -180, title: "Kernbotschaften definieren" },
    { offsetDays: -150, title: "Kandidaten‑Fotos & CI finalisieren" },
    { offsetDays: -120, title: "Haustür‑Routen planen (Walklists)" },
    { offsetDays: -90,  title: "Flyer final + Druck beauftragen" },
    { offsetDays: -75,  title: "Social Content‑Kalender T‑75→E‑Day" },
    { offsetDays: -60,  title: "Pressegespräch/‑hintergrund" },
    { offsetDays: -45,  title: "Plakatierungsplan & Genehmigungen" },
    { offsetDays: -30,  title: "Telefon‑Banking starten" },
    { offsetDays: -14,  title: "Briefwahl‑Push" },
    { offsetDays: -7,   title: "Get‑Out‑The‑Vote Woche" },
    { offsetDays: 0,    title: "E‑Day Logistik & Schichten" },
    { offsetDays: +1,   title: "Danke‑Kommunikation & Debrief" },
  ];
  return spec.map((s, i) => ({
    title: s.title,
    description: s.desc,
    startAt: toISO(add(eDay, s.offsetDays)),
    dueAt: toISO(add(eDay, s.offsetDays + 1)),
    priority: 3,
    status: "todo",
    position: i
  }));
}
