//https://github.com/infusion/Fraction.js/

//just use algebra js
var algebra = require('algebra.js');
var Fraction = algebra.Fraction;
var Expression = algebra.Expression;
var Equation = algebra.Equation;

const solveSideWithVar = function(side, letter){
  let arr = side.split('+');
  let expr = new Expression(letter);

  for(let item of arr){
    if(item.includes(letter)){
      console.log('this should be the item with the letter ' + item);
      let num = item.substring(0, item.length-1);
      console.log('this should be the num:  ' + num);
      if(num.includes('/')){
        let fractArr = num.split('/');
        num = new Fraction(parseInt(arr[0]), parseInt(arr[1]));
        expr = expr.multiply(num);
      } else{
        console.log('this is what it wont use: ' + num);
        expr = expr.multiply(num);
      }
    }
  } //first for end
 for(let item of arr){
   if(!item.includes(letter)){
     expr = expr.add(parseInt(item));
   }
 }
 console.log('this is the expression as a string: ' + expr.toString());
 return expr.toString();
}
console.log(solveSideWithVar("3x+5", "x"));


const solveSideWithoutVar = function(side){
 let arr;
 if(side.includes('/')){
   arr = side.split;
   let fract = new Fraction(parseInt(arr[0]), parseInt(arr[1]));
    console.log('this should be the fraction: ' + fract);
   return fract;
 } else {
   num = parseInt(side);
    console.log('this should be the number: ' + num);
   return num;
  }
}


function solve(solveNext){
  let lowerCaseRegex = /[a-z]/;
  let capitalRegex = /[A-Z]/;
  let numRegex = /[0-9]/;
  let letter = "";
  for(let i = 0; i < solveNext.length; i++){
    if(lowerCaseRegex.test(solveNext[i])===true){
      letter += solveNext[i];
    }
  }
  sides = solveNext.split('=');

  let leftSide = sides[0];
  let rightSide = sides[1];
  let sideWithVariable = '';
  let justNumbers = '';
  let flag = false;
  if(leftSide.includes(letter)){
    sideWithVariable += leftSide;
    justNumbers = rightSide;
  } else {
    sideWithVariable += rightSide;
    justNumbers = leftSide;
  }

  let solvedVarSide = solveSideWithVar(sideWithVariable, letter);
  let solvedWithoutVarSide = solveSideWithoutVar(justNumbers);

  var eq = new Equation(solvedVarSide, solvedWithoutVarSide);

  return eq.toString();
}


// console.log(solve("3x+5=15"));



////

//everything in the equations needs to be stored as a fraction
//LCM TEST/////////////

function findLCM(A) {
    var n = A.length, a = Math.abs(A[0]);
    for (var i = 1; i < n; i++){
      var b = Math.abs(A[i]), c = a;
       while (a && b){ a > b ? a %= b : b %= a; }
       a = Math.abs(c*A[i])/(a+b);
     }
    return a;
}

let thing = '10=2z+5';
