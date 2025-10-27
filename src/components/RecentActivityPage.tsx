import { ArrowLeft, Search, Bookmark, Eye, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import type { CareerQuestion } from "../services/aiCareerAdvisor";

interface RecentActivityPageProps {
  onBack: () => void;
  recentSearches: Array<{ query: string; timestamp: number }>;
  recentlyViewed: CareerQuestion[];
  onQuestionSelect: (question: CareerQuestion) => void;
  onSearchAgain: (query: string) => void;
}

function getTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString();
}

export function RecentActivityPage({ 
  onBack, 
  recentSearches, 
  recentlyViewed,
  onQuestionSelect,
  onSearchAgain
}: RecentActivityPageProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-white/5 backdrop-blur-md">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-white/70 hover:text-white p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-white text-lg">Recent Activity</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Recent Searches */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Search className="w-4 h-4 text-purple-300" />
            </div>
            <h2 className="text-white">Recent Searches</h2>
          </div>
          
          {recentSearches.length === 0 ? (
            <Card className="p-4 bg-white/5 backdrop-blur-sm border-white/10">
              <p className="text-white/60 text-sm text-center">No recent searches yet</p>
            </Card>
          ) : (
            <div className="space-y-2">
              {recentSearches.slice(0, 20).map((search, index) => {
                const timeAgo = getTimeAgo(search.timestamp);
                return (
                  <Card
                    key={`${search.timestamp}-${index}`}
                    onClick={() => onSearchAgain(search.query)}
                    className="p-3 bg-white/5 backdrop-blur-sm border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Search className="w-4 h-4 text-white/50 flex-shrink-0" />
                        <span className="text-white/80 text-sm truncate">{search.query}</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                        <span className="text-white/40 text-xs">{timeAgo}</span>
                        <Clock className="w-3 h-3 text-white/30" />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Recently Viewed */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Eye className="w-4 h-4 text-blue-300" />
            </div>
            <h2 className="text-white">Recently Viewed</h2>
          </div>
          
          {recentlyViewed.length === 0 ? (
            <Card className="p-4 bg-white/5 backdrop-blur-sm border-white/10">
              <p className="text-white/60 text-sm text-center">No recently viewed questions yet</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {recentlyViewed.slice(0, 10).map((question) => (
                <Card
                  key={question.id}
                  onClick={() => onQuestionSelect(question)}
                  className="p-4 bg-white/5 backdrop-blur-sm border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex-shrink-0">
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white text-sm mb-2 leading-relaxed">
                        {question.question}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-white/10 text-white/70 text-xs">
                          {question.category}
                        </Badge>
                        {question.isAiGenerated && (
                          <Badge className="bg-purple-500/20 text-purple-300 text-xs">
                            AI Generated
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="h-20"></div>
      </div>
    </div>
  );
}
