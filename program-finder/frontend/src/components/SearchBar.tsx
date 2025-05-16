'use client';

import React, { useState } from 'react';

interface SearchBarProps {
  defaultZip?: string;
  onSearch: (zip: string, keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ defaultZip = '', onSearch }) => {
  const [zip, setZip] = useState(defaultZip);
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(zip, keyword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row gtr-uniform">
        <div className="col-5 col-12-xsmall">
          <input
            type="text"
            name="zip"
            id="zip"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="ZIP Code"
          />
        </div>
        <div className="col-5 col-12-xsmall">
          <input
            type="text"
            name="keyword"
            id="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Keyword (e.g. 'basketball', 'arts')"
          />
        </div>
        <div className="col-2 col-12-xsmall">
          <input type="submit" value="Search" className="fit primary" />
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
