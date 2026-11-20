import { SearchIcon, CloseIcon } from "@/components/atoms/Icons";
import Select from "@/components/atoms/Select";

export default function SearchBar({
  searchTerm,
  onSearchChange,
  sortOption,
  onSortChange,
}) {
  return (
    <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
      {/* Search Input with Icon */}
      <div className="relative min-w-[200px] sm:min-w-[240px]">
        <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-zinc-400">
          <SearchIcon className="w-3.5 h-3.5" />
        </div>
        <input
          type="text"
          placeholder="Search companies or roles..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full text-xs rounded-lg border border-zinc-200/90 pl-8 pr-7 py-1.5 bg-white text-zinc-900 placeholder:text-zinc-400 hover:border-zinc-300 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900/10 shadow-2xs transition-all duration-150"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer p-0.5"
            title="Clear search"
          >
            <CloseIcon className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Sort Select */}
      <div className="flex items-center gap-1.5 shrink-0 text-xs text-zinc-500">
        <span className="font-medium text-[11px] uppercase tracking-wider text-zinc-400">
          Sort:
        </span>
        <Select
          size="sm"
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
          options={[
            { value: "default", label: "Default" },
            { value: "date", label: "Date Applied" },
          ]}
        />
      </div>
    </div>
  );
}
