import { prisma } from "@/lib/prisma";

export default async function Content() {
  const campaign = await prisma.campaign.findFirst({ include: { contents: true } });
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Content‑Kalender</h2>
      {!campaign && <div className="text-neutral-600">Noch keine Kampagne – unter Settings anlegen.</div>}
      {campaign && (
        <div className="grid gap-2">
          {campaign.contents.map(i => (
            <div key={i.id} className="card flex justify-between">
              <div>
                <div className="font-medium">{i.channel}: {i.title}</div>
                <div className="text-sm text-neutral-600">Status: {i.status}</div>
              </div>
              <div className="text-sm">{i.scheduledAt?.toISOString().slice(0,10)}</div>
            </div>
          ))}
          {campaign.contents.length === 0 && <div className="text-neutral-600">Noch keine Items.</div>}
        </div>
      )}
    </div>
  );
}
