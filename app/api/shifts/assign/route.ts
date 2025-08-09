import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { assignShifts } from "@/lib/shifts";

export const dynamic = "force-dynamic";

type ShiftRow = { id: number };

export async function POST(req: NextRequest) {
  const { campaignId } = await req.json();

  const [vols, shifts]: [any[], ShiftRow[]] = await Promise.all([
    prisma.volunteer.findMany(),
    prisma.shift.findMany({ where: { campaignId } }),
  ]);

  const assigns = assignShifts(vols, shifts);

  await prisma.shiftAssignment.deleteMany({
    where: { shiftId: { in: shifts.map((s: ShiftRow) => s.id) } },
  });
  await prisma.shiftAssignment.createMany({ data: assigns });

  return NextResponse.json({ assigned: assigns.length });
}
