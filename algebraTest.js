
var algebra = require('algebra.js');
var Fraction = algebra.Fraction;
var Expression = algebra.Expression;
var Equation = algebra.Equation;

let theNum = ("x");
var expr = new Expression("2-3");
expr = expr.subtract(3);
expr = expr.add("x");

let eq = new Equation(expr, 2 * 3);
console.log(eq.toString());

let x = eq.solveFor(letter);
console.log(x.toString());

//we are going to need to find the lcd and then multiply all the numbers by the lcd
