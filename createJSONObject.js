var algebra = require('algebra.js');
var Fraction = algebra.Fraction;
var Expression = algebra.Expression;
var Equation = algebra.Equation;

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

 // let data = "1C6H12O6+6O2=6Co2+6H2O";
let thingy = 'B5H9+O2=B2O3+H2O';


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
      } else if(numRegex.test(rest[j])===true){
           let anAtom = rest[j];
           theMolecule.addAtom(anAtom, 1);
         } else {
           throw Error;
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



let putItIn = createEquations(next);
////////////////////////////////////
/////////////////////////////////

function balance(map){
 let coefficentObjects = createCoefficentObjects(map);
 let values = Object.values(map);
  console.log('these are the equations to begin with ' + values);
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

let print = balance(putItIn);
 console.log(print);
//////////////////////////////
////////////////////////////
//BUG solve is not solving correctly
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
  let leftSide = sides[0];
  let rightSide = sides[1];
  let sideToUse = '';
  let otherSide = '';
  if(leftSide.includes(letter)){
    sideToUse += leftSide;
    otherSide += rightSide;
  } else {
    sideToUse += rightSide;
    otherSide += leftSide;
  }

  let expression = new Expression(letter);
  sideToUse = sideToUse.replace(" ", "");
  for(let i = 0; i < sideToUse.length; i++){
    //in the case of -32x
    if(sideToUse[i]==='-' && numRegex.test(sideToUse[i+1])===true && numRegex.test(sideToUse[i+2])===true && lowerCaseRegex.test(sideToUse[i+3])===true){
      let strToCut = '';
      let numStr ='';
      let theStart = 1;
      numStr+= sideToUse[i+1];
      numStr+= sideToUse[i+2];
      strToCut+=sideToUse[i];
      strToCut+=sideToUse[i+1];
      strToCut+=sideToUse[i+2];
      strToCut+=sideToUse[i+3];
      let rest = sideToUse.replace(strToCut, '');
      while(theStart < parseInt(numStr)){
        expression.subtract(letter);
        theStart++;
      } //while end
      expression.add(rest);
    } //if end
       //in the case of +32x
    if(sideToUse[i]==='+' && numRegex.test(sideToUse[i+1])===true && numRegex.test(sideToUse[i+2])===true && lowerCaseRegex.test(sideToUse[i+3])===true){
      let strToCut = '';
      let numStr ='';
      let theStart = 1;
      numStr+= sideToUse[i+1];
      numStr+= sideToUse[i+2];
      strToCut+=sideToUse[i];
      strToCut+=sideToUse[i+1];
      strToCut+=sideToUse[i+2];
      strToCut+=sideToUse[i+3];
      let rest = sideToUse.replace(strToCut, '');
      while(theStart < parseInt(numStr)){
        expression.add(letter);
        theStart++;
      } //while end
      expression.add(rest);
    } //if end
        // in the case of -3x
    if(sideToUse[i]==='-' && numRegex.test(sideToUse[i+1])===true && lowerCaseRegex.test(sideToUse[i+2])===true){
          let strToCut = '';
          let numStr ='';
          let theStart = 1;
          numStr+=sideToUse[i+1];
          strToCut+=sideToUse[i];
          strToCut+=sideToUse[i+1];
          strToCut+=sideToUse[i+2];
          let rest = sideToUse.replace(strToCut, '');
          while(theStart < parseInt(numStr)){
            expression.subtract(letter);
            theStart++;
          } //while end
          expression.add(rest);
        }//if end

        //in the case of +3x
     if(sideToUse[i]==='+' && numRegex.test(sideToUse[i+1])===true && lowerCaseRegex.test(sideToUse[i+2])===true){
              let strToCut = '';
              let numStr ='';
              let theStart = 1;
              numStr+=sideToUse[i+1];
              strToCut+=sideToUse[i];
              strToCut+=sideToUse[i+1];
              strToCut+=sideToUse[i+2];
              let rest = sideToUse.replace(strToCut, '');

              while(theStart < parseInt(numStr)){
                expression.add(letter)
                theStart++;
              } //while end
              expression.add(rest);
            }//if end

      //in the case of 3x
      if(numRegex.test(sideToUse[i])===true && lowerCaseRegex.test(sideToUse[i+1])===true){
            let strToCut = '';
            let numStr ='';
            let theStart = 1;
            numStr+=sideToUse[i];
            strToCut+=sideToUse[i];
            strToCut+=sideToUse[i+1];
            let rest = sideToUse.replace(strToCut, '');
           while(theStart < parseInt(numStr)){
              expression.add(letter)
              theStart++;
            } //while end
           expression.add(rest);
          }//if end
  } //for end
 otherSide = eval(otherSide);
 console.log('this is otherSide ' + otherSide);
 let eq = new Equation(expression, otherSide);
 let answer = eq.solveFor(letter);
 let answerMap = {};
 answer = answer.toString();
 answerMap['value'] = answer.toString();
 answerMap['letter'] = letter;
 console.log(answerMap);
 return answerMap;

} //solve end

function solveNext(equationsToSolve){
    let lowerCaseRegex = /[a-z]/;
  for(let equation of equationsToSolve){
    for(let i=0; i < equation.length; i++){
      let letterCount = 0;
      if(lowerCaseRegex.test(equation[i])===true){
        letterCount++;
      }

    if(letterCount === 1){
      return equation;
      break;
     }
   } //for end
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
    let unique_array = [];
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i]);
        }
    }
    return unique_array;
}
