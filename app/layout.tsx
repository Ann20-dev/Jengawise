import "mapbox-gl/dist/mapbox-gl.css";
import type { Metadata } from "next";
import "./globals.css";
import { NavShell } from "@/components/NavShell";

export const metadata: Metadata = {
  title: "JengaWise | Real Estate Intelligence",
  description: "AI-powered real estate supply, demand, and pipeline intelligence."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavShell>{children}</NavShell>
      </body>
    </html>
  );
}
