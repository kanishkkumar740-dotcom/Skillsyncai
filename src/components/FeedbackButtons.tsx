import { useState } from "react";
import { ThumbsUp, ThumbsDown, CheckCircle2, MessageSquare, X } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner@2.0.3";

interface FeedbackButtonsProps {
  questionId?: string;
  onFeedback?: (feedback: 'like' | 'dislike', reason?: string) => void;
}

export function FeedbackButtons({ questionId, onFeedback }: FeedbackButtonsProps) {
  const [feedback, setFeedback] = useState<'like' | 'dislike' | null>(null);
  const [showReasonPrompt, setShowReasonPrompt] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string>("");

  const handleLike = () => {
    setFeedback('like');
    onFeedback?.('like');
    toast.success("Thanks for your feedback!", {
      description: "This helps us provide better career guidance"
    });
  };

  const handleDislike = () => {
    setFeedback('dislike');
    setShowReasonPrompt(true);
  };

  const handleSubmitReason = () => {
    if (selectedReason) {
      onFeedback?.('dislike', selectedReason);
      toast.success("Feedback submitted!", {
        description: "We'll use this to improve our answers"
      });
      setShowReasonPrompt(false);
    }
  };

  const handleCancelReason = () => {
    setFeedback(null);
    setShowReasonPrompt(false);
    setSelectedReason("");
  };

  const reasons = [
    "Too general, need more details",
    "Doesn't match my experience level",
    "Missing salary/certification info",
    "Incorrect information",
    "Other"
  ];

  if (feedback === 'like' && !showReasonPrompt) {
    return (
      <div className="px-4 pb-4">
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-xl border border-green-400/30 p-4 text-center shadow-lg">
          <CheckCircle2 className="w-10 h-10 text-green-300 mx-auto mb-2" />
          <p className="text-white mb-1">Thanks for your feedback!</p>
          <p className="text-white/70 text-xs">
            This helps us provide better career guidance
          </p>
        </div>
      </div>
    );
  }

  if (showReasonPrompt) {
    return (
      <div className="px-4 pb-4">
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 shadow-lg">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-2">
              <MessageSquare className="w-5 h-5 text-purple-300 mt-0.5" />
              <div>
                <p className="text-white text-sm">Help us improve</p>
                <p className="text-white/70 text-xs">What was missing or incorrect?</p>
              </div>
            </div>
            <button onClick={handleCancelReason} className="text-white/50 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 mb-4">
            {reasons.map((reason) => (
              <label
                key={reason}
                className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedReason === reason
                    ? 'bg-purple-500/30 border-purple-400'
                    : 'bg-white/5 border-white/20 hover:bg-white/10'
                }`}
              >
                <input
                  type="radio"
                  name="reason"
                  value={reason}
                  checked={selectedReason === reason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="w-4 h-4 text-purple-600"
                />
                <span className="text-white/90 text-xs">{reason}</span>
              </label>
            ))}
          </div>

          <Button
            onClick={handleSubmitReason}
            disabled={!selectedReason}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white disabled:opacity-50"
          >
            Submit Feedback
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pb-4">
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 shadow-lg">
        <p className="text-white/90 text-xs mb-3 text-center">Was this answer helpful?</p>
        <div className="flex gap-2">
          <Button
            onClick={handleLike}
            size="sm"
            className="flex-1 bg-white/10 border border-green-400/50 text-green-300 hover:bg-green-500/20 hover:border-green-400 h-9 text-xs"
          >
            <ThumbsUp className="w-3 h-3 mr-1.5" />
            Helpful
          </Button>
          <Button
            onClick={handleDislike}
            size="sm"
            className="flex-1 bg-white/10 border border-red-400/50 text-red-300 hover:bg-red-500/20 hover:border-red-400 h-9 text-xs"
          >
            <ThumbsDown className="w-3 h-3 mr-1.5" />
            Not Helpful
          </Button>
        </div>
      </div>
    </div>
  );
}
