import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { SearchSection } from "./components/SearchSection";
import { PopularTopics } from "./components/PopularTopics";
import { SuggestedQuestions } from "./components/SuggestedQuestions";
import { SearchResultsHeader } from "./components/SearchResultsHeader";
import { ResultsList } from "./components/ResultsList";
import { FilterHeader } from "./components/FilterHeader";
import { FilterSection } from "./components/FilterSection";
import { FilterFooter } from "./components/FilterFooter";
import { AnswerHeader } from "./components/AnswerHeader";
import { FullAnswer } from "./components/FullAnswer";
import { ActionButtons } from "./components/ActionButtons";
import { BottomNavigation } from "./components/BottomNavigation";
import { SearchLoadingState } from "./components/SearchLoadingState";
import { TopicsPage } from "./components/TopicsPage";
import { ProfilePage } from "./components/ProfilePage";
import { TopicsHeader } from "./components/TopicsHeader";
import { ProfileHeader } from "./components/ProfileHeader";
import { AuthPage } from "./components/AuthPage";
import { SavedQuestionsPage } from "./components/SavedQuestionsPage";
import { SettingsPage } from "./components/SettingsPage";
import { NotificationsPage, type Notification, initialNotifications } from "./components/NotificationsPage";
import { RecentActivityPage } from "./components/RecentActivityPage";
import { ChangePasswordPage } from "./components/ChangePasswordPage";
import { PrivacyPolicyPage } from "./components/PrivacyPolicyPage";
import { TermsOfServicePage } from "./components/TermsOfServicePage";
import { AboutPage } from "./components/AboutPage";
import { HelpCenterPage } from "./components/HelpCenterPage";
import { CommunityFeedbackPage } from "./components/CommunityFeedbackPage";
import { AdminMonitoringPage } from "./components/AdminMonitoringPage";
import { OnboardingFlow, type UserPreferences } from "./components/OnboardingFlow";
import { PersonalizedDashboard } from "./components/PersonalizedDashboard";
import { CareerPreferencesPage } from "./components/CareerPreferencesPage";
import { ForgotPasswordPage } from "./components/ForgotPasswordPage";
import { ResetPasswordPage } from "./components/ResetPasswordPage";
import { Toaster } from "./components/ui/sonner";
import { Button } from "./components/ui/button";
import { Target, ArrowRight } from "lucide-react";
import { searchCareerQuestions, type CareerQuestion, extendedSampleQuestions } from "./services/aiCareerAdvisor";
import { generateCareerAdvice, isOpenAIConfigured, getErrorMessage } from "./utils/openai";
import { toast } from "sonner@2.0.3";

