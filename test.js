//https://github.com/infusion/Fraction.js/

//just use algebra js
const Fraction = require('fraction.js');
var f = new Fraction('3');
console.log(f.toFraction());

let letter = /[a-z]/;
let value = "x";
let aString = "3+15x"



if(num%3 !== 0){

}



/*


*/






















////
//everything in the equations needs to be stored as a fraction
//LCM TEST//////////////
const isDivisible = function(justNumbers, toDivide){
  let answer;
  if(justNumbers%parseInt(toDivide)===0){
    answer = justNumbers/toDivide;
    answer = answer.toString();
  }
  else answer = justNumbers.toString() + '/' + toDivide;
  return answer;
}



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
