type AccordionSectionProps = {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
    rightContent?: React.ReactNode;
  };
  
 export default function AccordionSection({
    title,
    isOpen,
    onToggle,
    children,
    rightContent,
  }: AccordionSectionProps) {
    return (
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <button
            type="button"
            onClick={onToggle}
            className="flex flex-1 items-center justify-between text-left cursor-pointer"
          >
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
  
            <svg
              className={`h-6 w-6 border-1 rounded-sm transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
  
          {rightContent && (
            <div
              className="ml-4"
              onClick={(e) => e.stopPropagation()}
            >
              {rightContent}
            </div>
          )}
        </div>
  
        {isOpen && <div className="p-5">{children}</div>}
      </section>
    );
  }