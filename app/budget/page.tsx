import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function toEuro(cents: number) {
  return (cents/100).toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

export default async function Budget() {
  const camp = await prisma.campaign.findFirst({ include: { budgets: true } });
  const planned = (camp?.budgets||[]).reduce((a,b)=>a+b.planned,0);
  const actual = (camp?.budgets||[]).reduce((a,b)=>a+b.actual,0);
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Budget</h2>
      <div className="grid md:grid-cols-3 gap-3">
        <div className="card"><div className="text-sm text-neutral-600">Geplant</div><div className="text-xl">{toEuro(planned)}</div></div>
        <div className="card"><div className="text-sm text-neutral-600">Ist</div><div className="text-xl">{toEuro(actual)}</div></div>
        <div className="card"><div className="text-sm text-neutral-600">Varianz</div><div className="text-xl">{toEuro(planned-actual)}</div></div>
      </div>
    </div>
  );
}
