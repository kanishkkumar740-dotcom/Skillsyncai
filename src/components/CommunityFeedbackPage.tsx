import { ArrowLeft, ThumbsUp, ThumbsDown, MessageSquare, TrendingUp, Users } from "lucide-react";
import { Button } from "./ui/button";

interface FeedbackData {
  questionId: number;
  feedback: 'like' | 'dislike';
  reason?: string;
  timestamp: string;
}

interface FeedbackStats {
  questionId: number;
  question: string;
  category: string;
  totalLikes: number;
  totalDislikes: number;
  reasons: { reason: string; count: number }[];
  helpfulPercentage: number;
}

interface CommunityFeedbackPageProps {
  onBack: () => void;
  questions: Array<{ id: number; question: string; category: string }>;
}

export function CommunityFeedbackPage({ onBack, questions }: CommunityFeedbackPageProps) {
  // Demo feedback data for initial display
  const demoFeedback: FeedbackData[] = [
    // Question 1: Cybersecurity - Very Helpful (8 likes, 2 dislikes)
    { questionId: 1, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 5).toISOString() },
    { questionId: 1, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 4).toISOString() },
    { questionId: 1, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 3).toISOString() },
    { questionId: 1, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 2).toISOString() },
    { questionId: 1, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 1).toISOString() },
    { questionId: 1, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 0.5).toISOString() },
    { questionId: 1, feedback: 'like', timestamp: new Date().toISOString() },
    { questionId: 1, feedback: 'like', timestamp: new Date().toISOString() },
    { questionId: 1, feedback: 'dislike', reason: 'Missing salary/certification info', timestamp: new Date(Date.now() - 3600000 * 6).toISOString() },
    { questionId: 1, feedback: 'dislike', reason: 'Need more specific learning paths', timestamp: new Date().toISOString() },
    
    // Question 2: Data Analyst - Moderately Helpful (5 likes, 4 dislikes)
    { questionId: 2, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 8).toISOString() },
    { questionId: 2, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 7).toISOString() },
    { questionId: 2, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 4).toISOString() },
    { questionId: 2, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 2).toISOString() },
    { questionId: 2, feedback: 'like', timestamp: new Date().toISOString() },
    { questionId: 2, feedback: 'dislike', reason: 'Too general, need more details', timestamp: new Date(Date.now() - 3600000 * 9).toISOString() },
    { questionId: 2, feedback: 'dislike', reason: 'Doesn\'t match my experience level', timestamp: new Date(Date.now() - 3600000 * 5).toISOString() },
    { questionId: 2, feedback: 'dislike', reason: 'Missing job market insights', timestamp: new Date(Date.now() - 3600000 * 3).toISOString() },
    { questionId: 2, feedback: 'dislike', reason: 'Need more practical examples', timestamp: new Date().toISOString() },
    
    // Question 3: UX Design - Very Helpful (12 likes, 2 dislikes)
    { questionId: 3, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 12).toISOString() },
    { questionId: 3, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 11).toISOString() },
    { questionId: 3, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 10).toISOString() },
    { questionId: 3, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 8).toISOString() },
    { questionId: 3, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 7).toISOString() },
    { questionId: 3, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 6).toISOString() },
    { questionId: 3, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 5).toISOString() },
    { questionId: 3, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 4).toISOString() },
    { questionId: 3, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 3).toISOString() },
    { questionId: 3, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 2).toISOString() },
    { questionId: 3, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 1).toISOString() },
    { questionId: 3, feedback: 'like', timestamp: new Date().toISOString() },
    { questionId: 3, feedback: 'dislike', reason: 'Needs more portfolio tips', timestamp: new Date(Date.now() - 3600000 * 9).toISOString() },
    { questionId: 3, feedback: 'dislike', reason: 'Missing remote work options', timestamp: new Date().toISOString() },
    
    // Question 4: Marketing Manager - Helpful (7 likes, 3 dislikes)
    { questionId: 4, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 6).toISOString() },
    { questionId: 4, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 5).toISOString() },
    { questionId: 4, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 4).toISOString() },
    { questionId: 4, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 3).toISOString() },
    { questionId: 4, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 2).toISOString() },
    { questionId: 4, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 1).toISOString() },
    { questionId: 4, feedback: 'like', timestamp: new Date().toISOString() },
    { questionId: 4, feedback: 'dislike', reason: 'Missing industry-specific advice', timestamp: new Date(Date.now() - 3600000 * 7).toISOString() },
    { questionId: 4, feedback: 'dislike', reason: 'Need more digital marketing focus', timestamp: new Date(Date.now() - 3600000 * 3).toISOString() },
    { questionId: 4, feedback: 'dislike', reason: 'Too basic for senior roles', timestamp: new Date().toISOString() },
    
    // Question 5: Software Engineering - Very Helpful (15 likes, 3 dislikes)
    { questionId: 5, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 15).toISOString() },
    { questionId: 5, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 14).toISOString() },
    { questionId: 5, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 13).toISOString() },
    { questionId: 5, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 12).toISOString() },
    { questionId: 5, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 11).toISOString() },
    { questionId: 5, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 10).toISOString() },
    { questionId: 5, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 8).toISOString() },
    { questionId: 5, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 7).toISOString() },
    { questionId: 5, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 6).toISOString() },
    { questionId: 5, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 5).toISOString() },
    { questionId: 5, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 4).toISOString() },
    { questionId: 5, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 3).toISOString() },
    { questionId: 5, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 2).toISOString() },
    { questionId: 5, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 1).toISOString() },
    { questionId: 5, feedback: 'like', timestamp: new Date().toISOString() },
    { questionId: 5, feedback: 'dislike', reason: 'Need more framework comparisons', timestamp: new Date(Date.now() - 3600000 * 9).toISOString() },
    { questionId: 5, feedback: 'dislike', reason: 'Missing bootcamp vs degree discussion', timestamp: new Date(Date.now() - 3600000 * 4).toISOString() },
    { questionId: 5, feedback: 'dislike', reason: 'Salary expectations not mentioned', timestamp: new Date().toISOString() },
    
    // Question 6: Nurse - Helpful (6 likes, 2 dislikes)
    { questionId: 6, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 7).toISOString() },
    { questionId: 6, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 6).toISOString() },
    { questionId: 6, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 5).toISOString() },
    { questionId: 6, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 3).toISOString() },
    { questionId: 6, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 2).toISOString() },
    { questionId: 6, feedback: 'like', timestamp: new Date().toISOString() },
    { questionId: 6, feedback: 'dislike', reason: 'Need specialization guidance', timestamp: new Date(Date.now() - 3600000 * 8).toISOString() },
    { questionId: 6, feedback: 'dislike', reason: 'Missing work-life balance info', timestamp: new Date().toISOString() },
    
    // Question 7: Product Manager - Helpful (9 likes, 4 dislikes)
    { questionId: 7, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 10).toISOString() },
    { questionId: 7, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 9).toISOString() },
    { questionId: 7, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 8).toISOString() },
    { questionId: 7, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 6).toISOString() },
    { questionId: 7, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 5).toISOString() },
    { questionId: 7, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 4).toISOString() },
    { questionId: 7, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 3).toISOString() },
    { questionId: 7, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 1).toISOString() },
    { questionId: 7, feedback: 'like', timestamp: new Date().toISOString() },
    { questionId: 7, feedback: 'dislike', reason: 'Too technical, need business focus', timestamp: new Date(Date.now() - 3600000 * 11).toISOString() },
    { questionId: 7, feedback: 'dislike', reason: 'Missing transition from other roles', timestamp: new Date(Date.now() - 3600000 * 7).toISOString() },
    { questionId: 7, feedback: 'dislike', reason: 'Need more interview prep tips', timestamp: new Date(Date.now() - 3600000 * 2).toISOString() },
    { questionId: 7, feedback: 'dislike', reason: 'Lacks real-world examples', timestamp: new Date().toISOString() },
    
    // Question 8: Financial Analyst - Mixed (4 likes, 5 dislikes)
    { questionId: 8, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 6).toISOString() },
    { questionId: 8, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 5).toISOString() },
    { questionId: 8, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 2).toISOString() },
    { questionId: 8, feedback: 'like', timestamp: new Date().toISOString() },
    { questionId: 8, feedback: 'dislike', reason: 'Outdated certification recommendations', timestamp: new Date(Date.now() - 3600000 * 8).toISOString() },
    { questionId: 8, feedback: 'dislike', reason: 'Missing fintech career paths', timestamp: new Date(Date.now() - 3600000 * 7).toISOString() },
    { questionId: 8, feedback: 'dislike', reason: 'Need more CFA exam guidance', timestamp: new Date(Date.now() - 3600000 * 4).toISOString() },
    { questionId: 8, feedback: 'dislike', reason: 'Too generic', timestamp: new Date(Date.now() - 3600000 * 3).toISOString() },
    { questionId: 8, feedback: 'dislike', reason: 'Missing quant finance info', timestamp: new Date().toISOString() },
    
    // Question 9: Graphic Designer - Very Helpful (10 likes, 1 dislike)
    { questionId: 9, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 11).toISOString() },
    { questionId: 9, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 10).toISOString() },
    { questionId: 9, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 9).toISOString() },
    { questionId: 9, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 8).toISOString() },
    { questionId: 9, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 6).toISOString() },
    { questionId: 9, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 5).toISOString() },
    { questionId: 9, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 4).toISOString() },
    { questionId: 9, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 3).toISOString() },
    { questionId: 9, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 1).toISOString() },
    { questionId: 9, feedback: 'like', timestamp: new Date().toISOString() },
    { questionId: 9, feedback: 'dislike', reason: 'Need more freelancing tips', timestamp: new Date(Date.now() - 3600000 * 7).toISOString() },
    
    // Question 10: Teacher - Helpful (8 likes, 3 dislikes)
    { questionId: 10, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 9).toISOString() },
    { questionId: 10, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 8).toISOString() },
    { questionId: 10, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 7).toISOString() },
    { questionId: 10, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 5).toISOString() },
    { questionId: 10, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 4).toISOString() },
    { questionId: 10, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 3).toISOString() },
    { questionId: 10, feedback: 'like', timestamp: new Date(Date.now() - 3600000 * 2).toISOString() },
    { questionId: 10, feedback: 'like', timestamp: new Date().toISOString() },
    { questionId: 10, feedback: 'dislike', reason: 'Missing online teaching options', timestamp: new Date(Date.now() - 3600000 * 10).toISOString() },
    { questionId: 10, feedback: 'dislike', reason: 'Need more subject-specific advice', timestamp: new Date(Date.now() - 3600000 * 6).toISOString() },
    { questionId: 10, feedback: 'dislike', reason: 'Salary info not accurate', timestamp: new Date().toISOString() },
  ];

  // Get all feedback from localStorage
  const getAllFeedback = (): FeedbackData[] => {
    const feedback = localStorage.getItem('skillsync_feedback');
    const userFeedback = feedback ? JSON.parse(feedback) : [];
    // If no user feedback exists, use demo data
    return userFeedback.length > 0 ? userFeedback : demoFeedback;
  };

  // Calculate statistics for each question
  const calculateStats = (): FeedbackStats[] => {
    const allFeedback = getAllFeedback();
    const statsMap = new Map<number, FeedbackStats>();

    // Initialize stats for questions that have feedback
    allFeedback.forEach(fb => {
      if (!statsMap.has(fb.questionId)) {
        const question = questions.find(q => q.id === fb.questionId);
        if (question) {
          statsMap.set(fb.questionId, {
            questionId: fb.questionId,
            question: question.question,
            category: question.category,
            totalLikes: 0,
            totalDislikes: 0,
            reasons: [],
            helpfulPercentage: 0
          });
        }
      }
    });

    // Count likes, dislikes, and reasons
    allFeedback.forEach(fb => {
      const stats = statsMap.get(fb.questionId);
      if (stats) {
        if (fb.feedback === 'like') {
          stats.totalLikes++;
        } else {
          stats.totalDislikes++;
          if (fb.reason) {
            const existingReason = stats.reasons.find(r => r.reason === fb.reason);
            if (existingReason) {
              existingReason.count++;
            } else {
              stats.reasons.push({ reason: fb.reason, count: 1 });
            }
          }
        }
      }
    });

    // Calculate percentages and sort reasons
    statsMap.forEach(stats => {
      const total = stats.totalLikes + stats.totalDislikes;
      stats.helpfulPercentage = total > 0 ? Math.round((stats.totalLikes / total) * 100) : 0;
      stats.reasons.sort((a, b) => b.count - a.count);
    });

    return Array.from(statsMap.values()).sort((a, b) => 
      (b.totalLikes + b.totalDislikes) - (a.totalLikes + a.totalDislikes)
    );
  };

  const stats = calculateStats();
  const totalFeedback = getAllFeedback().length;
  const totalLikes = stats.reduce((sum, s) => sum + s.totalLikes, 0);
  const totalDislikes = stats.reduce((sum, s) => sum + s.totalDislikes, 0);

  return (
    <div className="h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 border-b border-white/20 shadow-lg flex-shrink-0">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-white hover:bg-white/20 h-8 w-8"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-white text-lg">Community Feedback</h1>
              <p className="text-white/70 text-xs">See what others think</p>
            </div>
          </div>
          <Users className="w-6 h-6 text-white/80" />
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-visible px-4 pt-4 pb-6" style={{
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(139, 92, 246, 0.5) rgba(255, 255, 255, 0.1)'
      }}>
        {/* Info Banner */}
        <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 backdrop-blur-md rounded-xl border border-purple-400/30 p-3 mb-4">
          <div className="flex items-start gap-2">
            <MessageSquare className="w-4 h-4 text-purple-300 mt-0.5 flex-shrink-0" />
            <p className="text-white/90 text-xs leading-relaxed">
              Help the community! Rate AI answers after viewing them to help others make better career decisions.
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-3 pb-4">
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-3 text-center">
            <div className="text-white text-2xl mb-1">{totalFeedback}</div>
            <div className="text-white/70 text-xs">Total Feedback</div>
          </div>
          <div className="bg-green-500/20 backdrop-blur-md rounded-xl border border-green-400/30 p-3 text-center">
            <div className="text-green-300 text-2xl mb-1">{totalLikes}</div>
            <div className="text-white/70 text-xs">Helpful</div>
          </div>
          <div className="bg-red-500/20 backdrop-blur-md rounded-xl border border-red-400/30 p-3 text-center">
            <div className="text-red-300 text-2xl mb-1">{totalDislikes}</div>
            <div className="text-white/70 text-xs">Not Helpful</div>
          </div>
        </div>

        {/* How to Contribute Info */}
        <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-md rounded-xl border border-indigo-400/30 p-4 mb-3">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-indigo-500/30 rounded-lg">
              <ThumbsUp className="w-4 h-4 text-indigo-300" />
            </div>
            <div>
              <h3 className="text-white text-sm mb-1">Help Others Learn</h3>
              <p className="text-white/70 text-xs leading-relaxed">
                After viewing an AI answer, use the 👍 or 👎 buttons to share your feedback. Your input helps others make better career decisions!
              </p>
            </div>
          </div>
        </div>

        {/* Recent Community Feedback Examples */}
        <h3 className="text-white text-sm mb-3 flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Recent Community Feedback
        </h3>
        <div className="space-y-3 mb-4">
          {/* Feedback Example 1 */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-xs">
                  SK
                </div>
                <div>
                  <p className="text-white text-xs">Sarah K.</p>
                  <p className="text-white/50 text-xs">2 hours ago</p>
                </div>
              </div>
              <ThumbsUp className="w-4 h-4 text-green-400 fill-green-400" />
            </div>
            <p className="text-white/80 text-xs leading-relaxed">
              "The UX Design career path info was incredibly detailed! Helped me understand exactly what skills I need to develop. Thank you!"
            </p>
            <div className="mt-2 text-purple-300 text-xs">
              → About: How do I start a career in UX design?
            </div>
          </div>

          {/* Feedback Example 2 */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs">
                  MC
                </div>
                <div>
                  <p className="text-white text-xs">Michael C.</p>
                  <p className="text-white/50 text-xs">5 hours ago</p>
                </div>
              </div>
              <ThumbsUp className="w-4 h-4 text-green-400 fill-green-400" />
            </div>
            <p className="text-white/80 text-xs leading-relaxed">
              "Perfect answer for software engineering! Got all the certifications and learning resources I needed."
            </p>
            <div className="mt-2 text-purple-300 text-xs">
              → About: What skills do I need for software engineering?
            </div>
          </div>

          {/* Feedback Example 3 */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-xs">
                  JL
                </div>
                <div>
                  <p className="text-white text-xs">Jessica L.</p>
                  <p className="text-white/50 text-xs">1 day ago</p>
                </div>
              </div>
              <ThumbsDown className="w-4 h-4 text-red-400 fill-red-400" />
            </div>
            <p className="text-white/80 text-xs leading-relaxed">
              "Good overview for data analyst role, but would love more info about specific salary ranges and remote work opportunities."
            </p>
            <div className="mt-2 text-purple-300 text-xs">
              → About: What does a data analyst do?
            </div>
          </div>

          {/* Feedback Example 4 */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs">
                  DP
                </div>
                <div>
                  <p className="text-white text-xs">David P.</p>
                  <p className="text-white/50 text-xs">1 day ago</p>
                </div>
              </div>
              <ThumbsUp className="w-4 h-4 text-green-400 fill-green-400" />
            </div>
            <p className="text-white/80 text-xs leading-relaxed">
              "Amazing breakdown of graphic design career options! The portfolio tips were especially helpful for beginners."
            </p>
            <div className="mt-2 text-purple-300 text-xs">
              → About: How to become a graphic designer?
            </div>
          </div>

          {/* Feedback Example 5 */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs">
                  AL
                </div>
                <div>
                  <p className="text-white text-xs">Amanda L.</p>
                  <p className="text-white/50 text-xs">2 days ago</p>
                </div>
              </div>
              <ThumbsUp className="w-4 h-4 text-green-400 fill-green-400" />
            </div>
            <p className="text-white/80 text-xs leading-relaxed">
              "This cybersecurity answer covered everything from entry-level to advanced roles. Really appreciate the certification recommendations!"
            </p>
            <div className="mt-2 text-purple-300 text-xs">
              → About: How do I start in cybersecurity?
            </div>
          </div>
        </div>

        {/* Question Feedback Statistics Section */}
        <div className="mt-6">
          <h3 className="text-white text-sm mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Question Feedback Statistics
          </h3>
          {stats.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <p className="text-white/70 mb-2">No feedback yet</p>
              <p className="text-white/50 text-xs px-8">
                Be the first to provide feedback on career answers!
              </p>
            </div>
          ) : (
            <div className="space-y-4 pb-4">
              {stats.map((stat) => (
                <div
                  key={stat.questionId}
                  className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 shadow-lg"
                >
                  {/* Question */}
                  <div className="mb-3">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-white text-sm flex-1">{stat.question}</h3>
                      <span className="text-xs text-purple-300 bg-purple-500/20 px-2 py-1 rounded-full whitespace-nowrap">
                        {stat.category}
                      </span>
                    </div>
                  </div>

                  {/* Feedback Stats */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1.5 rounded-lg border border-green-400/30">
                      <ThumbsUp className="w-3 h-3 text-green-300" />
                      <span className="text-green-300 text-xs">{stat.totalLikes}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-red-500/20 px-3 py-1.5 rounded-lg border border-red-400/30">
                      <ThumbsDown className="w-3 h-3 text-red-300" />
                      <span className="text-red-300 text-xs">{stat.totalDislikes}</span>
                    </div>
                    <div className="flex items-center gap-1 ml-auto">
                      <TrendingUp className="w-3 h-3 text-purple-300" />
                      <span className="text-purple-300 text-xs">{stat.helpfulPercentage}% helpful</span>
                    </div>
                  </div>

                  {/* Helpful Percentage Bar */}
                  <div className="mb-3">
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all"
                        style={{ width: `${stat.helpfulPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Reasons for Not Helpful */}
                  {stat.reasons.length > 0 && (
                    <div className="border-t border-white/10 pt-3">
                      <p className="text-white/70 text-xs mb-2 flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        Common concerns:
                      </p>
                      <div className="space-y-1">
                        {stat.reasons.slice(0, 3).map((reason, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2"
                          >
                            <span className="text-white/80 text-xs">{reason.reason}</span>
                            <span className="text-white/50 text-xs">{reason.count}×</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}