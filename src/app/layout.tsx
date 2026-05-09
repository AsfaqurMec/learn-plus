import type { Metadata } from "next";
import { Geist, Noto_Serif_Bengali } from "next/font/google";
import AosProvider from "@/components/ui/AosProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const notoSerifBengali = Noto_Serif_Bengali({
  variable: "--font-noto-serif-bengali",
  subsets: ["bengali", "latin"],
  weight: "variable",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Learn Plus | Handwriting Program",
  description:
    "২৫ দিনের Handwriting Beautiful Program - সুন্দর, পরিপাটি ও আকর্ষণীয় হাতের লেখা গড়ার সম্পূর্ণ গাইডেড কোর্স।",
  icons: {
    icon: [{ url: "/fav.jpg", type: "image/jpeg" }],
    apple: [{ url: "/fav.jpg", type: "image/jpeg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${notoSerifBengali.variable} ${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full text-emerald-950">
        <AosProvider />
        {children}
      </body>
    </html>
  );
}
