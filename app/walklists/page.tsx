import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Walklists() {
  const lists = await prisma.walklist.findMany({ include: { items: true } });
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Walklists</h2>
      <div className="grid gap-3">
        {lists.map(l => (
          <Link key={l.id} href={`/walklists/${l.id}`} className="card hover:shadow-md">
            <div className="font-medium">{l.title}</div>
            <div className="text-sm text-neutral-600">{l.items.length} Haushalte</div>
          </Link>
        ))}
        {lists.length === 0 && <div className="text-neutral-600">Noch keine Walklists – füge Kontakte in der DB hinzu.</div>}
      </div>
    </div>
  );
}
