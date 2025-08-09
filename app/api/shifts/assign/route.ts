import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { assignShifts } from "@/lib/shifts";

export async function POST(req: NextRequest) {
  const { campaignId } = await req.json();
  const [vols, shifts] = await Promise.all([
    prisma.volunteer.findMany(),
    prisma.shift.findMany({ where: { campaignId } }),
  ]);
  const assigns = assignShifts(vols, shifts);
  await prisma.shiftAssignment.deleteMany({
    where: { shiftId: { in: shifts.map((s: { id: number }) => s.id) } },
  });
  await prisma.shiftAssignment.createMany({ data: assigns });
  return NextResponse.json({ assigned: assigns.length });
}
