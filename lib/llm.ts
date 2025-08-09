// Stub für LLM-Aufrufe. Hier kannst du OpenAI/Responses API einbinden.
export async function generateAB(topic: string, audience: string, tone: string) {
  const variantA = `Variante A – ${topic} für ${audience} (${tone})`;
  const variantB = `Variante B – ${topic} für ${audience} (${tone})`;
  return { variantA, variantB };
}

export async function generatePressDraft(outlet: string, occasion: string) {
  return {
    subject: `[Presse] ${occasion}`,
    intro: `Worum geht's, warum lokal relevant.`,
    quote: `"Wir freuen uns...",\n— Vorname Nachname`,
    closing: `Kontakt: ...`,
  };
}
