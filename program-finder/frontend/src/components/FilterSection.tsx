import { useState } from 'react';
import './FilterSection.css';

interface FilterSectionProps {
  filters: {
    zip: string;
    ageGroup: string;
    category: string;
    distance: string;
  };
  onFilterChange: (filters: FilterSectionProps['filters']) => void;
  onClear: () => void;
}

export function FilterSection({ filters, onFilterChange, onClear }: FilterSectionProps) {
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value
    });
  };

  return (
    <div className="filters-section">
      <button 
        className="button alt"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>
      
      {showFilters && (
        <div className="filters">
          <div className="filter-group">
            <select
              name="ageGroup"
              value={filters.ageGroup}
              onChange={handleFilterChange}
              className={!filters.ageGroup ? 'placeholder' : ''}
            >
              <option value="" disabled>Select Age Group</option>
              <option value="children">Children (0-12)</option>
              <option value="teens">Teens (13–17)</option>
              <option value="adults">Adults (18+)</option>
            </select>
          </div>

          <div className="filter-group">
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className={!filters.category ? 'placeholder' : ''}
            >
              <option value="" disabled>Select Category</option>
              <option value="education">Education</option>
              <option value="sports">Sports</option>
              <option value="arts">Arts & Culture</option>
              <option value="stem">STEM</option>
            </select>
          </div>

          <div className="filter-group">
            <div className="distance-filter">
              <label>Distance: {filters.distance} miles</label>
              <input
                type="range"
                name="distance"
                min="1"
                max="50"
                value={filters.distance}
                onChange={handleFilterChange}
              />
            </div>
          </div>

          <button 
            className="button small"
            onClick={onClear}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
} 