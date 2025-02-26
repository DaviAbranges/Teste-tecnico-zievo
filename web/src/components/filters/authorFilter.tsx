// components/filters/authorFilter.tsx
import React from 'react';
import '../../styles/filters/index.css';

interface AuthorFilterProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  authors: string[];
}

export const AuthorFilter: React.FC<AuthorFilterProps> = ({
  value,
  onChange,
  authors,
}) => {
  return (
    <div className="author-filter">
      <select className="filter-select" value={value} onChange={onChange}>
        <option value="">Selecione um autor</option>
        {authors.map((author, index) => (
          <option key={index} value={author}>
            {author}
          </option>
        ))}
      </select>
    </div>
  );
};
