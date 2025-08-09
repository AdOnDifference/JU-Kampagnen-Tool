import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// lokale Minimal-Typen (reichen für den Export)
type TaskRow = {
    id: number;
    title: string;
    startAt: Date | null;
    dueAt: Date | null;
};
type ShiftRow = {
    id: number;
    title: string;
    startAt: Date;
    endAt: Date;
};

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const campaignId = Number(searchParams.get("campaignId"));

    const [tasks, shifts]: [TaskRow[], ShiftRow[]] = await Promise.all([
        prisma.task.findMany({ where: { campaignId } }),
        prisma.shift.findMany({ where: { campaignId } }),
    ]);

    const lines: string[] = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//JU Planner//DE"];

    const ve = (uid: string, dtStart: string, dtEnd?: string, summary = "Event") =>
        [
            "BEGIN:VEVENT",
            `UID:${uid}`,
            `DTSTART:${dtStart.replace(/[-:]/g, "").split(".")[0]}Z`,
            dtEnd ? `DTEND:${dtEnd.replace(/[-:]/g, "").split(".")[0]}Z` : undefined,
            `SUMMARY:${summary}`,
            "END:VEVENT",
        ].filter(Boolean) as string[];

    tasks.forEach((t) =>
        lines.push(
            ...ve(
                `task-${t.id}@ju`,
                (t.startAt ?? t.dueAt ?? new Date()).toISOString(),
                t.dueAt ?? undefined ? t.dueAt!.toISOString() : undefined,
                `Task: ${t.title}`
            )
        )
    );

    shifts.forEach((s) =>
        lines.push(
            ...ve(`shift-${s.id}@ju`, s.startAt.toISOString(), s.endAt.toISOString(), `Schicht: ${s.title}`)
        )
    );

    lines.push("END:VCALENDAR");

    return new NextResponse(lines.join("\r\n"), {
        headers: {
            "Content-Type": "text/calendar; charset=utf-8",
            "Content-Disposition": 'attachment; filename="campaign.ics"',
        },
    });
}