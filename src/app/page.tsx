import RegistrationForm from "@/components/RegistrationForm";
import UnassignedForm from "@/components/UnassignedForm";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen px-4 py-8 bg-bgmain text-slate-100 antialiased">
      <div className="w-full max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-950 border border-slate-800/80 shadow-xl shadow-black/60">
          {/* subtle glow bg */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.04),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.05),_transparent_60%)]" />

          <div className="relative px-6 py-6 sm:px-10 sm:py-10 space-y-10">
            {/* HEADER */}
            <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                  TeamMate
                </h1>
              </div>
            </header>

            {/* MAIN CONTENT */}
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] gap-8">
              <RegistrationForm />
              <UnassignedForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
