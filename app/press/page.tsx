import { prisma } from "@/lib/prisma";

export default async function Press() {
  const contacts = await prisma.pressContact.findMany();
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Presse</h2>
      <div className="grid gap-2">
        {contacts.map(c => (
          <div key={c.id} className="card">
            <div className="font-medium">{c.outlet}</div>
            <div className="text-sm">{c.name} · {c.email}</div>
          </div>
        ))}
        {contacts.length === 0 && <div className="text-neutral-600">Keine Presse‑Kontakte angelegt.</div>}
      </div>
    </div>
  );
}
