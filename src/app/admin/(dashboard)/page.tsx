"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchAdminStats } from "@/services/adminStatsService";

export default function AdminOverviewPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);
  const [byStatus, setByStatus] = useState<Record<string, number>>({});
  const [recent, setRecent] = useState<
    Array<{
      id: string;
      parentName: string;
      mobile: string;
      status: string;
      createdAt: string;
    }>
  >([]);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const result = await fetchAdminStats();
    if (!result.ok) {
      setError(result.message);
      setLoading(false);
      return;
    }
    setTotal(result.data.total);
    setByStatus(result.data.byStatus);
    setRecent(result.data.recent);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const statusLabels: Record<string, string> = {
    pending: "Pending",
    contacted: "Contacted",
    confirmed: "Confirmed",
    cancelled: "Cancelled",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Overview</h1>
      <p className="mt-1 text-sm text-slate-600">
        Registration requests at a glance.
      </p>

      {loading ? (
        <p className="mt-8 text-slate-600">Loading…</p>
      ) : error ? (
        <p className="mt-8 text-red-700">{error}</p>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Total
              </p>
              <p className="mt-1 text-3xl font-bold text-slate-900">{total}</p>
            </div>
            {Object.entries(byStatus).map(([key, n]) => (
              <div
                key={key}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase text-slate-500">
                  {statusLabels[key] ?? key}
                </p>
                <p className="mt-1 text-3xl font-bold text-slate-900">{n}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="text-lg font-semibold text-slate-900">
              Recent requests
            </h2>
            <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 font-medium">Parent</th>
                    <th className="px-4 py-3 font-medium">Mobile</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-6 text-center text-slate-500"
                      >
                        No registrations yet.
                      </td>
                    </tr>
                  ) : (
                    recent.map((r) => (
                      <tr key={r.id} className="border-b border-slate-100">
                        <td className="px-4 py-3 text-slate-900">
                          {r.parentName}
                        </td>
                        <td className="px-4 py-3 text-slate-700">{r.mobile}</td>
                        <td className="px-4 py-3">
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-800">
                            {statusLabels[r.status] ?? r.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {new Date(r.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
