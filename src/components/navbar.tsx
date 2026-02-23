// components/Navbar.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "../stores/gameStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X, Settings, Maximize2 } from "lucide-react";

export function Navbar() {
  const {
    isNavbarOpen,
    toggleNavbar,
    searchQuery,
    setSearchQuery,
    isPlaying,
    stopGame,
    toggleFullscreen,
  } = useGameStore();

  return (
    <motion.header
      initial={false}
      animate={{
        height: isNavbarOpen ? "80px" : "0px",
        opacity: isNavbarOpen ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b overflow-hidden"
    >
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleNavbar}>
            {isNavbarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            RetroArcade
          </h1>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {isPlaying && (
            <>
              <Button variant="outline" size="sm" onClick={stopGame}>
                Exit Game
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                <Maximize2 className="h-4 w-4" />
              </Button>
            </>
          )}
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Toggle button when collapsed */}
      <AnimatePresence>
        {!isNavbarOpen && (
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={toggleNavbar}
            className="fixed top-4 left-4 z-50 p-2 bg-background border rounded-lg shadow-lg"
          >
            <Menu className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
