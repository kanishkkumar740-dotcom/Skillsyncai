import React from 'react';
import { Sparkles, TrendingUp, Target, BookOpen, Award, ArrowRight, Star, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import type { UserPreferences } from './OnboardingFlow';

interface PersonalizedDashboardProps {
  preferences: UserPreferences;
  userName: string;
  onExploreCareer: (career: string) => void;
}

export function PersonalizedDashboard({ preferences, userName, onExploreCareer }: PersonalizedDashboardProps) {
  // Generate personalized career recommendations based on preferences
  const getCareerRecommendations = () => {
    const recommendations: Array<{
      title: string;
      match: number;
      salary: string;
      growth: string;
      description: string;
      skills: string[];
      category: string;
    }> = [];

    // Tech interests
    if (preferences.interests.includes('Technology') || preferences.interests.includes('Data Science')) {
      if (preferences.skills.includes('Programming')) {
        recommendations.push({
          title: 'Software Engineer',
          match: 95,
          salary: '$80k - $150k',
          growth: 'High',
          description: 'Design and develop software applications',
          skills: ['Programming', 'Problem Solving', 'Teamwork'],
          category: 'Tech'
        });
      }
      if (preferences.skills.includes('Data Analysis')) {
        recommendations.push({
          title: 'Data Scientist',
          match: 92,
          salary: '$90k - $160k',
          growth: 'Very High',
          description: 'Analyze complex data to drive business decisions',
          skills: ['Data Analysis', 'Critical Thinking', 'Programming'],
          category: 'Tech'
        });
      }
    }

    // Business interests
    if (preferences.interests.includes('Business') || preferences.interests.includes('Marketing')) {
      if (preferences.skills.includes('Strategic Planning')) {
        recommendations.push({
          title: 'Product Manager',
          match: 88,
          salary: '$90k - $140k',
          growth: 'High',
          description: 'Lead product strategy and development',
          skills: ['Strategic Planning', 'Leadership', 'Communication'],
          category: 'Business'
        });
      }
      if (preferences.skills.includes('Communication')) {
        recommendations.push({
          title: 'Marketing Manager',
          match: 85,
          salary: '$70k - $120k',
          growth: 'Medium',
          description: 'Develop and execute marketing strategies',
          skills: ['Communication', 'Creativity', 'Strategic Planning'],
          category: 'Business'
        });
      }
    }

    // Design/Creative interests
    if (preferences.interests.includes('Design') || preferences.interests.includes('Creative Arts')) {
      recommendations.push({
        title: 'UX/UI Designer',
        match: 90,
        salary: '$75k - $130k',
        growth: 'High',
        description: 'Create user-centered digital experiences',
        skills: ['Creativity', 'Problem Solving', 'Communication'],
        category: 'Design'
      });
    }

    // Healthcare interests
    if (preferences.interests.includes('Healthcare')) {
      recommendations.push({
        title: 'Healthcare Administrator',
        match: 87,
        salary: '$70k - $110k',
        growth: 'Medium',
        description: 'Manage healthcare facilities and operations',
        skills: ['Leadership', 'Project Management', 'Communication'],
        category: 'Healthcare'
      });
    }

    // Finance interests
    if (preferences.interests.includes('Finance')) {
      recommendations.push({
        title: 'Financial Analyst',
        match: 86,
        salary: '$65k - $115k',
        growth: 'Medium',
        description: 'Analyze financial data and market trends',
        skills: ['Data Analysis', 'Critical Thinking', 'Problem Solving'],
        category: 'Finance'
      });
    }

    // Default recommendations if none match
    if (recommendations.length === 0) {
      recommendations.push(
        {
          title: 'Project Manager',
          match: 80,
          salary: '$75k - $125k',
          growth: 'High',
          description: 'Lead and coordinate project teams',
          skills: ['Project Management', 'Leadership', 'Communication'],
          category: 'Business'
        },
        {
          title: 'Business Analyst',
          match: 78,
          salary: '$70k - $110k',
          growth: 'Medium',
          description: 'Bridge business needs and technical solutions',
          skills: ['Problem Solving', 'Communication', 'Data Analysis'],
          category: 'Business'
        }
      );
    }

    return recommendations.sort((a, b) => b.match - a.match).slice(0, 5);
  };

  const recommendations = getCareerRecommendations();

  // Get learning recommendations
  const getLearningPaths = () => {
    const paths = [];
    
    if (preferences.interests.includes('Technology')) {
      paths.push({
        title: 'Full Stack Development',
        duration: '6-9 months',
        level: 'Intermediate',
        icon: '💻'
      });
    }
    
    if (preferences.interests.includes('Data Science')) {
      paths.push({
        title: 'Data Science & ML',
        duration: '8-12 months',
        level: 'Advanced',
        icon: '📊'
      });
    }
    
    if (preferences.interests.includes('Business')) {
      paths.push({
        title: 'Business Strategy',
        duration: '4-6 months',
        level: 'Beginner',
        icon: '📈'
      });
    }

    if (paths.length === 0) {
      paths.push(
        {
          title: 'Leadership & Management',
          duration: '5-7 months',
          level: 'Intermediate',
          icon: '👥'
        },
        {
          title: 'Digital Marketing',
          duration: '3-5 months',
          level: 'Beginner',
          icon: '🎯'
        }
      );
    }

    return paths;
  };

  const learningPaths = getLearningPaths();

  return (
    <div className="space-y-4">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 backdrop-blur-md rounded-xl border border-purple-400/30 p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-purple-500/30 rounded-lg">
            <Sparkles className="w-5 h-5 text-purple-300" />
          </div>
          <div className="flex-1">
            <h2 className="text-white text-lg mb-1">Welcome back, {userName}! 🎉</h2>
            <p className="text-white/70 text-sm leading-relaxed">
              Based on your preferences, we've curated personalized career recommendations just for you.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-3 text-center">
          <div className="text-purple-300 text-xl mb-1">{preferences.interests.length}</div>
          <div className="text-white/70 text-xs">Interests</div>
        </Card>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-3 text-center">
          <div className="text-blue-300 text-xl mb-1">{preferences.skills.length}</div>
          <div className="text-white/70 text-xs">Skills</div>
        </Card>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-3 text-center">
          <div className="text-green-300 text-xl mb-1">{preferences.careerGoals.length}</div>
          <div className="text-white/70 text-xs">Goals</div>
        </Card>
      </div>

      {/* Career Recommendations */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white text-sm flex items-center gap-2">
            <Target className="w-4 h-4 text-purple-300" />
            Your Career Matches
          </h3>
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">
            Top {recommendations.length}
          </Badge>
        </div>

        <div className="space-y-3">
          {recommendations.map((career, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-md border-white/20 p-4 hover:bg-white/15 transition-all cursor-pointer"
              onClick={() => onExploreCareer(career.title)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-white">{career.title}</h4>
                    {index === 0 && (
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    )}
                  </div>
                  <p className="text-white/70 text-xs">{career.description}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge className="bg-green-500/20 text-green-300 border-green-400/30 text-xs">
                    {career.match}% Match
                  </Badge>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="flex items-center gap-2 text-xs">
                  <div className="p-1.5 bg-blue-500/20 rounded">
                    <TrendingUp className="w-3 h-3 text-blue-300" />
                  </div>
                  <div>
                    <div className="text-white/50">Salary Range</div>
                    <div className="text-white">{career.salary}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="p-1.5 bg-green-500/20 rounded">
                    <Zap className="w-3 h-3 text-green-300" />
                  </div>
                  <div>
                    <div className="text-white/50">Growth</div>
                    <div className="text-white">{career.growth}</div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {career.skills.map(skill => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="text-xs border-purple-400/30 text-purple-300"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>

              {/* CTA */}
              <Button
                size="sm"
                className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-400/30"
              >
                Explore Career Path
                <ArrowRight className="w-3 h-3 ml-2" />
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Learning Paths */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white text-sm flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-300" />
            Recommended Learning Paths
          </h3>
        </div>

        <div className="space-y-2">
          {learningPaths.map((path, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-md border-white/20 p-3 hover:bg-white/15 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{path.icon}</div>
                <div className="flex-1">
                  <h4 className="text-white text-sm mb-1">{path.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-white/60">
                    <span>{path.duration}</span>
                    <span>•</span>
                    <span>{path.level}</span>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="text-blue-300 hover:text-blue-200 hover:bg-blue-500/10">
                  Start
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <Card className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-md border-indigo-400/30 p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-indigo-500/30 rounded-lg">
            <Award className="w-4 h-4 text-indigo-300" />
          </div>
          <div>
            <h3 className="text-white text-sm mb-1">Your Next Steps</h3>
            <ul className="space-y-1 text-white/70 text-xs">
              <li>✓ Explore your top career matches</li>
              <li>✓ Start a recommended learning path</li>
              <li>✓ Connect with professionals in your field</li>
              <li>✓ Set up job alerts for your preferences</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}