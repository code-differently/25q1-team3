// Simple script to test Next.js API routes for bookmarks

async function testNextJsBookmarksApi() {
  try {
    console.log('Testing connection to Next.js bookmarks API...');
    const response = await fetch('http://localhost:3000/api/bookmarks', {
      headers: {
        'Authorization': 'Bearer test-token'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Next.js bookmarks API response:', data);
    console.log('✅ Next.js bookmarks API accessible!');
    return true;
  } catch (error) {
    console.error('❌ Next.js bookmarks API failed:', error.message);
    return false;
  }
}

// Run the test
testNextJsBookmarksApi(); 