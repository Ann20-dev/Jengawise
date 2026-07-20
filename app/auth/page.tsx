import Link from "next/link";
import { ArrowRight, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase";

export default function AuthPage() {
  return (
    <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
      <section>
        <p className="text-sm font-semibold uppercase tracking-normal text-moss">Access control</p>
        <h1 className="mt-2 max-w-2xl text-3xl font-semibold text-ink sm:text-4xl">
          Secure workspace for developers, lenders, investors, and planning teams.
        </h1>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {["Deal teams", "Credit analysts", "County planners"].map((role) => (
            <div key={role} className="rounded-lg border border-line bg-paper p-4">
              <ShieldCheck size={18} className="text-moss" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-ink">{role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-line bg-paper p-6 shadow-panel">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-md bg-ink text-white">
            <LockKeyhole size={20} aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-xl font-semibold text-ink">Sign in</h2>
            <p className="text-sm text-ink/60">
              {isSupabaseConfigured ? "Supabase is configured." : "Connect Supabase env vars to enable live auth."}
            </p>
          </div>
        </div>

        <form className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-semibold text-ink">Email</span>
            <span className="mt-2 flex h-11 items-center gap-2 rounded-md border border-line bg-field px-3">
              <Mail size={17} className="text-ink/45" aria-hidden="true" />
              <input
                type="email"
                placeholder="analyst@jengawise.co"
                className="w-full bg-transparent text-sm outline-none placeholder:text-ink/40"
              />
            </span>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-ink">Password</span>
            <input
              type="password"
              placeholder="Password"
              className="mt-2 h-11 w-full rounded-md border border-line bg-field px-3 text-sm outline-none placeholder:text-ink/40"
            />
          </label>

          <button
            type="button"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-white hover:bg-moss"
          >
            Continue
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-ink/62">
          Return to <Link href="/" className="font-semibold text-moss">dashboard</Link>
        </p>
      </section>
    </div>
  );
}