// Sample data for the app - now using extended questions
const sampleQuestions: CareerQuestion[] = [
  {
    id: 1,
    question: "How do I start a career in cybersecurity?",
    answer: "To start a career in cybersecurity, begin with networking fundamentals, practice coding, get certifications, and gain practical experience through internships and projects. Start by learning the basics of computer networks, operating systems, and programming languages like Python or JavaScript. Pursue industry-recognized certifications such as CompTIA Security+, CISSP, or CEH to validate your skills. Build a home lab environment to practice ethical hacking and security analysis. Apply for entry-level positions like SOC analyst, junior security specialist, or cybersecurity intern. Stay current with the latest security threats, attend conferences, and join professional organizations like (ISC)² or ISACA to network with other professionals in the field.",
    category: "Tech"
  },
  {
    id: 2,
    question: "What skills do I need for digital marketing?",
    answer: "Digital marketing requires a mix of analytical, creative, and technical skills. Key areas include SEO/SEM, social media marketing, content creation, email marketing, data analytics, and marketing automation tools like HubSpot or Marketo. Learn Google Analytics, Google Ads, Facebook Ads Manager, and tools like Canva or Adobe Creative Suite. Develop strong writing skills for content marketing and understand basic HTML/CSS. Stay updated with digital trends and consumer behavior patterns.",
    category: "Business"
  },
  {
    id: 3,
    question: "How to become a nurse practitioner?",
    answer: "To become a nurse practitioner, you need to first become a registered nurse (RN) with a Bachelor of Science in Nursing (BSN). Gain clinical experience in your desired specialty area, then pursue a Master of Science in Nursing (MSN) or Doctor of Nursing Practice (DNP) degree. Complete clinical hours in your specialty, pass the national certification exam, and obtain state licensure. Popular specialties include family practice, pediatrics, psychiatric/mental health, and acute care.",
    category: "Healthcare"
  },
  {
    id: 4,
    question: "What does a UX designer do daily?",
    answer: "UX designers research user needs, create wireframes and prototypes, conduct usability testing, and collaborate with developers and stakeholders. Daily tasks include user interviews, sketching ideas, creating user personas, designing user flows, prototyping in tools like Figma or Sketch, analyzing user feedback, and iterating on designs. They also attend meetings with product teams, review analytics data, and ensure designs meet accessibility standards.",
    category: "Arts"
  },
  {
    id: 5,
    question: "How to transition from teaching to corporate training?",
    answer: "Transitioning from teaching to corporate training leverages your educational background while entering the business world. Start by identifying transferable skills like curriculum development, presentation abilities, and learning assessment. Get familiar with corporate learning management systems (LMS), adult learning principles, and instructional design methodologies like ADDIE. Consider certifications in training and development, build a portfolio of corporate training materials, and network with L&D professionals through LinkedIn and professional associations.",
    category: "Business"
  }
];

// Merge with extended questions for a richer experience
const allQuestions = [...sampleQuestions, ...extendedSampleQuestions];

