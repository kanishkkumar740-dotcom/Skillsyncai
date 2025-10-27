import { ArrowLeft, Brain, Zap, Target, Users, Mail, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface AboutPageProps {
  onBack: () => void;
}

export function AboutPage({ onBack }: AboutPageProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-white/5 backdrop-blur-md">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-white/70 hover:text-white p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-white text-lg">About</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* App Logo & Name */}
        <Card className="p-6 bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm border-purple-500/30 mb-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-3">
            <div className="relative">
              <Brain className="w-8 h-8 text-purple-300" />
              <Zap className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1" />
            </div>
          </div>
          <h2 className="text-white mb-1">SKILLSYNC AI</h2>
          <Badge variant="secondary" className="bg-white/10 text-white/80 border-white/20">
            Version 1.0.0
          </Badge>
        </Card>

        {/* Mission */}
        <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Target className="w-5 h-5 text-purple-300" />
            </div>
            <h3 className="text-white">Our Mission</h3>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            SkillSync AI is your intelligent career companion, designed to empower 
            professionals at every stage of their journey. We combine cutting-edge 
            artificial intelligence with comprehensive career insights to provide 
            personalized guidance, helping you make informed decisions about your 
            professional future.
          </p>
        </Card>

        {/* Key Features */}
        <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Sparkles className="w-5 h-5 text-blue-300" />
            </div>
            <h3 className="text-white">Key Features</h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
              <h4 className="text-white text-sm mb-1">AI-Powered Guidance</h4>
              <p className="text-white/60 text-xs">
                Intelligent responses tailored to your career questions
              </p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
              <h4 className="text-white text-sm mb-1">Comprehensive Database</h4>
              <p className="text-white/60 text-xs">
                350+ curated career questions across multiple industries
              </p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
              <h4 className="text-white text-sm mb-1">Personalized Experience</h4>
              <p className="text-white/60 text-xs">
                Save questions, track activity, and build your career roadmap
              </p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
              <h4 className="text-white text-sm mb-1">24/7 Availability</h4>
              <p className="text-white/60 text-xs">
                Access career guidance whenever you need it
              </p>
            </div>
          </div>
        </Card>

        {/* Team */}
        <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Users className="w-5 h-5 text-green-300" />
            </div>
            <h3 className="text-white">Our Team</h3>
          </div>
          <p className="text-white/70 text-sm leading-relaxed mb-3">
            Built by career experts, AI specialists, and designers passionate about 
            democratizing access to quality career guidance. We believe everyone deserves 
            the tools and information needed to achieve their professional goals.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-200 border-purple-500/30">
              Career Advisors
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-200 border-blue-500/30">
              AI Engineers
            </Badge>
            <Badge variant="secondary" className="bg-green-500/20 text-green-200 border-green-500/30">
              UX Designers
            </Badge>
          </div>
        </Card>

        {/* Contact */}
        <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Mail className="w-5 h-5 text-orange-300" />
            </div>
            <h3 className="text-white">Get in Touch</h3>
          </div>
          <p className="text-white/70 text-sm mb-3">
            We'd love to hear from you! Whether you have feedback, questions, or 
            suggestions for improvement.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-white/60 text-sm">Email:</span>
              <span className="text-purple-300 text-sm">support@skillsyncai.com</span>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center py-4">
          <p className="text-white/50 text-xs">
            © 2025 SkillSync AI. All rights reserved.
          </p>
          <p className="text-white/40 text-xs mt-1">
            Made with 💜 for career seekers everywhere
          </p>
        </div>

        <div className="h-20"></div>
      </div>
    </div>
  );
}