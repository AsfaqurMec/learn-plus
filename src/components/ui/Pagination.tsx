"use client";

import { useEffect, useState } from "react";

export type PaginationProps = {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  disabled?: boolean;
};

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export default function Pagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 15, 25, 50],
  disabled,
}: PaginationProps) {
  const [goToValue, setGoToValue] = useState(String(page));

  useEffect(() => {
    setGoToValue(String(page));
  }, [page]);

  if (totalItems === 0) {
    return null;
  }

  const safeTotalPages = Math.max(1, totalPages);
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);
  const showPageControls = safeTotalPages > 1;

  const submitGoTo = () => {
    const n = Number.parseInt(goToValue, 10);
    if (!Number.isFinite(n)) return;
    onPageChange(clamp(n, 1, safeTotalPages));
  };

  return (
    <div className="flex flex-col gap-4 border-t border-slate-200 pt-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">
          Showing{" "}
          <span className="font-medium text-slate-900">{start}</span>
          {"–"}
          <span className="font-medium text-slate-900">{end}</span>
          {" of "}
          <span className="font-medium text-slate-900">{totalItems}</span>
        </p>

        {onPageSizeChange ? (
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <span className="whitespace-nowrap">Rows per page</span>
            <select
              value={pageSize}
              disabled={disabled}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 disabled:opacity-50"
            >
              {pageSizeOptions.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
        ) : null}
      </div>

      {showPageControls ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-1">
            <button
              type="button"
              disabled={disabled || page <= 1}
              onClick={() => onPageChange(1)}
              className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-800 disabled:opacity-40 sm:text-sm"
              title="First page"
            >
              First
            </button>
            <button
              type="button"
              disabled={disabled || page <= 1}
              onClick={() => onPageChange(page - 1)}
              className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-800 disabled:opacity-40 sm:text-sm"
            >
              Prev
            </button>
            <span className="px-2 text-sm text-slate-600">
              Page {page} of {safeTotalPages}
            </span>
            <button
              type="button"
              disabled={disabled || page >= safeTotalPages}
              onClick={() => onPageChange(page + 1)}
              className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-800 disabled:opacity-40 sm:text-sm"
            >
              Next
            </button>
            <button
              type="button"
              disabled={disabled || page >= safeTotalPages}
              onClick={() => onPageChange(safeTotalPages)}
              className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-800 disabled:opacity-40 sm:text-sm"
              title="Last page"
            >
              Last
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-slate-600">Go to</span>
            <input
              type="number"
              min={1}
              max={safeTotalPages}
              value={goToValue}
              disabled={disabled || safeTotalPages <= 1}
              onChange={(e) => setGoToValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  submitGoTo();
                }
              }}
              className="w-16 rounded-lg border border-slate-300 px-2 py-1.5 text-sm disabled:opacity-40"
              aria-label="Page number"
            />
            <button
              type="button"
              disabled={disabled || safeTotalPages <= 1}
              onClick={submitGoTo}
              className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-900 disabled:opacity-40 sm:text-sm"
            >
              Go
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
