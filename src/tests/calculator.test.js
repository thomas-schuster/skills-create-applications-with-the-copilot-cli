const {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
  runCli,
} = require("../calculator");

describe("calculator operations", () => {
  test("addition returns the sum for the image example", () => {
    expect(addition(2, 3)).toBe(5);
  });

  test("addition handles negative values", () => {
    expect(addition(-4, 9)).toBe(5);
  });

  test("subtraction returns the difference for the image example", () => {
    expect(subtraction(10, 4)).toBe(6);
  });

  test("subtraction handles negative results", () => {
    expect(subtraction(3, 8)).toBe(-5);
  });

  test("multiplication returns the product for the image example", () => {
    expect(multiplication(45, 2)).toBe(90);
  });

  test("multiplication handles zero", () => {
    expect(multiplication(99, 0)).toBe(0);
  });

  test("division returns the quotient for the image example", () => {
    expect(division(20, 5)).toBe(4);
  });

  test("division supports decimal results", () => {
    expect(division(7, 2)).toBe(3.5);
  });

  test("division throws for division by zero", () => {
    expect(() => division(10, 0)).toThrow("Division by zero is not allowed.");
  });

  test("modulo returns the remainder", () => {
    expect(modulo(10, 3)).toBe(1);
  });

  test("modulo throws for division by zero", () => {
    expect(() => modulo(10, 0)).toThrow("Modulo by zero is not allowed.");
  });

  test("power returns the base raised to the exponent", () => {
    expect(power(2, 5)).toBe(32);
  });

  test("power supports negative exponents", () => {
    expect(power(4, -1)).toBe(0.25);
  });

  test("square root returns the square root for a positive number", () => {
    expect(squareRoot(81)).toBe(9);
  });

  test("square root throws for negative numbers", () => {
    expect(() => squareRoot(-9)).toThrow(
      "Square root of a negative number is not allowed."
    );
  });
});

describe("calculator CLI", () => {
  let logSpy;
  let originalExitCode;

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    originalExitCode = process.exitCode;
    process.exitCode = undefined;
  });

  afterEach(() => {
    logSpy.mockRestore();
    process.exitCode = originalExitCode;
  });

  test("runCli prints the result for a supported operation", () => {
    runCli(["addition", "2", "3"]);

    expect(logSpy).toHaveBeenCalledWith("Result: 5");
    expect(process.exitCode).toBeUndefined();
  });

  test("runCli accepts symbol aliases", () => {
    runCli(["*", "6", "7"]);

    expect(logSpy).toHaveBeenCalledWith("Result: 42");
  });

  test("runCli supports modulo aliases", () => {
    runCli(["%", "10", "3"]);

    expect(logSpy).toHaveBeenCalledWith("Result: 1");
  });

  test("runCli supports square root with a single number", () => {
    runCli(["sqrt", "81"]);

    expect(logSpy).toHaveBeenCalledWith("Result: 9");
    expect(process.exitCode).toBeUndefined();
  });

  test("runCli prints usage and sets a non-zero exit code for missing arguments", () => {
    runCli(["addition", "2"]);

    expect(logSpy).toHaveBeenCalledWith(
      "Usage: node src/calculator.js <operation> <first-number> [second-number]\nSupported operations: addition (+), subtraction (-), multiplication (*, x), division (/), modulo (%), power (^), square root (sqrt)"
    );
    expect(process.exitCode).toBe(1);
  });

  test("runCli throws for unsupported operations", () => {
    expect(() => runCli(["cube", "10", "3"])).toThrow(
      "Unsupported operation: cube"
    );
  });

  test("runCli throws for invalid numeric input", () => {
    expect(() => runCli(["addition", "two", "3"])).toThrow(
      "Invalid first number: two"
    );
  });

  test("runCli prints usage for square root with too many arguments", () => {
    runCli(["sqrt", "81", "9"]);

    expect(logSpy).toHaveBeenCalledWith(
      "Usage: node src/calculator.js <operation> <first-number> [second-number]\nSupported operations: addition (+), subtraction (-), multiplication (*, x), division (/), modulo (%), power (^), square root (sqrt)"
    );
    expect(process.exitCode).toBe(1);
  });
});
