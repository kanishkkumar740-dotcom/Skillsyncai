import { Button } from "./ui/button";

interface FilterFooterProps {
  onApply: () => void;
  onClear: () => void;
}

export function FilterFooter({ onApply, onClear }: FilterFooterProps) {
  return (
    <div className="px-4 py-4 bg-white/5 backdrop-blur-md border-t border-white/20">
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onClear}
          className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-xl py-3"
        > 
          Clear All
        </Button>
        <Button
          onClick={onApply}
          className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white border-0 rounded-xl py-3 shadow-lg"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}