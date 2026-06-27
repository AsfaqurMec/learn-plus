import type { EnrollmentStatus } from "@/types/enrollment";

export type EnrollmentRow = {
  id: string;
  parentName: string;
  mobile: string;
  studentClass: string;
  wantsImprovement: "yes" | "no" | null;
  status: EnrollmentStatus;
  createdAt: string;
  updatedAt: string;
};

export type EnrollmentListResult = {
  items: EnrollmentRow[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export async function fetchAdminEnrollments(params: {
  page?: number;
  limit?: number;
  status?: string;
}): Promise<{ ok: true; data: EnrollmentListResult } | { ok: false; message: string }> {
  try {
    const sp = new URLSearchParams();
    if (params.page) sp.set("page", String(params.page));
    if (params.limit) sp.set("limit", String(params.limit));
    if (params.status) sp.set("status", params.status);
    const res = await fetch(`/api/admin/enrollments?${sp.toString()}`, {
      credentials: "include",
    });
    const data = (await res.json()) as EnrollmentListResult & { error?: string };
    if (!res.ok) {
      return { ok: false, message: data.error ?? "Could not load requests." };
    }
    return {
      ok: true,
      data: {
        items: data.items,
        page: data.page,
        limit: data.limit,
        total: data.total,
        totalPages: data.totalPages,
      },
    };
  } catch {
    return { ok: false, message: "Network error." };
  }
}

export async function updateEnrollmentStatus(
  id: string,
  status: EnrollmentStatus,
): Promise<{ ok: true; message: string } | { ok: false; message: string }> {
  try {
    const res = await fetch(`/api/admin/enrollments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
      credentials: "include",
    });
    const data = (await res.json()) as { message?: string; error?: string };
    if (!res.ok) {
      return { ok: false, message: data.error ?? "Update failed." };
    }
    return { ok: true, message: data.message ?? "Updated." };
  } catch {
    return { ok: false, message: "Network error." };
  }
}


export async function deleteEnrollment(id: string) {
  try {
    const res = await fetch(`/api/admin/enrollments/delete/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        ok: false,
        message: data.message || "Failed to delete request",
      };
    }

    return {
      ok: true,
      message: data.message || "Request deleted successfully",
    };
  } catch {
    return {
      ok: false,
      message: "Something went wrong.",
    };
  }
}
