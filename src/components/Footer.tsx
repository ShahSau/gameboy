import React from "react";

const Footer = () => {
  return (
    <footer className="relative border-t border-border/50 mt-20 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4 py-4">
        <div className="text-center">
          <div className="pt-6">
            <p>
              © {new Date().getFullYear()} GameBoy. Discover your next favorite
              game.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
