import React, { useState } from 'react';

interface SearchBarProps {
  defaultZip?: string;
  onSearch: (zip: string, keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ defaultZip = '19801', onSearch }) => {
  const [zip, setZip] = useState(defaultZip);
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(zip, keyword);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
      <input
        type="text"
        value={zip}
        onChange={e => setZip(e.target.value)}
        placeholder="ZIP code"
        style={{ width: 80 }}
      />
      <input
        type="text"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search keyword"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
