import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { seedCampaignPlan } from "@/lib/plan";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { name, eDayISO, guidelines } = await req.json();

    if (typeof eDayISO !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(eDayISO)) {
      return NextResponse.json({ error: "Invalid E-Day format (YYYY-MM-DD)" }, { status: 400 });
    }

    const date = new Date(`${eDayISO}T00:00:00.000Z`);
    if (Number.isNaN(date.getTime())) {
      return NextResponse.json({ error: "Invalid E-Day date" }, { status: 400 });
    }

    const campaign = await prisma.campaign.create({
      data: { name, eDay: date, guidelines },
    });

    const tasks = seedCampaignPlan(date.toISOString()).map(t => ({ ...t, campaignId: campaign.id }));
    await prisma.task.createMany({ data: tasks });

    return NextResponse.json({ campaignId: campaign.id, tasksCreated: tasks.length });
  } catch (err: any) {
    console.error("seed error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
