import { useState, useEffect, useCallback } from 'react';

const MAX_RECENT_SEARCHES = 4;
const STORAGE_KEY = 'recentSearches';

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const savedSearches = localStorage.getItem(STORAGE_KEY);
    if (savedSearches) {
      try {
        const parsed = JSON.parse(savedSearches);
        const searches = Array.isArray(parsed)
          ? parsed.map(item => typeof item === 'object' ? item.zip : item)
          : [];
        setRecentSearches(searches);
      } catch (err) {
        console.error('Error parsing recent searches:', err);
        setRecentSearches([]);
      }
    }
  }, []);

  const saveSearch = useCallback((zip: string) => {
    if (!zip) return;
    setRecentSearches(prev => {
      const updated = [zip, ...prev.filter(s => s !== zip)].slice(0, MAX_RECENT_SEARCHES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearSearches = useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    recentSearches,
    saveSearch,
    clearSearches,
  };
} 