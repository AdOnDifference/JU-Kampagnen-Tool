import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json();
  const issue = await prisma.issue.update({ where: { id: Number(params.id) }, data });
  return NextResponse.json(issue);
}
