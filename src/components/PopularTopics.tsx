import { Button } from "./ui/button";
import { Code, Briefcase, Heart, Palette } from "lucide-react";

const topics = [
  { name: "Tech", icon: Code, color: "from-blue-500 to-purple-600" },
  { name: "Business", icon: Briefcase, color: "from-green-500 to-teal-600" },
  { name: "Healthcare", icon: Heart, color: "from-red-500 to-pink-600" },
  { name: "Arts", icon: Palette, color: "from-yellow-500 to-orange-600" }
];

interface PopularTopicsProps {
  onTopicClick: (topic: string) => void;
}

export function PopularTopics({ onTopicClick }: PopularTopicsProps) {
  return (
    <div className="px-4 py-3">
      <h3 className="mb-3 text-white/90 text-sm">Popular Topics</h3>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => {
          const Icon = topic.icon;
          return (
            <Button
              key={topic.name}
              variant="ghost"
              size="sm"
              onClick={() => onTopicClick(topic.name)}
              className={`bg-gradient-to-r ${topic.color} hover:scale-105 transition-all duration-200 text-white border-0 rounded-lg px-3 py-1.5 shadow-lg backdrop-blur-sm h-auto text-xs`}
            >
              <Icon className="w-3 h-3 mr-1.5" />
              {topic.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}