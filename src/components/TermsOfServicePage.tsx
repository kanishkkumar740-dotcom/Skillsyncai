import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";

interface TermsOfServicePageProps {
  onBack: () => void;
}

export function TermsOfServicePage({ onBack }: TermsOfServicePageProps) {
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
        <h1 className="text-white text-lg">Terms of Service</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 mb-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <FileText className="w-6 h-6 text-blue-300" />
            </div>
            <div>
              <h2 className="text-white">Terms & Conditions</h2>
              <p className="text-white/60 text-sm">Last updated: October 8, 2025</p>
            </div>
          </div>

          <div className="space-y-6 text-white/80 text-sm">
            <div>
              <h3 className="text-white mb-2">1. Acceptance of Terms</h3>
              <p className="text-white/70">
                By accessing and using SkillSync AI, you accept and agree to be bound by these 
                Terms of Service. If you do not agree to these terms, please do not use our service.
              </p>
            </div>

            <Separator className="bg-white/10" />

            <div>
              <h3 className="text-white mb-2">2. Use License</h3>
              <p className="mb-2 text-white/70">
                Permission is granted to use SkillSync AI for personal career development purposes. 
                This license shall automatically terminate if you violate any of these restrictions.
              </p>
              <div className="mt-3">
                <p className="mb-1 text-white/80">You may not:</p>
                <ul className="list-disc list-inside space-y-1 ml-2 text-white/70">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for commercial purposes</li>
                  <li>Attempt to reverse engineer any software</li>
                  <li>Remove copyright or proprietary notations</li>
                  <li>Transfer materials to another person</li>
                </ul>
              </div>
            </div>

            <Separator className="bg-white/10" />

            <div>
              <h3 className="text-white mb-2">3. AI-Generated Content Disclaimer</h3>
              <p className="text-white/70">
                SkillSync AI uses artificial intelligence to provide career guidance. While we 
                strive for accuracy, AI-generated responses should be used as supplementary 
                information and not as definitive career advice. Always consult with qualified 
                professionals for important career decisions.
              </p>
            </div>

            <Separator className="bg-white/10" />

            <div>
              <h3 className="text-white mb-2">4. User Account</h3>
              <p className="text-white/70">
                You are responsible for maintaining the confidentiality of your account 
                credentials. You agree to accept responsibility for all activities that occur 
                under your account. Notify us immediately of any unauthorized use.
              </p>
            </div>

            <Separator className="bg-white/10" />

            <div>
              <h3 className="text-white mb-2">5. Prohibited Uses</h3>
              <p className="mb-2 text-white/70">You may not use SkillSync AI to:</p>
              <ul className="list-disc list-inside space-y-1 ml-2 text-white/70">
                <li>Violate any laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Harass, abuse, or harm others</li>
                <li>Distribute malware or malicious code</li>
                <li>Engage in unauthorized data scraping</li>
                <li>Impersonate any person or entity</li>
              </ul>
            </div>

            <Separator className="bg-white/10" />

            <div>
              <h3 className="text-white mb-2">6. Intellectual Property</h3>
              <p className="text-white/70">
                All content, features, and functionality of SkillSync AI are owned by us and 
                are protected by international copyright, trademark, and other intellectual 
                property laws.
              </p>
            </div>

            <Separator className="bg-white/10" />

            <div>
              <h3 className="text-white mb-2">7. Disclaimer</h3>
              <p className="text-white/70">
                SkillSync AI is provided "as is" without warranties of any kind. We do not 
                guarantee that the service will be uninterrupted, secure, or error-free. Career 
                outcomes may vary, and we make no guarantees about job placement or career success.
              </p>
            </div>

            <Separator className="bg-white/10" />

            <div>
              <h3 className="text-white mb-2">8. Limitation of Liability</h3>
              <p className="text-white/70">
                In no event shall SkillSync AI or its suppliers be liable for any damages 
                (including, without limitation, damages for loss of data or profit) arising out 
                of the use or inability to use our service.
              </p>
            </div>

            <Separator className="bg-white/10" />

            <div>
              <h3 className="text-white mb-2">9. Modifications to Terms</h3>
              <p className="text-white/70">
                We reserve the right to modify these terms at any time. We will notify users of 
                any significant changes. Continued use of the service after changes constitutes 
                acceptance of the new terms.
              </p>
            </div>

            <Separator className="bg-white/10" />

            <div>
              <h3 className="text-white mb-2">10. Contact Information</h3>
              <p className="text-white/70 mb-2">
                For questions about these Terms of Service, please contact:
              </p>
              <p className="text-purple-300">legal@skillsyncai.com</p>
            </div>
          </div>
        </Card>

        <div className="h-20"></div>
      </div>
    </div>
  );
}