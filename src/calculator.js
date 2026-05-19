#!/usr/bin/env node

/**
 * Supported operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 * - modulo
 * - power
 * - square root
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

function modulo(a, b) {
  if (b === 0) {
    throw new Error("Modulo by zero is not allowed.");
  }

  return a % b;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error("Square root of a negative number is not allowed.");
  }

  return Math.sqrt(n);
}

function printUsage() {
  console.log(
    "Usage: node src/calculator.js <operation> <first-number> [second-number]\n" +
      "Supported operations: addition (+), subtraction (-), multiplication (*, x), division (/), modulo (%), power (^), square root (sqrt)"
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
  if (args.length < 2 || args.length > 3) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  const [operation, firstArg, secondArg] = args;

  const operations = {
    addition: { calculate: addition, arity: 2 },
    add: { calculate: addition, arity: 2 },
    "+": { calculate: addition, arity: 2 },
    subtraction: { calculate: subtraction, arity: 2 },
    subtract: { calculate: subtraction, arity: 2 },
    "-": { calculate: subtraction, arity: 2 },
    multiplication: { calculate: multiplication, arity: 2 },
    multiply: { calculate: multiplication, arity: 2 },
    "*": { calculate: multiplication, arity: 2 },
    x: { calculate: multiplication, arity: 2 },
    division: { calculate: division, arity: 2 },
    divide: { calculate: division, arity: 2 },
    "/": { calculate: division, arity: 2 },
    modulo: { calculate: modulo, arity: 2 },
    mod: { calculate: modulo, arity: 2 },
    "%": { calculate: modulo, arity: 2 },
    power: { calculate: power, arity: 2 },
    exponentiation: { calculate: power, arity: 2 },
    "^": { calculate: power, arity: 2 },
    squareroot: { calculate: squareRoot, arity: 1 },
    "square-root": { calculate: squareRoot, arity: 1 },
    sqrt: { calculate: squareRoot, arity: 1 },
  };

  const operationDetails = operations[operation.toLowerCase()];

  if (!operationDetails) {
    throw new Error(`Unsupported operation: ${operation}`);
  }

  if (args.length !== operationDetails.arity + 1) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  const firstNumber = parseNumber(firstArg, "first number");
  const result =
    operationDetails.arity === 1
      ? operationDetails.calculate(firstNumber)
      : operationDetails.calculate(
          firstNumber,
          parseNumber(secondArg, "second number")
        );

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
  modulo,
  power,
  squareRoot,
  runCli,
};
