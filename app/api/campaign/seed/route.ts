import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { seedCampaignPlan } from "@/lib/plan";

export async function POST(req: NextRequest) {
  const { name, eDayISO, guidelines } = await req.json();
  const campaign = await prisma.campaign.create({ data: { name, eDay: new Date(eDayISO), guidelines } });
  const tasks = seedCampaignPlan(eDayISO).map(t => ({ ...t, campaignId: campaign.id }));
  await prisma.task.createMany({ data: tasks });
  return NextResponse.json({ campaignId: campaign.id, tasksCreated: tasks.length });
}
