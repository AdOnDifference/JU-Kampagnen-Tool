import { prisma } from "@/lib/prisma";

export default async function Plan() {
  const campaign = await prisma.campaign.findFirst({ include: { tasks: true } });
  if (!campaign) {
    return <div className="text-neutral-600">Noch keine Kampagne – unter Settings anlegen.</div>;
  }
  const tasks = campaign.tasks.sort((a,b)=> (a.startAt?.toString()||'').localeCompare(b.startAt?.toString()||''));
  // very simple "gantt" grid by date stripes
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Timeline: {campaign.name}</h2>
      <div className="grid gap-2">
        {tasks.map(t => (
          <div key={t.id} className="card">
            <div className="font-medium">{t.title}</div>
            <div className="text-sm text-neutral-600">
              {t.startAt?.toISOString().slice(0,10)} → {t.dueAt?.toISOString().slice(0,10)} · Status: {t.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
