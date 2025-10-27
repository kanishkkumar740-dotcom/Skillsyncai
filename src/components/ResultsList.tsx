import { ResultItem } from "./ResultItem";

interface Result {
  id: number;
  question: string;
  answer: string;
  category: string;
  isAiGenerated?: boolean;
}

interface ResultsListProps {
  results: Result[];
  expandedItems: number[];
  onToggleExpanded: (id: number) => void;
  onQuestionSelect: (result: Result) => void;
}

export function ResultsList({ results, expandedItems, onToggleExpanded, onQuestionSelect }: ResultsListProps) {
  return (
    <div className="px-4 py-4">
      <h3 className="mb-4 text-white font-medium text-sm">Results:</h3>
      <div className="space-y-3">
        {results.map((result, index) => (
          <ResultItem
            key={`${result.id}-${index}`}
            number={(index + 1).toString()}
            question={result.question}
            answer={result.answer}
            category={result.category}
            isExpanded={expandedItems.includes(result.id)}
            isAiGenerated={result.isAiGenerated}
            onToggleExpanded={() => onToggleExpanded(result.id)}
            onQuestionSelect={() => onQuestionSelect(result)}
          />
        ))}
      </div>
    </div>
  );
}