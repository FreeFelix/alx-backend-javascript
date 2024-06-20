const express = require('express');
// Importing 'express' module for creating an Express application

const app = express();
// Creating an instance of Express application
const PORT = 7865;
// Port number on which the server will listen

/**
 * Route serving the root URL ('/').
 * @name GET /
 * @function
 * @memberof module:ExpressApp
 * @inner
 * @param {Object} _ - The request object (not used).
 * @param {Object} res - The response object.
 * @returns {void}
 */
app.get('/', (_, res) => {
  res.send('Welcome to the payment system');
});

/**
 * Route serving GET requests to '/cart/:id' endpoint.
 * @name GET /cart/:id
 * @function
 * @memberof module:ExpressApp
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
app.get('/cart/:id(\\d+)', (req, res) => {
  const id = req.params.id; // Extracting cart ID from request parameters

  res.send(`Payment methods for cart ${id}`);
});

/**
 * Starts the server and listens on the defined port.
 * @function
 * @memberof module:ExpressApp
 * @param {number} PORT - The port number on which the server listens.
 * @returns {void}
 */
app.listen(PORT, () => {
  console.log(`API available on localhost port ${PORT}`);
});

module.exports = app; // Exporting the Express application for external use
