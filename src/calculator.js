#!/usr/bin/env node

/**
 * Supported operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 */

function addition(a, b) {
  return a + b;
}

function subtraction(a, b) {
  return a - b;
}

function multiplication(a, b) {
  return a * b;
}

function division(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed.");
  }

  return a / b;
}

function printUsage() {
  console.log(
    "Usage: node src/calculator.js <operation> <first-number> <second-number>\n" +
      "Supported operations: addition (+), subtraction (-), multiplication (*, x), division (/)"
  );
}

function parseNumber(value, name) {
  const parsedValue = Number(value);

  if (Number.isNaN(parsedValue)) {
    throw new Error(`Invalid ${name}: ${value}`);
  }

  return parsedValue;
}

function runCli(args) {
  if (args.length !== 3) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  const [operation, firstArg, secondArg] = args;
  const firstNumber = parseNumber(firstArg, "first number");
  const secondNumber = parseNumber(secondArg, "second number");

  const operations = {
    addition,
    add: addition,
    "+": addition,
    subtraction,
    subtract: subtraction,
    "-": subtraction,
    multiplication,
    multiply: multiplication,
    "*": multiplication,
    x: multiplication,
    division,
    divide: division,
    "/": division,
  };

  const calculate = operations[operation.toLowerCase()];

  if (!calculate) {
    throw new Error(`Unsupported operation: ${operation}`);
  }

  const result = calculate(firstNumber, secondNumber);
  console.log(`Result: ${result}`);
}

if (require.main === module) {
  try {
    runCli(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  runCli,
};
