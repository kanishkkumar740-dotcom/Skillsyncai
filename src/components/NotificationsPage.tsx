import { ArrowLeft, Bell, Sparkles, Bookmark, TrendingUp, Award, CheckCheck } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useState } from "react";

interface NotificationsPageProps {
  onBack: () => void;
  notifications: Notification[];
  onNotificationsChange: (notifications: Notification[]) => void;
}

export interface Notification {
  id: number;
  type: 'ai' | 'bookmark' | 'trending' | 'achievement';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

export const initialNotifications: Notification[] = [
  {
    id: 1,
    type: 'ai',
    title: 'New AI Career Insights',
    message: 'Based on your recent searches, we found 3 new career paths that might interest you.',
    time: '2 hours ago',
    isRead: false
  },
  {
    id: 2,
    type: 'trending',
    title: 'Trending in Tech',
    message: 'AI/ML Engineer is gaining popularity. Check out the latest career insights.',
    time: '5 hours ago',
    isRead: false
  },
  {
    id: 3,
    type: 'achievement',
    title: 'Achievement Unlocked! 🎉',
    message: 'You\'ve saved 10 questions! Keep exploring to grow your knowledge.',
    time: '1 day ago',
    isRead: false
  },
  {
    id: 4,
    type: 'bookmark',
    title: 'Bookmark Reminder',
    message: 'You have 5 saved questions you haven\'t reviewed in a while.',
    time: '2 days ago',
    isRead: true
  },
  {
    id: 5,
    type: 'ai',
    title: 'Personalized Recommendation',
    message: 'New questions about UX Design added based on your interests.',
    time: '3 days ago',
    isRead: true
  },
  {
    id: 6,
    type: 'trending',
    title: 'Popular Topic Alert',
    message: 'Healthcare careers are trending this week. Explore new opportunities.',
    time: '4 days ago',
    isRead: true
  }
];

export function NotificationsPage({ onBack, notifications, onNotificationsChange }: NotificationsPageProps) {

  const getIcon = (type: string) => {
    switch (type) {
      case 'ai':
        return <Sparkles className="w-4 h-4 text-purple-300" />;
      case 'bookmark':
        return <Bookmark className="w-4 h-4 text-blue-300" />;
      case 'trending':
        return <TrendingUp className="w-4 h-4 text-green-300" />;
      case 'achievement':
        return <Award className="w-4 h-4 text-yellow-300" />;
      default:
        return <Bell className="w-4 h-4 text-white" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'ai':
        return 'bg-purple-500/20';
      case 'bookmark':
        return 'bg-blue-500/20';
      case 'trending':
        return 'bg-green-500/20';
      case 'achievement':
        return 'bg-yellow-500/20';
      default:
        return 'bg-white/20';
    }
  };

  const markAsRead = (id: number) => {
    const updated = notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    );
    onNotificationsChange(updated);
  };

  const markAllAsRead = () => {
    const updated = notifications.map(notif => ({ ...notif, isRead: true }));
    onNotificationsChange(updated);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-3 p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white/70 hover:text-white p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-white text-lg">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-white/60 text-xs">{unreadCount} unread</p>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-purple-300 hover:text-purple-200 hover:bg-white/10 text-xs"
            >
              <CheckCheck className="w-4 h-4 mr-1" />
              Mark all read
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="p-4 bg-white/10 rounded-full mb-4">
              <Bell className="w-8 h-8 text-white/40" />
            </div>
            <h3 className="text-white/70 mb-2">No notifications yet</h3>
            <p className="text-white/50 text-sm">
              We'll notify you about updates and new insights
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={`p-4 backdrop-blur-sm border cursor-pointer transition-all duration-200 ${
                  notification.isRead
                    ? 'bg-white/5 border-white/10 opacity-70'
                    : 'bg-white/10 border-white/20 shadow-lg'
                }`}
              >
                <div className="flex gap-3">
                  <div className={`p-2 rounded-lg ${getIconBg(notification.type)} flex-shrink-0 h-fit`}>
                    {getIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-white text-sm flex items-center gap-2">
                        {notification.title}
                        {!notification.isRead && (
                          <Badge className="bg-purple-500 text-white text-xs px-1.5 py-0">
                            New
                          </Badge>
                        )}
                      </h3>
                    </div>
                    <p className="text-white/70 text-xs mb-2 leading-relaxed">
                      {notification.message}
                    </p>
                    <p className="text-white/40 text-xs">{notification.time}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
        <div className="h-20"></div>
      </div>
    </div>
  );
}
