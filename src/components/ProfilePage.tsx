import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { 
  User, 
  Settings, 
  BookOpen, 
  Star, 
  TrendingUp, 
  Target, 
  Award, 
  Clock,
  ChevronRight,
  Bell,
  HelpCircle,
  LogOut,
  Edit,
  Bookmark,
  History
} from "lucide-react";

const userStats = {
  questionsAsked: 23,
  questionsBookmarked: 12,
  streakDays: 7,
  totalAnswersViewed: 89
};

const achievements = [
  { 
    icon: BookOpen, 
    title: "Curious Learner", 
    description: "Asked 20+ questions",
    progress: 100,
    unlocked: true,
    color: "from-blue-500 to-purple-600"
  },
  { 
    icon: Star, 
    title: "Knowledge Seeker", 
    description: "7-day learning streak",
    progress: 100,
    unlocked: true,
    color: "from-yellow-500 to-orange-600"
  },
  { 
    icon: Target, 
    title: "Goal Oriented", 
    description: "Complete career assessment",
    progress: 60,
    unlocked: false,
    color: "from-green-500 to-teal-600"
  },
  { 
    icon: Award, 
    title: "Expert Explorer", 
    description: "Explore all career fields",
    progress: 75,
    unlocked: false,
    color: "from-purple-500 to-pink-600"
  }
];

const recentActivity = [
  { action: "Asked about cybersecurity careers", time: "2 hours ago", type: "question" },
  { action: "Bookmarked UX design roadmap", time: "1 day ago", type: "bookmark" },
  { action: "Viewed digital marketing guide", time: "2 days ago", type: "view" },
  { action: "Completed tech career quiz", time: "3 days ago", type: "quiz" }
];

const menuItems = [
  { icon: Target, label: "Career Preferences", hasChevron: true, action: 'preferences' },
  { icon: Bookmark, label: "Saved Questions", count: 12, hasChevron: true, action: 'saved' },
  { icon: History, label: "Recent Activity", hasChevron: true, action: 'activity' },
  { icon: Bell, label: "Notifications", hasChevron: true, action: 'notifications' },
  { icon: Settings, label: "Settings", hasChevron: true, action: 'settings' },
  { icon: HelpCircle, label: "Help & Support", hasChevron: true, action: 'help' }
];

interface ProfilePageProps {
  onMenuAction?: (action: string) => void;
  onSignOut?: () => void;
  onEditProfile?: () => void;
  userData?: {
    name: string;
    email: string;
    joinDate: string;
  };
  bookmarkedCount?: number;
  hasPreferences?: boolean;
}

export function ProfilePage({ 
  onMenuAction, 
  onSignOut, 
  onEditProfile,
  userData,
  bookmarkedCount = 0,
  hasPreferences = false
}: ProfilePageProps) {
  const [showAchievements, setShowAchievements] = useState(true);

  const handleMenuClick = (action: string) => {
    if (onMenuAction) {
      onMenuAction(action);
    } else {
      // Default actions for demo
      switch (action) {
        case 'saved':
          alert('Saved Questions - This would show your bookmarked questions');
          break;
        case 'activity':
          alert('Recent Activity - This would show your learning history');
          break;
        case 'notifications':
          alert('Notifications - This would show your notification settings');
          break;
        case 'settings':
          alert('Settings - This would open app preferences');
          break;
        case 'help':
          alert('Help & Support - This would open the help center');
          break;
      }
    }
  };

  const displayName = userData?.name || 'Career Explorer';
  const memberSince = userData?.joinDate 
    ? `Member since ${new Date(userData.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
    : 'Exploring new opportunities';

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Profile Info Card */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-white">{displayName}</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onEditProfile || (() => alert('Edit Profile - This would open profile editing'))}
                className="h-6 w-6 p-0 text-white/60 hover:text-white"
              >
                <Edit className="w-3 h-3" />
              </Button>
            </div>
            <p className="text-white/70 text-sm">{memberSince}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 border-orange-500/30 text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                {userStats.streakDays} day streak
              </Badge>
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                Level 3
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-3">
          <div className="text-center">
            <div className="text-lg text-white mb-1">{userStats.questionsAsked}</div>
            <div className="text-white/60 text-xs">Questions</div>
          </div>
          <div className="text-center">
            <div className="text-lg text-white mb-1">{bookmarkedCount}</div>
            <div className="text-white/60 text-xs">Saved</div>
          </div>
          <div className="text-center">
            <div className="text-lg text-white mb-1">{userStats.streakDays}</div>
            <div className="text-white/60 text-xs">Streak</div>
          </div>
          <div className="text-center">
            <div className="text-lg text-white mb-1">{userStats.totalAnswersViewed}</div>
            <div className="text-white/60 text-xs">Viewed</div>
          </div>
        </div>
      </div>
        {/* Achievements Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white">Achievements</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAchievements(!showAchievements)}
              className="text-white/60 hover:text-white text-xs"
            >
              {showAchievements ? 'Hide' : 'Show'}
            </Button>
          </div>

          {showAchievements && (
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <Card key={index} className="p-3 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={`p-1.5 rounded-lg bg-gradient-to-r ${achievement.color} ${achievement.unlocked ? '' : 'grayscale'} shadow-lg`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-sm ${achievement.unlocked ? 'text-white' : 'text-white/60'} mb-1`}>
                          {achievement.title}
                        </h4>
                        <p className="text-white/50 text-xs mb-2">{achievement.description}</p>
                        <div className="w-full bg-white/10 rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full bg-gradient-to-r ${achievement.color} transition-all duration-500`}
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-white/40 text-xs mt-1">{achievement.progress}%</div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.action}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-3 h-3 text-white/40" />
                    <span className="text-white/60 text-xs">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div>
          <h2 className="text-white mb-4">Account</h2>
          <div className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => handleMenuClick(item.action)}
                  className="w-full justify-between h-auto p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-white/70" />
                    <span className="text-white">{item.label}</span>
                    {item.action === 'saved' && bookmarkedCount > 0 && (
                      <Badge variant="secondary" className="bg-white/10 text-white/70 border-white/20 text-xs">
                        {bookmarkedCount}
                      </Badge>
                    )}
                    {item.count && item.action !== 'saved' && (
                      <Badge variant="secondary" className="bg-white/10 text-white/70 border-white/20 text-xs">
                        {item.count}
                      </Badge>
                    )}
                    {item.action === 'preferences' && hasPreferences && (
                      <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                        ✓ Set up
                      </Badge>
                    )}
                    {item.action === 'preferences' && !hasPreferences && (
                      <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 border-orange-500/30 text-xs">
                        Setup needed
                      </Badge>
                    )}
                  </div>
                  {item.hasChevron && <ChevronRight className="w-4 h-4 text-white/40" />}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Sign Out */}
        <div className="pt-4">
          <Button
            variant="ghost"
            onClick={onSignOut || (() => {
              localStorage.removeItem('skillsync_user');
              alert('Signed out successfully');
            })}
            className="w-full justify-start h-auto p-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-red-300 hover:text-red-200"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>
  );
}