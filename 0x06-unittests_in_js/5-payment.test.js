const sinon = require('sinon'); // Importing Sinon for spies
const { expect } = require('chai'); // Importing Chai's expect assertion style
const sendPaymentRequestToApi = require('./5-payment'); // Importing the function to be tested

describe('sendPaymentRequestToApi', () => {
  let bigBrother; // Declare a variable to hold the spy

  beforeEach(() => {
    if (!bigBrother) {
      bigBrother = sinon.spy(console); // Create a spy on console in beforeEach
    }
  });

  afterEach(() => {
    bigBrother.log.resetHistory(); // Reset spy history in afterEach
  });

  /**
   * Test case for sendPaymentRequestToApi logging with specific parameters
   * @name sendPaymentRequestToApi(100, 20) logs "The total is: 120" to the console
   * @function
   * @memberof module:sendPaymentRequestToApi
   * @inner
   * @returns {void}
   */
  it('sendPaymentRequestToApi(100, 20) logs "The total is: 120" to the console', () => {
    sendPaymentRequestToApi(100, 20); // Call the function under test
    // Assertion: Check if console.log was called with the expected message
    expect(bigBrother.log.calledWith('The total is: 120')).to.be.true;
    // Assertion: Check if console.log was called exactly once
    expect(bigBrother.log.calledOnce).to.be.true;
  });

  /**
   * Test case for sendPaymentRequestToApi logging with different parameters
   * @name sendPaymentRequestToApi(10, 10) logs "The total is: 20" to the console
   * @function
   * @memberof module:sendPaymentRequestToApi
   * @inner
   * @returns {void}
   */
  it('sendPaymentRequestToApi(10, 10) logs "The total is: 20" to the console', () => {
    sendPaymentRequestToApi(10, 10); // Call the function under test
    // Assertion: Check if console.log was called with the expected message
    expect(bigBrother.log.calledWith('The total is: 20')).to.be.true;
    // Assertion: Check if console.log was called exactly once
    expect(bigBrother.log.calledOnce).to.be.true;
  });
});
