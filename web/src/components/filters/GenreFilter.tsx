import React from 'react';

interface GenreFilterProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  genres?: string[];
}

export const GenreFilter: React.FC<GenreFilterProps> = ({
  value,
  onChange,
  genres = [
    'Ficção Científica',
    'Romance',
    'Mistério',
    'Fantasia',
    'Biografia',
    'Autoajuda',
    'Outro',
  ],
}) => {
  return (
    <div className="genre-filter">
      <select className="filter-select" value={value} onChange={onChange}>
        <option value="">Filtrar por gênero</option>
        {genres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};
