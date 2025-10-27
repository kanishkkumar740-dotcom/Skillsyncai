import React from 'react';
import { ArrowLeft, Edit, Target, Briefcase, GraduationCap, TrendingUp, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import type { UserPreferences } from './OnboardingFlow';

interface CareerPreferencesPageProps {
  onBack: () => void;
  onEdit: () => void;
  preferences: UserPreferences | null;
}

export function CareerPreferencesPage({ onBack, onEdit, preferences }: CareerPreferencesPageProps) {
  if (!preferences) {
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 border-b border-white/20 p-4 flex items-center gap-3">
          <button onClick={onBack} className="text-white/80 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-white text-lg">Career Preferences</h1>
          </div>
        </div>

        {/* Empty State */}
        <main className="flex-1 overflow-y-auto p-4 flex items-center justify-center">
          <div className="text-center max-w-sm">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-500/20 rounded-full mb-4">
              <Target className="w-10 h-10 text-purple-300" />
            </div>
            <h2 className="text-white text-xl mb-2">Set Up Your Preferences</h2>
            <p className="text-white/70 text-sm mb-6 leading-relaxed">
              Tell us about your interests, skills, and career goals to get personalized recommendations.
            </p>
            <Button
              onClick={onEdit}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white"
            >
              Get Started
              <Sparkles className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const sections = [
    {
      title: 'Interests',
      icon: Sparkles,
      items: preferences.interests,
      color: 'purple',
      emptyMessage: 'No interests selected'
    },
    {
      title: 'Skills',
      icon: Target,
      items: preferences.skills,
      color: 'blue',
      emptyMessage: 'No skills selected'
    },
    {
      title: 'Experience Level',
      icon: GraduationCap,
      items: preferences.experienceLevel ? [preferences.experienceLevel] : [],
      color: 'green',
      emptyMessage: 'Not specified',
      single: true
    },
    {
      title: 'Career Goals',
      icon: TrendingUp,
      items: preferences.careerGoals,
      color: 'yellow',
      emptyMessage: 'No goals selected'
    },
    {
      title: 'Preferred Industries',
      icon: Briefcase,
      items: preferences.industries,
      color: 'indigo',
      emptyMessage: 'No industries selected'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; icon: string }> = {
      purple: { bg: 'bg-purple-500/20', text: 'text-purple-300', border: 'border-purple-400/30', icon: 'text-purple-300' },
      blue: { bg: 'bg-blue-500/20', text: 'text-blue-300', border: 'border-blue-400/30', icon: 'text-blue-300' },
      green: { bg: 'bg-green-500/20', text: 'text-green-300', border: 'border-green-400/30', icon: 'text-green-300' },
      yellow: { bg: 'bg-yellow-500/20', text: 'text-yellow-300', border: 'border-yellow-400/30', icon: 'text-yellow-300' },
      indigo: { bg: 'bg-indigo-500/20', text: 'text-indigo-300', border: 'border-indigo-400/30', icon: 'text-indigo-300' }
    };
    return colors[color] || colors.purple;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 border-b border-white/20 p-4 flex items-center gap-3">
        <button onClick={onBack} className="text-white/80 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-white text-lg">Career Preferences</h1>
          <p className="text-white/70 text-xs">Your personalized profile</p>
        </div>
        <Button
          size="sm"
          onClick={onEdit}
          className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4" style={{
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(139, 92, 246, 0.5) rgba(255, 255, 255, 0.1)'
      }}>
        {/* Summary Card */}
        <Card className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 backdrop-blur-md border-purple-400/30 p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-500/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-purple-300" />
            </div>
            <div className="flex-1">
              <h3 className="text-white mb-1">Profile Complete</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Your preferences help us provide personalized career guidance and recommendations.
              </p>
            </div>
          </div>
        </Card>

        {/* Preferences Sections */}
        {sections.map((section, index) => {
          const Icon = section.icon;
          const colors = getColorClasses(section.color);
          const hasItems = Array.isArray(section.items) ? section.items.length > 0 : section.items;

          return (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 ${colors.bg} rounded-lg`}>
                  <Icon className={`w-4 h-4 ${colors.icon}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-white">{section.title}</h3>
                </div>
                {hasItems && (
                  <Badge className={`${colors.bg} ${colors.text} ${colors.border} text-xs`}>
                    {Array.isArray(section.items) ? section.items.length : 1}
                  </Badge>
                )}
              </div>

              {hasItems ? (
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(section.items) ? section.items : [section.items]).map((item, itemIndex) => (
                    <Badge
                      key={itemIndex}
                      variant="outline"
                      className={`${colors.border} ${colors.text} capitalize text-xs`}
                    >
                      {typeof item === 'string' ? item.replace(/-/g, ' ') : item}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-white/50 text-sm">{section.emptyMessage}</p>
              )}
            </Card>
          );
        })}

        {/* Action Card */}
        <Card className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-md border-indigo-400/30 p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-indigo-500/30 rounded-lg">
              <Sparkles className="w-4 h-4 text-indigo-300" />
            </div>
            <div className="flex-1">
              <h3 className="text-white text-sm mb-1">Keep Your Profile Updated</h3>
              <p className="text-white/70 text-xs leading-relaxed mb-3">
                Update your preferences anytime to get the most relevant career recommendations.
              </p>
              <Button
                size="sm"
                onClick={onEdit}
                className="bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-400/30"
              >
                Update Preferences
                <Edit className="w-3 h-3 ml-2" />
              </Button>
            </div>
          </div>
        </Card>

        <div className="h-20"></div>
      </main>
    </div>
  );
}