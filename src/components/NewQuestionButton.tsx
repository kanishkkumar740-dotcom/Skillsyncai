import { Plus } from "lucide-react";
import { Button } from "./ui/button";

export function NewQuestionButton() {
  return (
    <div className="px-4 py-4">
      <Button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white border-0 rounded-xl py-3 shadow-lg transition-all duration-200 hover:scale-105">
        <Plus className="w-5 h-5 mr-2" />
        Ask a New Question
      </Button>
    </div>
  );
}