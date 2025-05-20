import { ProgramData } from '../interfaces/ProgramData';

export class BookmarkService {
  private static instance: BookmarkService;
  private baseUrl = '/api/bookmarks';

  private constructor() {}

  public static getInstance(): BookmarkService {
    if (!BookmarkService.instance) {
      BookmarkService.instance = new BookmarkService();
    }
    return BookmarkService.instance;
  }

  async getBookmarks(): Promise<ProgramData[]> {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) throw new Error('Failed to fetch bookmarks');
      return await response.json();
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      throw error;
    }
  }

  async toggleBookmark(programId: number): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/${programId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to toggle bookmark');
      const data = await response.json();
      return data.isBookmarked;
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      throw error;
    }
  }

  async removeBookmark(programId: number): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${programId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to remove bookmark');
    } catch (error) {
      console.error('Error removing bookmark:', error);
      throw error;
    }
  }

  async isBookmarked(programId: number): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/${programId}`);
      if (!response.ok) throw new Error('Failed to check bookmark status');
      const data = await response.json();
      return data.isBookmarked;
    } catch (error) {
      console.error('Error checking bookmark status:', error);
      throw error;
    }
  }
} 