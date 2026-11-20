import { useState, useEffect } from "react";
import FormField from "@/components/molecules/FormField";
import Button from "@/components/atoms/Button";
import { CloseIcon, BriefcaseIcon } from "@/components/atoms/Icons";

const STATUS_OPTIONS = [
  { value: "applied", label: "Applied" },
  { value: "Interview", label: "Interview" },
  { value: "Offer", label: "Offer" },
  { value: "Rejected", label: "Rejected" },
];

export default function ApplicationDrawer({
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

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.company.trim() || !formData.role.trim()) {
      setError("Both Company and Role are required.");
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
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-zinc-900/30 backdrop-blur-2xs transition-opacity duration-200 animate-in fade-in"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-zinc-200 shadow-xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="px-6 py-5 border-b border-zinc-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200/80 flex items-center justify-center text-zinc-700">
                <BriefcaseIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 tracking-tight">
                  New Job Application
                </h3>
                <p className="text-xs text-zinc-400">
                  Track a new company and role in MySQL
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
              title="Close (Esc)"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Form Body */}
          <form id="drawer-form" onSubmit={handleSubmit} className="p-6 space-y-5 flex-1 overflow-y-auto">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200/80 rounded-lg text-rose-700 text-xs font-medium">
                {error}
              </div>
            )}

            <FormField
              label="Company Name"
              placeholder="e.g. Stripe, Linear, Apple"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
              helperText="The organization or startup you applied to"
            />

            <FormField
              label="Role / Title"
              placeholder="e.g. Senior Frontend Engineer"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
              helperText="Job title or seniority level"
            />

            <FormField
              label="Pipeline Stage"
              type="select"
              options={STATUS_OPTIONS}
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              helperText="Select the current stage of this application"
            />
          </form>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-zinc-200/80 bg-zinc-50/50 flex items-center justify-between">
            <span className="text-[11px] text-zinc-400">Press Esc to exit</span>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={onClose} type="button">
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                type="submit"
                form="drawer-form"
                loading={isSubmitting}
              >
                Save Application
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
