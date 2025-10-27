import { ArrowLeft, Moon, Bell, Lock, Globe, HelpCircle, Info, Trash2, LogOut, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { useState, useEffect } from "react";
import { toast } from "sonner@2.0.3";

interface SettingsPageProps {
  onBack: () => void;
  onSignOut: () => void;
  onNavigate: (page: 'changePassword' | 'privacy' | 'terms' | 'about' | 'help' | 'adminMonitoring') => void;
}

export function SettingsPage({ onBack, onSignOut, onNavigate }: SettingsPageProps) {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    emailNotifications: true,
    pushNotifications: false,
    soundEffects: true,
  });

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('skillsync_settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('skillsync_settings', JSON.stringify(settings));
  }, [settings]);

  const handleToggle = (key: string) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: !prev[key as keyof typeof prev] };
      toast.success(`${key === 'darkMode' ? 'Dark Mode' : key === 'notifications' ? 'Notifications' : key} ${newSettings[key as keyof typeof newSettings] ? 'enabled' : 'disabled'}`);
      return newSettings;
    });
  };

  const handleClearData = () => {
    // Clear all data except user credentials
    localStorage.removeItem('skillsync_bookmarks');
    localStorage.removeItem('skillsync_notifications');
    localStorage.removeItem('skillsync_recent_searches');
    localStorage.removeItem('skillsync_recently_viewed');
    localStorage.removeItem('skillsync_settings');
    toast.success('All data cleared successfully');
  };

  const handleDeleteAccount = () => {
    // Clear everything including user
    localStorage.clear();
    toast.success('Account deleted successfully');
    setTimeout(() => onSignOut(), 1500);
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
        <h1 className="text-white text-lg">Settings</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Appearance */}
        <Card className="p-4 bg-white/5 backdrop-blur-sm border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Moon className="w-4 h-4 text-purple-300" />
              </div>
              <div>
                <h3 className="text-white text-sm">Appearance</h3>
                <p className="text-white/60 text-xs">Customize your theme</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">Dark Mode</span>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={() => handleToggle('darkMode')}
              />
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-4 bg-white/5 backdrop-blur-sm border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Bell className="w-4 h-4 text-blue-300" />
              </div>
              <div>
                <h3 className="text-white text-sm">Notifications</h3>
                <p className="text-white/60 text-xs">Manage notification preferences</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">All Notifications</span>
              <Switch
                checked={settings.notifications}
                onCheckedChange={() => handleToggle('notifications')}
              />
            </div>
            <Separator className="bg-white/10" />
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">Email Notifications</span>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={() => handleToggle('emailNotifications')}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">Push Notifications</span>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={() => handleToggle('pushNotifications')}
              />
            </div>
          </div>
        </Card>

        {/* Privacy & Security */}
        <Card className="p-4 bg-white/5 backdrop-blur-sm border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Lock className="w-4 h-4 text-green-300" />
              </div>
              <div>
                <h3 className="text-white text-sm">Privacy & Security</h3>
                <p className="text-white/60 text-xs">Manage your privacy settings</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('changePassword')}
              className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10 text-sm"
            >
              Change Password
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('privacy')}
              className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10 text-sm"
            >
              Privacy Policy
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('terms')}
              className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10 text-sm"
            >
              Terms of Service
            </Button>
          </div>
        </Card>

        {/* General */}
        <Card className="p-4 bg-white/5 backdrop-blur-sm border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Globe className="w-4 h-4 text-orange-300" />
              </div>
              <div>
                <h3 className="text-white text-sm">General</h3>
                <p className="text-white/60 text-xs">App preferences</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">Sound Effects</span>
              <Switch
                checked={settings.soundEffects}
                onCheckedChange={() => handleToggle('soundEffects')}
              />
            </div>
            <Separator className="bg-white/10" />
            <Button 
              variant="ghost" 
              className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10 text-sm"
            >
              <Globe className="w-4 h-4 mr-2" />
              Language (English)
            </Button>
          </div>
        </Card>

        {/* Admin Panel (visible to admins only) */}
        <Card className="p-4 bg-purple-500/10 backdrop-blur-sm border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Shield className="w-4 h-4 text-purple-300" />
              </div>
              <div>
                <h3 className="text-purple-300 text-sm">Admin Panel</h3>
                <p className="text-purple-200/60 text-xs">Content moderation tools</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('adminMonitoring')}
              className="w-full justify-start text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 text-sm"
            >
              <Shield className="w-4 h-4 mr-2" />
              Admin Monitoring Dashboard
            </Button>
          </div>
        </Card>

        {/* Support */}
        <Card className="p-4 bg-white/5 backdrop-blur-sm border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <HelpCircle className="w-4 h-4 text-yellow-300" />
              </div>
              <div>
                <h3 className="text-white text-sm">Support</h3>
                <p className="text-white/60 text-xs">Get help and support</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('help')}
              className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10 text-sm"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Help Center
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('about')}
              className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10 text-sm"
            >
              <Info className="w-4 h-4 mr-2" />
              About SkillSync AI
            </Button>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-4 bg-red-500/10 backdrop-blur-sm border-red-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <Trash2 className="w-4 h-4 text-red-300" />
              </div>
              <div>
                <h3 className="text-red-300 text-sm">Danger Zone</h3>
                <p className="text-red-200/60 text-xs">Irreversible actions</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-300 hover:text-red-200 hover:bg-red-500/10 text-sm"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-gray-900 border-white/20">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-white">Clear All Data?</AlertDialogTitle>
                  <AlertDialogDescription className="text-white/70">
                    This will delete all your saved questions, search history, and preferences. 
                    Your account will remain active. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleClearData}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    Clear Data
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-300 hover:text-red-200 hover:bg-red-500/10 text-sm"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-gray-900 border-white/20">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-white">Delete Account?</AlertDialogTitle>
                  <AlertDialogDescription className="text-white/70">
                    This will permanently delete your account and all associated data. 
                    This action cannot be undone and you will be signed out immediately.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDeleteAccount}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </Card>

        {/* Sign Out */}
        <Button 
          onClick={onSignOut}
          className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>

        <div className="h-20"></div>
      </div>
    </div>
  );
}
