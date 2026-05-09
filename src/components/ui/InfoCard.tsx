import { aosInit } from "@/utils/aosClass";

type InfoCardProps = {
  icon: string;
  title: string;
  description: string;
  delay?: number;
};

export default function InfoCard({
  icon,
  title,
  description,
  delay = 0,
}: InfoCardProps) {
  return (
    <article
      data-aos="zoom-in-up"
      data-aos-delay={delay}
      className={aosInit(
        "hover-lift rounded-2xl border border-emerald-200 bg-white/90 p-5 shadow-sm",
      )}
    >
      <p className="mb-3 text-2xl">{icon}</p>
      <h3 className="mb-2 text-lg font-semibold text-emerald-950">{title}</h3>
      <p className="text-sm leading-6 text-emerald-800/90">{description}</p>
    </article>
  );
}
