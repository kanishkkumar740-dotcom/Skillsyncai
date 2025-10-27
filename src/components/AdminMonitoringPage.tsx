import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Shield, 
  Search, 
  Filter,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Flag,
  User,
  MessageSquare,
  ThumbsDown,
  Clock,
  TrendingUp,
  Activity
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from './ui/badge';

interface AdminMonitoringPageProps {
  onBack: () => void;
}

type ContentType = 'question' | 'feedback' | 'comment';
type ContentStatus = 'pending' | 'approved' | 'flagged' | 'removed';

interface UserActivity {
  id: number;
  userId: string;
  username: string;
  type: ContentType;
  content: string;
  timestamp: string;
  status: ContentStatus;
  flagCount: number;
  category?: string;
}

export function AdminMonitoringPage({ onBack }: AdminMonitoringPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedActivity, setSelectedActivity] = useState<UserActivity | null>(null);

  // Demo user activity data
  const userActivities: UserActivity[] = [
    {
      id: 1,
      userId: 'user_12345',
      username: 'JohnD',
      type: 'question',
      content: 'How do I transition from marketing to data science?',
      timestamp: '2 hours ago',
      status: 'approved',
      flagCount: 0,
      category: 'Tech'
    },
    {
      id: 2,
      userId: 'user_67890',
      username: 'SarahM',
      type: 'feedback',
      content: 'This answer was not helpful - lacks specific salary information',
      timestamp: '3 hours ago',
      status: 'pending',
      flagCount: 1,
      category: 'Business'
    },
    {
      id: 3,
      userId: 'user_24680',
      username: 'MikeR',
      type: 'question',
      content: 'What are the best paying jobs in healthcare?',
      timestamp: '5 hours ago',
      status: 'approved',
      flagCount: 0,
      category: 'Healthcare'
    },
    {
      id: 4,
      userId: 'user_13579',
      username: 'EmilyW',
      type: 'comment',
      content: 'Thanks for the detailed explanation about UX careers!',
      timestamp: '6 hours ago',
      status: 'approved',
      flagCount: 0,
      category: 'Tech'
    },
    {
      id: 5,
      userId: 'user_98765',
      username: 'Anonymous',
      type: 'feedback',
      content: 'Spam content detected - promotional link included',
      timestamp: '8 hours ago',
      status: 'flagged',
      flagCount: 5,
      category: 'Arts'
    },
    {
      id: 6,
      userId: 'user_11223',
      username: 'AlexK',
      type: 'question',
      content: 'Is it too late to start a career in software engineering at 35?',
      timestamp: '10 hours ago',
      status: 'approved',
      flagCount: 0,
      category: 'Tech'
    },
    {
      id: 7,
      userId: 'user_44556',
      username: 'RachelB',
      type: 'feedback',
      content: 'Contains inappropriate language and off-topic content',
      timestamp: '12 hours ago',
      status: 'removed',
      flagCount: 8,
      category: 'Business'
    },
    {
      id: 8,
      userId: 'user_77889',
      username: 'TomH',
      type: 'question',
      content: 'What certifications are needed for cybersecurity?',
      timestamp: '1 day ago',
      status: 'approved',
      flagCount: 0,
      category: 'Tech'
    },
    {
      id: 9,
      userId: 'user_33221',
      username: 'LisaP',
      type: 'comment',
      content: 'Could you provide more details about remote work options?',
      timestamp: '1 day ago',
      status: 'pending',
      flagCount: 0,
      category: 'Business'
    },
    {
      id: 10,
      userId: 'user_55443',
      username: 'KevinL',
      type: 'feedback',
      content: 'Suspicious activity - multiple spam reports',
      timestamp: '1 day ago',
      status: 'flagged',
      flagCount: 3,
      category: 'Healthcare'
    }
  ];

  // Filter activities based on search and filters
  const filteredActivities = userActivities.filter(activity => {
    const matchesSearch = activity.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || activity.type === filterType;
    const matchesStatus = filterStatus === 'all' || activity.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Calculate statistics
  const stats = {
    total: userActivities.length,
    pending: userActivities.filter(a => a.status === 'pending').length,
    flagged: userActivities.filter(a => a.status === 'flagged').length,
    approved: userActivities.filter(a => a.status === 'approved').length,
  };

  const handleApprove = (activityId: number) => {
    console.log('Approved activity:', activityId);
    // In real app, update status in database
  };

  const handleFlag = (activityId: number) => {
    console.log('Flagged activity:', activityId);
    // In real app, update status in database
  };

  const handleRemove = (activityId: number) => {
    console.log('Removed activity:', activityId);
    // In real app, update status in database
  };

  const getStatusColor = (status: ContentStatus) => {
    switch (status) {
      case 'approved': return 'bg-green-500/20 text-green-300 border-green-400/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30';
      case 'flagged': return 'bg-red-500/20 text-red-300 border-red-400/30';
      case 'removed': return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
      default: return 'bg-white/10 text-white/70 border-white/20';
    }
  };

  const getTypeIcon = (type: ContentType) => {
    switch (type) {
      case 'question': return <MessageSquare className="w-4 h-4" />;
      case 'feedback': return <ThumbsDown className="w-4 h-4" />;
      case 'comment': return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 border-b border-white/20 shadow-lg flex-shrink-0">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-white hover:bg-white/20 h-8 w-8"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-white text-lg">Admin Monitoring</h1>
              <p className="text-white/70 text-xs">Content moderation dashboard</p>
            </div>
          </div>
          <Shield className="w-6 h-6 text-white/80" />
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6" style={{
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(139, 92, 246, 0.5) rgba(255, 255, 255, 0.1)'
      }}>
        {/* Stats Overview */}
        <div className="mb-4">
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-2.5 text-center">
              <div className="text-white mb-0.5">{stats.total}</div>
              <div className="text-white/70 text-xs leading-tight">Total</div>
            </div>
            <div className="bg-yellow-500/20 backdrop-blur-md rounded-xl border border-yellow-400/30 p-2.5 text-center">
              <div className="text-yellow-300 mb-0.5">{stats.pending}</div>
              <div className="text-white/70 text-xs leading-tight">Pending</div>
            </div>
            <div className="bg-red-500/20 backdrop-blur-md rounded-xl border border-red-400/30 p-2.5 text-center">
              <div className="text-red-300 mb-0.5">{stats.flagged}</div>
              <div className="text-white/70 text-xs leading-tight">Flagged</div>
            </div>
            <div className="bg-green-500/20 backdrop-blur-md rounded-xl border border-green-400/30 p-2.5 text-center">
              <div className="text-green-300 mb-0.5">{stats.approved}</div>
              <div className="text-white/70 text-xs leading-tight">Approved</div>
            </div>
          </div>
        </div>

        {/* Admin Info Banner */}
        <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 backdrop-blur-md rounded-xl border border-purple-400/30 p-3 mb-4">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-purple-300 mt-0.5 flex-shrink-0" />
            <p className="text-white/90 text-xs leading-relaxed">
              Review user-generated content to ensure community safety. Flag inappropriate content or approve helpful contributions.
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-3 mb-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
            <Input
              type="text"
              placeholder="Search content or users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-2 gap-3">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Content Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="question">Questions</SelectItem>
                <SelectItem value="feedback">Feedback</SelectItem>
                <SelectItem value="comment">Comments</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="removed">Removed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white text-sm flex items-center gap-2">
              <Activity className="w-4 h-4" />
              User Activity Feed
            </h3>
            <span className="text-white/50 text-xs">{filteredActivities.length} items</span>
          </div>

          {filteredActivities.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <p className="text-white/70 mb-2">No activities found</p>
              <p className="text-white/50 text-xs px-8">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 shadow-lg"
              >
                {/* Activity Header */}
                <div className="flex items-start justify-between mb-3 gap-2">
                  <div className="flex items-start gap-2 flex-1 min-w-0">
                    <div className="p-2 bg-purple-500/20 rounded-lg flex-shrink-0">
                      {getTypeIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <p className="text-white text-sm truncate">{activity.username}</p>
                        <span className="text-white/50 text-xs flex-shrink-0">•</span>
                        <span className="text-white/50 text-xs truncate">{activity.userId}</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-white/50 flex-shrink-0" />
                          <span className="text-white/50 text-xs">{activity.timestamp}</span>
                        </div>
                        {activity.category && (
                          <>
                            <span className="text-white/50 text-xs">•</span>
                            <span className="text-purple-300 text-xs">{activity.category}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(activity.status)} text-xs flex-shrink-0`}>
                    {activity.status}
                  </Badge>
                </div>

                {/* Content */}
                <div className="mb-3 p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge variant="outline" className="text-xs border-purple-400/30 text-purple-300 flex-shrink-0">
                      {activity.type}
                    </Badge>
                    {activity.flagCount > 0 && (
                      <Badge className="bg-red-500/20 text-red-300 text-xs flex items-center gap-1">
                        <Flag className="w-3 h-3" />
                        <span>{activity.flagCount} flags</span>
                      </Badge>
                    )}
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed break-words">
                    {activity.content}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => setSelectedActivity(activity)}
                    className="flex-1 min-w-[80px] bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-400/30 text-xs"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Review
                  </Button>
                  {activity.status !== 'approved' && (
                    <Button
                      size="sm"
                      onClick={() => handleApprove(activity.id)}
                      className="flex-1 min-w-[80px] bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-400/30 text-xs"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Approve
                    </Button>
                  )}
                  {activity.status !== 'flagged' && (
                    <Button
                      size="sm"
                      onClick={() => handleFlag(activity.id)}
                      className="flex-1 min-w-[70px] bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-400/30 text-xs"
                    >
                      <Flag className="w-3 h-3 mr-1" />
                      Flag
                    </Button>
                  )}
                  {activity.status !== 'removed' && (
                    <Button
                      size="sm"
                      onClick={() => handleRemove(activity.id)}
                      className="flex-1 min-w-[80px] bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-400/30 text-xs"
                    >
                      <XCircle className="w-3 h-3 mr-1" />
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Activity Insights */}
        <div className="mt-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-md rounded-xl border border-indigo-400/30 p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-indigo-500/30 rounded-lg flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-indigo-300" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white text-sm mb-1">Activity Insights</h3>
              <p className="text-white/70 text-xs leading-relaxed mb-3">
                Monitor trends and patterns in user behavior to maintain a safe community environment.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="text-white/60 flex-shrink-0">Average response time:</span>
                  <span className="text-white">2.5 hours</span>
                </div>
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="text-white/60 flex-shrink-0">Most active category:</span>
                  <span className="text-purple-300">Tech</span>
                </div>
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="text-white/60 flex-shrink-0">Flag resolution rate:</span>
                  <span className="text-green-300">94%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}