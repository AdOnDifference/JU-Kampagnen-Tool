import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const visits = await prisma.visit.count();
  const issuesOpen = await prisma.issue.count({ where: { status: "open" } });
  const issuesDone = await prisma.issue.count({ where: { status: "done" } });
  const lines = ["metric,value",`visits,${visits}`,`issues_open,${issuesOpen}`,`issues_done,${issuesDone}`];
  return new NextResponse(lines.join("\n"), { headers: { "Content-Type": "text/csv" } });
}
