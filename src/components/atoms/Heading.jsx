export default function Heading({
  level = 1,
  children,
  className = "",
}) {
  const styles = {
    1: "text-lg sm:text-xl font-semibold text-zinc-900 tracking-tight",
    2: "text-base font-semibold text-zinc-900 tracking-tight",
    3: "text-sm font-medium text-zinc-900",
    4: "text-xs font-semibold text-zinc-700 uppercase tracking-wider",
  };

  const Tag = `h${level}`;

  return <Tag className={`${styles[level] || styles[1]} ${className}`}>{children}</Tag>;
}
