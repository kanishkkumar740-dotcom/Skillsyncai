import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { User } from "lucide-react";

interface HeaderProps {
  isAuthenticated?: boolean;
  onSignInClick?: () => void;
  onLogoClick?: () => void;
  userName?: string;
}

export function Header({ isAuthenticated = false, onSignInClick, onLogoClick, userName }: HeaderProps) {
  return (
    <header className="w-full bg-white/10 backdrop-blur-md border-b border-white/20 px-4 py-3 shadow-lg">
      <div className="flex items-center justify-between">
        <Logo onClick={onLogoClick} />
        <div>
          {!isAuthenticated ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSignInClick}
              className="text-white/70 hover:text-white hover:bg-white/10 border border-white/20 text-xs px-3 py-1"
            >
              <User className="w-3 h-3 mr-1" />
              Sign In
            </Button>
          ) : (
            <div className="text-white/70 text-xs flex items-center">
              <User className="w-3 h-3 mr-1" />
              {userName}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}