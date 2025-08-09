"use client";
import { useState } from "react";

export default function FlyerLab() {
  const [topic, setTopic] = useState("Sportplätze & Vereine stärken");
  const [audience, setAudience] = useState("Eltern & Ehrenamtliche");
  const [tone, setTone] = useState("positiv, konkret");
  const [out, setOut] = useState<{variantA?:string;variantB?:string}>({});

  async function generate() {
    const res = await fetch("/api/flyer/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, audience, tone }),
    });
    setOut(await res.json());
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Flyer‑Lab (A/B Generator)</h2>
      <div className="grid gap-3 max-w-xl">
        <input className="input" value={topic} onChange={e=>setTopic(e.target.value)} />
        <input className="input" value={audience} onChange={e=>setAudience(e.target.value)} />
        <input className="input" value={tone} onChange={e=>setTone(e.target.value)} />
        <button className="btn" onClick={generate}>Generieren</button>
      </div>
      {out.variantA && (
        <div className="grid gap-3 md:grid-cols-2">
          <div className="card"><div className="font-medium mb-2">Variante A</div><p>{out.variantA}</p></div>
          <div className="card"><div className="font-medium mb-2">Variante B</div><p>{out.variantB}</p></div>
        </div>
      )}
    </div>
  );
}
