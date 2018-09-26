//first replace a with 1
//then find an equation with only one other letter and solve for that letter
//then if one of the other equations contains the letter/ replace it with the answer
const algebra = require('algebra.js');
const Fraction = algebra.Fraction;
const Expression = algebra.Expression;
const Equation = algebra.Equation;
const periodicTable = require('./periodicTable').periodicTable;
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
  // console.log('this is theLCM coming into final values');
  console.log(theLCM);
  //BUG this is not return numbers the way that it should
   let arr = [];
  for(let thing of map){
    let str = '';
    str += thing.value;
    if(str.length > 1){
      let strArr = str.split('/');
      let fract = new Fraction(parseInt(strArr[0]),parseInt(strArr[1]));
      // console.log('this is where the fraction gets created');
      // console.log(fract)
      arr.push(fract * theLCM);
    } else{
      // console.log('this is also where it could be breaking');
      // console.log(thing.value);
      arr.push(parseInt(thing.value) * parseInt(theLCM));
    }
  }
  return arr;
}

//this needs to change to return an Object
const lcmInput = function(mapArr){
  mapArr.sort(dynamicSort("letter"));
  // console.log('below is the map sorted by letter');
  // console.log(mapArr);
  let arr = [];
  for(let thing of mapArr){
    let str = '';
    str += thing.value;
    let strArr = str.split('/');
    if(strArr.length > 1){
      arr.push(parseInt(strArr[1]));
    } else{
      arr.push(parseInt(str));
    }
  }
  return arr
}

function dynamicSort(property) {
    let sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        if(sortOrder == -1){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }
    }
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
  // console.log('these are the values coming into setCoefficents');
  // console.log(values);
  for(let side in object){
    // console.log('below is the side: ');
    let molecules = object[side].molecules;
    // console.log('below should be the molecules '+ molecules );
    for(let molecule of molecules){
      // console.log('this should be the coeficent on its own: ' + molecule.coefficent);
      const answer = letterToIndex(values, molecule.coefficent);
      molecule.coefficent = answer;
      // console.log('this is what we want to make the new coefficent ' + answer);
      // console.log('this is the coefficent changed ' + molecule.coefficent);
    }
  }
  return object;
}


