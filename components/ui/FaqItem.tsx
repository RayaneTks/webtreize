'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  id?: string;
}

export function FaqItem({ question, answer, isOpen, onClick, id }: FaqItemProps) {
  return (
    <div
      className="group border-b border-white/10 last:border-b-0 overflow-hidden"
      role="group"
      aria-expanded={isOpen}
    >
      <button
        type="button"
        id={id}
        className="w-full py-6 flex justify-between items-center text-left transition-opacity gap-4"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={id ? `${id}-answer` : undefined}
      >
        <span
          className={cn(
            'text-base md:text-lg font-semibold pr-4 transition-colors duration-300 flex-1',
            isOpen ? 'text-blue-400' : 'text-white group-hover:text-blue-200'
          )}
        >
          {question}
        </span>
        <span
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 shrink-0',
            isOpen ? 'bg-blue-500/20 rotate-180' : 'bg-white/5 group-hover:bg-white/10'
          )}
        >
          <ChevronDown
            className={cn('w-5 h-5 transition-colors duration-300', isOpen ? 'text-blue-400' : 'text-gray-400')}
            aria-hidden
          />
        </span>
      </button>
      <div
        className="grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p
            id={id ? `${id}-answer` : undefined}
            className="pb-6 text-gray-400 text-sm md:text-base leading-relaxed pr-8"
            role="region"
            aria-labelledby={id}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
