import { useState } from "react";
import { FilterSection } from "./FilterSection";

const filterData = {
  "Career Field": ["Technology", "Business", "Healthcare", "Arts & Design", "Education", "Finance"],
  "Experience Level": ["Entry Level", "Mid Level", "Senior Level", "Executive", "Student"],
  "Question Type": ["Career Path", "Skills & Training", "Interviews", "Salary & Benefits", "Work-Life Balance"],
  "Industry": ["Software", "Consulting", "Banking", "Startup", "Government", "Non-profit"],
  "Location": ["Remote", "On-site", "Hybrid", "International", "Specific City"]
};

export function FilterOptions() {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    "Career Field": [],
    "Experience Level": [],
    "Question Type": [],
    "Industry": [],
    "Location": []
  });

  const handleToggle = (section: string, option: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [section]: prev[section].includes(option)
        ? prev[section].filter(item => item !== option)
        : [...prev[section], option]
    }));
  };

  return (
    <div className="px-4 py-4">
      {Object.entries(filterData).map(([section, options]) => (
        <FilterSection
          key={section}
          title={section}
          options={options}
          selectedOptions={selectedFilters[section]}
          onToggle={(option) => handleToggle(section, option)}
        />
      ))}
    </div>
  );
}