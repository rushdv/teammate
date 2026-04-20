"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, XCircle, Info } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type StatusType = "idle" | "info" | "success" | "error";

export default function UnassignedForm() {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [statusType, setStatusType] = useState<StatusType>("idle");
  const [statusMessage, setStatusMessage] = useState(
    "If you don't have a team yet, join the unassigned list."
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setStatusType("error");
      setStatusMessage("Please enter your name.");
      return;
    }

    setSubmitting(true);
    setStatusType("info");
    setStatusMessage("Adding you to the unassigned list...");

    try {
      const res = await fetch("/api/unassigned", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatusType("success");
        setStatusMessage("You have been added to the unassigned list.");
        setName("");
      } else {
        throw new Error(data.message || "Failed to add to list");
      }
    } catch (err) {
      console.error(err);
      setStatusType("error");
      setStatusMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const announcementStyles = {
    idle: "border-slate-700/60 bg-slate-900/60",
    info: "border-slate-600/80 bg-slate-900/70",
    success: "border-emerald-500/70 bg-emerald-900/30 text-emerald-100 shadow-lg shadow-emerald-500/20",
    error: "border-red-500/70 bg-red-900/30 text-red-100 shadow-lg shadow-red-500/20",
  };

  const StatusIcon = () => {
    switch (statusType) {
      case "success": return <CheckCircle2 className="h-5 w-5 text-emerald-400" />;
      case "error": return <XCircle className="h-5 w-5 text-red-400" />;
      case "info": return <Loader2 className="h-5 w-5 text-slate-400 animate-spin" />;
      default: return <Info className="h-5 w-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-4 lg:border-l lg:border-slate-800/70 lg:pl-6">
      <h2 className="text-lg font-medium text-slate-100">Don’t have a team yet?</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-200">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={submitting}
            placeholder="Enter your full name"
            className="w-full rounded-2xl bg-slate-900/70 border border-slate-700/80 px-4 py-2.5 text-sm placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-accent-400 focus:ring-2 focus:ring-accent-500/70 shadow-sm disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="relative inline-flex items-center justify-center w-full px-5 py-2.5 text-sm font-medium rounded-2xl overflow-hidden border border-slate-600/80 bg-slate-900/80 text-slate-100 shadow-md transition-all duration-200 hover:-translate-y-[1px] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-500/80 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span className="relative flex items-center gap-2">
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Adding...</span>
              </>
            ) : (
              <span>Join Unassigned List</span>
            )}
          </span>
        </button>
      </form>

      <section className={cn(
        "mt-2 rounded-2xl border px-4 py-3 text-xs sm:text-sm flex items-start gap-3 transition-all duration-300",
        announcementStyles[statusType]
      )}>
        <div className="mt-[1px]">
          <StatusIcon />
        </div>
        <div className="space-y-1">
          <p className="font-medium">
            {statusType === "success" ? "Added to unassigned list" :
             statusType === "error" ? "Failed to add" :
             statusType === "info" ? "Processing..." : "Unassigned info"}
          </p>
          <p className="text-slate-200/90">{statusMessage}</p>
        </div>
      </section>
    </div>
  );
}
