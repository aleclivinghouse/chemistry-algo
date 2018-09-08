//first replace a with 1
//then find an equation with only one other letter and solve for that letter
//then if one of the other equations contains the letter/ replace it with the answer
const algebra = require('algebra.js');
const Fraction = algebra.Fraction;
const Expression = algebra.Expression;
const Equation = algebra.Equation;
const Molecule = require('./classes').Molecule;
const ChemEquation= require('./classes').ChemEquation;
const aCoefficent = require('./classes').aCoefficent;
const Side = require('./classes').Side;
const stringToJSON = require('./stringToJSON').stringToJSON;
const createCoefficentObjects = require('./balanceHelpers').createCoefficentObjects;
const findFirstLetter = require('./balanceHelpers').findFirstLetter;
const setLetterToOne = require('./balanceHelpers').setLetterToOne;
const setLetterToValue = require('./balanceHelpers').setLetterToValue;
const setCoefficentObjectOne = require('./balanceHelpers').setCoefficentObjectOne;
const setCoefficentObjectValue = require('./balanceHelpers').setCoefficentObjectValue;
const removeDuplicates = require('./balanceHelpers').removeDuplicates;
const createEquations = require('./balanceHelpers').createEquations;

 ///////////////////////////////////////////////////////////////////////
 //////////////////////////////////////////////////////////////////////


const balance = function(map){
 let coefficentObjects = createCoefficentObjects(map);
 let values = Object.values(map);
 let firstLetter = findFirstLetter(map);
 let equationsToSolve = setLetterToOne(values, firstLetter);
 let newCoefficentObjects = setCoefficentObjectOne(coefficentObjects, firstLetter);
 let i = 0;
 let final = balanceRest(newCoefficentObjects, equationsToSolve, i);
 return final;
}//balance end

const balanceRest = function(theCoefficentObjects, theEquationsToSolve, i){
  if(i === theCoefficentObjects.length -1){
    return theCoefficentObjects;
  }
 // this SHOULD Return and equation
   equationToSolveNext = solveNext(theEquationsToSolve);
   let answer = solve(equationToSolveNext);
   let coefficentObjects2 = setCoefficentObjectValue(theCoefficentObjects, answer.letter, answer.value);
   let equationsToSolve2 = setLetterToValue(theEquationsToSolve, answer.letter, answer.value);
   return balanceRest(coefficentObjects2, equationsToSolve2, i+1);
} //balance rest end

const finalValues = function(map, theLCM){
   let arr = [];
  for(let thing of map){
    let str = '';
    str += thing.value;
    if(str.length > 1){
      let strArr = str.split('/');
      let fract = new Fraction(parseInt(strArr[0]),parseInt(strArr[1]));
      arr.push(fract * theLCM);
    } else{
      arr.push(parseInt(thing.value * theLCM));
    }
  }
  return arr;
}

const lcmInput = function(map){
  let arr = [];
  for(let thing of map){
    let str = '';
    str += thing.value;
    let strArr = str.split('/');
    if(strArr.length > 1){
      arr.push(parseInt(strArr[1]));
    }
  }
  return arr
}

//////////////////////////////
////////////////////////////
const solve = function(solveNext){
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
  let eq = algebra.parse(solveNext);
  let theAnswer = eq.solveFor(letter);
  let answerMap = {};
  answerMap['value'] = theAnswer.toString();
  answerMap['letter'] = letter;
  return answerMap;
} //solve end

const solveNext = function(equationsToSolve){
    let lowerCaseRegex = /[a-z]/;
  for(let equation of equationsToSolve){
    let letterCount = 0;
    for(let i=0; i < equation.length; i++){
      if(lowerCaseRegex.test(equation[i])===true){
        letterCount++;
      }
   } //for end
   if(letterCount === 1){
     return equation;
     break;
    }
  } //foreach end
};


const findLCM = function(A) {
    var n = A.length, a = Math.abs(A[0]);
    for (var i = 1; i < n; i++){
      var b = Math.abs(A[i]), c = a;
       while (a && b){ a > b ? a %= b : b %= a; }
       a = Math.abs(c*A[i])/(a+b);
     }
    return a;
}



const setCoefficents = function(object, values){
  console.log('this is the values array coming into the equation ' + values);
  for(let side in object){
    console.log('below is the side: ');
    let molecules = object[side].molecules;
    console.log('below should be the molecules '+ molecules );
    for(let molecule of molecules){
      console.log('this should be the coeficent on its own: ' + molecule.coefficent);
      const answer = letterToIndex(values, molecule.coefficent);
      molecule.coefficent = answer;
      console.log('this is what we want to make the new coefficent ' + answer);
      console.log('this is the coefficent changed ' + molecule.coefficent);
    }
  }


function letterToIndex(arr, letter){
   console.log('this is the arr in the switch statement');
   console.log(arr);
   console.log('this is the letter coming in: ' + letter);
   switch(letter){
    case 'a': return arr[0];
    case 'b': return arr[1];
    case 'c': return arr[2];
    case 'd': return arr[3];
    case 'e': return arr[4];
    case 'f': return arr[5];
    case 'g': return arr[6];
    case 'h': return arr[7];
    case 'i': return arr[8];
    }
  }
}

const finalSolve = function(thingy){
  let next = stringToJSON(thingy);
  console.log('below is our equation object: ');
  console.log(next);
  let putItIn = createEquations(next);
  console.log('below is the map to put it ');
  console.log(putItIn);
  let mapLCM = balance(putItIn);
  let arrLCM = lcmInput(mapLCM);
  let theLCM = findLCM(arrLCM);
  let theNewValues=finalValues(mapLCM, theLCM);
  let theNewEquation = setCoefficents(next, theNewValues);
  console.log(theNewEquation);
  return theNewValues;
}

const toPrint = 'B5H9+O2=B2O3+H2O';
console.log(finalSolve(toPrint));
