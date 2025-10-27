import { ArrowLeft, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

export function PrivacyPolicyPage({ onBack }: PrivacyPolicyPageProps) {
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
        <h1 className="text-white text-lg">Privacy Policy</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 mb-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Shield className="w-6 h-6 text-green-300" />
            </div>
            <div>
              <h2 className="text-white">Your Privacy Matters</h2>
              <p className="text-white/60 text-sm">Last updated: October 8, 2025</p>
            </div>
          </div>

          <div className="space-y-6 text-white/80 text-sm">
            <div>
              <h3 className="text-white mb-2">1. Information We Collect</h3>
              <p className="mb-2">
                We collect information you provide directly to us when you:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2 text-white/70">
                <li>Create an account and profile</li>
                <li>Search for career guidance</li>
                <li>Save questions and interact with content</li>
                <li>Contact our support team</li>
              </ul>
            </div>

            <Separator className="bg-white/10" />

            <div>
              <h3 className="text-white mb-2">2. How We Use Your Information</h3>
              <p className="mb-2">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2 text-white/70">
                <li>Provide personalized career guidance</li>
                <li>Improve our AI recommendations</li>
                <li>Send you relevant notifications</li>
                <li>Analyze usage patterns to enhance our service</li>
                <li>Communicate with you about updates</li>
              </ul>
            </div>

            <Separator className="bg-white/10" />

            <div>
              <h3 className="text-white mb-2">3. Data Storage and Security</h3>
              <p className="text-white/70">
                Your data is stored locally on your device using browser storage. We implement 
                industry-standard security measures to protect your information. However, no 
                method of transmission over the internet is 100% secure.
              </p>
            </div>

            <Separator className="bg-white/10" />

            <div>
              <h3 className="text-white mb-2">4. Your Rights</h3>
              <p className="mb-2">You have the right to:</p>
              <ul className="list-disc list-inside space-y-1 ml-2 text-white/70">
                <li>Access your personal data</li>
                <li>Request data deletion</li>
                <li>Opt-out of certain data collection</li>
                <li>Export your data</li>
              </ul>
            </div>

            <Separator className="bg-white/10" />

            <div>
              <h3 className="text-white mb-2">5. Third-Party Services</h3>
              <p className="text-white/70">
                We may use third-party services to help us operate and improve SkillSync AI. 
                These services have their own privacy policies and we encourage you to review them.
              </p>
            </div>

            <Separator className="bg-white/10" />

            <div>
              <h3 className="text-white mb-2">6. Cookies and Tracking</h3>
              <p className="text-white/70">
                We use local storage to remember your preferences and improve your experience. 
                You can clear this data at any time through your browser settings or our 
                app settings.
              </p>
            </div>

            <Separator className="bg-white/10" />

            <div>
              <h3 className="text-white mb-2">7. Changes to This Policy</h3>
              <p className="text-white/70">
                We may update this privacy policy from time to time. We will notify you of 
                any changes by posting the new policy on this page and updating the "Last 
                updated" date.
              </p>
            </div>

            <Separator className="bg-white/10" />

            <div>
              <h3 className="text-white mb-2">8. Contact Us</h3>
              <p className="text-white/70">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-purple-300 mt-2">privacy@skillsyncai.com</p>
            </div>
          </div>
        </Card>

        <div className="h-20"></div>
      </div>
    </div>
  );
}
