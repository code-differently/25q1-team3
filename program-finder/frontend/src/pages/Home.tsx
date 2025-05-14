import React, { useState } from 'react';
import { ProgramData } from '../interfaces/ProgramData';
import SearchBar from '../components/SearchBar';
import ProgramCard from '../components/ProgramCard';

const Home: React.FC = () => {
  const [programs, setPrograms] = useState<ProgramData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const search = async (zip: string, keyword: string) => {
    console.log('Search triggered with:', zip, keyword);
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/programs?zip=${zip}&keyword=${encodeURIComponent(keyword)}`);
      const data = await res.json();
      setPrograms(data);
      console.log('Fetched programs:', data);
    } catch (err) {
      console.error('Fetch error:', err);
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <SearchBar defaultZip="19801" onSearch={search} />
      {loading && <p>Loading...</p>}
      {!loading && searched && programs.length === 0 && <p>No results found.</p>}
      {!loading && programs.map(p => <ProgramCard key={p.id} data={p} />)}
    </div>
  );
};

export default Home;
