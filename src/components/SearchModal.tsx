import { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '@/hooks/useSearch';
import { Button } from '@/components/ui/button';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const navigate = useNavigate();
  const { query, results, isSearching, search, clearSearch, hasResults, isEmpty } = useSearch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleResultClick(results[selectedIndex].url);
      }
    }
  };

  const handleResultClick = (url: string) => {
    navigate(url);
    onClose();
    clearSearch();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    search(e.target.value);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'page': return '📄';
      case 'project': return '💼';
      case 'blog': return '📝';
      default: return '📄';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-start justify-center pt-[10vh]">
      <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-2xl mx-4 animate-scale-in">
        {/* Search Input */}
        <div className="flex items-center p-4 border-b border-border">
          <Search className="h-5 w-5 text-muted-foreground mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search pages, projects, blog posts..."
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="ml-2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto">
          {isSearching && (
            <div className="p-4 text-center text-muted-foreground">
              Searching...
            </div>
          )}

          {!isSearching && query && isEmpty && (
            <div className="p-8 text-center">
              <div className="text-muted-foreground mb-2">No results found</div>
              <div className="text-sm text-muted-foreground">
                Try searching for "projects", "about", or "blog"
              </div>
            </div>
          )}

          {!isSearching && hasResults && (
            <div className="py-2">
              {results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result.url)}
                  className={`w-full flex items-center p-3 hover:bg-accent text-left transition-colors ${
                    index === selectedIndex ? 'bg-accent' : ''
                  }`}
                >
                  <span className="mr-3 text-lg">{getTypeIcon(result.type)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground truncate">
                      {result.title}
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      {result.content}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground ml-2 flex-shrink-0" />
                </button>
              ))}
            </div>
          )}

          {!query && (
            <div className="p-8 text-center">
              <div className="text-muted-foreground mb-2">Start typing to search</div>
              <div className="text-sm text-muted-foreground">
                Search across pages, projects, and blog posts
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-border bg-muted/30">
          <div className="text-xs text-muted-foreground text-center">
            Use ↑↓ to navigate, Enter to select, Esc to close
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;