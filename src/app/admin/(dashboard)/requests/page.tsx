"use client";

import { useCallback, useEffect, useState } from "react";
import Pagination from "@/components/ui/Pagination";
import {
  fetchAdminEnrollments,
  updateEnrollmentStatus,
  type EnrollmentRow,
} from "@/services/adminEnrollmentService";
import {
  ENROLLMENT_STATUSES,
  type EnrollmentStatus,
} from "@/types/enrollment";

const statusLabels: Record<EnrollmentStatus, string> = {
  pending: "Pending",
  contacted: "Contacted",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
};

const PAGE_SIZE_OPTIONS = [10, 15, 25, 50] as const;
const DEFAULT_PAGE_SIZE = 15;

export default function AdminRequestsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{
    type: "ok" | "err";
    text: string;
  } | null>(null);
  const [data, setData] = useState<{
    items: EnrollmentRow[];
    totalPages: number;
    total: number;
  } | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const result = await fetchAdminEnrollments({
      page,
      limit: pageSize,
      status: statusFilter || undefined,
    });
    if (!result.ok) {
      setError(result.message);
      setData(null);
      setLoading(false);
      return;
    }

    const tp = Math.max(1, result.data.totalPages);
    if (page > tp) {
      setPage(tp);
      setLoading(false);
      return;
    }

    setData({
      items: result.data.items,
      totalPages: result.data.totalPages,
      total: result.data.total,
    });
    setLoading(false);
  }, [page, pageSize, statusFilter]);

  useEffect(() => {
    load();
  }, [load]);

  const onStatusChange = async (id: string, next: EnrollmentStatus) => {
    setUpdatingId(id);
    setToast(null);
    try {
      const result = await updateEnrollmentStatus(id, next);
      if (result.ok) {
        setToast({ type: "ok", text: result.message });
        await load();
      } else {
        setToast({ type: "err", text: result.message });
      }
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Requests</h1>
      <p className="mt-1 text-sm text-slate-600">
        All registration form submissions. Update status as you process each
        lead.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <label className="text-sm font-medium text-slate-700">
          Filter:
          <select
            className="ml-2 rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm"
            value={statusFilter}
            onChange={(e) => {
              setPage(1);
              setStatusFilter(e.target.value);
            }}
            disabled={loading}
          >
            <option value="">All statuses</option>
            {ENROLLMENT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {statusLabels[s]}
              </option>
            ))}
          </select>
        </label>
      </div>

      {toast ? (
        <p
          className={`mt-4 rounded-lg px-3 py-2 text-sm ${
            toast.type === "ok"
              ? "bg-emerald-50 text-emerald-900"
              : "bg-red-50 text-red-900"
          }`}
          role="status"
        >
          {toast.text}
        </p>
      ) : null}

      {loading ? (
        <p className="mt-8 text-slate-600">Loading…</p>
      ) : error ? (
        <p className="mt-8 text-red-700">{error}</p>
      ) : data && data.items.length === 0 ? (
        <p className="mt-8 text-slate-600">No requests match this filter.</p>
      ) : data ? (
        <>
          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-3 py-3 font-medium">Parent</th>
                  <th className="px-3 py-3 font-medium">Mobile</th>
                  <th className="px-3 py-3 font-medium">Class</th>
                  <th className="px-3 py-3 font-medium">Wants improvement</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-3 py-3 font-medium">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((row) => (
                  <tr key={row.id} className="border-b border-slate-100">
                    <td className="px-3 py-3 text-slate-900">{row.parentName}</td>
                    <td className="px-3 py-3 text-slate-700">{row.mobile}</td>
                    <td className="max-w-[200px] truncate px-3 py-3 text-slate-700">
                      {row.studentClass || "—"}
                    </td>
                    <td className="px-3 py-3 text-slate-700">
                      {row.wantsImprovement === "yes"
                        ? "Yes"
                        : row.wantsImprovement === "no"
                          ? "No"
                          : "—"}
                    </td>
                    <td className="px-3 py-3">
                      <select
                        className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs"
                        value={row.status}
                        disabled={updatingId === row.id}
                        onChange={(e) =>
                          onStatusChange(
                            row.id,
                            e.target.value as EnrollmentStatus,
                          )
                        }
                      >
                        {ENROLLMENT_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {statusLabels[s]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-slate-600">
                      {new Date(row.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            page={page}
            totalPages={data.totalPages}
            totalItems={data.total}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={(size) => {
              setPage(1);
              setPageSize(size);
            }}
            pageSizeOptions={[...PAGE_SIZE_OPTIONS]}
            disabled={loading}
          />
        </>
      ) : null}
    </div>
  );
}
