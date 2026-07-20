"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Building2,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LockKeyhole,
  Map,
  Settings,
  Sparkles
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/properties", label: "Properties", icon: Building2 },
  { href: "/pipeline", label: "Pipeline", icon: ClipboardList },
  { href: "/maps", label: "Maps", icon: Map },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/admin", label: "Admin", icon: Settings }
];

export function NavShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-field text-ink">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-line bg-paper lg:block">
        <div className="flex h-full flex-col">
          <Link href="/" className="flex items-center gap-3 border-b border-line px-5 py-5">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-ink text-white">
              <Sparkles size={20} aria-hidden="true" />
            </span>
            <span>
              <span className="block text-lg font-semibold leading-tight">JengaWise</span>
              <span className="text-xs text-ink/60">Real estate intelligence</span>
            </span>
          </Link>

          <nav className="flex-1 space-y-1 px-3 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-moss text-white shadow-sm"
                      : "text-ink/72 hover:bg-field hover:text-ink"
                  }`}
                >
                  <Icon size={18} aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-line p-4">
            <Link
              href="/auth"
              className="flex items-center justify-between rounded-md border border-line bg-field px-3 py-2.5 text-sm font-medium text-ink transition hover:border-moss"
            >
              <span className="flex items-center gap-2">
                <LockKeyhole size={16} aria-hidden="true" />
                Analyst sign in
              </span>
            </Link>
          </div>
        </div>
      </aside>

      <header className="sticky top-0 z-10 border-b border-line bg-paper/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-ink text-white">
              <Sparkles size={18} aria-hidden="true" />
            </span>
            JengaWise
          </Link>
          <Link href="/auth" className="rounded-md border border-line p-2" aria-label="Sign in">
            <LockKeyhole size={18} aria-hidden="true" />
          </Link>
        </div>
        <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-xs font-medium ${
                  active ? "bg-moss text-white" : "bg-field text-ink/70"
                }`}
              >
                <Icon size={15} aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="lg:pl-64">{children}</main>
    </div>
  );
}