const suggestedQuestions = [
  "How do I negotiate salary in tech?",
  "What certifications boost career growth?",
  "How to build a professional network?",
  "Best way to change careers at 30?"
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'search' | 'filters' | 'answer' | 'topics' | 'profile' | 'auth' | 'saved' | 'settings' | 'notifications' | 'activity' | 'changePassword' | 'privacy' | 'terms' | 'about' | 'help' | 'community-feedback' | 'adminMonitoring' | 'onboarding' | 'career-preferences' | 'forgot-password' | 'reset-password'>('home');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [resetEmail, setResetEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CareerQuestion[]>(allQuestions);
  const [selectedQuestion, setSelectedQuestion] = useState<CareerQuestion>(allQuestions[0]);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [bookmarkedItems, setBookmarkedItems] = useState<number[]>([1, 3, 101, 201]); // Demo bookmarks
  const [isSearching, setIsSearching] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [isNewUserOnboarding, setIsNewUserOnboarding] = useState(false);
  const [filters, setFilters] = useState({
    careerField: [] as string[],
    experienceLevel: [] as string[],
    questionType: [] as string[],
    industry: [] as string[],
    location: [] as string[]
  });
  const [activeNavItem, setActiveNavItem] = useState('Home');
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [recentSearches, setRecentSearches] = useState<Array<{ query: string; timestamp: number }>>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<CareerQuestion[]>([]);
  const [aiEnabled, setAiEnabled] = useState(true);

  // Check for existing user session and load saved data on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('skillsync_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserData(user);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('skillsync_user');
      }
    }

    // Load user preferences
    const storedPreferences = localStorage.getItem('skillsync_preferences');
    if (storedPreferences) {
      try {
        setUserPreferences(JSON.parse(storedPreferences));
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
    }

    // Load saved data
    const storedBookmarks = localStorage.getItem('skillsync_bookmarks');
    if (storedBookmarks) {
      try {
        setBookmarkedItems(JSON.parse(storedBookmarks));
      } catch (error) {
        console.error('Error loading bookmarks:', error);
      }
    }

    const storedNotifications = localStorage.getItem('skillsync_notifications');
    if (storedNotifications) {
      try {
        setNotifications(JSON.parse(storedNotifications));
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    }

    const storedSearches = localStorage.getItem('skillsync_recent_searches');
    if (storedSearches) {
      try {
        setRecentSearches(JSON.parse(storedSearches));
      } catch (error) {
        console.error('Error loading recent searches:', error);
      }
    }

    const storedViewed = localStorage.getItem('skillsync_recently_viewed');
    if (storedViewed) {
      try {
        setRecentlyViewed(JSON.parse(storedViewed));
      } catch (error) {
        console.error('Error loading recently viewed:', error);
      }
    }

    // Load AI settings
    const storedSettings = localStorage.getItem('skillsync_settings');
    if (storedSettings) {
      try {
        const settings = JSON.parse(storedSettings);
        setAiEnabled(settings.aiResponses !== false); // Default to true
      } catch (error) {
        console.error('Error loading AI settings:', error);
      }
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('skillsync_bookmarks', JSON.stringify(bookmarkedItems));
  }, [bookmarkedItems]);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('skillsync_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Save recent searches to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('skillsync_recent_searches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Save recently viewed to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('skillsync_recently_viewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setIsSearching(true);
      
      // Add to recent searches with timestamp
      setRecentSearches(prev => {
        const filtered = prev.filter(s => s.query !== query.trim());
        const newSearch = { query: query.trim(), timestamp: Date.now() };
        return [newSearch, ...filtered].slice(0, 50); // Keep last 50 searches
      });
      
      try {
        // First, search existing questions in the database
        const existingResults = searchCareerQuestions(query, allQuestions);
        
        // If OpenAI is configured, enabled, and no exact matches found, generate AI response
        if (isOpenAIConfigured() && aiEnabled && existingResults.length === 0) {
          toast.info('🤖 Generating AI response...', {
            description: 'SKILLSYNC AI is analyzing your question',
            duration: 2000,
          });
          
          const aiResponse = await generateCareerAdvice(query);
          
          // Create a new question object with AI-generated content
          const aiGeneratedQuestion: CareerQuestion = {
            id: Date.now(), // Unique ID based on timestamp
            question: query,
            answer: aiResponse.answer,
            category: aiResponse.category,
            isAiGenerated: true
          };
          
          // Add the AI response to results
          setSearchResults([aiGeneratedQuestion]);
          
          toast.success('✨ AI Response Generated!', {
            description: 'Your personalized career advice is ready',
            duration: 2000,
          });
        } else if (existingResults.length > 0) {
          // Use existing database results
          setSearchResults(existingResults);
        } else {
          // No OpenAI configured and no matches
          setSearchResults([]);
          toast.error('No results found', {
            description: 'Try rephrasing your question or enable AI responses',
            duration: 3000,
          });
        }
        
        setIsSearching(false);
        setCurrentScreen('search');
      } catch (error: any) {
        console.error('Search error:', error);
        setIsSearching(false);
        
        // Show user-friendly error message
        const errorMessage = getErrorMessage(error);
        toast.error('Failed to generate response', {
          description: errorMessage,
          duration: 4000,
        });
        
        // Fallback to existing database search
        const fallbackResults = searchCareerQuestions(query, allQuestions);
        setSearchResults(fallbackResults);
        setCurrentScreen('search');
      }
    } else {
      setSearchResults(allQuestions);
      setIsSearching(false);
    }
  };

  const handleQuestionSelect = (question: CareerQuestion) => {
    setSelectedQuestion(question);
    
    // Add to recently viewed
    setRecentlyViewed(prev => {
      const filtered = prev.filter(q => q.id !== question.id);
      return [question, ...filtered].slice(0, 20); // Keep last 20 viewed
    });
    
    setCurrentScreen('answer');
  };

  const handleSuggestedQuestionClick = (question: string) => {
    handleSearch(question);
  };

  const handleTopicClick = (topic: string) => {
    const filtered = allQuestions.filter(q => q.category === topic);
    setSearchResults(filtered);
    setSearchQuery(`Topic: ${topic}`);
    setCurrentScreen('search');
  };

  const toggleExpanded = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleFeedback = (feedback: 'like' | 'dislike', reason?: string) => {
    // Store feedback data - could be sent to backend later
    console.log('Feedback received:', {
      questionId: selectedQuestion.id,
      feedback,
      reason,
      timestamp: new Date().toISOString()
    });
    // Could also store in localStorage for analytics
    const feedbackData = {
      questionId: selectedQuestion.id,
      feedback,
      reason,
      timestamp: new Date().toISOString()
    };
    const existingFeedback = localStorage.getItem('skillsync_feedback');
    const allFeedback = existingFeedback ? JSON.parse(existingFeedback) : [];
    allFeedback.push(feedbackData);
    localStorage.setItem('skillsync_feedback', JSON.stringify(allFeedback));
  };

  const toggleBookmark = (id: number) => {
    setBookmarkedItems(prev => {
      const isCurrentlyBookmarked = prev.includes(id);
      
      if (!isCurrentlyBookmarked) {
        const newBookmarks = [...prev, id];
        const question = allQuestions.find(q => q.id === id);
        
        if (question) {
          const newNotification: Notification = {
            id: Date.now(),
            type: 'bookmark',
            title: 'Question Saved',
            message: `"${question.question.substring(0, 50)}..." has been added to your saved questions.`,
            time: 'Just now',
            isRead: false
          };
          
          // Check for achievement milestones
          const milestones = [5, 10, 25, 50];
          if (milestones.includes(newBookmarks.length)) {
            const achievementNotification: Notification = {
              id: Date.now() + 1,
              type: 'achievement',
              title: 'Achievement Unlocked! 🎉',
              message: `You've saved ${newBookmarks.length} questions! Keep exploring to grow your knowledge.`,
              time: 'Just now',
              isRead: false
            };
            setNotifications(prevNotifs => [achievementNotification, newNotification, ...prevNotifs]);
          } else {
            setNotifications(prevNotifs => [newNotification, ...prevNotifs]);
          }
        }
        return newBookmarks;
      } else {
        return prev.filter(item => item !== id);
      }
    });
  };

  const handleNavigation = (item: string) => {
    setActiveNavItem(item);
    if (item === 'Home') {
      setCurrentScreen('home');
    } else if (item === 'Topics') {
      setCurrentScreen('topics');
    } else if (item === 'Profile') {
      handleProfileAccess();
    }
  };

  const handleBackToSearch = () => {
    setCurrentScreen('search');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setSearchQuery('');
  };

  const handleFiltersOpen = () => {
    setCurrentScreen('filters');
  };

  const handleFiltersApply = () => {
    // Apply filters to search results
    let filtered = allQuestions;
    
    if (filters.careerField.length > 0) {
      filtered = filtered.filter(q => filters.careerField.includes(q.category));
    }
    
    setSearchResults(filtered);
    setCurrentScreen('search');
  };

  const handleAuthSuccess = (user: any, isNewUser: boolean = false) => {
    setUserData(user);
    setIsAuthenticated(true);
    
    // If it's a new signup, show onboarding
    if (isNewUser || authMode === 'signup') {
      setIsNewUserOnboarding(true);
      setCurrentScreen('onboarding');
    } else {
      setCurrentScreen('home');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('skillsync_user');
    setUserData(null);
    setIsAuthenticated(false);
    setUserPreferences(null);
    setCurrentScreen('home');
  };

  const handleOnboardingComplete = (preferences: UserPreferences) => {
    setUserPreferences(preferences);
    localStorage.setItem('skillsync_preferences', JSON.stringify(preferences));
    setIsNewUserOnboarding(false);
    
    // Show success toast
    const { toast } = require('sonner@2.0.3');
    toast.success('🎉 Profile Complete!', {
      description: 'Your personalized career dashboard is ready.',
      duration: 3000,
    });
    
    setCurrentScreen('home');
  };

  const handleExploreCareer = (careerTitle: string) => {
    // Search for the career
    handleSearch(careerTitle);
  };

  const handleProfileAccess = () => {
    if (!isAuthenticated) {
      setAuthMode('login');
      setCurrentScreen('auth');
    } else {
      setCurrentScreen('profile');
    }
  };

  const handleFiltersClose = () => {
    setCurrentScreen(searchQuery ? 'search' : 'home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <>
            <Header 
              isAuthenticated={isAuthenticated}
              userName={userData?.name}
              onSignInClick={() => {
                setAuthMode('login');
                setCurrentScreen('auth');
              }}
              onLogoClick={handleProfileAccess}
              onWireframeClick={() => setCurrentScreen('wireframe-feedback')}
            />
            <main className="flex-1 overflow-y-auto">
              <SearchSection 
                onSearch={handleSearch}
                onFiltersClick={handleFiltersOpen}
                searchQuery={searchQuery}
              />
              {isAuthenticated && userPreferences ? (
                <div className="px-4 pt-4">
                  <PersonalizedDashboard 
                    preferences={userPreferences}
                    userName={userData?.name || 'User'}
                    onExploreCareer={handleExploreCareer}
                  />
                </div>
              ) : (
                <>
                  {isAuthenticated && !userPreferences && (
                    <div className="px-4 pt-4">
                      <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 backdrop-blur-md rounded-xl border border-purple-400/30 p-4 mb-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-purple-500/30 rounded-lg">
                            <Target className="w-5 h-5 text-purple-300" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white mb-1">Personalize Your Experience</h3>
                            <p className="text-white/70 text-sm mb-3">
                              Tell us about your interests and goals to get personalized career recommendations.
                            </p>
                            <Button
                              onClick={() => setCurrentScreen('onboarding')}
                              className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white text-sm"
                              size="sm"
                            >
                              Get Started
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <PopularTopics onTopicClick={handleTopicClick} />
                  <SuggestedQuestions 
                    questions={suggestedQuestions}
                    onQuestionClick={handleSuggestedQuestionClick}
                  />
                </>
              )}
              <div className="h-20"></div>
            </main>
          </>
        );
      
      case 'search':
        return (
          <>
            <SearchResultsHeader 
              query={searchQuery}
              resultCount={searchResults.length}
              isSearching={isSearching}
              onBack={handleBackToHome}
              onFiltersClick={handleFiltersOpen}
            />
            <main className="flex-1 overflow-y-auto">
              {isSearching ? (
                <SearchLoadingState />
              ) : (
                <ResultsList 
                  results={searchResults}
                  expandedItems={expandedItems}
                  onToggleExpanded={toggleExpanded}
                  onQuestionSelect={handleQuestionSelect}
                />
              )}
              <div className="h-20"></div>
            </main>
          </>
        );
      
      case 'filters':
        return (
          <>
            <FilterHeader onClose={handleFiltersClose} />
            <main className="flex-1 overflow-y-auto">
              <FilterSection 
                filters={filters}
                onFiltersChange={setFilters}
              />
            </main>
            <FilterFooter 
              onApply={handleFiltersApply}
              onClear={() => setFilters({
                careerField: [],
                experienceLevel: [],
                questionType: [],
                industry: [],
                location: []
              })}
            />
          </>
        );
      
      case 'answer':
        return (
          <>
            <AnswerHeader 
              question={selectedQuestion.question}
              onBack={handleBackToSearch}
            />
            <main className="flex-1 overflow-y-auto">
              <FullAnswer 
                answer={selectedQuestion.answer} 
                isAiGenerated={selectedQuestion.isAiGenerated}
                questionId={selectedQuestion.id.toString()}
                onFeedback={handleFeedback}
              />
              <ActionButtons 
                isBookmarked={bookmarkedItems.includes(selectedQuestion.id)}
                onBookmark={() => toggleBookmark(selectedQuestion.id)}
                onShare={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: selectedQuestion.question,
                      text: selectedQuestion.answer,
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(`${selectedQuestion.question}\n\n${selectedQuestion.answer}`);
                  }
                }}
                onFollowUp={() => {
                  setSearchQuery(`Follow up: ${selectedQuestion.question}`);
                  setCurrentScreen('search');
                }}
              />
              <div className="h-20"></div>
            </main>
          </>
        );

      case 'topics':
        return (
          <>
            <TopicsHeader 
              onSearch={handleSearch}
            />
            <main className="flex-1 overflow-y-auto">
              <TopicsPage 
                onTopicClick={handleTopicClick}
                sampleQuestions={allQuestions}
                onCommunityFeedbackClick={() => setCurrentScreen('community-feedback')}
              />
              <div className="h-20"></div>
            </main>
          </>
        );

      case 'profile':
        const unreadCount = notifications.filter(n => !n.isRead).length;
        
        return (
          <>
            <ProfileHeader 
              onSettingsClick={() => setCurrentScreen('settings')}
              onNotificationsClick={() => setCurrentScreen('notifications')}
              notificationCount={unreadCount}
            />
            <main className="flex-1 overflow-y-auto">
              <ProfilePage 
                userData={userData}
                onSignOut={handleSignOut}
                hasPreferences={!!userPreferences}
                bookmarkedCount={bookmarkedItems.length}
                onEditProfile={() => alert('Edit Profile - This would open profile editing')}
                onMenuAction={(action) => {
                  // Handle different menu actions
                  switch (action) {
                    case 'preferences':
                      setCurrentScreen('career-preferences');
                      break;
                    case 'saved':
                      setCurrentScreen('saved');
                      break;
                    case 'activity':
                      setCurrentScreen('activity');
                      break;
                    case 'notifications':
                      setCurrentScreen('notifications');
                      break;
                    case 'settings':
                      setCurrentScreen('settings');
                      break;
                    case 'help':
                      alert('Help & Support - This would open the help center');
                      break;
                  }
                }}
              />
              <div className="h-20"></div>
            </main>
          </>
        );

      case 'auth':
        return (
          <AuthPage
            mode={authMode}
            onBack={() => setCurrentScreen('home')}
            onSuccess={handleAuthSuccess}
            onModeSwitch={(mode) => setAuthMode(mode)}
            onForgotPassword={() => setCurrentScreen('forgot-password')}
          />
        );

      case 'forgot-password':
        return (
          <ForgotPasswordPage
            onBack={() => {
              setAuthMode('login');
              setCurrentScreen('auth');
            }}
            onResetLinkSent={(email) => {
              setResetEmail(email);
              setCurrentScreen('reset-password');
            }}
          />
        );

      case 'reset-password':
        return (
          <ResetPasswordPage
            email={resetEmail}
            onBack={() => setCurrentScreen('forgot-password')}
            onSuccess={() => {
              setAuthMode('login');
              setCurrentScreen('auth');
            }}
          />
        );

      case 'saved':
        return (
          <>
            <SavedQuestionsPage
              onBack={() => setCurrentScreen('profile')}
              bookmarkedItems={bookmarkedItems}
              allQuestions={allQuestions}
              onQuestionSelect={handleQuestionSelect}
              onRemoveBookmark={(id) => {
                setBookmarkedItems(prev => prev.filter(item => item !== id));
              }}
            />
          </>
        );

      case 'settings':
        return (
          <SettingsPage
            onBack={() => setCurrentScreen('profile')}
            onSignOut={handleSignOut}
            onNavigate={(page) => setCurrentScreen(page)}
          />
        );

      case 'notifications':
        return (
          <NotificationsPage
            onBack={() => setCurrentScreen('profile')}
            notifications={notifications}
            onNotificationsChange={setNotifications}
          />
        );

      case 'activity':
        return (
          <RecentActivityPage
            onBack={() => setCurrentScreen('profile')}
            recentSearches={recentSearches}
            recentlyViewed={recentlyViewed}
            onQuestionSelect={handleQuestionSelect}
            onSearchAgain={(query) => {
              handleSearch(query);
            }}
          />
        );

      case 'changePassword':
        return (
          <ChangePasswordPage
            onBack={() => setCurrentScreen('settings')}
          />
        );

      case 'privacy':
        return (
          <PrivacyPolicyPage
            onBack={() => setCurrentScreen('settings')}
          />
        );

      case 'terms':
        return (
          <TermsOfServicePage
            onBack={() => setCurrentScreen('settings')}
          />
        );

      case 'about':
        return (
          <AboutPage
            onBack={() => setCurrentScreen('settings')}
          />
        );

      case 'help':
        return (
          <HelpCenterPage
            onBack={() => setCurrentScreen('settings')}
          />
        );

      case 'community-feedback':
        return (
          <CommunityFeedbackPage
            onBack={() => setCurrentScreen('topics')}
            questions={allQuestions}
          />
        );

      case 'adminMonitoring':
        return (
          <AdminMonitoringPage
            onBack={() => setCurrentScreen('settings')}
          />
        );

      case 'career-preferences':
        return (
          <CareerPreferencesPage
            onBack={() => setCurrentScreen('profile')}
            onEdit={() => {
              setIsNewUserOnboarding(false);
              setCurrentScreen('onboarding');
            }}
            preferences={userPreferences}
          />
        );

      case 'onboarding':
        return (
          <OnboardingFlow
            userName={userData?.name || 'User'}
            onComplete={handleOnboardingComplete}
            onSkip={() => {
              if (isNewUserOnboarding) {
                setIsNewUserOnboarding(false);
                setCurrentScreen('home');
              } else {
                setCurrentScreen('career-preferences');
              }
            }}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
        {/* Phone Frame */}
        <div className="relative">
        {/* Phone Body */}
        <div className="w-80 h-[680px] bg-black rounded-[3rem] p-2 shadow-2xl border-4 border-gray-800">
          {/* Screen */}
          <div className="w-full h-full bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-[2.5rem] overflow-hidden relative">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
            
            {/* Status Bar */}
            <div className="flex justify-between items-center px-6 pt-8 pb-2 text-white text-sm">
              <div className="flex items-center gap-1.5">
                {/* Cellular Signal */}
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="opacity-90">
                  <rect x="0" y="8" width="2.5" height="4" rx="0.5" fill="white"/>
                  <rect x="4" y="6" width="2.5" height="6" rx="0.5" fill="white"/>
                  <rect x="8" y="4" width="2.5" height="8" rx="0.5" fill="white"/>
                  <rect x="12" y="2" width="2.5" height="10" rx="0.5" fill="white"/>
                </svg>
                {/* 5G Indicator */}
                <span className="text-xs opacity-90">5G</span>
              </div>
              
              <span className="text-sm">9:41</span>
              
              <div className="flex items-center gap-1.5">
                {/* WiFi Icon */}
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="opacity-90">
                  <path d="M0.5 5.5C2.5 3.5 5.5 2 8 2C10.5 2 13.5 3.5 15.5 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                  <path d="M3 8C4.5 6.5 6 6 8 6C10 6 11.5 6.5 13 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                  <circle cx="8" cy="10.5" r="1.2" fill="white"/>
                </svg>
                {/* Battery */}
                <svg width="22" height="11" viewBox="0 0 22 11" fill="none" className="opacity-90">
                  <rect x="0" y="0.5" width="18" height="10" rx="2.5" stroke="white" strokeWidth="1" fill="none"/>
                  <rect x="1.5" y="2" width="15" height="7" rx="1.5" fill="white"/>
                  <rect x="18.5" y="3.5" width="2.5" height="4" rx="1" fill="white"/>
                </svg>
              </div>
            </div>
            
            {/* App Content */}
            <div className="flex flex-col h-[calc(100%-3rem)]">
              {renderScreen()}
              <BottomNavigation 
                activeItem={activeNavItem}
                onNavigate={handleNavigation}
              />
            </div>
            
            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full"></div>
          </div>
        </div>
        
        {/* Side Buttons */}
        <div className="absolute left-0 top-24 w-1 h-12 bg-gray-700 rounded-l-lg"></div>
        <div className="absolute left-0 top-40 w-1 h-8 bg-gray-700 rounded-l-lg"></div>
        <div className="absolute left-0 top-52 w-1 h-8 bg-gray-700 rounded-l-lg"></div>
        <div className="absolute right-0 top-32 w-1 h-16 bg-gray-700 rounded-r-lg"></div>
      </div>
    </div>
    </>
  );
}