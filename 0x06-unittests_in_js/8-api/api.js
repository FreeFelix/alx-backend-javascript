// Import the express module
const express = require('express');

// Create an instance of an Express application
const app = express();

// Define the port on which the server will listen
const PORT = 7865;

/**
 * Route serving the root URL ('/').
 * @name get/
 * @function
 * @memberof module:express.Router
 * @inner
 * @param {Object} _ - The request object (not used).
 * @param {Object} res - The response object.
 * @returns {void}
 */
app.get('/', (_, res) => {
  res.send('Welcome to the payment system');
});

/**
 * Starts the server and listens on the defined port.
 * @function
 * @memberof module:express.Application
 * @param {number} PORT - The port number on which the server listens.
 * @returns {void}
 */
app.listen(PORT, () => {
  console.log(`API available on localhost port ${PORT}`);
});

// Export the app module for use in other files
module.exports = app;
