import { auth } from '../components/Firebase';

export class BookmarkService {
  private static instance: BookmarkService;
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  private constructor() {
    console.log('BookmarkService initialized with baseUrl:', this.baseUrl);
  }

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
    try {
      const token = await user.getIdToken();
      return token;
    } catch (error) {
      console.error('Error getting auth token:', error);
      throw new Error('Failed to get authentication token');
    }
  }

  public async getBookmarks(): Promise<any[]> {
    try {
      const token = await this.getAuthToken();
      console.log('Fetching bookmarks from:', `${this.baseUrl}/api/bookmarks`);
      
      const response = await fetch(`${this.baseUrl}/api/bookmarks`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Bookmark API error:', response.status, errorText);
        throw new Error(`Failed to fetch bookmarks: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      console.log('Fetched bookmarks:', data);
      return data;
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      // Return empty array instead of throwing to prevent cascading errors
      return [];
    }
  }

  public async isBookmarked(programId: string): Promise<boolean> {
    try {
      if (!auth.currentUser) {
        console.log('User not authenticated, cannot check bookmark status');
        return false;
      }
      
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
      console.log('Adding bookmark:', programId);
      
      const response = await fetch(`${this.baseUrl}/api/bookmarks/${programId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Add bookmark API error:', response.status, errorText);
        throw new Error(`Failed to add bookmark: ${response.status} ${errorText}`);
      }
      
      console.log('Bookmark added successfully');
    } catch (error) {
      console.error('Error adding bookmark:', error);
      throw error;
    }
  }

  public async removeBookmark(programId: string): Promise<void> {
    try {
      const token = await this.getAuthToken();
      console.log('Removing bookmark:', programId);
      
      const response = await fetch(`${this.baseUrl}/api/bookmarks/${programId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Remove bookmark API error:', response.status, errorText);
        throw new Error(`Failed to remove bookmark: ${response.status} ${errorText}`);
      }
      
      console.log('Bookmark removed successfully');
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