export type EnrollmentPayload = {
  parentName: string;
  mobile: string;
  studentClass: string;
  wantsImprovement: "yes" | "no";
};

export type EnrollmentResult =
  | { ok: true; message: string }
  | { ok: false; message: string };

export async function submitEnrollment(
  payload: EnrollmentPayload,
): Promise<EnrollmentResult> {
  try {
    const res = await fetch("/api/enrollment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await res.json()) as { message?: string; error?: string };

    if (!res.ok) {
      return {
        ok: false,
        message: data.error ?? "Something went wrong. Please try again.",
      };
    }

    return {
      ok: true,
      message: data.message ?? "Registration submitted successfully.",
    };
  } catch {
    return {
      ok: false,
      message: "Network error. Please check your connection and try again.",
    };
  }
}
