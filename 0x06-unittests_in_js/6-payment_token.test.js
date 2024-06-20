const { expect } = require('chai'); // Importing Chai's expect assertion style
const getPaymentTokenFromAPI = require('./6-payment_token'); // Importing the function to be tested

describe('getPaymentTokenFromAPI', () => {
  /**
   * Test case for getPaymentTokenFromAPI with success=true
   * @name getPaymentTokenFromAPI(success=true)
   * @function
   * @memberof module:getPaymentTokenFromAPI
   * @inner
   * @param {boolean} success - Indicates if the API call is successful
   * @returns {void}
   */
  it('getPaymentTokenFromAPI(success=true)', (done) => {
    getPaymentTokenFromAPI(true) // Call the function under test with success=true
      .then((res) => {
        // Assertion: Check if the response matches the expected structure
        expect(res).to.deep.equal({ data: 'Successful response from the API' });
        done(); // Call done() to indicate that the asynchronous test is complete
      })
      .catch((err) => {
        done(err); // Call done(err) in case of an error during the promise chain
      });
  });
});
