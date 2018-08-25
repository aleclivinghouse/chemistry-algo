
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

function solve(solveNext){
  let lowerCaseRegex = /[a-z]/;
  let capitalRegex = /[A-Z]/;
  let numRegex = /[0-9]/;
  let letter = "";

  //find the letter in the string
  for(let i = 0; i < solveNext.length; i++){
    if(lowerCaseRegex.test(solveNext[i])===true){
      letter += solveNext[i];
    }
  }
  sides = solveNext.split('=');
  ////////////////////////////////
  ////////////////////////////////
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
  console.log('this is the equation going in ' + sides);
  console.log('this is the side of the arr with the variable ' + sideWithVariable);
  justNumbers = eval(justNumbers);
  console.log('this is the side of the equals sign with just numbers ' + justNumbers);
  let arrToUse = sideWithVariable.split("+");
  console.log('this is the arr we use to solve ' + arrToUse);
  // console.log('this is the arr brfoken up by the = sign: ' + arrToUse);
  let toSubtract = 0;
  let withVariable = '';
  for(let item of arrToUse){
    if(!item.includes(letter)){
      toSubtract += parseInt(item);
    } else {
      withVariable+= item;
    }
  }
  justNumbers -= toSubtract;
  console.log('this is just the side with numbers after the subtraction ' + justNumbers);
  let toDivide = withVariable.substring(0, withVariable.length-1);
  let theAnswer = isDivisible(justNumbers, toDivide);
  let answerMap = {};
  answerMap['value'] = theAnswer;
  answerMap['letter'] = letter;
  return answerMap;
  ////////////////////////////////
  ////////////////////////////////

} //solve end
console.log(solve(thing));
