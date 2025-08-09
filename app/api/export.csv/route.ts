import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const visits = await prisma.visit.findMany({ include: { contact: true } });
  const lines = ["name,street,postalCode,city,outcome,followUp,createdAt"];
  for (const v of visits) {
    lines.push([
      v.contact?.name ?? "",
      v.contact?.street ?? "",
      v.contact?.postalCode ?? "",
      v.contact?.city ?? "",
      v.outcome,
      v.followUp,
      v.createdAt.toISOString()
    ].map(x => `"${String(x).replaceAll('"','""')}"`).join(","));
  }
  return new NextResponse(lines.join("\n"), { headers: { "Content-Type": "text/csv" } });
}
