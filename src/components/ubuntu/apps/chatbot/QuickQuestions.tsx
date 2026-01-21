import React from 'react';

interface QuickQuestionsProps {
  questions: string[];
  accentRgb: string;
  onQuestionClick: (question: string) => void;
}

export function QuickQuestions({ questions, accentRgb, onQuestionClick }: QuickQuestionsProps) {
  return (
    <div className="p-4 bg-muted/20 border-b border-border animate-fadeIn">
      <p className="text-sm text-foreground/70 mb-3 font-medium">💡 Quick questions:</p>
      <div className="grid grid-cols-2 gap-2">
        {questions.map((question, idx) => (
          <button
            key={idx}
            onClick={() => onQuestionClick(question)}
            className="text-left text-xs bg-muted/40 text-foreground/80 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg border border-border"
            style={{ 
              animationDelay: `${idx * 100}ms`,
              borderColor: `rgba(${accentRgb}, 0.3)`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `rgba(${accentRgb}, 0.2)`;
              e.currentTarget.style.borderColor = `rgba(${accentRgb}, 0.5)`;
              e.currentTarget.style.color = `rgb(${accentRgb})`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(var(--muted), 0.4)';
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = '';
            }}
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}
