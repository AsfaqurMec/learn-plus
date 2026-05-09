"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Modal from "@/components/ui/Modal";
import ImageUploader from "@/components/ui/ImageUploader";
import {
  fetchAdminLandingImages,
  saveAdminLandingImages,
} from "@/services/adminLandingImagesService";
import type { LandingImagesPayload } from "@/types/landingImages";

const INITIAL_FORM: LandingImagesPayload = {
  banner: "",
  parentPainPoints: ["", "", "", ""],
  ourSolution: "",
  beforeAfter: [{ before: "", after: "" }],
  studentBenefit: "",
  forWhom: [{ image: "", title: "" }],
  testimonial: "",
  limitedTimeOffer: "",
  program: "",
};

type ConfirmState =
  | null
  | {
      type: "parentPainPoint" | "beforeAfter" | "forWhom";
      index: number;
    };

export default function AdminImagesPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{
    type: "ok" | "err";
    text: string;
  } | null>(null);
  const [form, setForm] = useState<LandingImagesPayload>(INITIAL_FORM);
  const [confirm, setConfirm] = useState<ConfirmState>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const result = await fetchAdminLandingImages();
    if (!result.ok) {
      setError(result.message);
      setLoading(false);
      return;
    }
    setForm({
      banner: result.item.banner ?? "",
      parentPainPoints:
        result.item.parentPainPoints.length > 0
          ? result.item.parentPainPoints
          : ["", "", "", ""],
      ourSolution: result.item.ourSolution ?? "",
      beforeAfter:
        result.item.beforeAfter.length > 0
          ? result.item.beforeAfter
          : [{ before: "", after: "" }],
      studentBenefit: result.item.studentBenefit ?? "",
      forWhom:
        result.item.forWhom.length > 0
          ? result.item.forWhom
          : [{ image: "", title: "" }],
      testimonial: result.item.testimonial ?? "",
      limitedTimeOffer: result.item.limitedTimeOffer ?? "",
      program: result.item.program ?? "",
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const confirmTitle = useMemo(() => {
    if (!confirm) return "";
    if (confirm.type === "parentPainPoint") return "Remove pain point step?";
    if (confirm.type === "beforeAfter") return "Remove before/after item?";
    return "Remove for whom item?";
  }, [confirm]);

  const onSave = async () => {
    setSaving(true);
    setToast(null);
    try {
      const result = await saveAdminLandingImages(form);
      if (!result.ok) {
        setToast({ type: "err", text: result.message });
        return;
      }
      setToast({ type: "ok", text: result.message });
      await load();
    } finally {
      setSaving(false);
    }
  };

  const applyConfirmedRemove = () => {
    if (!confirm) return;
    const { type, index } = confirm;
    setForm((prev) => {
      if (type === "parentPainPoint") {
        const next = prev.parentPainPoints.filter((_, i) => i !== index);
        return { ...prev, parentPainPoints: next.length ? next : [""] };
      }
      if (type === "beforeAfter") {
        const next = prev.beforeAfter.filter((_, i) => i !== index);
        return {
          ...prev,
          beforeAfter: next.length ? next : [{ before: "", after: "" }],
        };
      }
      const next = prev.forWhom.filter((_, i) => i !== index);
      return {
        ...prev,
        forWhom: next.length ? next : [{ image: "", title: "" }],
      };
    });
    setToast({ type: "ok", text: "Item removed." });
    setConfirm(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Images</h1>
      <p className="mt-1 text-sm text-slate-600">
        Manage landing page section images from one place.
      </p>

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
        <p className="mt-8 text-slate-600">Loading...</p>
      ) : error ? (
        <p className="mt-8 text-red-700">{error}</p>
      ) : (
        <div className="mt-8 space-y-8">
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-900">Banner</h2>
            <div className="mt-4">
              <ImageUploader
                label="Banner image"
                value={form.banner}
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, banner: value }))
                }
                disabled={saving}
              />
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-slate-900">
                Parent Pain Point
              </h2>
              <button
                type="button"
                disabled={saving}
                onClick={() => {
                  setForm((prev) => ({
                    ...prev,
                    parentPainPoints: [...prev.parentPainPoints, ""],
                  }));
                  setToast({ type: "ok", text: "Step added." });
                }}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-800"
              >
                Add step
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {form.parentPainPoints.map((url, index) => (
                <div key={`pain-point-${index}`} className="rounded-lg border border-slate-200 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-800">
                      Step {index + 1}
                    </p>
                    <button
                      type="button"
                      disabled={saving}
                      onClick={() =>
                        setConfirm({ type: "parentPainPoint", index })
                      }
                      className="text-xs font-semibold text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                  <ImageUploader
                    label={`Step ${index + 1} image`}
                    value={url}
                    onChange={(value) =>
                      setForm((prev) => ({
                        ...prev,
                        parentPainPoints: prev.parentPainPoints.map((item, i) =>
                          i === index ? value : item,
                        ),
                      }))
                    }
                    disabled={saving}
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
            <ImageUploader
              label="Our Solution"
              value={form.ourSolution}
              onChange={(value) =>
                setForm((prev) => ({ ...prev, ourSolution: value }))
              }
              disabled={saving}
            />
            <ImageUploader
              label="Student Benefit"
              value={form.studentBenefit}
              onChange={(value) =>
                setForm((prev) => ({ ...prev, studentBenefit: value }))
              }
              disabled={saving}
            />
            <ImageUploader
              label="Testimonial"
              value={form.testimonial}
              onChange={(value) =>
                setForm((prev) => ({ ...prev, testimonial: value }))
              }
              disabled={saving}
            />
            <ImageUploader
              label="Limited Time Offer"
              value={form.limitedTimeOffer}
              onChange={(value) =>
                setForm((prev) => ({ ...prev, limitedTimeOffer: value }))
              }
              disabled={saving}
            />
            <ImageUploader
              label="Program"
              value={form.program}
              onChange={(value) =>
                setForm((prev) => ({ ...prev, program: value }))
              }
              disabled={saving}
            />
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-slate-900">
                Before &amp; After
              </h2>
              <button
                type="button"
                disabled={saving}
                onClick={() => {
                  setForm((prev) => ({
                    ...prev,
                    beforeAfter: [...prev.beforeAfter, { before: "", after: "" }],
                  }));
                  setToast({ type: "ok", text: "Before/after item added." });
                }}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-800"
              >
                Add item
              </button>
            </div>
            <div className="mt-4 space-y-6">
              {form.beforeAfter.map((item, index) => (
                <div key={`before-after-${index}`} className="rounded-lg border border-slate-200 p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-800">
                      Item {index + 1}
                    </p>
                    <button
                      type="button"
                      disabled={saving}
                      onClick={() => setConfirm({ type: "beforeAfter", index })}
                      className="text-xs font-semibold text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <ImageUploader
                      label="Before image"
                      value={item.before}
                      onChange={(value) =>
                        setForm((prev) => ({
                          ...prev,
                          beforeAfter: prev.beforeAfter.map((row, i) =>
                            i === index ? { ...row, before: value } : row,
                          ),
                        }))
                      }
                      disabled={saving}
                    />
                    <ImageUploader
                      label="After image"
                      value={item.after}
                      onChange={(value) =>
                        setForm((prev) => ({
                          ...prev,
                          beforeAfter: prev.beforeAfter.map((row, i) =>
                            i === index ? { ...row, after: value } : row,
                          ),
                        }))
                      }
                      disabled={saving}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-slate-900">For Whom</h2>
              <button
                type="button"
                disabled={saving}
                onClick={() => {
                  setForm((prev) => ({
                    ...prev,
                    forWhom: [...prev.forWhom, { image: "", title: "" }],
                  }));
                  setToast({ type: "ok", text: "For-whom item added." });
                }}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-800"
              >
                Add item
              </button>
            </div>
            <div className="mt-4 space-y-6">
              {form.forWhom.map((item, index) => (
                <div key={`for-whom-${index}`} className="rounded-lg border border-slate-200 p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-800">
                      Item {index + 1}
                    </p>
                    <button
                      type="button"
                      disabled={saving}
                      onClick={() => setConfirm({ type: "forWhom", index })}
                      className="text-xs font-semibold text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="space-y-3">
                    <ImageUploader
                      label="Image"
                      value={item.image}
                      onChange={(value) =>
                        setForm((prev) => ({
                          ...prev,
                          forWhom: prev.forWhom.map((row, i) =>
                            i === index ? { ...row, image: value } : row,
                          ),
                        }))
                      }
                      disabled={saving}
                    />
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-800">
                        Title
                      </label>
                      <input
                        type="text"
                        value={item.title}
                        maxLength={300}
                        disabled={saving}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            forWhom: prev.forWhom.map((row, i) =>
                              i === index
                                ? { ...row, title: e.target.value }
                                : row,
                            ),
                          }))
                        }
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div>
            <button
              type="button"
              disabled={saving}
              onClick={onSave}
              className="rounded-full bg-emerald-600 px-6 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save all images"}
            </button>
          </div>
        </div>
      )}

      <Modal
        open={Boolean(confirm)}
        title={confirmTitle}
        onClose={() => setConfirm(null)}
        primaryButtonLabel="Remove"
        onPrimaryClick={applyConfirmedRemove}
      >
        This action will remove the selected item. You can save the page after
        confirming changes.
      </Modal>
    </div>
  );
}
