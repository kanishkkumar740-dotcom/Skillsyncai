import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { findUserByEmail } from "../utils/userStorage";

interface ForgotPasswordPageProps {
  onBack: () => void;
  onResetLinkSent: (email: string) => void;
}

export function ForgotPasswordPage({ onBack, onResetLinkSent }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Simulate API call to send reset email
    setTimeout(() => {
      // Check if user exists in the database
      const user = findUserByEmail(email);
      
      if (!user) {
        setError('No account found with this email address');
        setIsLoading(false);
        return;
      }
      
      // Store reset token in localStorage (in real app, this would be backend)
      const resetToken = Math.random().toString(36).substring(2, 15);
      const resetData = {
        email: email.toLowerCase(),
        token: resetToken,
        timestamp: Date.now(),
        expiresIn: 3600000 // 1 hour
      };
      
      localStorage.setItem('password_reset_token', JSON.stringify(resetData));
      
      setIsLoading(false);
      setEmailSent(true);
      
      // Show success toast
      toast.success('Reset Link Sent!', {
        description: `Check your email at ${email}`,
        duration: 3000,
      });
      
      // Navigate to reset password page after showing confirmation
      setTimeout(() => {
        onResetLinkSent(email);
      }, 2000);
    }, 1500);
  };

  if (emailSent) {
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-white/10">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white/70 hover:text-white p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-white text-lg">Check Your Email</h1>
        </div>

        {/* Success Message */}
        <div className="flex-1 overflow-y-auto p-4 flex items-center justify-center">
          <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 max-w-md">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-white text-xl mb-2">Email Sent!</h2>
              <p className="text-white/70 text-sm mb-4">
                We've sent a password reset link to:
              </p>
              <p className="text-purple-300 mb-6">{email}</p>
              <p className="text-white/60 text-xs">
                Click the link in the email to reset your password. The link will expire in 1 hour.
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-white/10">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-white/70 hover:text-white p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-white text-lg">Forgot Password</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Instructions */}
        <div className="text-center mb-6">
          <p className="text-white/90 text-sm">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Form */}
        <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white text-sm mb-2">Email Address</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-white/40 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-6"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Sending Reset Link...
                </div>
              ) : (
                'Send Reset Link'
              )}
            </Button>
          </form>

          {/* Back to Sign In */}
          <div className="text-center mt-6">
            <p className="text-white/60 text-sm">
              Remember your password?
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-purple-300 hover:text-purple-200 ml-1 p-0 h-auto"
              >
                Sign In
              </Button>
            </p>
          </div>

          {/* Demo Note */}
          <div className="mt-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-blue-300 text-xs text-center">
              This is a demo app. Any valid email format will work.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}