import { Gamepad2, Heart, TrendingUp, BarChart3, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Gamepad2 className="h-8 w-8 text-primary group-hover:text-accent transition-colors" />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            GameBoy
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-2">
          <Link to="/">
            <Button 
              variant={isActive("/") ? "default" : "ghost"}
              className="gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              Discover
            </Button>
          </Link>
          <Link to="/search">
            <Button 
              variant={isActive("/search") ? "default" : "ghost"}
              className="gap-2"
            >
              <Search className="h-4 w-4" />
              Search
            </Button>
          </Link>
          <Link to="/insights">
            <Button 
              variant={isActive("/insights") ? "default" : "ghost"}
              className="gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Insights
            </Button>
          </Link>
          <Link to="/favorites">
            <Button 
              variant={isActive("/favorites") ? "default" : "ghost"}
              className="gap-2"
            >
              <Heart className="h-4 w-4" />
              Favorites
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
