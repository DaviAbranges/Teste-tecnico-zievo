import React from 'react';

interface RatingFilterProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  ratings?: number[];
}

export const RatingFilter: React.FC<RatingFilterProps> = ({
  value,
  onChange,
  ratings = [1, 2, 3, 4, 5],
}) => {
  return (
    <div className="rating-filter">
      <select className="filter-select" value={value} onChange={onChange}>
        <option value="">Filtrar por avaliação</option>
        {ratings.map((rating, index) => (
          <option key={index} value={rating}>
            {rating} {rating === 1 ? 'Estrela' : 'Estrelas'}
          </option>
        ))}
      </select>
    </div>
  );
};
