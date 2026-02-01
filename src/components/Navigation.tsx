import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import SearchModal from "./SearchModal";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "./theme-provider";

const Navigation = () => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme } = useTheme();
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  const navItems = [
    { name: "Blog", path: "/blog" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
  ];

  // Resolve system theme to actual theme
  useEffect(() => {
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      setResolvedTheme(systemTheme);

      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        setResolvedTheme(e.matches ? "dark" : "light");
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  // Handle keyboard shortcut for search
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

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 text-xl font-bold tracking-tight hover:text-primary transition-colors duration-200"
        >
          <img
            src={resolvedTheme === "dark" ? "/lucaLogoDark.png" : "/lucaLogo.png"}
            alt="Luca Charrouf Logo"
            className="h-8 w-8 object-contain"
          />
          Luca Charrouf
        </Link>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleSearchClick}
            className="flex items-center gap-2 px-4 py-2 bg-muted/50 border border-border rounded-lg text-sm text-muted-foreground hover:border-primary hover:text-primary hover:bg-background transition-all duration-200 w-64 hidden sm:flex"
          >
            <Search className="h-4 w-4" />
            <span>Search...</span>
            <span className="ml-auto text-xs opacity-60">⌘K</span>
          </button>

          <button
            onClick={handleSearchClick}
            className="flex items-center justify-center w-10 h-10 border border-border rounded-lg text-muted-foreground hover:border-primary hover:text-primary hover:bg-background transition-all duration-200 sm:hidden"
          >
            <Search className="h-4 w-4" />
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