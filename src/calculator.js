/**
 * Basic calculator operations:
 * - Addition (+)
 * - Subtraction (-)
 * - Multiplication (*)
 * - Division (/)
 */

function validateNumber(value, name) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new TypeError(`${name} must be a finite number`);
  }
}

function add(a, b) {
  validateNumber(a, "a");
  validateNumber(b, "b");
  return a + b;
}

function subtract(a, b) {
  validateNumber(a, "a");
  validateNumber(b, "b");
  return a - b;
}

function multiply(a, b) {
  validateNumber(a, "a");
  validateNumber(b, "b");
  return a * b;
}

function divide(a, b) {
  validateNumber(a, "a");
  validateNumber(b, "b");
  if (b === 0) {
    throw new RangeError("Cannot divide by zero");
  }
  return a / b;
}

function calculate(operation, a, b) {
  const operations = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide
  };

  const fn = operations[operation];
  if (!fn) {
    throw new Error(`Unsupported operation: ${operation}`);
  }

  return fn(a, b);
}

function runCli(args) {
  if (args.length !== 3) {
    throw new Error("Usage: node src/calculator.js <number> <+|-|*|/> <number>");
  }

  const a = Number(args[0]);
  const b = Number(args[2]);

  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new TypeError("Operands must be valid finite numbers");
  }

  return calculate(args[1], a, b);
}

if (require.main === module) {
  try {
    console.log(runCli(process.argv.slice(2)));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { add, subtract, multiply, divide, calculate, runCli };