function letterToIndex(arr, letter){
   // console.log('this is the arr in the switch statement');
   // console.log(arr);
   // console.log('this is the letter coming in: ' + letter);
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

//{}
//put in weight

const finalSolve = function(thingy, weights){
  let next = stringToJSON(thingy, weights);
  // console.log('below is our equation object: ');
  // console.log(next);
  let putItIn = createEquations(next);
  // console.log('below is the map to put it ');
  // console.log(putItIn);
  let mapLCM = balance(putItIn);
  let arrLCM = lcmInput(mapLCM);
  let theLCM = findLCM(arrLCM);
  let theNewValues=finalValues(mapLCM, theLCM);
  // console.log('these are the new values');
  // console.log(theNewValues);
  let theNewEquation = setCoefficents(next, theNewValues);
  // console.log(theNewValues);
  // return theNewValues;
  // console.log('below is the equation we are returning  in final solve');
  // console.log(theNewEquation);
  return theNewEquation;
}

// const doStoich = function(equation, weight, periodicTable){
//   console.log('below is the equation coming into doStoich');
//   console.log(equation);
//   const molesOfLimitingReagant = getMoleAmountofFirst(equation, weight, periodicTable);
//   const final = getMoleAmount(equation, molesOfLimitingReagant, periodicTable);
//   console.log(final);
// }
//

// console.log('below is the equation coming in');
// console.log(equation);
// console.log('this is the totalcount coming into get mole amount  ' + totalCount);
//  console.log('this is the count coming into get mole amount  ' +  count);
 const getMoleAmount = function(equation, periodicTable, totalCount, count = 0){

   console.log('below is the equation coming in');
   console.log(equation);
   console.log('this is the totalcount coming into get mole amount  ' + totalCount);
    console.log('this is the count coming into get mole amount  ' +  count);
    let weightsArray = [];
  if(count === totalCount){
    console.log('this is the weights array');
    console.log(weightsArray);
    return equation;
  } else {
  let inMoles;
  let answer;
  let newEquation;
  let molesOfFirst;
  let flag = false;
  let coefficentOfFirst;
  let coefficentOfSecond;
  let howManyMolesOfSecond;
  let massOfSecond;
  for(let side in equation){
    for(let molecule of equation[side].molecules){
      if(molecule.weight !== null){
        flag = true;
        coefficentOfFirst = molecule.coefficent;
        let oneMole = findAtomicMass(periodicTable, molecule);
        molesOfFirst = weight.amount/oneMole;
      }
    }
    for(let molecule of equation[side].molecules){
      if(molecule.weight === null && flag === true){
        coefficentOfSecond = molecule.coefficent;
        let ratio = new Fraction(coefficentOfSecond, coefficentOfFirst);
        howManyMolesOfSecond = molesOfFirst * ratio;
        massOfSecond = findAtomicMass(periodicTable, molecule);
        answer = howManyMolesOfSecond *  massOfSecond;
        molecule.weight = answer;
        // newEquation = equation;
      }
      console.log('this is the answer ' + answer);
      console.log('this is the weight ' + molecule.weight);
      console.log('this is the count ' + count);
      weightsArray.push(molecule.weight);
    }
  }
  let newCount = count+1;
  return getMoleAmount(equation, periodicTable, totalCount, newCount);
   }
 } //this is the end

const getTotalCount = function(equation){
  let count = 0;
  for(let side in equation){
      for(let molecule of equation[side].molecules){
        count++;
      }
  }
  return count;
}
// let theWeight = {};
// theWeight.amount = 85;
// theWeight.moleCount = 1;
const solveStoich = function(equation, periodicTable, weights, counts){
  // console.log('below is the equation coming into solveStoich');
  // console.log(equation);
  let answers = [];
  const totalCount  = getTotalCount(equation);
  for(let weight in weights){
    // let first = getMoleAmountOfFirst(equation, weight, periodicTable);
    let rest = getMoleAmount(equation, periodicTable, counts);
    // console.log('below is the new equation with the weights assigned');
    // console.log(rest);
    answers.push(rest);
  }

  //get the answer with the smallest number of weight;
  return answers;
}


// const getMoleAmountOfFirst = (equation, weight, periodicTable)=>{
//   let inMoles;
//   for(let side in equation){
//     for(let molecule of equation[side].molecules){
//       if(molecule.weight !== null){
//         let oneMole = findAtomicMass(periodicTable, molecule);
//         inMoles = weight.amount/oneMole;
//       }
//     }
//   }
//   return inMoles;
// }

const findAtomicMass = function(periodicTable, molecule){
  //BUG the molecule coming in is just a zero
  // console.log('below is the molecule coming in');
  // console.log(molecule);
  const coefficent = molecule.coefficent;
  const atoms = molecule.atoms;
  // console.log('below are the atoms');
  // console.log(atoms);
  let total = 0;
  for(let atom of atoms){
    let answer = periodicTable[atom.name] * atom.subscript;
    total += answer;
  }
  return total;
}



let weight = {};
weight.amount = 85;
weight.moleCount = 1;
let theWeight = [];
theWeight.push(weight);
console.log(theWeight.moleCount);
// const toPrint = 'B5H9+O2=B2O3+H2O';
const toPrint = 'Fe2O3+Al=Al2O3+Fe';
const toStoich = finalSolve(toPrint, theWeight, periodicTable);
console.log('this is the call of toStocih');
console.log(toStoich);
const theCount = getTotalCount(toStoich);
console.log('this is the total count')
console.log(theCount);
const finalAnswerStoich = solveStoich(toStoich, periodicTable, theWeight, theCount);

console.log('this is our answer');
console.log(finalAnswerStoich);


//steps for stoichiometry
//1.find the atomic mass of one mole the molecule that we know the amount of
//we do this by adding up the atomic masses from the periodic table
//2. divide the amount of the substance we have by the number we just found to get the number of moles that we have
//3. multiply what we found by the coefficent of the molecule we don't have the amount of, this is how many moles we need
//4. find the atomic mass for one mole of the molecule we dont know the amount of
//5. multiply what we found in step 3 and four together


//WHAT WE NEED TO DO:
//get the limiting reagant
//then solve each one recursively



//https://chem.libretexts.org/Textbook_Maps/Inorganic_Chemistry/Supplemental_Modules_(Inorganic_Chemistry)/Chemical_Reactions/Limiting_Reagents
//To find the limiting reagent
//DETAIL you are given the weight of two reactants and you need to find the value of the limiting reagant
//find how many moles of each of the reactants you have
//calculate the mole ratio of the two reactants
//compare the molar ratio to the actual ratio
//the one where theres less is the limiting reagant
//use the ratio of the limiting reagant to fidn the value of the product
