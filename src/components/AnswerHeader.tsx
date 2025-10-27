import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

interface AnswerHeaderProps {
  question: string;
  onBack: () => void;
}

export function AnswerHeader({ question, onBack }: AnswerHeaderProps) {
  return (
    <div className="px-4 py-4 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="flex items-start gap-3">
        <Button
          size="icon"
          variant="ghost"
          onClick={onBack}
          className="h-10 w-10 text-white hover:bg-white/20 rounded-xl flex-shrink-0 mt-0.5"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <div className="flex-1 min-w-0">
          <h1 className="text-white text-sm font-medium leading-relaxed break-words">
            {question}
          </h1>
        </div>
      </div>
    </div>
  );
}