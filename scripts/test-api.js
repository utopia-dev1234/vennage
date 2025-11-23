// Simple test script for the API
// Run: node scripts/test-api.js

const testAPI = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/generate-icons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: 'Hockey equipment',
        style: 'Pastels',
        colors: [],
      }),
    });

    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
};

testAPI();

