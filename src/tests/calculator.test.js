const {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  calculate,
  runCli
} = require("../calculator");

describe("basic calculator operations", () => {
  test("adds 2 and 3 to equal 5", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("subtracts 4 from 10 to equal 6", () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test("multiplies 45 and 2 to equal 90", () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test("divides 20 by 5 to equal 4", () => {
    expect(divide(20, 5)).toBe(4);
  });

  test("supports negative numbers", () => {
    expect(add(-5, 2)).toBe(-3);
    expect(subtract(-5, -2)).toBe(-3);
    expect(multiply(-5, 2)).toBe(-10);
    expect(divide(-10, 2)).toBe(-5);
  });

  test("supports decimal numbers", () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3);
    expect(subtract(1.5, 0.5)).toBe(1);
    expect(multiply(2.5, 2)).toBe(5);
    expect(divide(7.5, 2.5)).toBe(3);
  });

  test("supports identity and zero cases", () => {
    expect(add(0, 7)).toBe(7);
    expect(subtract(7, 0)).toBe(7);
    expect(multiply(0, 7)).toBe(0);
    expect(divide(0, 7)).toBe(0);
  });
});

describe("division edge cases", () => {
  test("throws for division by zero", () => {
    expect(() => divide(20, 0)).toThrow("Cannot divide by zero");
  });

  describe("extended calculator operations", () => {
    test("calculates the remainder for 5 modulo 2", () => {
      expect(modulo(5, 2)).toBe(1);
    });

    test("calculates negative and decimal modulo values", () => {
      expect(modulo(-5, 2)).toBe(-1);
      expect(modulo(5.5, 2)).toBe(1.5);
    });

    test("raises 2 to the power 3", () => {
      expect(power(2, 3)).toBe(8);
    });

    test("supports powers with zero and negative exponents", () => {
      expect(power(7, 0)).toBe(1);
      expect(power(2, -2)).toBe(0.25);
    });

    test("calculates the square root of 16", () => {
      expect(squareRoot(16)).toBe(4);
    });

    test("supports decimal and zero square roots", () => {
      expect(squareRoot(2.25)).toBe(1.5);
      expect(squareRoot(0)).toBe(0);
    });
  });

  describe("extended operation edge cases", () => {
    test("throws for modulo by zero", () => {
      expect(() => modulo(5, 0)).toThrow("Cannot calculate modulo with zero");
    });

    test("throws for square root of a negative number", () => {
      expect(() => squareRoot(-16)).toThrow(
        "Cannot calculate the square root of a negative number"
      );
    });

    test("rejects invalid extended operation operands", () => {
      expect(() => modulo("5", 2)).toThrow(TypeError);
      expect(() => power(2, Infinity)).toThrow(TypeError);
      expect(() => squareRoot(NaN)).toThrow(TypeError);
    });
  });

  test("throws for negative zero divisor", () => {
    expect(() => divide(20, -0)).toThrow("Cannot divide by zero");
  });
});

describe("input validation", () => {
  test.each([
    ["addition", () => add("2", 3)],
    ["subtraction", () => subtract(Infinity, 3)],
    ["multiplication", () => multiply(3, NaN)],
    ["division", () => divide(null, 3)]
  ])("rejects invalid operands for %s", (_name, operation) => {
    expect(operation).toThrow(TypeError);
  });
});

describe("calculate dispatch", () => {
  test.each([
    ["+", 2, 3, 5],
    ["-", 10, 4, 6],
    ["*", 45, 2, 90],
    ["/", 20, 5, 4],
    ["%", 5, 2, 1],
    ["^", 2, 3, 8],
    ["sqrt", 16, undefined, 4]
  ])("calculates %s", (operation, a, b, expected) => {
    expect(calculate(operation, a, b)).toBe(expected);
  });

  test("rejects unsupported operations", () => {
    expect(() => calculate("&", 10, 2)).toThrow("Unsupported operation");
  });
});

describe("CLI runner", () => {
  test("runs the image example operations", () => {
    expect(runCli(["2", "+", "3"])).toBe(5);
    expect(runCli(["10", "-", "4"])).toBe(6);
    expect(runCli(["45", "*", "2"])).toBe(90);
    expect(runCli(["20", "/", "5"])).toBe(4);
    expect(runCli(["5", "%", "2"])).toBe(1);
    expect(runCli(["2", "^", "3"])).toBe(8);
    expect(runCli(["sqrt", "16"])).toBe(4);
  });

  test("rejects invalid CLI arguments", () => {
    expect(() => runCli(["2", "+"])).toThrow("Usage:");
    expect(() => runCli(["abc", "+", "2"])).toThrow(TypeError);
  });
});
