import Link from "next/link";

function Card({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link href={href} className="card block hover:shadow-md">
      <div className="text-lg font-medium">{title}</div>
      <div className="text-sm text-neutral-600">{desc}</div>
    </Link>
  );
}

export default function Page() {
  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-semibold">JU Kampagnen‑Kit</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card href="/walklists" title="Walklists" desc="Haustür‑Routen planen & abarbeiten" />
        <Card href="/issues" title="Anliegen" desc="Offen/Erledigt im Blick" />
        <Card href="/flyer-lab" title="Flyer‑Lab" desc="A/B‑Texte generieren" />
      </div>
    </main>
  );
}
