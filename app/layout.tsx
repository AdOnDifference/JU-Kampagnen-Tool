import "./globals.css";
import { Nav } from "@/components/Nav";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body>
        <Nav />
        <div className="container py-6">{children}</div>
      </body>
    </html>
  );
}
