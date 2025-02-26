// FiltersMenu.tsx
import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { AuthorFilter } from './authorFilter';
import { GenreFilter } from './GenreFilter';
import { YearFilter } from './yearFilter';
import { RatingFilter } from './RatingFilter';
import '../../styles/filters/index.css';

interface FiltersMenuProps {
  authorFilter: string;
  onAuthorChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  genreFilter: string;
  onGenreChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  yearFilter: string;
  onYearChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  ratingFilter: string;
  onRatingChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  authors: string[];
  genres: string[];
  years: string[];
}

export const FiltersMenu: React.FC<FiltersMenuProps> = ({
  authorFilter,
  onAuthorChange,
  genreFilter,
  onGenreChange,
  yearFilter,
  onYearChange,
  ratingFilter,
  onRatingChange,
  authors,
  genres,
  years,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="filters-menu">
      <button className="hamburger" onClick={toggleMenu}>
        <FaBars />
      </button>
      {isOpen && (
        <div className="filters-container">
          <AuthorFilter
            value={authorFilter}
            onChange={onAuthorChange}
            authors={authors}
          />
          <GenreFilter
            value={genreFilter}
            onChange={onGenreChange}
            genres={genres}
          />
          <YearFilter
            value={yearFilter}
            onChange={onYearChange}
            years={years}
          />
          <RatingFilter value={ratingFilter} onChange={onRatingChange} />
        </div>
      )}
    </div>
  );
};
