export function SearchLoadingState() {
  return (
    <div className="p-4 space-y-4">
      {/* AI Processing Indicator */}
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="relative mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center">
            <span className="text-xs">✨</span>
          </div>
        </div>
        <h3 className="text-white font-medium mb-2">AI Career Advisor</h3>
        <p className="text-white/70 text-sm max-w-48">
          Analyzing your question and generating personalized career advice...
        </p>
      </div>

      {/* Loading Skeleton */}
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="animate-pulse">
              <div className="h-4 bg-white/20 rounded mb-3 w-3/4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-white/10 rounded w-full"></div>
                <div className="h-3 bg-white/10 rounded w-5/6"></div>
                <div className="h-3 bg-white/10 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}