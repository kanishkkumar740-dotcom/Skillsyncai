import { ChevronDown, ChevronRight, Eye } from "lucide-react";
import { Button } from "./ui/button";

interface ResultItemProps {
  number: string;
  question: string;
  answer: string;
  category: string;
  isExpanded: boolean;
  isAiGenerated?: boolean;
  onToggleExpanded: () => void;
  onQuestionSelect: () => void;
}

export function ResultItem({ 
  number, 
  question, 
  answer, 
  category, 
  isExpanded, 
  isAiGenerated = false,
  onToggleExpanded, 
  onQuestionSelect 
}: ResultItemProps) {
  return (
    <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-200">
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-white text-xs font-medium">{number}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              <p className="text-white font-medium text-sm mb-1">Q: {question}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-purple-300 bg-purple-500/20 px-2 py-1 rounded-full">{category}</span>
                {isAiGenerated && (
                  <span className="text-xs text-emerald-300 bg-emerald-500/20 px-2 py-1 rounded-full flex items-center gap-1">
                    ✨ AI Generated
                  </span>
                )}
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={onToggleExpanded}
              className="h-6 w-6 p-0 text-white/70 hover:text-white hover:bg-white/10 rounded-lg flex-shrink-0"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          </div>
          
          <div className="text-purple-200 text-xs mb-2">
            A: {isExpanded ? answer : `${answer.substring(0, 60)}...`}
          </div>
          
          <div className="flex gap-2">
            {!isExpanded && (
              <Button
                size="sm"
                variant="ghost"
                onClick={onToggleExpanded}
                className="h-6 px-2 text-purple-300 hover:text-white hover:bg-white/10 rounded-lg text-xs"
              >
                [Expand]
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={onQuestionSelect}
              className="h-6 px-2 text-purple-300 hover:text-white hover:bg-white/10 rounded-lg text-xs flex items-center gap-1"
            >
              <Eye className="w-3 h-3" />
              [View Full]
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}