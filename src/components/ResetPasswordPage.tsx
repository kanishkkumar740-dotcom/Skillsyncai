import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { ArrowLeft, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface ResetPasswordPageProps {
  email: string;
  onBack: () => void;
  onSuccess: () => void;
}

export function ResetPasswordPage({ email, onBack, onSuccess }: ResetPasswordPageProps) {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [resetComplete, setResetComplete] = useState(false);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call to reset password
    setTimeout(() => {
      // Get reset token data
      const resetTokenData = localStorage.getItem('password_reset_token');
      
      if (resetTokenData) {
        const { email: tokenEmail, timestamp, expiresIn } = JSON.parse(resetTokenData);
        
        // Check if token is expired
        if (Date.now() - timestamp > expiresIn) {
          setErrors({ password: 'Reset link has expired. Please request a new one.' });
          setIsLoading(false);
          return;
        }
        
        // Update user password in localStorage (in demo, create or update user)
        const storedUser = localStorage.getItem('skillsync_user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          if (user.email.toLowerCase() === tokenEmail.toLowerCase()) {
            // In a real app, password would be hashed
            user.password = formData.password;
            localStorage.setItem('skillsync_user', JSON.stringify(user));
          }
        } else {
          // Create a basic user entry for demo purposes
          const newUser = {
            email: tokenEmail,
            password: formData.password,
            name: 'Career Explorer',
            id: Date.now(),
            joinDate: new Date().toISOString()
          };
          localStorage.setItem('skillsync_user', JSON.stringify(newUser));
        }
        
        // Clear the reset token
        localStorage.removeItem('password_reset_token');
        
        setIsLoading(false);
        setResetComplete(true);
        
        // Show success toast
        toast.success('Password Reset Complete!', {
          description: 'You can now sign in with your new password.',
          duration: 3000,
        });
        
        // Navigate back to login after showing success
        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else {
        setErrors({ password: 'Invalid or expired reset link' });
        setIsLoading(false);
      }
    }, 1500);
  };

  if (resetComplete) {
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-white/10">
          <h1 className="text-white text-lg">Password Reset</h1>
        </div>

        {/* Success Message */}
        <div className="flex-1 overflow-y-auto p-4 flex items-center justify-center">
          <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 max-w-md">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-white text-xl mb-2">Password Reset Successful!</h2>
              <p className="text-white/70 text-sm mb-4">
                Your password has been successfully reset.
              </p>
              <p className="text-white/60 text-xs">
                Redirecting to sign in...
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
        <h1 className="text-white text-lg">Reset Password</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Instructions */}
        <div className="text-center mb-6">
          <p className="text-white/90 text-sm">
            Create a new password for your account
          </p>
          <p className="text-purple-300 text-xs mt-2">{email}</p>
        </div>

        {/* Form */}
        <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white text-sm mb-2">New Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-white/40 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-white/40 hover:text-white/70"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
              <p className="text-white/50 text-xs mt-1">Must be at least 6 characters</p>
            </div>

            <div>
              <label className="block text-white text-sm mb-2">Confirm New Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-white/40 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-white/40 hover:text-white/70"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-6"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Resetting Password...
                </div>
              ) : (
                'Reset Password'
              )}
            </Button>
          </form>

          {/* Security Note */}
          <div className="mt-6 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <p className="text-purple-300 text-xs text-center">
              Choose a strong password that you haven't used elsewhere
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
