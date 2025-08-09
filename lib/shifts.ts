export function assignShifts(volunteers: any[], shifts: any[]) {
  const count: Record<number, number> = {};
  volunteers.forEach(v => (count[v.id] = 0));
  const byNeed = [...shifts].sort((a, b) => a.needed - b.needed);
  const assigns: { volunteerId: number; shiftId: number }[] = [];
  for (const s of byNeed) {
    const pool = volunteers
      .filter(v => (v.avail || []).length === 0 || (v.avail || []).some(() => true)) // placeholder
      .sort((a, b) => count[a.id] - count[b.id]);
    for (const v of pool) {
      if (assigns.filter(x => x.shiftId === s.id).length >= s.needed) break;
      assigns.push({ volunteerId: v.id, shiftId: s.id });
      count[v.id]++;
    }
  }
  return assigns;
}
