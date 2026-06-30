import RegistrationForm from "@/components/RegistrationForm";
import UnassignedForm from "@/components/UnassignedForm";

export default function Home() {
  return (
    <main className="min-h-screen px-3 py-6 sm:px-4 sm:py-8 bg-slate-950">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            TeamMate
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Register your team or join as individual
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <RegistrationForm />
          <UnassignedForm />
        </div>
      </div>
    </main>
  );
}
