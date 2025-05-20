import { useState, useCallback } from 'react';
import { ProgramData } from '../interfaces/ProgramData';
import { ProgramService, SearchFilters } from '../services/ProgramService';

export function usePrograms() {
  const [programs, setPrograms] = useState<ProgramData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const programService = ProgramService.getInstance();

  const fetchAllPrograms = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await programService.fetchAllPrograms();
      setPrograms(data);
    } catch (err) {
      setError('Unable to fetch programs. Please try again later.');
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchPrograms = useCallback(async (zip: string, filters: SearchFilters) => {
    setLoading(true);
    setError(null);
    try {
      const data = await programService.searchPrograms(zip, filters);
      setPrograms(data);
    } catch (err) {
      setError('Unable to fetch programs. Please try again later.');
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    programs,
    loading,
    error,
    fetchAllPrograms,
    searchPrograms,
  };
} 