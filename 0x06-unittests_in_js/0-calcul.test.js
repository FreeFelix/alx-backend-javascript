const assert = require('assert'); // Importing Node.js assert module for assertions
const calculateNumber = require('./0-calcul'); // Importing the function to be tested

describe('calculateNumber', () => {
  /**
   * Test case for adding floating point whole numbers.
   * @name floating point whole numbers
   * @function
   * @memberof module:calculateNumber
   * @inner
   * @returns {void}
   */
  it('floating point whole numbers', () => {
    assert.strictEqual(calculateNumber(1.0, 2.0), 3);
  });

  /**
   * Test case for rounding down b's floating point fractional number.
   * @name rounding down b's floating point fractional number
   * @function
   * @memberof module:calculateNumber
   * @inner
   * @returns {void}
   */
  it('rounding down b\'s floating point fractional number', () => {
    assert.strictEqual(calculateNumber(1.0, 2.4), 3);
  });

  /**
   * Test case for rounding down a and b's floating point fractional numbers.
   * @name rounding down a and b's floating point fractional numbers
   * @function
   * @memberof module:calculateNumber
   * @inner
   * @returns {void}
   */
  it('rounding down a and b\'s floating point fractional numbers', () => {
    assert.strictEqual(calculateNumber(1.4, 2.4), 3);
  });

  /**
   * Test case for rounding down a's floating point fractional number.
   * @name rounding down a's floating point fractional number
   * @function
   * @memberof module:calculateNumber
   * @inner
   * @returns {void}
   */
  it('rounding down a\'s floating point fractional number', () => {
    assert.strictEqual(calculateNumber(1.4, 2.0), 3);
  });

  /**
   * Test case for rounding up b's floating point fractional numbers.
   * @name rounding up b's floating point fractional numbers
   * @function
   * @memberof module:calculateNumber
   * @inner
   * @returns {void}
   */
  it('rounding up b\'s floating point fractional numbers', () => {
    assert.strictEqual(calculateNumber(1.0, 2.5), 4);
  });

  /**
   * Test case for rounding up a and b's floating point fractional numbers.
   * @name rounding up a and b's floating point fractional numbers
   * @function
   * @memberof module:calculateNumber
   * @inner
   * @returns {void}
   */
  it('rounding up a and b\'s floating point fractional numbers', () => {
    assert.strictEqual(calculateNumber(2.6, 2.5), 6);
  });

  /**
   * Test case for rounding up a's floating point fractional numbers.
   * @name rounding up a's floating point fractional numbers
   * @function
   * @memberof module:calculateNumber
   * @inner
   * @returns {void}
   */
  it('rounding up a\'s floating point fractional numbers', () => {
    assert.strictEqual(calculateNumber(2.6, 2.0), 5);
  });

  /**
   * Test case for rounding down a and b floating point fractional numbers with trailing 9's.
   * @name rounding down a and b floating point fractional numbers with trailing 9's
   * @function
   * @memberof module:calculateNumber
   * @inner
   * @returns {void}
   */
  it('rounding down a and b floating point fractional numbers with trailing 9\'s', () => {
    assert.strictEqual(calculateNumber(2.499999, 3.499999), 5);
  });
});
