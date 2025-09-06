import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import SearchModal from "./SearchModal";

const Navigation = () => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { name: "Blog", path: "/blog" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
  ];

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
    <header className="sticky top-0 z-50 w-full border-b border-border tech-nav">
      <div className="container flex h-16 items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-tech-cyan to-tech-blue hover:from-tech-blue hover:to-tech-purple transition-all duration-300"
        >
          Luca Charrouf
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${
                location.pathname === item.path ? "text-foreground" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleSearchClick}
            className="search-button flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-muted-foreground w-64 hidden sm:flex"
          >
            <Search className="h-4 w-4" />
            <span>Search...</span>
            <span className="ml-auto text-xs opacity-60 text-tech-cyan">⌘K</span>
          </button>
          
          <button
            onClick={handleSearchClick}
            className="search-button flex items-center justify-center w-10 h-10 rounded-xl text-muted-foreground sm:hidden"
          >
            <Search className="h-4 w-4" />
          </button>
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