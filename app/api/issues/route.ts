import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const issue = await prisma.issue.create({ data });
  return NextResponse.json(issue);
}

export async function GET() {
  const issues = await prisma.issue.findMany();
  return NextResponse.json(issues);
}
