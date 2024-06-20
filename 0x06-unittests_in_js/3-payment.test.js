const sinon = require('sinon');
// Importing Sinon for spies
const Utils = require('./utils');
// Importing Utils module
const { expect } = require('chai');
// Importing Chai's expect assertion style
const sendPaymentRequestToApi = require('./3-payment');
// Importing the function to be tested

describe('sendPaymentRequestToApi', () => {
  /**
   * Test case for sendPaymentRequestToApi using Utils.calculateNumber
   * @name sendPaymentRequestToApi uses the calculateNumber method of Utils
   * @function
   * @memberof module:sendPaymentRequestToApi
   * @inner
   * @returns {void}
   */
  it('sendPaymentRequestToApi uses the calculateNumber method of Utils', () => {
    const bigBrother = sinon.spy(Utils); // Creating a spy on Utils

    sendPaymentRequestToApi(100, 20); // Calling the function under test
    // Assertion: Check if calculateNumber was called with specific arguments
    expect(bigBrother.calculateNumber.calledWith('SUM', 100, 20)).to.be.true;
    // Assertion: Check the number of times calculateNumber was called
    expect(bigBrother.calculateNumber.callCount).to.be.equal(1);

    bigBrother.calculateNumber.restore(); // Restoring the spy to its original state
  });
});
