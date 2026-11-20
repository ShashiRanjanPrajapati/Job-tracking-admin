import Button from "@/components/atoms/Button";
import { RefreshIcon } from "@/components/atoms/Icons";

export default function ErrorBanner({ message, onRetry }) {
  if (!message) return null;

  return (
    <div className="bg-rose-50/70 border border-rose-200/80 rounded-xl p-3.5 text-rose-900 flex items-center justify-between gap-3 shadow-2xs">
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
        <p className="text-xs font-medium truncate">{message}</p>
      </div>

      {onRetry && (
        <Button
          variant="secondary"
          size="xs"
          onClick={onRetry}
          icon={<RefreshIcon className="w-3 h-3" />}
          className="shrink-0 bg-white"
        >
          Retry
        </Button>
      )}
    </div>
  );
}
