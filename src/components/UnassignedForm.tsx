"use client";

import { useState } from "react";
import { Loader2, UserPlus } from "lucide-react";

type StatusType = "idle" | "info" | "success" | "error";

export default function UnassignedForm() {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [statusType, setStatusType] = useState<StatusType>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setStatusType("error");
      setStatusMessage("Name required");
      return;
    }

    if (!studentId.trim()) {
      setStatusType("error");
      setStatusMessage("Student ID required");
      return;
    }

    setSubmitting(true);
    setStatusType("info");
    setStatusMessage("Adding...");

    try {
      const res = await fetch("/api/unassigned", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), studentId: studentId.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatusType("success");
        setStatusMessage("Added successfully!");
        setName("");
        setStudentId("");
      } else {
        throw new Error(data.message || "Failed to add");
      }
    } catch (err: any) {
      console.error(err);
      setStatusType("error");
      setStatusMessage(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800/50 p-4 sm:p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800/50">
        <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
          <UserPlus className="w-4 h-4 text-purple-400" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Join as Individual</h2>
          <p className="text-xs text-slate-500">No team yet?</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Your Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={submitting}
            placeholder="Enter your full name"
            className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all disabled:opacity-50"
          />
        </div>

        {/* Student ID */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Student ID <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            disabled={submitting}
            placeholder="Enter your student ID"
            className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all disabled:opacity-50"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Adding...</span>
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              <span>Join List</span>
            </>
          )}
        </button>

        {/* Status Message */}
        {statusMessage && (
          <div
            className={`px-3 py-2 rounded-lg text-xs font-medium ${
              statusType === "success"
                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                : statusType === "error"
                ? "bg-red-500/10 text-red-400 border border-red-500/20"
                : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
            }`}
          >
            {statusMessage}
          </div>
        )}
      </form>

      {/* Info Box */}
      <div className="mt-4 p-3 bg-slate-800/30 rounded-lg border border-slate-700/30">
        <p className="text-xs text-slate-400 leading-relaxed">
          💡 We'll help you find a team later
        </p>
      </div>
    </div>
  );
}
