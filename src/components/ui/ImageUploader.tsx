"use client";

import { useCallback, useRef, useState } from "react";
import Toast from "@/components/ui/Toast";
import { uploadAdminImage } from "@/services/adminLandingImagesService";

type ImageUploaderProps = {
  label: string;
  value: string;
  onChange: (nextUrl: string) => void;
  disabled?: boolean;
};

export default function ImageUploader({
  label,
  value,
  onChange,
  disabled,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const dismissToast = useCallback(() => setToastMessage(null), []);

  const onSelectFile = async (file: File | null) => {
    if (!file) return;
    setError("");
    setToastMessage(null);
    setUploading(true);
    try {
      const result = await uploadAdminImage(file);
      if (!result.ok) {
        setError(result.message);
        return;
      }
      onChange(result.imageUrl);
      setToastMessage("Image uploaded successfully.");
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-slate-800">{label}</p>
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={(e) => onSelectFile(e.target.files?.[0] ?? null)}
          disabled={disabled || uploading}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1 file:text-xs file:font-semibold"
        />
        {uploading ? (
          <span className="text-xs text-slate-500">Uploading to Cloudinary…</span>
        ) : value ? (
          <span className="text-xs text-slate-500">
            Choose another file to replace this image.
          </span>
        ) : null}
      </div>

      {value ? (
        // Cloudinary URLs are dynamic and managed by admins.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt={`${label} preview`}
          className="h-24 w-40 rounded-lg border border-slate-200 object-cover"
        />
      ) : null}

      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      {toastMessage ? (
        <Toast
          message={toastMessage}
          variant="success"
          onDismiss={dismissToast}
        />
      ) : null}
    </div>
  );
}
