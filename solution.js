const assert = require('assert');
let memoized = {}; // should we use this?

const CARRY_OVER_DIGIT = '1';

/** TESTS */
function itShoudPerformSingleDigitAddition() {
  try {
    assert.deepStrictEqual({digit: 0, hasCarryOver: false}, singleCharAdd('0', '0'));
    assert.deepStrictEqual({digit: 4, hasCarryOver: false}, singleCharAdd('1', '3'));
    assert.deepStrictEqual({digit: 0, hasCarryOver: true}, singleCharAdd('2', '8'));
    assert.deepStrictEqual({digit: 8, hasCarryOver: true}, singleCharAdd('9', '9'));
  } catch (err) {
    console.log(err);
    return false;
  }

  return true;
}

function itShouldPerformTwoTermsAddition() {
  try {
    assert.deepStrictEqual('21', twoTermsAdd('12', '9'));
    assert.deepStrictEqual('20021', twoTermsAdd('19999', '22'));
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
}
/** END OF TESTS */

function singleCharAdd(a, b) {
  const sum = parseInt(a) + parseInt(b); // this can be optimized using a sum table, or memoizing results
  if (sum > 9) {
    return {
      digit: sum % 10,
      hasCarryOver: true
    }
  } else {
    return {
      digit: sum,
      hasCarryOver: false
    }
  }
}

function twoTermsAdd(a, b) {
}

function add() {

}

const tests = [
  itShoudPerformSingleDigitAddition
]

function runTests() {
  for (let i = 0; i < tests.length; ++i) {
    console.log('Running test: ', tests[i]);
    if (tests[i]() === false) {
      break;
    }
  }
}
// Run tests
runTests();
