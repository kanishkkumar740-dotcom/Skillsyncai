import { ArrowLeft, Filter } from "lucide-react";
import { Button } from "./ui/button";

interface SearchResultsHeaderProps {
  query: string;
  resultCount: number;
  isSearching?: boolean;
  onBack: () => void;
  onFiltersClick: () => void;
}

export function SearchResultsHeader({ query, resultCount, isSearching = false, onBack, onFiltersClick }: SearchResultsHeaderProps) {
  return (
    <div className="px-4 py-4 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="flex items-center gap-3 mb-2">
        <Button 
          size="icon"
          variant="ghost"
          onClick={onBack}
          className="h-8 w-8 text-white hover:bg-white/20"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <h2 className="text-white font-medium text-sm truncate">{query}</h2>
          {isSearching ? (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border border-white/50 border-t-white rounded-full animate-spin"></div>
              <p className="text-white/70 text-xs">AI is analyzing your question...</p>
            </div>
          ) : (
            <p className="text-white/70 text-xs">{resultCount} results found</p>
          )}
        </div>
        <Button 
          size="icon" 
          onClick={onFiltersClick}
          className="h-8 w-8 bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg backdrop-blur-sm shadow-md"
        >
          <Filter className="w-3 h-3 text-white" />
        </Button>
      </div>
    </div>
  );
}