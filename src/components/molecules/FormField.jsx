import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";

export default function FormField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  options,
  error,
  required = false,
  className = "",
  helperText,
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-xs font-medium text-zinc-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      {type === "select" ? (
        <Select
          options={options}
          value={value}
          onChange={onChange}
          className="w-full text-xs"
        />
      ) : (
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          error={!!error}
        />
      )}

      {helperText && !error && (
        <p className="text-[11px] text-zinc-400">{helperText}</p>
      )}

      {error && <p className="text-[11px] text-rose-600 font-medium">{error}</p>}
    </div>
  );
}
