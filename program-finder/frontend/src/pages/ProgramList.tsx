import React, { useEffect, useState } from 'react';
import { ProgramData } from '../interfaces/ProgramData';
import ProgramCard from '../components/ProgramCard';
import SearchBar from '../components/SearchBar';
import './ProgramList.css';

interface SearchFilters {
  zipCode: string;
  keyword: string;
  type: string;
  ages: string;
}

const ProgramList: React.FC = () => {
  const [programs, setPrograms] = useState<ProgramData[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<ProgramData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch('/api/programs');
        const data = await response.json();
        setPrograms(data);
        setFilteredPrograms(data);
      } catch (error) {
        console.error('Error fetching programs:', error);
        // For demo purposes, show some sample data from our database
        const samplePrograms: ProgramData[] = [
          {
            id: 1,
            zip_code: '19801',
            organization: 'Walnut Street YMCA',
            services: 'Offers preschool, school-age childcare, youth development, teen leadership programs, summer day camps, swim lessons, and lifeguard training.',
            type: 'Sports, Education, Lifeguard',
            ages: '2mos - 17yrs'
          },
          {
            id: 2,
            zip_code: '19801',
            organization: 'Central YMCA',
            services: 'Provides preschool programs and childcare services.',
            type: 'Preschool, Childcare',
            ages: '2mos - 5yrs'
          }
        ];
        setPrograms(samplePrograms);
        setFilteredPrograms(samplePrograms);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const handleSearch = (zip: string, keyword: string) => {
    const filtered = programs.filter(program => {
      // Filter by ZIP code
      if (zip && program.zip_code !== zip) {
        return false;
      }

      // Filter by keyword
      if (keyword) {
        const searchTerm = keyword.toLowerCase();
        const matchesKeyword = 
          program.organization.toLowerCase().includes(searchTerm) ||
          program.services.toLowerCase().includes(searchTerm) ||
          program.type.toLowerCase().includes(searchTerm);
        if (!matchesKeyword) return false;
      }

      return true;
    });

    setFilteredPrograms(filtered);
  };

  return (
    <div className="program-list">
      <h1>Available Programs</h1>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <div className="loading">Loading programs...</div>
      ) : filteredPrograms.length > 0 ? (
        <div className="program-grid">
          {filteredPrograms.map((program) => (
            <ProgramCard key={program.id} data={program} />
          ))}
        </div>
      ) : (
        <div className="no-results">No programs found matching your criteria.</div>
      )}
    </div>
  );
};

export default ProgramList; 