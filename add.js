/**
 * @type {number}
 */
const CARRY_OVER_DIGIT = '1';


let memoized = {}; // should we use this?
/**
 * @typedef {Object} AddResult
 * @property {string} digit 
 * @property {boolean} hasCarryOver carry-over can be 1 at most. So using boolean for convenience
 */

/**
 * Adds two single-digit (char) terms
 * @param {string} a First Term
 * @param {string} b Second Term
 * @returns {AddResult}
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
 * @returns {string}
 */
function twoTermsAdd(a, b) {
  /**
   * Approach: Runs through both array in reverse adding terms from both rows (if they exist)
   * aIndex = Current index of a term
   * bIndex = Current index of b term
   * hasCarryOver = Whether the last singleCharAdd operation had a carryOver
   */
  let total = [];
  for (
    let aIndex = a.length-1, bIndex = b.length-1, hasCarryOver = false; 
    aIndex > -1 || bIndex > -1 || hasCarryOver === true;
    --aIndex, --bIndex
  ) {
    if (aIndex < 0 && bIndex < 0 && hasCarryOver === true) {
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


class InvalidStringError extends Error {}
/**
 * Adds an arbitrary amount of terms
 * @param {...number} terms 
 * @returns {string}
 */
function add(terms) {
  const args = Array.prototype.slice.call(arguments); // convert arguments to real array
  args.forEach(term => {
    if (/^\d*$/.test(term) === false) {
      throw new InvalidStringError('String contains non-digit characters');
    }
  });
  if (args.length == 0) {
    return '0';
  } else {
    return args.reduce((total, term) => twoTermsAdd(total, term), '0');
  }
}

module.exports = {
  add,
  twoTermsAdd,
  singleCharAdd,
  InvalidStringError
}