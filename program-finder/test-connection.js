// Simple script to test connectivity to the backend server

async function testBackendConnection() {
  try {
    console.log('Testing connection to backend server...');
    const response = await fetch('http://localhost:3001/api/health');
    
    if (!response.ok) {
      throw new Error(`Failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Backend server response:', data);
    console.log('✅ Connection successful!');
    return true;
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    return false;
  }
}

async function testBookmarksEndpoint() {
  try {
    console.log('\nTesting connection to bookmarks endpoint...');
    const response = await fetch('http://localhost:3001/api/bookmarks', {
      headers: {
        'Authorization': 'Bearer test-token'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Bookmarks endpoint response:', data);
    console.log('✅ Bookmarks endpoint accessible!');
    return true;
  } catch (error) {
    console.error('❌ Bookmarks endpoint failed:', error.message);
    return false;
  }
}

// Run the tests
async function runTests() {
  const backendConnected = await testBackendConnection();
  
  if (backendConnected) {
    await testBookmarksEndpoint();
  }
}

runTests(); 