"use client";

import { FormEvent, useEffect, useState } from "react";
import { changeAdminPassword } from "@/services/adminAccountService";
import { fetchAdminMe } from "@/services/adminAuthService";

export default function AdminAccountPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "ok" | "err";
    text: string;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const me = await fetchAdminMe();
      if (!cancelled && me) setEmail(me.email);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (newPassword !== confirmPassword) {
      setFeedback({ type: "err", text: "New passwords do not match." });
      return;
    }

    setSaving(true);
    try {
      const result = await changeAdminPassword({
        currentPassword,
        newPassword,
      });
      if (result.ok) {
        setFeedback({ type: "ok", text: result.message });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setFeedback({ type: "err", text: result.message });
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Account</h1>
      <p className="mt-1 text-sm text-slate-600">
        Signed in as{" "}
        <span className="font-medium text-slate-800">
          {email ?? "…"}
        </span>
      </p>

      <div className="mt-8 max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Change password
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Enter your current password, then choose a new one (at least 8
          characters).
        </p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="current-pw"
              className="mb-1 block text-sm font-medium text-slate-800"
            >
              Current password
            </label>
            <input
              id="current-pw"
              type="password"
              autoComplete="current-password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <div>
            <label
              htmlFor="new-pw"
              className="mb-1 block text-sm font-medium text-slate-800"
            >
              New password
            </label>
            <input
              id="new-pw"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <div>
            <label
              htmlFor="confirm-pw"
              className="mb-1 block text-sm font-medium text-slate-800"
            >
              Confirm new password
            </label>
            <input
              id="confirm-pw"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {feedback ? (
            <p
              className={`rounded-lg px-3 py-2 text-sm ${
                feedback.type === "ok"
                  ? "bg-emerald-50 text-emerald-900"
                  : "bg-red-50 text-red-900"
              }`}
              role="status"
            >
              {feedback.text}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
          >
            {saving ? "Updating…" : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
}
