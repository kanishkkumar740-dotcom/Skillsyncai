import { MessageCircle } from "lucide-react";

interface SuggestedQuestionsProps {
  questions: string[];
  onQuestionClick: (question: string) => void;
}

export function SuggestedQuestions({ questions, onQuestionClick }: SuggestedQuestionsProps) {
  return (
    <div className="px-4 py-3">
      <h3 className="mb-3 text-white/90 text-sm">Suggested Questions</h3>
      <div className="space-y-2.5">
        {questions.map((question, index) => (
          <div
            key={index}
            onClick={() => onQuestionClick(question)}
            className="flex items-start gap-3 p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-200 cursor-pointer group"
          >
            <MessageCircle className="w-4 h-4 text-purple-300 mt-0.5 group-hover:text-purple-200 flex-shrink-0" />
            <p className="text-white/90 text-xs leading-relaxed group-hover:text-white">{question}</p>
          </div>
        ))}
      </div>
    </div>
  );
}