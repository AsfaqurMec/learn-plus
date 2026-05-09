"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Modal from "@/components/ui/Modal";
import {
  submitEnrollment,
  type EnrollmentPayload,
} from "@/services/enrollmentService";

type FormValues = Omit<EnrollmentPayload, "wantsImprovement"> & {
  wantsImprovement: "" | "yes" | "no";
};

const initial: FormValues = {
  parentName: "",
  mobile: "",
  studentClass: "",
  wantsImprovement: "",
};

export default function RegistrationForm() {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [feedback, setFeedback] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedback("");

    if (values.wantsImprovement !== "yes" && values.wantsImprovement !== "no") {
      setStatus("error");
      setFeedback("প্রশ্নের উত্তর হ্যাঁ অথবা না নির্বাচন করুন।");
      return;
    }

    setStatus("loading");
    try {
      const result = await submitEnrollment({
        parentName: values.parentName,
        mobile: values.mobile,
        studentClass: values.studentClass,
        wantsImprovement: values.wantsImprovement,
      });
      if (result.ok) {
        setStatus("success");
        setFeedback("");
        setValues(initial);
        setSuccessModalOpen(true);
      } else {
        setStatus("error");
        setFeedback(result.message);
      }
    } catch {
      setStatus("error");
      setFeedback("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-full pb-14 text-emerald-950 md:pb-0">
      <header className="border-b border-emerald-200/80 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="text-sm font-semibold text-emerald-800 transition hover:text-emerald-600"
          >
            ← হোম
          </Link>
        </div>
      </header>

      <main className="relative overflow-hidden px-4 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-teal-300/25 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(16, 185, 129, 0.15) 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative mx-auto max-w-lg">
          <div className="mb-8 text-center">
            <p className="mb-3 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xl font-semibold text-emerald-800">
              ফর্ম
            </p>
            <h1 className="text-balance text-2xl font-bold text-emerald-950 sm:text-3xl">
              ২৫ দিনের হাতের লেখা প্রোগ্রামে রেজিস্ট্রেশন
            </h1>
            <p className="mt-3 text-base leading-7 text-emerald-800/90">
              নিচের তথ্যগুলো পূরণ করুন। আমরা শীঘ্রই যোগাযোগ করব।
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-white/95 p-6 shadow-[0_28px_55px_-38px_rgba(6,78,59,0.45)] ring-1 ring-emerald-100/80 backdrop-blur-sm sm:p-8">
            <form className="space-y-5" onSubmit={onSubmit} noValidate>
              <div>
                <label
                  htmlFor="reg-parent"
                  className="mb-1.5 block text-sm font-semibold text-emerald-950"
                >
                  অভিভাবকের নাম
                </label>
                <input
                  id="reg-parent"
                  name="parentName"
                  type="text"
                  autoComplete="name"
                  required
                  value={values.parentName}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, parentName: e.target.value }))
                  }
                  className="w-full rounded-xl border border-emerald-200 bg-emerald-50/40 px-4 py-3 text-emerald-950 outline-none transition placeholder:text-emerald-800/40 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/25"
                  placeholder="অভিভাবকের পূর্ণ নাম"
                />
              </div>
              <div>
                <label
                  htmlFor="reg-mobile"
                  className="mb-1.5 block text-sm font-semibold text-emerald-950"
                >
                  মোবাইল নম্বর
                </label>
                <input
                  id="reg-mobile"
                  name="mobile"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={values.mobile}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, mobile: e.target.value }))
                  }
                  className="w-full rounded-xl border border-emerald-200 bg-emerald-50/40 px-4 py-3 text-emerald-950 outline-none transition placeholder:text-emerald-800/40 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/25"
                  placeholder="01XXXXXXXXX"
                />
              </div>
              <div>
                <label
                  htmlFor="reg-class"
                  className="mb-1.5 block text-sm font-semibold text-emerald-950"
                >
                  শিক্ষার্থীর শ্রেণি
                </label>
                <input
                  id="reg-class"
                  name="studentClass"
                  type="text"
                  autoComplete="off"
                  required
                  value={values.studentClass}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, studentClass: e.target.value }))
                  }
                  className="w-full rounded-xl border border-emerald-200 bg-emerald-50/40 px-4 py-3 text-emerald-950 outline-none transition placeholder:text-emerald-800/40 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/25"
                  placeholder="যেমন: ৫ম শ্রেণি"
                />
              </div>

              <fieldset className="space-y-3">
                <legend className="mb-1.5 text-sm font-semibold text-emerald-950">
                  আপনি কি চান আপনার সন্তানের হাতের লেখা সুন্দর হোক এবং সে পরীক্ষায়
                  ভালো নম্বর পাক?
                </legend>
                <div className="flex flex-wrap gap-4">
                  <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-emerald-900">
                    <input
                      type="radio"
                      name="wantsImprovement"
                      value="yes"
                      checked={values.wantsImprovement === "yes"}
                      onChange={() =>
                        setValues((v) => ({ ...v, wantsImprovement: "yes" }))
                      }
                      className="h-4 w-4 border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    হ্যাঁ
                  </label>
                  <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-emerald-900">
                    <input
                      type="radio"
                      name="wantsImprovement"
                      value="no"
                      checked={values.wantsImprovement === "no"}
                      onChange={() =>
                        setValues((v) => ({ ...v, wantsImprovement: "no" }))
                      }
                      className="h-4 w-4 border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    না
                  </label>
                </div>
              </fieldset>

              {feedback && status !== "success" ? (
                <p
                  role="status"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-900"
                >
                  {feedback}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-shine w-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition duration-300 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-emerald-600 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {status === "loading" ? "জমা দেওয়া হচ্ছে…" : "জমা দিন"}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Modal
        open={successModalOpen}
        title="ফর্ম জমা হয়েছে"
        primaryButtonLabel="হোম পেজে যান"
        onClose={() => {
          setSuccessModalOpen(false);
          setStatus("idle");
          setFeedback("");
        }}
        onPrimaryClick={() => {
          setSuccessModalOpen(false);
          setStatus("idle");
          setFeedback("");
          router.push("/");
        }}
      >
        <p className="space-y-2">
          <span className="block">
            আপনার ফর্ম সফলভাবে জমা হয়েছে। ধন্যবাদ!
          </span>
          <span className="block text-emerald-800/95">
            আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
          </span>
        </p>
      </Modal>
    </div>
  );
}
