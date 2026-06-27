// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useState } from "react";
// import { adminLogout } from "@/services/adminAuthService";
// import Image from "next/image";
// import logo from "../../../../public/logo2.png";

// const nav = [
//   { href: "/admin", label: "Overview" },
//   { href: "/admin/requests", label: "Requests" },
//   { href: "/admin/images", label: "Images" },
//   { href: "/admin/admins", label: "Admins" },
//   { href: "/admin/account", label: "Account" },
// ];

// export default function AdminShell({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [busy, setBusy] = useState(false);

//   const onLogout = async () => {
//     setBusy(true);
//     try {
//       await adminLogout();
//       router.push("/admin/login");
//       router.refresh();
//     } finally {
//       setBusy(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900">
//       <div className="flex min-h-screen">
//         <aside className="hidden w-56 shrink-0 border-r border-slate-200 bg-white md:flex md:flex-col">
//           <div className="border-b border-slate-200 px-4 py-4">
//             {/* <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
//               Admin
//             </p> */}
//             <a href="/" className="inline-flex items-center gap-2 rounded-lg outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300">
//               <Image
//                 src={logo}
//                 alt="Learn Plus logo"
//                 width={100}
//                 height={100}
//                 sizes="160px"
//                 className="h-12 w-40 rounded-sm"
//               />
//             </a>
//           </div>
//           <nav className="flex flex-1 flex-col gap-1 p-3">
//             {nav.map((item) => {
//               const active =
//                 item.href === "/admin"
//                   ? pathname === "/admin"
//                   : pathname === item.href ||
//                     pathname.startsWith(`${item.href}/`);
//               return (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
//                     active
//                       ? "bg-emerald-600 text-white"
//                       : "text-slate-700 hover:bg-slate-100"
//                   }`}
//                 >
//                   {item.label}
//                 </Link>
//               );
//             })}
//           </nav>
//           <div className="border-t border-slate-200 p-3">
//             <button
//               type="button"
//               disabled={busy}
//               onClick={onLogout}
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 disabled:opacity-50 cursor-pointer hover:bg-red-400"
//             >
//               {busy ? "Signing out…" : "Log out"}
//             </button>
//           </div>
//         </aside>

//         <div className="flex min-w-0 flex-1 flex-col">
//           <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden">
//             <p className="text-sm font-semibold text-slate-900">Admin</p>
//             <button
//               type="button"
//               disabled={busy}
//               onClick={onLogout}
//               className="text-sm font-medium text-emerald-700"
//             >
//               Log out
//             </button>
//           </header>
//           <div className="border-b border-slate-200 bg-white px-4 py-3 md:hidden">
//             <div className="flex flex-wrap gap-2">
//               {nav.map((item) => (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-800"
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </div>
//           </div>
//           <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import logo from "../../../../public/logo2.png";
import { adminLogout } from "@/services/adminAuthService";

const nav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/requests", label: "Requests" },
  { href: "/admin/images", label: "Images" },
  { href: "/admin/admins", label: "Admins" },
  { href: "/admin/account", label: "Account" },
];

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [busy, setBusy] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const onLogout = async () => {
    setBusy(true);

    try {
      await adminLogout();
      setDrawerOpen(false);
      router.push("/admin/login");
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        {/* ================= Desktop Sidebar ================= */}
        <aside className="hidden w-56 shrink-0 border-r border-slate-200 bg-white md:flex md:flex-col">
          <div className="border-b border-slate-200 px-4 py-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
            >
              <Image
                src={logo}
                alt="Learn Plus logo"
                width={160}
                height={48}
                className="h-12 w-40 rounded-sm"
              />
            </Link>
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
              className="w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 transition hover:bg-red-500 hover:text-white disabled:opacity-50"
            >
              {busy ? "Signing out..." : "Log out"}
            </button>
          </div>
        </aside>

        {/* ================= Main Content ================= */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Mobile Header */}
          <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden">
            <div className="flex items-center">
            <button
              onClick={() => setDrawerOpen(true)}
              className="rounded-lg p-2 transition hover:bg-slate-100 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <Link href="/">
              <Image
                src={logo}
                alt="Logo"
                width={80}
                height={80}
                className="h-8 w-auto rounded-sm"
              />
            </Link>
            </div>
            <button
              onClick={onLogout}
              disabled={busy}
              className="w-16 rounded-lg bg-red-500 py-2 text-xs font-medium text-white transition hover:bg-red-600 disabled:opacity-50 cursor-pointer"
            >
              Log out
            </button>
          </header>

          {/* Overlay */}
          <div
            onClick={() => setDrawerOpen(false)}
            className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
              drawerOpen
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          />

          {/* Mobile Drawer */}
          <aside
            className={`fixed left-0 top-0 z-50 flex h-full w-72 flex-col bg-white shadow-xl transition-transform duration-300 md:hidden ${
              drawerOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-200 p-4">
              <Link href="/" onClick={() => setDrawerOpen(false)}>
                <Image
                  src={logo}
                  alt="Logo"
                  width={140}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>

              <button
                onClick={() => setDrawerOpen(false)}
                className="rounded-lg p-2 text-xl hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-2 p-4">
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
                    onClick={() => setDrawerOpen(false)}
                    className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
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

            <div className="border-t border-slate-200 p-4">
              <button
                onClick={onLogout}
                disabled={busy}
                className="w-full rounded-lg bg-red-500 py-3 text-sm font-medium text-white transition hover:bg-red-600 disabled:opacity-50 cursor-pointer"
              >
                {busy ? "Signing out..." : "Log out"}
              </button>
            </div>
          </aside>

          {/* Page */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}