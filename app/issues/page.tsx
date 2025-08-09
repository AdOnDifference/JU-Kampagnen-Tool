import { prisma } from "@/lib/prisma";

export default async function Issues() {
  const [open, done] = await Promise.all([
    prisma.issue.findMany({ where: { status: "open" } }),
    prisma.issue.findMany({ where: { status: "done" } }),
  ]);
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <h3 className="font-medium mb-2">Offen</h3>
        <div className="grid gap-2">{open.map(i => <div key={i.id} className="card">{i.title}</div>)}</div>
      </div>
      <div>
        <h3 className="font-medium mb-2">Erledigt</h3>
        <div className="grid gap-2">{done.map(i => <div key={i.id} className="card">{i.title}</div>)}</div>
      </div>
    </div>
  );
}
