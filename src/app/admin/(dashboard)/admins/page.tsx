"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { createAdmin, fetchAdmins } from "@/services/adminUsersService";
import type { AdminRow } from "@/services/adminUsersService";

export default function AdminAdminsPage() {
  const [items, setItems] = useState<AdminRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{
    type: "ok" | "err";
    text: string;
  } | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const result = await fetchAdmins();
    if (!result.ok) {
      setError(result.message);
      setItems([]);
    } else {
      setItems(result.items);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onCreate = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setToast(null);
    try {
      const result = await createAdmin({ email, password, name });
      if (result.ok) {
        setToast({ type: "ok", text: result.message });
        setEmail("");
        setPassword("");
        setName("");
        await load();
      } else {
        setToast({ type: "err", text: result.message });
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Admins</h1>
      <p className="mt-1 text-sm text-slate-600">
        Accounts that can access this dashboard.
      </p>

      <div className="mt-8 max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Add admin</h2>
        <form className="mt-4 space-y-3" onSubmit={onCreate}>
          <div>
            <label
              htmlFor="new-name"
              className="mb-1 block text-sm font-medium text-slate-800"
            >
              Display name (optional)
            </label>
            <input
              id="new-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="new-email"
              className="mb-1 block text-sm font-medium text-slate-800"
            >
              Email
            </label>
            <input
              id="new-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="new-password"
              className="mb-1 block text-sm font-medium text-slate-800"
            >
              Password (min 8 characters)
            </label>
            <input
              id="new-password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          {toast ? (
            <p
              className={`rounded-lg px-3 py-2 text-sm ${
                toast.type === "ok"
                  ? "bg-emerald-50 text-emerald-900"
                  : "bg-red-50 text-red-900"
              }`}
              role="status"
            >
              {toast.text}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            {saving ? "Creating…" : "Create admin"}
          </button>
        </form>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-slate-900">All admins</h2>
        {loading ? (
          <p className="mt-4 text-slate-600">Loading…</p>
        ) : error ? (
          <p className="mt-4 text-red-700">{error}</p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {items.map((a) => (
                  <tr key={a.id} className="border-b border-slate-100">
                    <td className="px-4 py-3 text-slate-900">{a.email}</td>
                    <td className="px-4 py-3 text-slate-700">{a.name || "—"}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {new Date(a.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
