const sinon = require('sinon'); // Importing Sinon for spies and stubs
const Utils = require('./utils'); // Importing Utils module
const { expect } = require('chai'); // Importing Chai's expect assertion style
const sendPaymentRequestToApi = require('./4-payment'); // Importing the function to be tested

describe('sendPaymentRequestToApi', () => {
  /**
   * Test case for sendPaymentRequestToApi logging and calculateNumber usage
   * @name sendPaymentRequestToApi calls console.log with the right arguments
   * @function
   * @memberof module:sendPaymentRequestToApi
   * @inner
   * @returns {void}
   */
  it('sendPaymentRequestToApi calls console.log with the right arguments', () => {
    const bigBrother = sinon.spy(console); // Creating a spy on console
    const dummy = sinon.stub(Utils, 'calculateNumber'); // Creating a stub for calculateNumber

    dummy.returns(10); // Stubbing calculateNumber to return 10
    sendPaymentRequestToApi(100, 20); // Calling the function under test
    // Assertion: Check if calculateNumber was called with specific arguments
    expect(dummy.calledWith('SUM', 100, 20)).to.be.true;
    // Assertion: Check the number of times calculateNumber was called
    expect(dummy.callCount).to.be.equal(1);
    // Assertion: Check if console.log was called with the expected message
    expect(bigBrother.log.calledWith('The total is: 10')).to.be.true;
    // Assertion: Check the number of times console.log was called
    expect(bigBrother.log.callCount).to.be.equal(1);

    dummy.restore(); // Restoring the stub to its original state
    bigBrother.log.restore(); // Restoring the spy on console
  });
});
