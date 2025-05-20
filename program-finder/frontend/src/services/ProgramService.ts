import { ProgramData } from '../interfaces/ProgramData';

export interface SearchFilters {
  ageGroup: string;
  category: string;
  distance: string;
}

export class ProgramService {
  private static instance: ProgramService;
  private baseUrl = '/api/programs';

  private constructor() {}

  public static getInstance(): ProgramService {
    if (!ProgramService.instance) {
      ProgramService.instance = new ProgramService();
    }
    return ProgramService.instance;
  }

  async fetchAllPrograms(): Promise<ProgramData[]> {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) throw new Error('Failed to fetch programs');
      return await response.json();
    } catch (error) {
      console.error('Error fetching all programs:', error);
      throw error;
    }
  }

  async searchPrograms(zip: string, filters: SearchFilters): Promise<ProgramData[]> {
    try {
      const queryParams = new URLSearchParams();
      if (zip) queryParams.append('zip', zip);
      if (filters.ageGroup) queryParams.append('ageGroup', filters.ageGroup);
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.distance) queryParams.append('distance', filters.distance);

      const response = await fetch(`${this.baseUrl}${queryParams.toString() ? `?${queryParams}` : ''}`);
      if (!response.ok) throw new Error('Failed to fetch programs');
      return await response.json();
    } catch (error) {
      console.error('Error searching programs:', error);
      throw error;
    }
  }

  async fetchProgramById(id: number): Promise<ProgramData> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      if (!response.ok) throw new Error('Failed to fetch program');
      return await response.json();
    } catch (error) {
      console.error('Error fetching program by id:', error);
      throw error;
    }
  }
} 