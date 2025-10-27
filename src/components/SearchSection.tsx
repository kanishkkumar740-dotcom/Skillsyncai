import { useState } from "react";
import { Settings, CircleHelp } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface SearchSectionProps {
  onSearch: (query: string) => void;
  onFiltersClick: () => void;
  searchQuery: string;
}

export function SearchSection({ onSearch, onFiltersClick, searchQuery }: SearchSectionProps) {
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="px-4 pt-4 pb-3">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full p-0.5">
              <CircleHelp className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <Input
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Ask a career-related question..."
              className="pl-11 h-11 bg-white/95 border-white/30 rounded-xl shadow-md backdrop-blur-sm text-gray-800 placeholder:text-gray-500 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 text-sm text-left"
            />
          </div>
          <Button 
            type="button"
            onClick={onFiltersClick}
            size="icon" 
            className="h-11 w-11 bg-white/20 hover:bg-white/30 border border-white/30 rounded-xl backdrop-blur-sm shadow-md flex-shrink-0"
          >
            <Settings className="w-4 h-4 text-white" />
          </Button>
        </div>
      </form>
    </div>
  );
}