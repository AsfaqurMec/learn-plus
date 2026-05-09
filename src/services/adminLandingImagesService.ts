import type { LandingImagesPayload } from "@/types/landingImages";

export type LandingImagesResponse = LandingImagesPayload & {
  updatedAt: string | null;
};

export async function fetchAdminLandingImages(): Promise<
  { ok: true; item: LandingImagesResponse } | { ok: false; message: string }
> {
  try {
    const res = await fetch("/api/admin/landing-images", {
      credentials: "include",
    });
    const data = (await res.json()) as { item?: LandingImagesResponse; error?: string };
    if (!res.ok || !data.item) {
      return { ok: false, message: data.error ?? "Could not load images." };
    }
    return { ok: true, item: data.item };
  } catch {
    return { ok: false, message: "Network error." };
  }
}

export async function saveAdminLandingImages(
  payload: LandingImagesPayload,
): Promise<{ ok: true; message: string } | { ok: false; message: string }> {
  try {
    const res = await fetch("/api/admin/landing-images", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    const data = (await res.json()) as { message?: string; error?: string };
    if (!res.ok) {
      return { ok: false, message: data.error ?? "Could not save images." };
    }
    return { ok: true, message: data.message ?? "Saved." };
  } catch {
    return { ok: false, message: "Network error." };
  }
}

export async function uploadAdminImage(
  file: File,
): Promise<{ ok: true; imageUrl: string } | { ok: false; message: string }> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/uploads/image", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = (await res.json()) as {
      imageUrl?: string;
      error?: string;
      message?: string;
    };

    if (!res.ok || !data.imageUrl) {
      return { ok: false, message: data.error ?? "Image upload failed." };
    }

    return { ok: true, imageUrl: data.imageUrl };
  } catch {
    return { ok: false, message: "Network error." };
  }
}
