import { auth } from '../components/Firebase';

export class BookmarkService {
  private static instance: BookmarkService;
  // Use the relative path to avoid CORS issues
  private apiUrl = '/api';
  private cachedBookmarks: any[] = [];
  private lastFetchTime: number = 0;
  private fetchPromise: Promise<any[]> | null = null;

  private constructor() {
    console.log('BookmarkService initialized with API URL:', this.apiUrl);
  }

  public static getInstance(): BookmarkService {
    if (!BookmarkService.instance) {
      BookmarkService.instance = new BookmarkService();
    }
    return BookmarkService.instance;
  }

  private async getAuthToken(): Promise<string> {
    // For development, always return a test token
    if (process.env.NODE_ENV !== 'production') {
      console.log('Development mode: Using test authentication');
      return 'test-token';
    }
    
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

  public async getBookmarks(forceRefresh = false): Promise<any[]> {
    // If we have a fetch in progress, return that promise
    if (this.fetchPromise) {
      return this.fetchPromise;
    }
    
    // If we have cached bookmarks and it's been less than 30 seconds since last fetch
    // and we're not forcing a refresh, return the cached bookmarks
    const now = Date.now();
    if (!forceRefresh && this.cachedBookmarks.length > 0 && now - this.lastFetchTime < 30000) {
      console.log('Using cached bookmarks');
      return this.cachedBookmarks;
    }
    
    try {
      // Create a new fetch promise
      this.fetchPromise = this.fetchBookmarksFromApi();
      
      // Wait for the fetch to complete
      const bookmarks = await this.fetchPromise;
      
      // Cache the results
      this.cachedBookmarks = bookmarks;
      this.lastFetchTime = Date.now();
      
      return bookmarks;
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      // Return empty array instead of throwing to prevent cascading errors
      return [];
    } finally {
      // Clear the fetch promise when done
      this.fetchPromise = null;
    }
  }
  
  private async fetchBookmarksFromApi(): Promise<any[]> {
    try {
      const token = await this.getAuthToken();
      console.log('Fetching bookmarks from:', `${this.apiUrl}/bookmarks`);
      
      const response = await fetch(`${this.apiUrl}/bookmarks`, {
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
      console.error('Error in fetchBookmarksFromApi:', error);
      throw error;
    }
  }

  public async isBookmarked(programId: string): Promise<boolean> {
    try {
      // In development mode, we can proceed with checking bookmarks
      if (process.env.NODE_ENV !== 'production') {
        console.log('Development mode: Checking bookmark status');
      } 
      // Only check for auth in production
      else if (!auth.currentUser) {
        console.log('User not authenticated, cannot check bookmark status');
        return false;
      }
      
      // Try to use the dedicated check endpoint first
      try {
        const token = await this.getAuthToken();
        console.log('Checking bookmark status for program:', programId);
        
        const response = await fetch(`${this.apiUrl}/bookmarks/check/${programId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('Bookmark check result:', data);
          return data.isBookmarked;
        }
      } catch (error) {
        console.warn('Could not use check endpoint, falling back to getBookmarks', error);
      }
      
      // Fallback to checking the full bookmarks list
      const bookmarks = await this.getBookmarks();
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
      
      const response = await fetch(`${this.apiUrl}/bookmarks/${programId}`, {
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
      
      // Force refresh the bookmarks cache
      await this.getBookmarks(true);
    } catch (error) {
      console.error('Error adding bookmark:', error);
      throw error;
    }
  }

  public async removeBookmark(programId: string): Promise<void> {
    try {
      const token = await this.getAuthToken();
      console.log('Removing bookmark:', programId);
      
      const response = await fetch(`${this.apiUrl}/bookmarks/${programId}`, {
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
      
      // Force refresh the bookmarks cache
      await this.getBookmarks(true);
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