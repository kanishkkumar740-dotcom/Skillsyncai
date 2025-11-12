import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff,
  Brain,
  Zap
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { createUser, authenticateUser, findUserByEmail } from "../utils/userStorage";

interface AuthPageProps {
  mode: 'login' | 'signup';
  onBack: () => void;
  onSuccess: (userData: any, isNewUser?: boolean) => void;
  onModeSwitch: (mode: 'login' | 'signup') => void;
  onForgotPassword?: () => void;
}

export function AuthPage({ mode, onBack, onSuccess, onModeSwitch, onForgotPassword }: AuthPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (mode === 'signup' && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'signup') {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      try {
        let userData;
        
        if (mode === 'signup') {
          // Check if user already exists
          const existingUser = findUserByEmail(formData.email);
          if (existingUser) {
            setErrors({ email: 'An account with this email already exists' });
            setIsLoading(false);
            return;
          }
          
          // Create new user in the database
          const newUser = createUser({
            name: formData.name,
            email: formData.email,
            password: formData.password
          });
          
          userData = {
            ...newUser,
            isAuthenticated: true
          };
          
          toast.success('Account Created!', {
            description: `Welcome to SkillSync AI, ${newUser.name}!`,
            duration: 3000
          });
        } else {
          // Login mode - authenticate user
          const authenticatedUser = authenticateUser(formData.email, formData.password);
          
          if (!authenticatedUser) {
            setErrors({ email: 'Invalid email or password' });
            setIsLoading(false);
            return;
          }
          
          userData = {
            ...authenticatedUser,
            isAuthenticated: true
          };
          
          toast.success('Welcome Back!', {
            description: `Signed in as ${authenticatedUser.name}`,
            duration: 3000
          });
        }
        
        // Store current user session in localStorage
        localStorage.setItem('skillsync_user', JSON.stringify(userData));
        
        setIsLoading(false);
        // Pass isNewUser as true for signup mode
        onSuccess(userData, mode === 'signup');
      } catch (error: any) {
        setErrors({ email: error.message || 'An error occurred' });
        setIsLoading(false);
        toast.error('Error', {
          description: error.message || 'An error occurred',
          duration: 3000
        });
      }
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

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
        <h1 className="text-white text-lg">
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Welcome Message */}
        <div className="text-center mb-6">
          <p className="text-white/90 text-sm">
            {mode === 'login' 
              ? 'Sign in to continue your career journey' 
              : 'Start your personalized career guidance'}
          </p>
        </div>

        {/* Form */}
        <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-white text-sm mb-2">Full Name</label>
                <div className="relative">
                  <User className="w-5 h-5 text-white/40 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>
            )}

            <div>
              <label className="block text-white text-sm mb-2">Email Address</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-white/40 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-white text-sm mb-2">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-white/40 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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
              
              {/* Forgot Password Link - Only show in login mode */}
              {mode === 'login' && onForgotPassword && (
                <div className="text-right mt-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={onForgotPassword}
                    className="text-purple-300 hover:text-purple-200 p-0 h-auto text-xs"
                  >
                    Forgot Password?
                  </Button>
                </div>
              )}
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-white text-sm mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-white/40 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
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
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-6"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>

          {/* Switch Mode */}
          <div className="text-center mt-6">
            <p className="text-white/60 text-sm">
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onModeSwitch(mode === 'login' ? 'signup' : 'login')}
                className="text-purple-300 hover:text-purple-200 ml-1 p-0 h-auto"
              >
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </Button>
            </p>
          </div>

          {/* Demo Note */}
          <div className="mt-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-blue-300 text-xs text-center">
              This is a demo app. Use any email/password to {mode === 'login' ? 'sign in' : 'create an account'}.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}