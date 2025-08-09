"use client";
import { useState } from "react";

export default function CampaignSettings() {
  const [name, setName] = useState("Kommunalwahl 2026");
  const [eDay, setEDay] = useState("");
  const [guidelines, setGuidelines] = useState("Respektvoll, lösungsorientiert, junge Impulse.");

  async function seed() {
    const ymd = eDay.trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(ymd)) {
      alert("Bitte Datum im Format JJJJ-MM-TT wählen.");
      return;
    }
    const res = await fetch("/api/campaign/seed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, eDayISO: ymd, guidelines }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      alert(`Fehler: ${data.error || res.statusText}`);
      return;
    }
    alert(`Kampagne #${data.campaignId} mit ${data.tasksCreated} Tasks angelegt.`);
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Kampagne</h2>
      <div className="grid gap-3 max-w-xl">
        <label className="label">Name</label>
        <input className="input" value={name} onChange={e => setName(e.target.value)} />
        <label className="label">E-Day</label>
        <input type="date" className="input" value={eDay} onChange={e => setEDay(e.target.value)} />
        <label className="label">Leitlinien</label>
        <textarea className="input" rows={4} value={guidelines} onChange={e => setGuidelines(e.target.value)} />
        <button className="btn mt-2" onClick={seed}>Plan vom E-Day erzeugen</button>
      </div>
    </div>
  );
}
