import { Zap, Brain } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
          <div className="flex items-center">
            <Brain className="w-4 h-4 text-white" />
            <Zap className="w-3 h-3 text-yellow-300 -ml-1" />
          </div>
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold text-white">SKILLSYNC</span>
        <span className="text-xs text-purple-200 -mt-1">AI</span>
      </div>
    </div>
  );
}