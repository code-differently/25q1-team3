import React from 'react';
import { SearchFilters } from '../services/ProgramService';

interface RecentSearchesProps {
  searches: string[];
  onSearch: (zip: string, filters: SearchFilters) => void;
  onClear: () => void;
}

export function RecentSearches({ searches, onSearch, onClear }: RecentSearchesProps) {
  if (searches.length === 0) return null;

  return (
    <div className="recent-searches">
      <div className="recent-searches-header">
        <h3>Recent Searches</h3>
        <button onClick={onClear} className="clear-recent">
          Clear all
        </button>
      </div>
      <div className="recent-searches-list">
        {searches.map((zip, index) => (
          <button
            key={index}
            onClick={() => onSearch(zip, { ageGroup: '', category: '', distance: '10' })}
            className="recent-search-item"
          >
            {zip}
          </button>
        ))}
      </div>
    </div>
  );
}

<div style={{ textAlign: "center", marginTop: "2rem" }}>
  <h1>
    A Digital Movement Designed To Bridge The Gap Between<br />
    <span style={{ display: "block", marginTop: "1.5rem" }}>
      Underserved Youth And The Opportunities They Deserve
    </span>
  </h1>
</div> 