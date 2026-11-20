import { useState } from "react";
import FormField from "@/components/molecules/FormField";
import Button from "@/components/atoms/Button";

const STATUS_OPTIONS = [
  { value: "applied", label: "Applied" },
  { value: "Interview", label: "Interview" },
  { value: "Offer", label: "Offer" },
  { value: "Rejected", label: "Rejected" },
];

export default function ApplicationModal({
  isOpen,
  onClose,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "applied",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.company.trim() || !formData.role.trim()) {
      setError("Company and Role are both required.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");
      await onSubmit(formData);
      setFormData({ company: "", role: "", status: "applied" });
      onClose();
    } catch (err) {
      setError(err.message || "Failed to save application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">New Job Application</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl font-semibold leading-none cursor-pointer"
          >
            &times;
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <FormField
            label="Company Name"
            placeholder="e.g. Google, Stripe, Netflix"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            required
          />

          <FormField
            label="Role / Title"
            placeholder="e.g. Senior Backend Engineer"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            required
          />

          <FormField
            label="Initial Status"
            type="select"
            options={STATUS_OPTIONS}
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          />

          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
            <Button variant="ghost" size="sm" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" loading={isSubmitting}>
              Save to MySQL
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
