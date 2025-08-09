import { NextRequest, NextResponse } from "next/server";
import { generatePressDraft } from "@/lib/llm";

export async function POST(req: NextRequest) {
  const { outlet, occasion } = await req.json();
  const draft = await generatePressDraft(outlet, occasion);
  return NextResponse.json(draft);
}
