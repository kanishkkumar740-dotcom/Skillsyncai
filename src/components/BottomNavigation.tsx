import { Home, BookOpen, User } from "lucide-react";
import { Button } from "./ui/button";

const navItems = [
  { icon: Home, label: "Home" },
  { icon: BookOpen, label: "Topics" },
  { icon: User, label: "Profile" }
];

interface BottomNavigationProps {
  activeItem: string;
  onNavigate: (item: string) => void;
}

export function BottomNavigation({ activeItem, onNavigate }: BottomNavigationProps) {
  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20 shadow-lg">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.label;
          return (
            <Button
              key={item.label}
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(item.label)}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-4 rounded-lg transition-all duration-200 ${
                isActive 
                  ? "bg-white/20 text-white shadow-md" 
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px]">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}