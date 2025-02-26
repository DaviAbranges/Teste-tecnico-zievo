// components/filters/yearFilter.tsx
import React from 'react';
import '../../styles/filters/index.css';

interface YearFilterProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  years: string[];
}

export const YearFilter: React.FC<YearFilterProps> = ({
  value,
  onChange,
  years,
}) => {
  return (
    <div className="year-filter">
      <select className="filter-select" value={value} onChange={onChange}>
        <option value="">Selecione um ano</option>
        {years.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};
