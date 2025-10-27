import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  ArrowLeft, 
  Bookmark, 
  BookmarkX, 
  Share, 
  Clock,
  Search,
  Filter
} from "lucide-react";
import { type CareerQuestion } from "../services/aiCareerAdvisor";

interface SavedQuestionsPageProps {
  onBack: () => void;
  bookmarkedItems: number[];
  allQuestions: CareerQuestion[];
  onQuestionSelect: (question: CareerQuestion) => void;
  onRemoveBookmark: (id: number) => void;
}

export function SavedQuestionsPage({ 
  onBack, 
  bookmarkedItems, 
  allQuestions, 
  onQuestionSelect,
  onRemoveBookmark 
}: SavedQuestionsPageProps) {
  const savedQuestions = allQuestions.filter(q => bookmarkedItems.includes(q.id));
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Tech': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Business': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Healthcare': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'Arts': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const handleShare = (question: CareerQuestion) => {
    if (navigator.share) {
      navigator.share({
        title: question.question,
        text: question.answer,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${question.question}\n\n${question.answer}`);
      // You could add a toast notification here
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-white/10">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-white/70 hover:text-white p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-purple-300" />
          <h1 className="text-white text-lg">Saved Questions</h1>
        </div>
        <div className="flex-1 flex justify-end">
          <Badge variant="secondary" className="bg-white/10 text-white/70 border-white/20">
            {savedQuestions.length}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {savedQuestions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <Bookmark className="w-8 h-8 text-white/40" />
            </div>
            <h3 className="text-white text-lg mb-2">No Saved Questions</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Start bookmarking questions that interest you to build your personal learning library.
            </p>
            <Button
              variant="ghost"
              onClick={onBack}
              className="mt-4 text-purple-300 hover:text-purple-200 hover:bg-purple-500/10"
            >
              Explore Questions
            </Button>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {/* Quick filters */}
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-4 h-4 text-white/40" />
              <div className="flex-1 flex gap-2 overflow-x-auto">
                {['All', 'Tech', 'Business', 'Healthcare', 'Arts'].map((filter) => (
                  <Button
                    key={filter}
                    variant="ghost"
                    size="sm"
                    className="whitespace-nowrap text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-white/70"
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>

            {/* Saved questions list */}
            <div className="space-y-3">
              {savedQuestions.map((question) => (
                <Card key={question.id} className="p-4 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-colors">
                  <div className="space-y-3">
                    {/* Question header */}
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${getCategoryColor(question.category)}`}
                          >
                            {question.category}
                          </Badge>
                          {question.isAiGenerated && (
                            <Badge variant="secondary" className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border-purple-500/30 text-xs">
                              AI Generated
                            </Badge>
                          )}
                        </div>
                        
                        <h3 
                          className="text-white cursor-pointer hover:text-purple-300 transition-colors"
                          onClick={() => onQuestionSelect(question)}
                        >
                          {question.question}
                        </h3>
                        
                        <p className="text-white/60 text-sm mt-2 line-clamp-2">
                          {question.answer.slice(0, 120)}...
                        </p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/40 text-xs">
                        <Clock className="w-3 h-3" />
                        <span>Saved recently</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare(question)}
                          className="text-white/60 hover:text-white h-8 w-8 p-0"
                        >
                          <Share className="w-4 h-4" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveBookmark(question.id)}
                          className="text-red-400 hover:text-red-300 h-8 w-8 p-0"
                        >
                          <BookmarkX className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Bottom spacing */}
            <div className="h-20"></div>
          </div>
        )}
      </div>
    </div>
  );
}