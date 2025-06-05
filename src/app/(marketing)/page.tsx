import Hero from "@/components/hero";
import TemplatesSection from "@/components/templates-section";

export default function Page() {
  return (
    <div className="relative overflow-hidden flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400">
      {/* Main Content */}
      <Hero />
      <TemplatesSection />
    </div>
  )
}