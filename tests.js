const {
  add,
  singleCharAdd,
  twoTermsAdd,
  InvalidStringError
} = require('./add');
const assert = require('assert');

function itShoudPerformSingleDigitAddition() {
  try {
    assert.deepStrictEqual(singleCharAdd('0', '0'), {digit: 0, hasCarryOver: false}, 'adding 0 + 0');
    assert.deepStrictEqual(singleCharAdd('0', '000'), {digit: 0, hasCarryOver: false}, 'adding multiple 0s');
    assert.deepStrictEqual(singleCharAdd('1', '3'), {digit: 4, hasCarryOver: false}, '1 + 3');
    assert.deepStrictEqual(singleCharAdd('2', '8'), {digit: 0, hasCarryOver: true}, '2 + 8');
    assert.deepStrictEqual(singleCharAdd('9', '9'), {digit: 8, hasCarryOver: true}, '9 + 9, max internal addition');
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

function itShouldPerformMultipleTermsAddition() {
  try {
    assert.deepStrictEqual(add('12', '9'), '21');
    assert.deepStrictEqual(add('12', '9', '21'), '42');
    assert.deepStrictEqual(add('264', '9', '2321', '42'), '2636');
    assert.deepStrictEqual(add('00', '9', '2321', '42'), '2372');
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
}

function itShouldValidateTermStrings() {
  try {
    assert.throws(() => add('12', 'b'), InvalidStringError);
  } catch (err) {
    console.log(err);
    return false;
  }

  return true;
}

const tests = [
  itShoudPerformSingleDigitAddition,
  itShouldPerformTwoTermsAddition,
  itShouldPerformMultipleTermsAddition,
  itShouldValidateTermStrings
]

/**
 * Runs all tests
 */
function runTests() {
  for (let i = 0; i < tests.length; ++i) {
    console.log('Running test: ', tests[i].name);
    if (tests[i]() === false) {
      console.log('ERROR');
      break;
    }
  }
}

module.exports = {
  runTests
}