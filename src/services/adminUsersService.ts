export type AdminRow = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
};

export async function fetchAdmins(): Promise<
  { ok: true; items: AdminRow[] } | { ok: false; message: string }
> {
  try {
    const res = await fetch("/api/admin/admins", { credentials: "include" });
    const data = (await res.json()) as { items?: AdminRow[]; error?: string };
    if (!res.ok) {
      return { ok: false, message: data.error ?? "Could not load admins." };
    }
    return { ok: true, items: data.items ?? [] };
  } catch {
    return { ok: false, message: "Network error." };
  }
}

export async function createAdmin(payload: {
  email: string;
  password: string;
  name: string;
}): Promise<{ ok: true; message: string } | { ok: false; message: string }> {
  try {
    const res = await fetch("/api/admin/admins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    const data = (await res.json()) as { message?: string; error?: string };
    if (!res.ok) {
      return { ok: false, message: data.error ?? "Could not create admin." };
    }
    return { ok: true, message: data.message ?? "Created." };
  } catch {
    return { ok: false, message: "Network error." };
  }
}
