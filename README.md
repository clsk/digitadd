# Problem description: Base 10 Math with Strings

## Goal
Create a function(s) to implement the following signatures. The implementation must adhere to only string inputs and string outputs. In addition, all math operations must be no larger than one digit (Base10) + one digit (Base10). Thus the largest sum possible internally must be < 20.

## Signatures
add(a, b) -> (sum)
add(a, b, c, ...) -> sum

## Expectations
Implement a testing strategy to verify your work.

## Examples
add('1', '3') -> '4'
add('2', '8') -> '10'
add('12', '9') -> '21'
add('19999', '22') -> '20021'

## Extra Credit
How might you handle negative numbers? Consider ways you might implement this part of our Base 10 Math with Strings. This extra credit is primarily a thought exercise, no code need be implemented.


# Solution

## Approach

There are two ways to approach this.
```        Sum by column Only      Sum by row, then column
 1345       1|3|4|5|                  1|3|4|5|
  832         8|3|2|           OR   +   8|3|2| 
  437         4|3|7|                  --------
-----       --------              R|E|S|U|L|T|
                                    +  |4|3|7|
                                      --------
```

Approaching the problem using the sum by row, then column appears easier from an algorithmic perspective.
The reason being that, in that case carry-over, will every only be 1. Since the largest numbers (9+9) = 18. Store digit = 8, carry-over digit = 1.
So, going to approach it that way to begin with.

## Runing

The solution is written in JavaScript and should be running using NodeJS.
To run all tests, install NodeJS in your OS of choice. Then, simply run using: `node solution.js`