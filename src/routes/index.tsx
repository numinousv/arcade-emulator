import { createFileRoute } from "@tanstack/react-router";
import { Particles } from "@/components/ui/particles";
export const Route = createFileRoute("/")({
  component: HomePage,
});
function HomePage() {
  return (
    <div className="relative w-full md:h-screen md:overflow-hidden">
      <Particles
        className="absolute inset-0"
        color="#666666"
        ease={20}
        quantity={120}
      />
    </div>
  );
}
