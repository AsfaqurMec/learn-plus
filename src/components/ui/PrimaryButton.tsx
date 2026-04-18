type PrimaryButtonProps = {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
};

export default function PrimaryButton({
  href,
  label,
  className = "",
  onClick,
}: PrimaryButtonProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`btn-shine inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition duration-300 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-emerald-600 ${className}`}
    >
      {label}
    </a>
  );
}
