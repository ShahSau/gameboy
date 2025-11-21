import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm opacity-20"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1920&h=1080&fit=crop)`,
        }}
      />
      <div className="relative container mx-auto px-4 text-center">
        <motion.div
          className="space-y-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-muted-foreground whitespace-nowrap">
            Browse the best free to play games
          </h1>
          <div className="group relative w-fit mx-auto transition-transform duration-300 active:scale-95">
            <Button
              size="lg"
              className="relative z-10 rounded-lg bg-gradient-to-br from-primary to-accent p-0.5 duration-300 group-hover:scale-110"
              onClick={() => navigate("/search")}
            >
              <span className="block rounded-md px-8 py-3 font-semibold text-foreground duration-300">
                Browse Games
              </span>
            </Button>
            <span className="pointer-events-none absolute -inset-4 z-0 transform-gpu rounded-2xl bg-gradient-to-br from-primary to-accent opacity-30 blur-xl transition-all duration-300 group-hover:opacity-90 group-active:opacity-50" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;