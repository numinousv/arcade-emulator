import { createFileRoute, Link } from "@tanstack/react-router"; // ← Add Link import
import { motion } from "framer-motion";
import { Particles } from "@/components/ui/particles";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";
import { Button8 } from "@/components/ui/8bit/button";
import { CONSOLES } from "@/config/consoles";

export const Route = createFileRoute("/console/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="relative min-h-screen w-full">
      <Particles
        className="absolute inset-0"
        color="#666666"
        ease={20}
        quantity={120}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 container mx-auto px-4 pt-24 pb-8"
      >
        <div className="text-center mb-12">
          <Button8 className="text-2xl font-bold mb-8 text-center">
            SELECT CONSOLE
          </Button8>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose your platform and dive into a collection of classic games
          </p>
        </div>

        <Carousel
          opts={{ align: "center", loop: true }}
          className="w-full max-w-6xl mx-auto"
          aria-label="Console selection carousel"
        >
          <CarouselContent>
            {CONSOLES.map((console) => (
              <CarouselItem
                key={console.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <Link
                  to="/console/$consoleId"
                  params={{ consoleId: console.id }}
                >
                  <Card
                    className={`
                    relative overflow-hidden cursor-pointer group
                    border-2 hover:border-primary transition-all
                    bg-linear-to-br w-full max-w-6xl mx-auto ${console.color}
                  `}
                  >
                    <CardHeader className="relative">
                      <div className="text-6xl mb-2">{console.icon}</div>
                      <CardTitle className="text-2xl font-bold text-white">
                        {console.name}
                      </CardTitle>
                      <CardDescription className="text-white/80">
                        {console.games?.length || 0} Games Available
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="relative">
                      <p className="text-white/90 text-sm">
                        {console.description}
                      </p>
                    </CardContent>

                    <CardFooter className="relative">
                      <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-white h-full transition-all group-hover:w-full"
                          style={{
                            width: `${Math.min(100, console.games?.length || 0)}%`,
                          }}
                        />
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </motion.div>
    </div>
  );
}
