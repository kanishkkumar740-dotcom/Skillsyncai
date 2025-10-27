import { BookOpen, Search, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

interface TopicsHeaderProps {
  onSearch?: (query: string) => void;
}

export function TopicsHeader({ onSearch }: TopicsHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleClose = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <header className="bg-white/5 backdrop-blur-md border-b border-white/20 shadow-lg">
      <div className="flex items-center justify-between px-4 py-4">
        {!isSearchOpen ? (
          <>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg shadow-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-white">Topics</h1>
                <p className="text-white/70 text-sm">Explore career fields</p>
              </div>
            </div>
            
            {onSearch && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSearchClick}
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <Search className="w-4 h-4" />
              </Button>
            )}
          </>
        ) : (
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
              <Input
                type="text"
                placeholder="Search career questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="pl-10 pr-4 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15"
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-white/70 hover:text-white hover:bg-white/10 p-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </form>
        )}
      </div>
    </header>
  );
}