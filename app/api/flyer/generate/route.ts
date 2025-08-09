import { NextRequest, NextResponse } from "next/server";
import { generateAB } from "@/lib/llm";

export async function POST(req: NextRequest) {
  const { topic, audience, tone } = await req.json();
  const { variantA, variantB } = await generateAB(topic, audience, tone);
  return NextResponse.json({ variantA, variantB });
}
