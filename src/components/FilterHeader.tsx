import { X } from "lucide-react";
import { Button } from "./ui/button";

interface FilterHeaderProps {
  onClose: () => void;
}

export function FilterHeader({ onClose }: FilterHeaderProps) {
  return (
    <div className="px-4 py-4 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="flex items-center justify-between">
        <div className="w-10"></div>
        
        <h1 className="text-white font-medium">Filters</h1>
        
        <Button
          size="icon"
          variant="ghost"
          onClick={onClose}
          className="h-8 w-8 text-white hover:bg-white/20 rounded-xl"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}