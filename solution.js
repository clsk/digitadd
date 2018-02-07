const assert = require('assert');
let memoized = {}; // should we use this?

const CARRY_OVER_DIGIT = '1';

/** TESTS */
function itShoudPerformSingleDigitAddition() {
  try {
    assert.deepStrictEqual(singleCharAdd('0', '0'), {digit: 0, hasCarryOver: false});
    assert.deepStrictEqual(singleCharAdd('1', '3'), {digit: 4, hasCarryOver: false});
    assert.deepStrictEqual(singleCharAdd('2', '8'), {digit: 0, hasCarryOver: true});
    assert.deepStrictEqual(singleCharAdd('9', '9'), {digit: 8, hasCarryOver: true});
  } catch (err) {
    console.log(err);
    return false;
  }

  return true;
}

function itShouldPerformTwoTermsAddition() {
  try {
    assert.deepStrictEqual(twoTermsAdd('12', '9'), '21');
    assert.deepStrictEqual(twoTermsAdd('9', '12'), '21');
    assert.deepStrictEqual(twoTermsAdd('19999', '22'), '20021');
    assert.deepStrictEqual(twoTermsAdd('22', '19999'), '20021');
    assert.deepStrictEqual(twoTermsAdd('44', '94'), '138');
  } catch (err) {
    console.log(err);
    return false;
  }

  return true;
}
/** END OF TESTS */

/**
 * Adds two single-digit (char) terms
 * @param {string} a First Term
 * @param {string} b Second Term
 */
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

/**
 * Adds two multiple-digit (string) terms
 * @param {string} a 
 * @param {string} b 
 */
function twoTermsAdd(a, b) {
  let total = [];
  for (
    let aIndex = a.length-1, bIndex = b.length-1, hasCarryOver = false; 
    aIndex > -1 || bIndex > -1 || hasCarryOver === true;
    --aIndex, --bIndex
  ) {
    if (aIndex < 0 && bIndex < 0 && hasCarryOver == true) {
      total.push(CARRY_OVER_DIGIT);
      hasCarryOver = false;
    } else if (aIndex < 0) {
      if (hasCarryOver === true) {
        const result = singleCharAdd(b[bIndex], CARRY_OVER_DIGIT);
        total.push(result.digit);
        hasCarryOver = result.hasCarryOver;
      } else {
        total.push(b[bIndex]);
      }
    } else if (bIndex < 0)  {
      if (hasCarryOver === true) {
        const result = singleCharAdd(a[aIndex], CARRY_OVER_DIGIT);
        total.push(result.digit);
        hasCarryOver = result.hasCarryOver;
      } else {
        total.push(a[aIndex]);
      }
    } else {
      let result = singleCharAdd(a[aIndex], b[bIndex]);
      if (hasCarryOver) {
        result.digit = singleCharAdd(result.digit, CARRY_OVER_DIGIT).digit;
      }
      hasCarryOver = result.hasCarryOver;
      total.push(result.digit);
    }
  }

  return total.reverse().join('');
}

/**
 * 
 * @param {...number} terms 
 */
function add(terms) {
}

const tests = [
  itShoudPerformSingleDigitAddition,
  itShouldPerformTwoTermsAddition
]

function runTests() {
  for (let i = 0; i < tests.length; ++i) {
    console.log('Running test: ', tests[i].name);
    if (tests[i]() === false) {
      console.log('ERROR');
      break;
    } else {
      console.log('ok');
    }
  }
}
// Run tests
runTests();
