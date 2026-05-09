"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { adminLogout } from "@/services/adminAuthService";

const nav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/requests", label: "Requests" },
  { href: "/admin/images", label: "Images" },
  { href: "/admin/admins", label: "Admins" },
  { href: "/admin/account", label: "Account" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const onLogout = async () => {
    setBusy(true);
    try {
      await adminLogout();
      router.push("/admin/login");
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-56 shrink-0 border-r border-slate-200 bg-white md:flex md:flex-col">
          <div className="border-b border-slate-200 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Admin
            </p>
            <p className="text-sm font-bold text-slate-900">Learn Plus</p>
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-3">
            {nav.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-emerald-600 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-slate-200 p-3">
            <button
              type="button"
              disabled={busy}
              onClick={onLogout}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 disabled:opacity-50"
            >
              {busy ? "Signing out…" : "Log out"}
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden">
            <p className="text-sm font-semibold text-slate-900">Admin</p>
            <button
              type="button"
              disabled={busy}
              onClick={onLogout}
              className="text-sm font-medium text-emerald-700"
            >
              Log out
            </button>
          </header>
          <div className="border-b border-slate-200 bg-white px-4 py-3 md:hidden">
            <div className="flex flex-wrap gap-2">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-800"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
