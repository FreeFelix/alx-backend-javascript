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

// Subscribe to the 'holberton school channel' channel
client.subscribe('holberton school channel');

// Event listener for message events on the subscribed channel
client.on('message', (channel, message) => {
  // Log the received message
  console.log(`${message}`);
  // If the received message is 'KILL_SERVER', unsubscribe and quit the client
  if (message === 'KILL_SERVER') {
    client.unsubscribe();
    client.quit();
  }
});
