import React, { useState, useEffect } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  defaultZip?: string;
  onSearch: (zip: string, keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ defaultZip = '19801', onSearch }) => {
  const [zip, setZip] = useState(defaultZip);
  const [keyword, setKeyword] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showZipDropdown, setShowZipDropdown] = useState(false);

  // Sample ZIP codes - replace with your actual ZIP codes
  const availableZipCodes = [
    '19801', '19802', '19803', '19804', '19805', '19806', '19807', '19808', '19809', '19810'
  ];

  // Sample suggestions - in a real app, these would come from an API
  const sampleSuggestions = [
    'After School Programs',
    'Summer Camps',
    'Sports Programs',
    'Music Lessons',
    'Art Classes',
    'STEM Programs',
    'Tutoring Services',
    'Youth Programs'
  ];

  useEffect(() => {
    if (keyword.length > 2) {
      const filtered = sampleSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(keyword.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [keyword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zip) {
      onSearch(zip, keyword);
      setShowSuggestions(false);
      setShowZipDropdown(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setKeyword(suggestion);
    setShowSuggestions(false);
    if (zip) {
      onSearch(zip, suggestion);
    }
  };

  const handleZipSelect = (selectedZip: string) => {
    setZip(selectedZip);
    setShowZipDropdown(false);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-group">
          <div className="zip-input-wrapper">
            <input
              type="text"
              value={zip}
              onChange={e => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
              onFocus={() => setShowZipDropdown(true)}
              placeholder="ZIP code"
              className="zip-input"
              pattern="[0-9]{5}"
              maxLength={5}
              required
            />
            <span className="zip-label">ZIP</span>
            {showZipDropdown && (
              <div className="zip-dropdown">
                <div className="zip-list">
                  {availableZipCodes.map(zipCode => (
                    <div
                      key={zipCode}
                      className="zip-option"
                      onClick={() => handleZipSelect(zipCode)}
                    >
                      {zipCode}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="keyword-input-wrapper">
            <input
              type="text"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="Search for specific programs (optional)"
              className="keyword-input"
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        <button type="submit" className="search-button">
          {keyword ? 'Search' : 'Show All Programs'}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
