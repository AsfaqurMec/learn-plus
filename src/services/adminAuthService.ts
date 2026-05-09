export type AdminUser = {
  id: string;
  email: string;
  name: string;
};

export type LoginResult =
  | { ok: true; admin: AdminUser; message: string }
  | { ok: false; message: string };

export async function adminLogin(
  email: string,
  password: string,
): Promise<LoginResult> {
  try {
    const res = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    const data = (await res.json()) as {
      message?: string;
      error?: string;
      admin?: AdminUser;
    };
    if (!res.ok) {
      return { ok: false, message: data.error ?? "Could not sign in." };
    }
    if (!data.admin) {
      return { ok: false, message: "Invalid response from server." };
    }
    return {
      ok: true,
      admin: data.admin,
      message: data.message ?? "Signed in.",
    };
  } catch {
    return { ok: false, message: "Network error. Try again." };
  }
}

export async function adminLogout(): Promise<{ ok: boolean; message: string }> {
  try {
    const res = await fetch("/api/admin/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    const data = (await res.json()) as { message?: string };
    return { ok: res.ok, message: data.message ?? "Signed out." };
  } catch {
    return { ok: false, message: "Network error." };
  }
}

export async function fetchAdminMe(): Promise<AdminUser | null> {
  try {
    const res = await fetch("/api/admin/me", { credentials: "include" });
    if (!res.ok) return null;
    const data = (await res.json()) as { admin?: AdminUser };
    return data.admin ?? null;
  } catch {
    return null;
  }
}
