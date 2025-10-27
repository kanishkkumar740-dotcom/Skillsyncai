import { Bookmark, BookmarkCheck, Share, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

interface ActionButtonsProps {
  isBookmarked: boolean;
  onBookmark: () => void;
  onShare: () => void;
  onFollowUp: () => void;
}

export function ActionButtons({ isBookmarked, onBookmark, onShare, onFollowUp }: ActionButtonsProps) {
  return (
    <div className="px-4 py-4">
      <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 shadow-lg">
        <h4 className="text-white font-medium mb-3 text-sm">Actions:</h4>
        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            onClick={onBookmark}
            className={`justify-start h-12 text-white hover:bg-white/20 rounded-xl transition-all duration-200 ${
              isBookmarked ? 'bg-white/10' : ''
            }`}
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-4 h-4 mr-3 text-purple-300" />
            ) : (
              <Bookmark className="w-4 h-4 mr-3 text-purple-300" />
            )}
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </Button>
          
          <Button
            variant="ghost"
            onClick={onShare}
            className="justify-start h-12 text-white hover:bg-white/20 rounded-xl transition-all duration-200"
          >
            <Share className="w-4 h-4 mr-3 text-purple-300" />
            Share
          </Button>
          
          <Button
            variant="ghost"
            onClick={onFollowUp}
            className="justify-start h-12 text-white hover:bg-white/20 rounded-xl transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4 mr-3 text-purple-300" />
            Ask Follow-Up
          </Button>
        </div>
      </div>
    </div>
  );
}