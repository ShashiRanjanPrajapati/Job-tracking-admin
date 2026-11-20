import StatCard from "@/components/molecules/StatCard";
import Skeleton from "@/components/atoms/Skeleton";
import { BriefcaseIcon, ClockIcon, CheckCircleIcon } from "@/components/atoms/Icons";

export default function StatsSection({ stats, loading, activeFilter, onSelectFilter }) {
  const total = stats?.total || 0;
  const applied = stats?.byStatus?.applied || 0;
  const interview = stats?.byStatus?.Interview || 0;
  const offer = stats?.byStatus?.Offer || 0;
  const rejected = stats?.byStatus?.Rejected || 0;

  if (loading) {
    return (
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 bg-white rounded-xl border border-zinc-200/80 shadow-2xs space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-7 w-12" />
            <Skeleton className="h-2.5 w-24" />
          </div>
        ))}
      </section>
    );
  }

  const activePipeline = applied + interview;
  const interviewRate = total > 0 ? Math.round((interview / total) * 100) : 0;

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
      <StatCard
        title="Total Applications"
        count={total}
        description="All recorded companies"
        badgeText={`${activePipeline} active`}
        icon={<BriefcaseIcon className="w-3.5 h-3.5" />}
        active={activeFilter === "all"}
        onClick={() => onSelectFilter("all")}
      />

      <StatCard
        title="Applied"
        count={applied}
        description="Awaiting initial screening"
        badgeText={`${total > 0 ? Math.round((applied / total) * 100) : 0}% of total`}
        icon={<ClockIcon className="w-3.5 h-3.5 text-blue-500" />}
        active={activeFilter === "applied"}
        onClick={() => onSelectFilter("applied")}
      />

      <StatCard
        title="In Interview"
        count={interview}
        description="Active rounds in progress"
        badgeText={`${interviewRate}% conversion`}
        icon={<ClockIcon className="w-3.5 h-3.5 text-amber-500" />}
        active={activeFilter === "Interview"}
        onClick={() => onSelectFilter("Interview")}
      />

      <StatCard
        title="Offers / Closed"
        count={`${offer} / ${rejected}`}
        description={`${offer} Offers • ${rejected} Closed`}
        badgeText={offer > 0 ? `${offer} secured` : undefined}
        icon={<CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500" />}
        active={activeFilter === "Offer" || activeFilter === "Rejected"}
        onClick={() => onSelectFilter("Offer")}
      />
    </section>
  );
}
