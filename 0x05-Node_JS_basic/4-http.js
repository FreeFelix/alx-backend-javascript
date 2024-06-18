const http = require('http');

// Define the port and host for the server
const PORT = 1245;
const HOST = 'localhost';

// Create an HTTP server
const app = http.createServer();

// Set up an event listener for 'request' events
app.on('request', (_, res) => {
  const responseText = 'Hello Holberton School!';

  // Set the headers for the response
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', responseText.length);

  // Set the status code for the response
  res.statusCode = 200;

  // Write the response text to the response stream
  res.write(Buffer.from(responseText));
});

// Start the server and listen on the specified port and host
app.listen(PORT, HOST, () => {
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

module.exports = app;
