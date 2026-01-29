import Header from "@/components/Header";
import HeroSection from "../components/HeroSection";
import TrendingGamesSection from "../components/TrendingGamesSection";
import FeaturedGamesGrid from "../components/FeaturedGamesGrid";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <TrendingGamesSection />
      <FeaturedGamesGrid />
      <Footer />
    </div>
  );
};

export default Home;