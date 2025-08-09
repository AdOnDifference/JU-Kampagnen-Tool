import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const lists = await prisma.walklist.findMany({ include: { items: true } });
  return NextResponse.json(lists);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const wl = await prisma.walklist.create({ data });
  return NextResponse.json(wl);
}
