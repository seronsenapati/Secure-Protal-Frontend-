import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function StepIndicator({ step, setStep }) {
  const steps = [
    { label: 'Basic Info' },
    { label: 'Timeline & Budget' },
    { label: 'Contractor Requirements' },
    { label: 'Document Uploads' },
    { label: 'Other Settings' },
  ];
  return (
    <div className="flex items-center justify-between mb-8 w-full">
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center min-w-[90px]">
            <button
              type="button"
              onClick={() => setStep(i)}
              className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg border-2 transition-all duration-200
                ${i === step ? 'bg-primary text-white border-primary' : 'bg-gray-200 text-primary border-gray-200'}`}
              aria-label={s.label}
            >
              {i + 1}
            </button>
            <span className={`mt-2 text-xs font-medium text-center ${i === step ? 'text-primary' : 'text-secondary'}`}>{s.label}</span>
          </div>
          {i < steps.length - 1 && (
            <ChevronRight className="mx-3 text-accent/40 w-5 h-5" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
} 