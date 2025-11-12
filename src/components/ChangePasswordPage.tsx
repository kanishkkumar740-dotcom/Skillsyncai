import { ArrowLeft, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { toast } from "sonner@2.0.3";
import { findUserByEmail, updateUserPassword } from "../utils/userStorage";

interface ChangePasswordPageProps {
  onBack: () => void;
}

export function ChangePasswordPage({ onBack }: ChangePasswordPageProps) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Get current user from localStorage
      const storedUser = localStorage.getItem('skillsync_user');
      
      if (!storedUser) {
        toast.error('User session not found. Please sign in again.');
        setIsLoading(false);
        return;
      }

      try {
        const user = JSON.parse(storedUser);
        
        // Verify current password
        const dbUser = findUserByEmail(user.email);
        
        if (!dbUser) {
          toast.error('User account not found');
          setIsLoading(false);
          return;
        }
        
        if (dbUser.password !== currentPassword) {
          toast.error('Current password is incorrect');
          setIsLoading(false);
          return;
        }
        
        // Update password in database
        const success = updateUserPassword(user.email, newPassword);
        
        if (success) {
          // Update current session
          user.password = newPassword;
          localStorage.setItem('skillsync_user', JSON.stringify(user));
          
          setIsLoading(false);
          toast.success("Password changed successfully!");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setTimeout(() => onBack(), 1500);
        } else {
          toast.error('Failed to update password');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error changing password:', error);
        toast.error('An error occurred. Please try again.');
        setIsLoading(false);
      }
    }, 1000);
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
        <h1 className="text-white text-lg">Change Password</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Lock className="w-6 h-6 text-purple-300" />
            </div>
            <div>
              <h2 className="text-white">Security</h2>
              <p className="text-white/60 text-sm">Update your password to keep your account secure</p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-5">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="current" className="text-white/90">
                Current Password
              </Label>
              <div className="relative">
                <Input
                  id="current"
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 pr-10"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
                >
                  {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="new" className="text-white/90">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="new"
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 pr-10"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-white/50 text-xs">Must be at least 6 characters</p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirm" className="text-white/90">
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  id="confirm"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 pr-10"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white"
            >
              {isLoading ? "Updating..." : "Change Password"}
            </Button>
          </form>
        </Card>

        <div className="h-20"></div>
      </div>
    </div>
  );
}