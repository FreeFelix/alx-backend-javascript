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

// Set multiple hash fields for 'HolbertonSchools' in Redis
client.hset('HolbertonSchools', 'Portland', 50, redis.print);
client.hset('HolbertonSchools', 'Seattle', 80, redis.print);
client.hset('HolbertonSchools', 'New York', 20, redis.print);
client.hset('HolbertonSchools', 'Bogota', 20, redis.print);
client.hset('HolbertonSchools', 'Cali', 40, redis.print);
client.hset('HolbertonSchools', 'Paris', 2, redis.print);

// Retrieve all fields and values of the 'HolbertonSchools' hash from Redis
client.hgetall('HolbertonSchools', (err, reply) => {
  if (err) {
    // Log an error message if there is an error retrieving the hash
    console.log(err);
  } else {
    // Log the retrieved hash fields and values
    console.log(reply);
  }
});
