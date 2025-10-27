import { FeedbackButtons } from "./FeedbackButtons";

interface FullAnswerProps {
  answer: string;
  isAiGenerated?: boolean;
  questionId?: string;
  onFeedback?: (feedback: 'like' | 'dislike', reason?: string) => void;
}

export function FullAnswer({ answer, isAiGenerated = false, questionId, onFeedback }: FullAnswerProps) {
  // Format AI-generated answers with better structure
  const formatAnswer = (text: string) => {
    if (!isAiGenerated) return text;
    
    const lines = text.split('\n');
    const formatted = [];
    let currentSection = '';
    
    for (const line of lines) {
      if (line.trim() === '') continue;
      
      if (line.startsWith('**') && line.endsWith(':**')) {
        // Section header
        if (currentSection) formatted.push(currentSection);
        currentSection = `<h4 class="font-medium text-purple-200 mt-4 mb-2">${line.replace(/\*\*/g, '')}</h4>`;
      } else if (line.match(/^\d+\./)) {
        // Numbered list item
        currentSection += `<p class="mb-2 pl-4">${line}</p>`;
      } else if (line.startsWith('•')) {
        // Bullet point
        currentSection += `<p class="mb-1 pl-4">${line}</p>`;
      } else {
        // Regular paragraph
        currentSection += `<p class="mb-3">${line}</p>`;
      }
    }
    
    if (currentSection) formatted.push(currentSection);
    return formatted.join('');
  };

  return (
    <>
      <div className="px-4 py-6">
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium text-sm">Full Answer:</h3>
            {isAiGenerated && (
              <span className="text-xs text-emerald-300 bg-emerald-500/20 px-2 py-1 rounded-full flex items-center gap-1">
                ✨ AI Generated
              </span>
            )}
          </div>
          <div className="text-purple-100 text-sm leading-relaxed">
            {isAiGenerated ? (
              <div dangerouslySetInnerHTML={{ __html: formatAnswer(answer) }} />
            ) : (
              <p>{answer}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Feedback Buttons */}
      {isAiGenerated && (
        <FeedbackButtons questionId={questionId} onFeedback={onFeedback} />
      )}
    </>
  );
}