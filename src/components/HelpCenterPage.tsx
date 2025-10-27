import { ArrowLeft, HelpCircle, Search, ChevronDown, ChevronUp, Mail, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { useState } from "react";

interface HelpCenterPageProps {
  onBack: () => void;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "How does SkillSync AI work?",
    answer: "SkillSync AI uses advanced artificial intelligence to provide personalized career guidance. Simply ask your career-related question, and our AI will analyze it to provide comprehensive, tailored advice based on industry best practices, current market trends, and expert knowledge."
  },
  {
    id: 2,
    question: "Is the career advice reliable?",
    answer: "Our AI is trained on extensive career development data, industry insights, and professional guidance. While our advice is comprehensive and well-researched, we recommend using it as supplementary information and consulting with certified career counselors for major decisions."
  },
  {
    id: 3,
    question: "How do I save questions for later?",
    answer: "When viewing any question's answer, tap the bookmark icon at the bottom of the screen. Saved questions can be accessed from your Profile page under 'Saved Questions'. This helps you build a personalized collection of career resources."
  },
  {
    id: 4,
    question: "Can I use SkillSync AI offline?",
    answer: "Currently, SkillSync AI requires an internet connection to generate AI responses and access the latest career information. However, previously viewed content is cached locally, so you can review your saved questions offline."
  },
  {
    id: 5,
    question: "How often is content updated?",
    answer: "Our AI knowledge base is continuously updated to reflect current market trends, emerging technologies, and evolving industry practices. Our team regularly reviews and enhances the question database to ensure relevance and accuracy."
  },
  {
    id: 6,
    question: "Is my data secure?",
    answer: "Yes, your privacy and security are our top priorities. Your data is stored locally on your device using browser storage. We implement industry-standard security measures to protect your information. See our Privacy Policy for detailed information."
  },
  {
    id: 7,
    question: "Can I suggest new features?",
    answer: "Absolutely! We welcome user feedback and feature suggestions. Please contact us at support@skillsyncai.com with your ideas. Your input helps us improve SkillSync AI for everyone."
  },
  {
    id: 8,
    question: "What industries does SkillSync AI cover?",
    answer: "SkillSync AI covers a wide range of industries including Technology, Business, Healthcare, Arts, Education, and more. Our knowledge base includes career guidance for hundreds of roles across various sectors, from entry-level to executive positions."
  }
];

export function HelpCenterPage({ onBack }: HelpCenterPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

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
        <h1 className="text-white text-lg">Help Center</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Search */}
        <Card className="p-4 bg-white/5 backdrop-blur-sm border-white/10 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <HelpCircle className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <h2 className="text-white">How can we help?</h2>
              <p className="text-white/60 text-sm">Search our FAQs for quick answers</p>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
            <Input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
            />
          </div>
        </Card>

        {/* FAQs */}
        <div className="mb-4">
          <h3 className="text-white mb-3">Frequently Asked Questions</h3>
          <div className="space-y-2">
            {filteredFAQs.map((faq) => (
              <Card key={faq.id} className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-white text-sm pr-2">{faq.question}</span>
                  {expandedFAQ === faq.id ? (
                    <ChevronUp className="w-4 h-4 text-white/70 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-white/70 shrink-0" />
                  )}
                </button>
                {expandedFAQ === faq.id && (
                  <div className="px-4 pb-4">
                    <Separator className="bg-white/10 mb-3" />
                    <p className="text-white/70 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
          {filteredFAQs.length === 0 && (
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 text-center">
              <p className="text-white/60 text-sm">No FAQs match your search. Try different keywords.</p>
            </Card>
          )}
        </div>

        {/* Contact Support */}
        <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 mb-4">
          <h3 className="text-white mb-4">Still need help?</h3>
          <p className="text-white/70 text-sm mb-4">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Mail className="w-4 h-4 text-purple-300" />
              </div>
              <div className="flex-1">
                <h4 className="text-white text-sm">Email Support</h4>
                <p className="text-white/60 text-xs">support@skillsyncai.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <MessageCircle className="w-4 h-4 text-green-300" />
              </div>
              <div className="flex-1">
                <h4 className="text-white text-sm">Live Chat</h4>
                <p className="text-white/60 text-xs">Available Mon-Fri, 9AM-5PM EST</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="h-20"></div>
      </div>
    </div>
  );
}