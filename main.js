
//first replace a with 1
//then find an equation with only one other letter and solve for that letter
//then if one of the other equations contains the letter/ replace it with the answer
const isDivisible = function(justNumbers, toDivide){
  let answer;
  if(justNumbers%parseInt(toDivide)===0){
    answer = justNumbers/toDivide;
    answer = answer.toString();
  }
  else answer = justNumbers.toString() + '/' + toDivide;
  return answer;
}

function Molecule(coefficent){
  this.coefficent = coefficent;
  this.atoms = [];
};

function Side(){
  this.molecules = [];
};

function ChemEquation(reactants, products){
  this.reactants = reactants;
  this.products = products;
};

Side.prototype.addMolecule = function(object){
  this.molecules.push(object);
};

Molecule.prototype.addAtom = function(name, subscript){
  this.atoms.push({
    name: name,
    subscript: subscript
  });
};

Molecule.prototype.contains = function(name){
  for(let i = 0; i < this.atoms.length; i++){
    if(this.atoms[i].name === name){
      return true;
      break;
    }
  }
  return false;
}

function aCoefficent(letter){
  this.letter = letter;
  this.value = 0;
  this.solved = false;
}

aCoefficent.prototype.solve = function(value){
  this.value = value;
  this.solved = true;
}
////////////////////////////////////////////////////
/////////////////////////////////////////////////////
  //
 let thingy = 'B5H9+O2=B2O3+H2O';
// let thingy = 'Li+H3PO4=H2+Li3PO4';


function stringToJSON(data){
let sides = data.split("=");
let leftMolecules = sides[0].split("+");
let rightMolecules = sides[1].split("+");
let coCount = 1;
function sideToJSON(side){
  let arr = [];
   let theSide = new Side();

   for(let molecule of side){
    let capitalRegex = /[A-Z]/;
    let lowerCaseRegex = /[a-z]/;
    let numRegex = /[0-9]/;
    let letter = num2Letter(coCount);
    let theMolecule = new Molecule(letter);
    coCount++;
    let rest = molecule;

    for(let j = 0; j<rest.length; j++){
      //if the char is a capital letter
      if(capitalRegex.test(rest[j]) === true){

        //Capital LowerCase Number Number
        if(lowerCaseRegex.test(rest[j+1]) === true && numRegex.test(rest[j+2]) === true && numRegex.test(rest[j+3]) === true){
          let atom = '';
          let subscript = '';
          atom += rest[j];
          atom += rest[j+1];
          subscript+=rest[j+2];
          subscript+=rest[j+3];
          theMolecule.addAtom(atom, parseInt(subscript));

          //Capital LowerCase Number
        } else if(lowerCaseRegex.test(rest[j+1])===true && numRegex.test(rest[j+2]) === true){
          let atom = '';
          let subscript = '';
          atom += rest[j];
          atom += rest[j+1];
          subscript+=rest[j+2];
          theMolecule.addAtom(atom, parseInt(subscript));

          //Capital Number Number
        } else if(numRegex.test(rest[j+1]) === true && numRegex.test(rest[j+2]) === true){
          let atom = '';
          let subscript = '';
          atom += rest[j];
          subscript += rest[j+1];
          subscript += rest[j+2];
          theMolecule.addAtom(atom, parseInt(subscript));

        //Capital LowerCase
      } else if(lowerCaseRegex.test(rest[j+1])===true){
            let atom = '';
            atom += rest[j];
            atom += rest[j+1];
            theMolecule.addAtom(atom, 1);

            //Capital Number
         } else if(numRegex.test(rest[j+1])===true){
           let atom = '';
           let subscript = '';
           atom+=rest[j];
           subscript+= rest[j+1];
           theMolecule.addAtom(atom, parseInt(subscript));

        //Just a Capital on Its Own
      } else {
           let anAtom = rest[j];
           theMolecule.addAtom(anAtom, 1);
         }
      }
    }
      theSide.addMolecule(theMolecule);
    } //for molecule of side end
    return theSide;
 } //sideToJSON end

 let reactants = sideToJSON(leftMolecules);
 let products = sideToJSON(rightMolecules);
 let equation = new ChemEquation(reactants, products);
 return equation;
}
let next = stringToJSON(thingy);
// console.log(next);

// switch statement

function num2Letter(c){
  switch(c){
    case 1: return 'a';
    case 2: return 'b';
    case 3: return 'c';
    case 4: return 'd';
    case 5: return 'e';
    case 6: return 'f';
    case 7: return 'g';
    case 8: return 'h';
    case 9: return 'i';
    case 10: return 'j';
    default: return 0;
  }
}
 ///////////////////////////////////
 ///////////////////////////////////


 function createEquations(equation){
   let reactants = equation.reactants;
   let products = equation.products;
   let map = {};
   for(let molecule of reactants.molecules){
     let coefficent = molecule.coefficent;
     for(let atom of molecule.atoms){
           if(atom.name.includes('undefined')=== true){
           atom.name = atom.name.substring(0, 1);
            }
       if(!map[atom.name]){
         map[atom.name] = atom.subscript.toString() + coefficent;
       } else {
         map[atom.name] += '+' + atom.subscript.toString() + coefficent;
       }
     }
   }

   let map2 = {};
   for(let molecule of products.molecules){
   let coefficent = molecule.coefficent;
   for(let atom of molecule.atoms){
         if(atom.name.includes('undefined')=== true){
         atom.name = atom.name.substring(0, 1);
          }
     if(!map2[atom.name]){
       map2[atom.name] = atom.subscript.toString() + coefficent;
     } else {
       map2[atom.name] += '+' + atom.subscript.toString() + coefficent;
     }
   }
 }
 for(let value in map){
   map[value]+= '='+ map2[value];
 }
   return map;
   console.log('this is the map for the equation ' + map);
 }

