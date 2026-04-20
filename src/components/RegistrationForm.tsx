"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, XCircle, Info } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MEMBER_LABELS = ["1st member", "2nd member", "3rd member"];

type StatusType = "idle" | "info" | "success" | "error";

export default function RegistrationForm() {
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState(["", "", ""]);
  const [submitting, setSubmitting] = useState(false);
  const [statusType, setStatusType] = useState<StatusType>("idle");
  const [statusMessage, setStatusMessage] = useState(
    "Register your team to join the portal."
  );

  const isLocked = statusType === "success";

  const handleMemberChange = (index: number, value: string) => {
    const next = [...members];
    next[index] = value;
    setMembers(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!teamName.trim()) {
      setStatusType("error");
      setStatusMessage("Please fill in your team name.");
      return;
    }

    setSubmitting(true);
    setStatusType("info");
    setStatusMessage("Submitting your registration...");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamName, members }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatusType("success");
        setStatusMessage(`Team "${teamName}" is successfully registered.`);
      } else {
        throw new Error(data.message || "Failed to register");
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
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-slate-100">Register Your Team</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-200">
            Team Name <span className="text-emerald-400">*</span>
          </label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            disabled={submitting || isLocked}
            placeholder="Enter your team name"
            className="w-full rounded-2xl bg-slate-900/70 border border-slate-700/80 px-4 py-2.5 text-sm sm:text-base placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-accent-400 focus:ring-2 focus:ring-accent-500/70 shadow-sm disabled:opacity-50"
          />
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-200">
            Team Members
            <span className="ml-2 text-xs font-normal text-slate-400">(minimum 1 member)</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MEMBER_LABELS.map((label, idx) => (
              <div key={idx} className="space-y-1.5">
                <span className="block text-xs text-slate-400">{label}</span>
                <input
                  type="text"
                  value={members[idx]}
                  onChange={(e) => handleMemberChange(idx, e.target.value)}
                  disabled={submitting || isLocked}
                  placeholder="Full name"
                  className="w-full rounded-2xl bg-slate-900/70 border border-slate-700/80 px-3.5 py-2 text-sm placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-accent-400 focus:ring-2 focus:ring-accent-500/70 shadow-sm disabled:opacity-50"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting || isLocked}
            className="relative inline-flex items-center justify-center w-full sm:w-auto px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base font-medium rounded-2xl overflow-hidden border border-emerald-500/70 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:-translate-y-[1px] hover:shadow-xl hover:shadow-emerald-400/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="relative flex items-center gap-2">
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : isLocked ? (
                <>
                  <span>Registered</span>
                  <span className="text-xs text-slate-900/80">(locked)</span>
                </>
              ) : (
                <span>Register Team</span>
              )}
            </span>
          </button>
        </div>
      </form>

      <section className={cn(
        "mt-4 rounded-2xl border px-4 py-3 sm:px-5 sm:py-4 text-sm flex items-start gap-3 transition-all duration-300",
        announcementStyles[statusType]
      )}>
        <div className="mt-[1px]">
          <StatusIcon />
        </div>
        <div className="space-y-1">
          <p className="font-medium">
            {statusType === "success" ? "Registration successful" :
             statusType === "error" ? "Registration failed" :
             statusType === "info" ? "Processing..." : "Announcement"}
          </p>
          <p className="text-slate-200/90 text-xs sm:text-sm">{statusMessage}</p>
        </div>
      </section>
    </div>
  );
}
