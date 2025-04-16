import React from 'react';
import { normalizeCountryName } from '../utils/countries';

export const SearchBar = ({ searchQuery, setSearchQuery, setHighlightedCountry, fetchTopTracks }) => {
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (!value.trim()) {
      setHighlightedCountry(null);
      fetchTopTracks(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const trimmed = searchQuery.trim();
      if (trimmed) {
        const normalized = normalizeCountryName(trimmed);
        setHighlightedCountry(normalized);
        fetchTopTracks(trimmed);
      }
    } else if (e.key === 'Escape') {
      setSearchQuery('');
      setHighlightedCountry(null);
      fetchTopTracks(null);
    }
  };

  return (
    <>
      <div className="overlay-text">resonance</div>
      <div className="editable-search">
        <input
          type="text"
          placeholder="search for any country"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          className="bare-search-input"
        />
      </div>
    </>
  );
};