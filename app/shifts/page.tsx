"use client";
import { useState } from "react";

export default function Shifts() {
  const [campaignId, setCampaignId] = useState(1);
  async function assign() {
    const res = await fetch("/api/shifts/assign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ campaignId }),
    });
    const data = await res.json();
    alert(`Zuteilungen erstellt: ${data.assigned}`);
  }
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Schichtplanung</h2>
      <div className="flex gap-2 items-end">
        <div>
          <div className="label">Kampagnen‑ID</div>
          <input className="input w-32" type="number" value={campaignId} onChange={e=>setCampaignId(parseInt(e.target.value||"1",10))} />
        </div>
        <button className="btn" onClick={assign}>Auto‑Zuteilen</button>
      </div>
    </div>
  );
}
