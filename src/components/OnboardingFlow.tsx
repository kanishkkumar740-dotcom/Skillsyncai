import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, Sparkles, Target, Briefcase, GraduationCap, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface OnboardingFlowProps {
  onComplete: (preferences: UserPreferences) => void;
  userName: string;
  onSkip?: () => void;
}

export interface UserPreferences {
  interests: string[];
  skills: string[];
  experienceLevel: string;
  careerGoals: string[];
  industries: string[];
  workStyle: string;
  learningGoals: string;
}

export function OnboardingFlow({ onComplete, userName, onSkip }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<UserPreferences>({
    interests: [],
    skills: [],
    experienceLevel: '',
    careerGoals: [],
    industries: [],
    workStyle: '',
    learningGoals: ''
  });

  const totalSteps = 5;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(preferences);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleSelection = (field: keyof UserPreferences, value: string) => {
    setPreferences(prev => {
      const currentValue = prev[field];
      if (Array.isArray(currentValue)) {
        if (currentValue.includes(value)) {
          return { ...prev, [field]: currentValue.filter(item => item !== value) };
        } else {
          return { ...prev, [field]: [...currentValue, value] };
        }
      } else {
        return { ...prev, [field]: value };
      }
    });
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return preferences.interests.length > 0;
      case 1:
        return preferences.skills.length > 0;
      case 2:
        return preferences.experienceLevel !== '';
      case 3:
        return preferences.careerGoals.length > 0;
      case 4:
        return preferences.industries.length > 0;
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-purple-300" />
              </div>
              <h2 className="text-white text-xl mb-2">What interests you?</h2>
              <p className="text-white/70 text-sm">Select all that apply to personalize your experience</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                'Technology',
                'Business',
                'Healthcare',
                'Creative Arts',
                'Engineering',
                'Education',
                'Finance',
                'Marketing',
                'Data Science',
                'Design',
                'Sales',
                'Research'
              ].map(interest => (
                <button
                  key={interest}
                  onClick={() => toggleSelection('interests', interest)}
                  className={`p-3 rounded-lg border transition-all ${
                    preferences.interests.includes(interest)
                      ? 'bg-purple-500/30 border-purple-400 text-white'
                      : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{interest}</span>
                    {preferences.interests.includes(interest) && (
                      <CheckCircle className="w-4 h-4 text-purple-300" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4">
                <Target className="w-8 h-8 text-blue-300" />
              </div>
              <h2 className="text-white text-xl mb-2">What are your skills?</h2>
              <p className="text-white/70 text-sm">Choose the skills you have or want to develop</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                'Programming',
                'Communication',
                'Leadership',
                'Problem Solving',
                'Project Management',
                'Data Analysis',
                'Creativity',
                'Writing',
                'Public Speaking',
                'Teamwork',
                'Critical Thinking',
                'Strategic Planning'
              ].map(skill => (
                <button
                  key={skill}
                  onClick={() => toggleSelection('skills', skill)}
                  className={`p-3 rounded-lg border transition-all ${
                    preferences.skills.includes(skill)
                      ? 'bg-blue-500/30 border-blue-400 text-white'
                      : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{skill}</span>
                    {preferences.skills.includes(skill) && (
                      <CheckCircle className="w-4 h-4 text-blue-300" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
                <GraduationCap className="w-8 h-8 text-green-300" />
              </div>
              <h2 className="text-white text-xl mb-2">Your experience level?</h2>
              <p className="text-white/70 text-sm">This helps us tailor recommendations for you</p>
            </div>

            <div className="space-y-3">
              {[
                { value: 'beginner', label: 'Beginner', desc: 'Just starting my career journey' },
                { value: 'intermediate', label: 'Intermediate', desc: '1-3 years of experience' },
                { value: 'experienced', label: 'Experienced', desc: '3-7 years of experience' },
                { value: 'expert', label: 'Expert', desc: '7+ years of experience' },
                { value: 'career-change', label: 'Career Changer', desc: 'Transitioning to a new field' }
              ].map(level => (
                <button
                  key={level.value}
                  onClick={() => toggleSelection('experienceLevel', level.value)}
                  className={`w-full p-4 rounded-lg border transition-all text-left ${
                    preferences.experienceLevel === level.value
                      ? 'bg-green-500/30 border-green-400'
                      : 'bg-white/5 border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white text-sm mb-1">{level.label}</div>
                      <div className="text-white/60 text-xs">{level.desc}</div>
                    </div>
                    {preferences.experienceLevel === level.value && (
                      <CheckCircle className="w-5 h-5 text-green-300" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/20 rounded-full mb-4">
                <TrendingUp className="w-8 h-8 text-yellow-300" />
              </div>
              <h2 className="text-white text-xl mb-2">Your career goals?</h2>
              <p className="text-white/70 text-sm">What do you want to achieve?</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                'Get Promoted',
                'Change Careers',
                'Earn More',
                'Learn New Skills',
                'Work Remotely',
                'Start a Business',
                'Improve Work-Life',
                'Leadership Role',
                'Freelance',
                'Specialize',
                'Network More',
                'Job Security'
              ].map(goal => (
                <button
                  key={goal}
                  onClick={() => toggleSelection('careerGoals', goal)}
                  className={`p-3 rounded-lg border transition-all ${
                    preferences.careerGoals.includes(goal)
                      ? 'bg-yellow-500/30 border-yellow-400 text-white'
                      : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{goal}</span>
                    {preferences.careerGoals.includes(goal) && (
                      <CheckCircle className="w-4 h-4 text-yellow-300" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500/20 rounded-full mb-4">
                <Briefcase className="w-8 h-8 text-indigo-300" />
              </div>
              <h2 className="text-white text-xl mb-2">Preferred industries?</h2>
              <p className="text-white/70 text-sm">Select industries you're interested in</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                'Tech & Software',
                'Healthcare',
                'Finance & Banking',
                'Education',
                'Retail',
                'Manufacturing',
                'Consulting',
                'Media & Entertainment',
                'Real Estate',
                'Non-Profit',
                'Government',
                'Hospitality'
              ].map(industry => (
                <button
                  key={industry}
                  onClick={() => toggleSelection('industries', industry)}
                  className={`p-3 rounded-lg border transition-all ${
                    preferences.industries.includes(industry)
                      ? 'bg-indigo-500/30 border-indigo-400 text-white'
                      : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{industry}</span>
                    {preferences.industries.includes(industry) && (
                      <CheckCircle className="w-4 h-4 text-indigo-300" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 border-b border-white/20 p-4">
        <div className="mb-3 flex items-start justify-between">
          <div>
            <h1 className="text-white text-lg">Welcome, {userName}! 👋</h1>
            <p className="text-white/70 text-xs">Let's personalize your career journey</p>
          </div>
          {onSkip && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSkip}
              className="text-white/70 hover:text-white hover:bg-white/10 text-xs h-auto py-1 px-3"
            >
              Skip for now
            </Button>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-white/70">
            <span>Step {currentStep + 1} of {totalSteps}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4" style={{
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(139, 92, 246, 0.5) rgba(255, 255, 255, 0.1)'
      }}>
        {renderStep()}
      </div>

      {/* Footer Navigation */}
      <div className="bg-white/5 backdrop-blur-md border-t border-white/20 p-4">
        <div className="flex gap-3">
          {currentStep > 0 && (
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`flex-1 ${
              currentStep === 0 ? 'w-full' : ''
            } bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {currentStep === totalSteps - 1 ? (
              <>
                Complete Setup
                <CheckCircle className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
        {!isStepValid() && (
          <p className="text-center text-white/50 text-xs mt-2">
            Please select at least one option to continue
          </p>
        )}
      </div>
    </div>
  );
}