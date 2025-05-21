import { auth } from '../components/Firebase';

export class BookmarkService {
  private static instance: BookmarkService;
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  private constructor() {}

  public static getInstance(): BookmarkService {
    if (!BookmarkService.instance) {
      BookmarkService.instance = new BookmarkService();
    }
    return BookmarkService.instance;
  }

  private async getAuthToken(): Promise<string> {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }
    return user.getIdToken();
  }

  public async getBookmarks(): Promise<any[]> {
    try {
      const token = await this.getAuthToken();
      const response = await fetch(`${this.baseUrl}/api/bookmarks`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch bookmarks');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      throw error;
    }
  }

  public async isBookmarked(programId: string): Promise<boolean> {
    try {
      const token = await this.getAuthToken();
      const bookmarks = await this.getBookmarks();
      
      // Check if the program is in the list of bookmarked programs
      return bookmarks.some(program => program.id.toString() === programId);
    } catch (error) {
      console.error('Error checking bookmark status:', error);
      return false;
    }
  }

  public async addBookmark(programId: string): Promise<void> {
    try {
      const token = await this.getAuthToken();
      const response = await fetch(`${this.baseUrl}/api/bookmarks/${programId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to add bookmark');
      }
    } catch (error) {
      console.error('Error adding bookmark:', error);
      throw error;
    }
  }

  public async removeBookmark(programId: string): Promise<void> {
    try {
      const token = await this.getAuthToken();
      const response = await fetch(`${this.baseUrl}/api/bookmarks/${programId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to remove bookmark');
      }
    } catch (error) {
      console.error('Error removing bookmark:', error);
      throw error;
    }
  }

  public async getBookmarkCount(): Promise<number> {
    try {
      const bookmarks = await this.getBookmarks();
      return bookmarks.length;
    } catch (error) {
      console.error('Error getting bookmark count:', error);
      return 0;
    }
  }
} 