function createMap(){

}

let putItIn = createEquations(next);
////////////////////////////////////
/////////////////////////////////

function balance(map){
 let coefficentObjects = createCoefficentObjects(map);
 let values = Object.values(map);
 let firstLetter = findFirstLetter(map);
 let equationsToSolve = setLetterToOne(values, firstLetter);
 let newCoefficentObjects = setCoefficentObjectOne(coefficentObjects, firstLetter);
 let i = 0;
 let final = balanceRest(newCoefficentObjects, equationsToSolve, i);
 return final;
}//balance end

function balanceRest(theCoefficentObjects, theEquationsToSolve, i){
  if(i === theCoefficentObjects.length -1){
    return theCoefficentObjects;
  }
 //this SHOULD Return and equation
   equationToSolveNext = solveNext(theEquationsToSolve);
   let answer = solve(equationToSolveNext);
   let coefficentObjects2 = setCoefficentObjectValue(theCoefficentObjects, answer.letter, answer.value);
   let equationsToSolve2 = setLetterToValue(theEquationsToSolve, answer.letter, answer.value);
   return balanceRest(coefficentObjects2, equationsToSolve2, i+1);
} //balance rest end

let mapLCM = balance(putItIn);
let arrLCM = lcmInput(mapLCM);
let print = numsLCM(arrLCM);
console.log(print);


function lcmInput(map){
  let arr = [];
  for(let thing of map){
    console.log(thing);
    arr.push(thing.value);
  }
  return arr
}

function numsLCM(arr){
  let newArr = [];
  for(let i =0; i < arr.length; i++){
    arr[i] = arr[i].toString();
    if(arr[i].indexOf('/')){
       newArr.push(parseInt(arr[i].split('/')[1]));
    }
  }
  let theArr = removeDuplicates(newArr);
  return theArr;
}


//////////////////////////////
////////////////////////////
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
  console.log('this is the equation to solve ' + solveNext);
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
  console.log('this is just numbers before it is evaluated ' + justNumbers);
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
  console.log('this is with variable in solve: ' + withVariable);
  let theAnswer = isDivisible(justNumbers, toDivide);
  let answerMap = {};
  answerMap['value'] = theAnswer;
  answerMap['letter'] = letter;
  return answerMap;
} //solve end

function solveNext(equationsToSolve){
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
}


function setCoefficentObjectOne(coefficentObjects, letter){
  for(let object of coefficentObjects){
    if(object.letter === letter){
      object.value = 1;
      object.solved = true;
    }
  }
  return coefficentObjects;
}
function setCoefficentObjectValue(coefficentObjects, letter, value){
  for(let object of coefficentObjects){
    if(object.letter === letter){
      object.value = value;
      object.solved = true;
    }
  }
  return coefficentObjects;
}


function findFirstLetter(theMap){

  let lowerCaseRegex = /[a-z]/;
  let found = false;
  let letters = [];
  let equations = Object.values(theMap);
      while(found === false){
      for(let equation of equations){
         for(let i=0; i < equation.length; i++){
           if(lowerCaseRegex.test(equation[i])===true){
              letters.push(equation[i]);
           }
         }
         if(letters.length < 3){
           theLetter = letters[0];
           found = true;
         }
         return theLetter;
      } //foreach end
    } //while end
}


function setLetterToValue(equations, letter, value){
  let lowerCaseRegex = /[a-z]/;
  let numRegex = /[0-9]/;
  let newEquations = [];
  for(equation of equations){
    for(let i = 0; i < equation.length; i++){
      if(numRegex.test(equation[i])===true && equation[i+1]===letter && numRegex.test(equation[i+2])===true){
          equation = equation.replace(letter, '*'+value+'*');
         newEquations.push(equation);
      } else if(numRegex.test(equation[i])===true && equation[i+1]===letter && numRegex.test(equation[i+2])===false){
          equation = equation.replace(letter, '*' + value);
      } else if(numRegex.test(equation[i])===false && equation[i+1]===letter && numRegex.test(equation[i+2])===true){
        equation = equation.replace(letter, value+'*');
      } else {
        equation.replace(letter, value);
      }
    }
    newEquations.push(equation)

  }
   return removeDuplicates(newEquations);
}

function setLetterToOne(equations, letter){
  let lowerCaseRegex = /[a-z]/;
  let numRegex = /[0-9]/;
  let newEquations = [];
  for(equation of equations){

    for(let i = 0; i < equation.length; i++){
      if(numRegex.test(equation[i])===true && equation[i+1]===letter && numRegex.test(equation[i+2])===true){
          equation = equation.replace(letter, '*1*');
         newEquations.push(equation);
      } else if(numRegex.test(equation[i])===true && equation[i+1]===letter && numRegex.test(equation[i+2])===false){
          equation = equation.replace(letter, '*1');
      } else if(numRegex.test(equation[i])===false && equation[i+1]===letter && numRegex.test(equation[i+2])===true){
        equation = equation.replace(letter, '1*');
      } else {
        equation.replace(letter, '1');
      }
    }
    newEquations.push(equation);

  }

   return removeDuplicates(newEquations);
}

function createCoefficentObjects(theMap){
  let lowerCaseRegex = /[a-z]/;
  let equations = Object.values(theMap);
  let str = '';
  let theCoefficents = [];
  for(let equation of equations){
    for(let i = 0; i < equation.length; i++){
      if(lowerCaseRegex.test(equation[i])===true && str.includes(equation[i])===false){
        let coefficent = new aCoefficent(equation[i]);
        theCoefficents.push(coefficent);
        str+=equation[i];
      }
    }
  } //for end
  return theCoefficents;
}


function removeDuplicates(arr){
    let unique = [...new Set(arr)];
    return unique;
}
