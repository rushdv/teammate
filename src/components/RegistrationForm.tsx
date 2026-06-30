"use client";

import { useState } from "react";
import { Loader2, Users } from "lucide-react";

const MEMBER_LABELS = ["1st", "2nd", "3rd", "4th"];

type StatusType = "idle" | "info" | "success" | "error";

interface Member {
  name: string;
  studentId: string;
}

export default function RegistrationForm() {
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState<Member[]>([
    { name: "", studentId: "" },
    { name: "", studentId: "" },
    { name: "", studentId: "" },
    { name: "", studentId: "" },
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [statusType, setStatusType] = useState<StatusType>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const isLocked = statusType === "success";

  const handleMemberChange = (index: number, field: "name" | "studentId", value: string) => {
    const next = [...members];
    next[index][field] = value;
    setMembers(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!teamName.trim()) {
      setStatusType("error");
      setStatusMessage("Team name required");
      return;
    }

    const filledMembers = members.filter(m => m.name.trim() !== "" || m.studentId.trim() !== "");
    const invalidMembers = filledMembers.filter(m => !m.name.trim() || !m.studentId.trim());
    
    if (invalidMembers.length > 0) {
      setStatusType("error");
      setStatusMessage("Fill both name and ID for each member");
      return;
    }

    if (filledMembers.length === 0) {
      setStatusType("error");
      setStatusMessage("Add at least one member");
      return;
    }

    setSubmitting(true);
    setStatusType("info");
    setStatusMessage("Submitting...");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamName, members: filledMembers }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatusType("success");
        setStatusMessage(`Team registered successfully!`);
      } else {
        throw new Error(data.message || "Registration failed");
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
        <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
          <Users className="w-4 h-4 text-blue-400" />
        </div>
        <h2 className="text-lg font-semibold text-white">Team Registration</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Team Name */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Team Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            disabled={submitting || isLocked}
            placeholder="Enter team name"
            className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all disabled:opacity-50"
          />
        </div>

        {/* Members - Stacked Layout */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-2">
            Team Members <span className="text-slate-500 text-xs font-normal">(min 1)</span>
          </label>
          <div className="space-y-3">
            {MEMBER_LABELS.map((label, idx) => (
              <div key={idx}>
                <div className="text-xs font-medium text-slate-500 mb-1.5">{label} member</div>
                <div className="space-y-1.5">
                  <input
                    type="text"
                    value={members[idx].name}
                    onChange={(e) => handleMemberChange(idx, "name", e.target.value)}
                    disabled={submitting || isLocked}
                    placeholder="Full name"
                    className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all disabled:opacity-50"
                  />
                  <input
                    type="text"
                    value={members[idx].studentId}
                    onChange={(e) => handleMemberChange(idx, "studentId", e.target.value)}
                    disabled={submitting || isLocked}
                    placeholder="Student ID"
                    className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all disabled:opacity-50"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting || isLocked}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : isLocked ? (
            <span>✓ Registered</span>
          ) : (
            <span>Register Team</span>
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
    </div>
  );
}
