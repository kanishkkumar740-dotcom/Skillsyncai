import { User, Settings, Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface ProfileHeaderProps {
  onSettingsClick?: () => void;
  onNotificationsClick?: () => void;
  notificationCount?: number;
}

export function ProfileHeader({ 
  onSettingsClick, 
  onNotificationsClick, 
  notificationCount = 0 
}: ProfileHeaderProps) {
  return (
    <header className="bg-white/5 backdrop-blur-md border-b border-white/20 shadow-lg">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg shadow-lg">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white">Profile</h1>
            <p className="text-white/70 text-sm">Your learning journey</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {onNotificationsClick && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onNotificationsClick}
              className="relative text-white/70 hover:text-white hover:bg-white/10"
            >
              <Bell className="w-4 h-4" />
              {notificationCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
                >
                  {notificationCount}
                </Badge>
              )}
            </Button>
          )}
          
          {onSettingsClick && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSettingsClick}
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <Settings className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}