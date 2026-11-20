import Button from "@/components/atoms/Button";
import { BriefcaseIcon, PlusIcon } from "@/components/atoms/Icons";

export default function EmptyState({
  title = "No applications found",
  description = "No items match your selected filters.",
  actionLabel,
  onAction,
}) {
  return (
    <div className="py-20 px-4 text-center max-w-sm mx-auto flex flex-col items-center">
      <div className="w-12 h-12 rounded-xl bg-zinc-100/80 border border-zinc-200/60 flex items-center justify-center text-zinc-400 mb-4 shadow-2xs">
        <BriefcaseIcon className="w-6 h-6 stroke-[1.5]" />
      </div>

      <h3 className="text-sm font-semibold text-zinc-900 tracking-tight">
        {title}
      </h3>
      <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
        {description}
      </p>

      {actionLabel && onAction && (
        <div className="mt-5">
          <Button
            variant="primary"
            size="sm"
            onClick={onAction}
            icon={<PlusIcon className="w-3.5 h-3.5" />}
          >
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
