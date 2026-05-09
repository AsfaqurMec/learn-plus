export async function changeAdminPassword(payload: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ ok: true; message: string } | { ok: false; message: string }> {
  try {
    const res = await fetch("/api/admin/me/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    const data = (await res.json()) as { message?: string; error?: string };
    if (!res.ok) {
      return {
        ok: false,
        message: data.error ?? "Could not update password.",
      };
    }
    return {
      ok: true,
      message: data.message ?? "Password updated.",
    };
  } catch {
    return { ok: false, message: "Network error." };
  }
}
