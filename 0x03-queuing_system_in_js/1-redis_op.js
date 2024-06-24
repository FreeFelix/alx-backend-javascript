// Import the Redis library
import redis from 'redis';

// Create a new Redis client
const client = redis.createClient();

// Event listener for error events
client.on('error', (err) => {
  // Log an error message when the client cannot connect to the server
  console.log(`Redis client not connected to the server: ${err}`);
});

// Event listener for connect events
client.on('connect', () => {
  // Log a message when the client successfully connects to the server
  console.log('Redis client connected to the server');
});

/**
 * Function to set a new school value in Redis
 * @param {string} schoolName - The name of the school
 * @param {string} value - The value to be set for the school
 */
const setNewSchool = (schoolName, value) => {
  // Set the value for the schoolName key in Redis
  client.set(schoolName, value, redis.print);
};

/**
 * Function to display the value of a school from Redis
 * @param {string} schoolName - The name of the school
 */
const displaySchoolValue = (schoolName) => {
  // Get the value for the schoolName key from Redis
  client.get(schoolName, (err, value) => {
    // Log the retrieved value
    console.log(value);
  });
};

// Display the value of 'Holberton' from Redis
displaySchoolValue('Holberton');

// Set a new value for 'HolbertonSanFrancisco' in Redis
setNewSchool('HolbertonSanFrancisco', '100');

// Display the value of 'HolbertonSanFrancisco' from Redis
displaySchoolValue('HolbertonSanFrancisco');
