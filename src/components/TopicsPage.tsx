import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Code, Briefcase, Heart, Palette, TrendingUp, Star, Clock, Users, MessageSquare } from "lucide-react";
import { type CareerQuestion } from "../services/aiCareerAdvisor";

const topics = [
  { 
    name: "Tech", 
    icon: Code, 
    color: "from-blue-500 to-purple-600",
    description: "Software development, cybersecurity, data science, and emerging technologies",
    questionCount: 127,
    trending: true,
    subcategories: ["Software Development", "Data Science", "Cybersecurity", "AI/ML", "Cloud Computing", "Mobile Development"]
  },
  { 
    name: "Business", 
    icon: Briefcase, 
    color: "from-green-500 to-teal-600",
    description: "Marketing, finance, consulting, entrepreneurship, and management",
    questionCount: 98,
    trending: false,
    subcategories: ["Digital Marketing", "Project Management", "Finance", "Consulting", "Leadership", "Sales"]
  },
  { 
    name: "Healthcare", 
    icon: Heart, 
    color: "from-red-500 to-pink-600",
    description: "Nursing, medicine, therapy, public health, and healthcare administration",
    questionCount: 76,
    trending: true,
    subcategories: ["Nursing", "Medicine", "Mental Health", "Healthcare Admin", "Public Health", "Therapy"]
  },
  { 
    name: "Arts", 
    icon: Palette, 
    color: "from-yellow-500 to-orange-600",
    description: "Design, creative writing, multimedia, and artistic careers",
    questionCount: 54,
    trending: false,
    subcategories: ["UX/UI Design", "Graphic Design", "Creative Writing", "Photography", "Video Production", "Animation"]
  }
];

const recentTopics = [
  { name: "Remote Work Strategies", questions: 23, timeAgo: "2h ago" },
  { name: "Career Transitions", questions: 18, timeAgo: "4h ago" },
  { name: "Salary Negotiation", questions: 31, timeAgo: "6h ago" },
  { name: "Interview Preparation", questions: 45, timeAgo: "8h ago" }
];

interface TopicsPageProps {
  onTopicClick: (topic: string) => void;
  sampleQuestions: CareerQuestion[];
  onCommunityFeedbackClick?: () => void;
}

export function TopicsPage({ onTopicClick, sampleQuestions, onCommunityFeedbackClick }: TopicsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleMainTopicClick = (topicName: string) => {
    onTopicClick(topicName);
  };

  const handleSubcategoryClick = (subcategory: string) => {
    // Filter and navigate to subcategory
    onTopicClick(subcategory);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-4 py-6">
        {/* Main Topics Grid */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white">Popular Categories</h2>
          <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
            4 fields
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 gap-4 mb-8">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <div
                key={topic.name}
                className="relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 hover:bg-white/15 transition-all duration-300 cursor-pointer group"
                onClick={() => handleMainTopicClick(topic.name)}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${topic.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${topic.color} shadow-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-white">{topic.name}</h3>
                          {topic.trending && (
                            <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 border-orange-500/30 text-xs">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                        </div>
                        <p className="text-white/70 text-sm mt-1">{topic.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-white/60 text-xs mb-1">
                        <Users className="w-3 h-3 mr-1" />
                        {topic.questionCount}
                      </div>
                    </div>
                  </div>

                  {/* Subcategories */}
                  <div className="flex flex-wrap gap-1.5">
                    {topic.subcategories.slice(0, 4).map((sub) => (
                      <Button
                        key={sub}
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSubcategoryClick(sub);
                        }}
                        className="h-6 px-2 text-xs bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/20 rounded-md"
                      >
                        {sub}
                      </Button>
                    ))}
                    {topic.subcategories.length > 4 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs bg-white/5 text-white/60 border border-white/10 rounded-md"
                      >
                        +{topic.subcategories.length - 4} more
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Community Feedback Section */}
        <div className="mb-6">
          <div 
            onClick={onCommunityFeedbackClick}
            className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-500/20 to-indigo-600/20 backdrop-blur-sm border border-purple-400/30 p-5 hover:from-purple-500/30 hover:to-indigo-600/30 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white mb-1">Community Feedback</h3>
                  <p className="text-white/70 text-sm">See what others find helpful</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                <Users className="w-3 h-3 mr-1" />
                Public
              </Badge>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white">Recent Activity</h2>
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
              <Clock className="w-3 h-3 mr-1" />
              Live
            </Badge>
          </div>
          
          <div className="space-y-3">
            {recentTopics.map((recent, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => onTopicClick(recent.name)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div>
                    <h4 className="text-white text-sm">{recent.name}</h4>
                    <p className="text-white/60 text-xs">{recent.questions} new questions</p>
                  </div>
                </div>
                <span className="text-white/50 text-xs">{recent.timeAgo}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Community Feedback */}
        {onCommunityFeedbackClick && (
          <div className="mb-6">
            <Button
              onClick={onCommunityFeedbackClick}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white border border-white/20 shadow-lg py-6"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              <div className="text-left">
                <div className="text-sm">Community Feedback</div>
                <div className="text-xs text-white/80">See what others think about career answers</div>
              </div>
            </Button>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-center">
            <div className="text-2xl text-white mb-1">350+</div>
            <div className="text-white/60 text-sm">Total Questions</div>
          </div>
          <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-center">
            <div className="text-2xl text-white mb-1">24/7</div>
            <div className="text-white/60 text-sm">AI Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}