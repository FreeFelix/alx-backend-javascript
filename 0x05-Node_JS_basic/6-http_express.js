const express = require('express');

const app = express();
const PORT = 1245;

// Define a route handler for the root endpoint '/'
app.get('/', (_, res) => {
  res.send('Hello Holberton School!'); // Send a plain text response
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`); // Log a message when the server starts
});

module.exports = app; // Export the Express application
