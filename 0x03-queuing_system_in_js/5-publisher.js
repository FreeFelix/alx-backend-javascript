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
 * Function to publish a message to a Redis channel after a delay
 * @param {string} message - The message to be published
 * @param {number} time - The delay in milliseconds before publishing the message
 */
const publishMessage = (message, time) => {
  setTimeout(() => {
    // Log the message about to be sent
    console.log(`About to send ${message}`);
    // Publish the message to the 'holberton school channel' channel
    client.publish('holberton school channel', message);
  }, time);
};

// Publish messages to the Redis channel with specified delays
publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);
