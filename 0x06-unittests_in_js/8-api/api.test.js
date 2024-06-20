const request = require('request'); 
// Importing 'request' module for making HTTP requests
const { expect } = require('chai');
// Importing 'expect' function from Chai assertion library

describe('API integration test', () => {
  const API_URL = 'http://localhost:7865';
// Base URL of the API being tested

  /**
   * Test case for GET request to '/' endpoint.
   * @name GET /
   * @function
   * @memberof module:API integration test
   * @inner
   * @param {function} done - Callback function to signal test completion.
   * @returns {void}
   */
  it('GET / returns correct response', (done) => {
    // Sending a GET request to the API_URL + '/'
    request.get(`${API_URL}/`, (_err, res, body) => {
      // Asserting that the status code of the response is 200 (OK)
      expect(res.statusCode).to.be.equal(200);
      // Asserting that the body of the response matches the expected text
      expect(body).to.be.equal('Welcome to the payment system');
      done(); // Calling done() to signal the completion of the asynchronous test
    });
  });
});
