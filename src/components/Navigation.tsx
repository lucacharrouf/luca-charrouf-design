import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import SearchModal from "./SearchModal";
import { ThemeToggle } from "./ThemeToggle";

const Navigation = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="absolute inset-0 pointer-events-none" />
      <div className="relative px-5 sm:px-6 md:px-8 mx-auto max-w-screen-2xl flex h-14 sm:h-16 items-center justify-between">
        <Link
          to="/"
          className="font-serif text-base sm:text-lg tracking-tight hover:opacity-70 transition-opacity duration-300"
        >
          Luca Charrouf
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center justify-center w-8 h-8 text-foreground/30 hover:text-foreground transition-colors duration-300"
            aria-label="Search"
          >
            <Search className="h-3.5 w-3.5" />
          </button>
          <ThemeToggle />
        </div>
      </div>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </header>
  );
};

export default Navigation;
