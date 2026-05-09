export type AdminStats = {
  total: number;
  byStatus: Record<string, number>;
  recent: Array<{
    id: string;
    parentName: string;
    mobile: string;
    status: string;
    createdAt: string;
  }>;
};

export async function fetchAdminStats(): Promise<
  { ok: true; data: AdminStats } | { ok: false; message: string }
> {
  try {
    const res = await fetch("/api/admin/stats", { credentials: "include" });
    const data = (await res.json()) as AdminStats & { error?: string };
    if (!res.ok) {
      return { ok: false, message: data.error ?? "Could not load overview." };
    }
    return {
      ok: true,
      data: {
        total: data.total,
        byStatus: data.byStatus,
        recent: data.recent,
      },
    };
  } catch {
    return { ok: false, message: "Network error." };
  }
}
