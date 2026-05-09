import type { Metadata } from "next";
import RegistrationForm from "@/modules/registration/components/RegistrationForm";

export const metadata: Metadata = {
  title: "ভর্তি ফর্ম | Learn Plus",
  description:
    "২৫ দিনের Handwriting Beautiful Program — রেজিস্ট্রেশন ফর্ম।",
};

export default function RegisterPage() {
  return <RegistrationForm />;
}
