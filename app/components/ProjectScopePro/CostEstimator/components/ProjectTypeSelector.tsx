'use client';

import React from 'react';
import { ProjectType } from '../../../Shared/types';
import { PROJECT_TYPE_OPTIONS } from '../constants';

interface ProjectTypeSelectorProps {
  selected: ProjectType;
  onChange: (type: ProjectType) => void;
}

export default function ProjectTypeSelector({ selected, onChange }: ProjectTypeSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-black uppercase tracking-wider text-gray-900">
        Project Type
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {PROJECT_TYPE_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id as ProjectType)}
            className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${
              selected === option.id
                ? 'border-red-600 bg-red-50 text-red-800'
                : 'border-gray-200 hover:border-red-300 hover:bg-gray-50'
            }`}
          >
            <span className="text-3xl mb-3">{option.icon}</span>
            <span className="font-bold text-sm">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}