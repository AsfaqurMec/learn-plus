export type IconPoint = {
  icon: string;
  text: string;
};

export type FeatureItem = {
  icon: string;
  title: string;
  description: string;
};

export type TestimonialItem = {
  name: string;
  role: string;
  quote: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ForWhomItem = {
  title: string;
  imageSrc: string;
  imageAlt: string;
};

export const heroPoints: IconPoint[] = [
  { icon: "✍️", text: "২৫ দিনের structured handwriting transformation" },
  { icon: "📘", text: "প্রতিদিন গাইডেড practice routine" },
  { icon: "🎯", text: "পরীক্ষার খাতায় neat presentation focus" },
];

export const problemPoints: string[] = [
  "লেখা পরিষ্কার নয়, তাই teacher দ্রুত বুঝতে পারেন না",
  "অক্ষরের shape ও spacing ঠিক না থাকায় খাতা অগোছালো লাগে",
  "ভালো জানলেও handwriting-এর কারণে marks কমে যায়",
  "খাতা সুন্দর না হওয়ায় আত্মবিশ্বাস কমে যায়",
];

export const programFeatures: FeatureItem[] = [
  {
    icon: "🗓️",
    title: "২৫ দিনের Step-by-Step Plan",
    description: "প্রতিদিনের ছোট ছোট টাস্কে ধারাবাহিক উন্নতি হয়।",
  },
  {
    icon: "✏️",
    title: "Daily Handwriting Exercise",
    description: "নির্দিষ্ট সময়ের practice routine ফলো করে পরিবর্তন আসে।",
  },
  {
    icon: "📄",
    title: "Special Worksheet Support",
    description: "Worksheet-based guidance-এ letter control দ্রুত improve হয়।",
  },
  {
    icon: "👩‍🏫",
    title: "Expert Guideline",
    description: "পরীক্ষিত guideline-এ ভুলগুলো ঠিক করার clear direction থাকে।",
  },
  {
    icon: "📐",
    title: "Spacing & Presentation Training",
    description: "লাইন, margin, শব্দের দূরত্ব সুন্দরভাবে maintain করতে শেখানো হয়।",
  },
  {
    icon: "💪",
    title: "Confidence Building Practice",
    description: "নিজের লেখার উন্নতি দেখে শিক্ষার্থীর আত্মবিশ্বাস বাড়ে।",
  },
];

export const benefits: IconPoint[] = [
  { icon: "✅", text: "খাতা হবে neat, clean ও visually attractive" },
  { icon: "✅", text: "Teacher-এর কাছে better impression তৈরি হবে" },
  { icon: "✅", text: "Exam copy হবে আরও readable ও score-friendly" },
  { icon: "✅", text: "Writing speed ও presentation-এ balanced উন্নতি আসবে" },
  { icon: "✅", text: "শিক্ষার্থীর confidence ও writing discipline বাড়বে" },
];

export const forWhom: ForWhomItem[] = [
  {
    title: "স্কুলপড়ুয়া শিক্ষার্থী",
    imageSrc: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
    imageAlt: "ক্লাসে লেখার অনুশীলন করছে স্কুলপড়ুয়া শিক্ষার্থী",
  },
  {
    title: "যাদের handwriting অগোছালো",
    imageSrc: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8",
    imageAlt: "অগোছালো handwriting ঠিক করার অনুশীলন",
  },
  {
    title: "যাদের exam copy presentation weak",
    imageSrc: "https://images.unsplash.com/photo-1544717305-2782549b5136",
    imageAlt: "পরীক্ষার খাতা presentation উন্নত করার প্রস্তুতি",
  },
  {
    title: "যাদের writing neat ও attractive করতে হবে",
    imageSrc: "https://images.unsplash.com/photo-1513258496099-48168024aec0",
    imageAlt: "neat ও আকর্ষণীয় writing practice",
  },
  {
    title: "parents যারা সন্তানের লেখার মান উন্নত করতে চান",
    imageSrc: "https://images.unsplash.com/photo-1516627145497-ae6968895b74",
    imageAlt: "parent সন্তানের লেখার উন্নতির জন্য সহায়তা করছেন",
  },
];

export const testimonials: TestimonialItem[] = [
  {
    name: "মাহিনুর ইসলাম",
    role: "Parent",
    quote:
      "মাত্র কয়েকদিনের মধ্যেই আমার সন্তানের লেখায় দৃশ্যমান পরিবর্তন এসেছে। এখন খাতা অনেক পরিষ্কার ও সুন্দর লাগে।",
  },
  {
    name: "সাবরিন আক্তার",
    role: "Parent",
    quote:
      "আগে লেখার spacing ঠিক থাকত না। এখন নিয়মিত practice করার ফলে লেখা balanced হয়েছে, teacher-ও প্রশংসা করেছেন।",
  },
  {
    name: "রিদওয়ান হাসান",
    role: "Student",
    quote:
      "এই program-এর worksheet follow করে লিখতে খুব easy লেগেছে। এখন নিজের handwriting দেখে ভালো লাগে।",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "Program টি কত দিনের?",
    answer: "এটি ২৫ দিনের structured handwriting improvement program।",
  },
  {
    question: "কাদের জন্য উপযোগী?",
    answer:
      "স্কুলপড়ুয়া শিক্ষার্থীদের জন্য, বিশেষ করে যাদের handwriting neat ও readable করতে হবে।",
  },
  {
    question: "কীভাবে practice করানো হবে?",
    answer:
      "নির্দিষ্ট guideline, daily worksheet এবং ধাপে ধাপে exercise-এর মাধ্যমে practice করানো হবে।",
  },
  {
    question: "Online না Offline?",
    answer:
      "Program টি online guidance format-এ পরিচালিত হয়; worksheet ও নির্দেশনা digitalভাবে দেওয়া হয়।",
  },
  {
    question: "Parent support লাগবে কি?",
    answer:
      "প্রথম দিকে parent-এর short monitoring থাকলে student দ্রুত routine ধরে ফেলতে পারে।",
  },
];
