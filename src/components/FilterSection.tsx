import { Badge } from "./ui/badge";

interface FilterSectionProps {
  filters: {
    careerField: string[];
    experienceLevel: string[];
    questionType: string[];
    industry: string[];
    location: string[];
  };
  onFiltersChange: (filters: any) => void;
}

const filterOptions = {
  careerField: ["Tech", "Business", "Healthcare", "Arts", "Education", "Finance"],
  experienceLevel: ["Entry Level", "Mid Level", "Senior Level", "Executive"],
  questionType: ["Career Change", "Skills", "Interview", "Salary", "Growth"],
  industry: ["Software", "Healthcare", "Finance", "Education", "Retail", "Government"],
  location: ["Remote", "On-site", "Hybrid", "Flexible"]
};

export function FilterSection({ filters, onFiltersChange }: FilterSectionProps) {
  const handleToggle = (category: keyof typeof filters, option: string) => {
    const currentOptions = filters[category];
    const newOptions = currentOptions.includes(option)
      ? currentOptions.filter(item => item !== option)
      : [...currentOptions, option];
    
    onFiltersChange({
      ...filters,
      [category]: newOptions
    });
  };

  return (
    <div className="px-4 py-4 space-y-6">
      <div>
        <h3 className="text-white font-medium mb-3 text-sm">Career Field</h3>
        <div className="flex flex-wrap gap-2">
          {filterOptions.careerField.map((option) => {
            const isSelected = filters.careerField.includes(option);
            return (
              <Badge
                key={option}
                onClick={() => handleToggle('careerField', option)}
                className={`cursor-pointer transition-all duration-200 px-3 py-2 rounded-xl border ${
                  isSelected
                    ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-purple-400 shadow-md"
                    : "bg-white/10 text-white border-white/30 hover:bg-white/20"
                }`}
              >
                {option}
              </Badge>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-white font-medium mb-3 text-sm">Experience Level</h3>
        <div className="flex flex-wrap gap-2">
          {filterOptions.experienceLevel.map((option) => {
            const isSelected = filters.experienceLevel.includes(option);
            return (
              <Badge
                key={option}
                onClick={() => handleToggle('experienceLevel', option)}
                className={`cursor-pointer transition-all duration-200 px-3 py-2 rounded-xl border ${
                  isSelected
                    ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-purple-400 shadow-md"
                    : "bg-white/10 text-white border-white/30 hover:bg-white/20"
                }`}
              >
                {option}
              </Badge>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-white font-medium mb-3 text-sm">Question Type</h3>
        <div className="flex flex-wrap gap-2">
          {filterOptions.questionType.map((option) => {
            const isSelected = filters.questionType.includes(option);
            return (
              <Badge
                key={option}
                onClick={() => handleToggle('questionType', option)}
                className={`cursor-pointer transition-all duration-200 px-3 py-2 rounded-xl border ${
                  isSelected
                    ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-purple-400 shadow-md"
                    : "bg-white/10 text-white border-white/30 hover:bg-white/20"
                }`}
              >
                {option}
              </Badge>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-white font-medium mb-3 text-sm">Industry</h3>
        <div className="flex flex-wrap gap-2">
          {filterOptions.industry.map((option) => {
            const isSelected = filters.industry.includes(option);
            return (
              <Badge
                key={option}
                onClick={() => handleToggle('industry', option)}
                className={`cursor-pointer transition-all duration-200 px-3 py-2 rounded-xl border ${
                  isSelected
                    ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-purple-400 shadow-md"
                    : "bg-white/10 text-white border-white/30 hover:bg-white/20"
                }`}
              >
                {option}
              </Badge>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-white font-medium mb-3 text-sm">Work Location</h3>
        <div className="flex flex-wrap gap-2">
          {filterOptions.location.map((option) => {
            const isSelected = filters.location.includes(option);
            return (
              <Badge
                key={option}
                onClick={() => handleToggle('location', option)}
                className={`cursor-pointer transition-all duration-200 px-3 py-2 rounded-xl border ${
                  isSelected
                    ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-purple-400 shadow-md"
                    : "bg-white/10 text-white border-white/30 hover:bg-white/20"
                }`}
              >
                {option}
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
}