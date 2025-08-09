import Link from "next/link";

export function Nav() {
  const items = [
    ["/", "dashboard"],
    ["/plan", "plan"],
    ["/walklists", "walklists"],
    ["/shifts", "shifts"],
    ["/content", "content"],
    ["/budget", "budget"],
    ["/press", "press"],
    ["/settings/campaign", "settings"],
  ] as const;
  return (
    <nav className="flex gap-3 p-3 border-b sticky top-0 bg-white z-10">
      {items.map(([href, label]) => (
        <Link key={href} href={href} className="px-3 py-1 rounded hover:bg-neutral-50">
          {label}
        </Link>
      ))}
    </nav>
  );
}
