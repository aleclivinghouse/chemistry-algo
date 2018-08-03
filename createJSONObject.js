
function Molecule(coefficent){
  this.coefficent = coefficent;
  this.atoms = [];
};

function Side(){
  this.molecules = [];
};

function Equation(reactants, products){
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
let thingy = '2FeCl3+MgO=Fe2O3+MgCl2';


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
 let equation = new Equation(reactants, products);
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
 }



let putItIn = createEquations(next);

function balance(map){
 let values = Object.values(map);
 let firstLetter = findFirstLetter(map);
 let equationsToSolve = setLetterToOne(values, firstLetter);
 return equationsToSolve;
}

let print = balance(putItIn);
console.log(print);



function findFirstLetter(theMap){
  let lowerCaseRegex = /[a-z]/;
  let found = false;
  let equations = Object.values(theMap);
      while(found === false){
      for(let equation of equations){
         for(let i=0; i < equation.length; i++){
           if(lowerCaseRegex.test(equation[i])===true){
              letter = equation[i];
           }
         }
         if(letter.length < 3){
           theLetter = letter;
           found = true;
         }
         return theLetter;
      } //foreach end
    } //while end
}

function setLetterToOne(equations, letter){
  let newEquations = [];
  for(equation of equations){
    for(let i = 0; i < equation.length; i++){
      if(equation[i]===letter){
        equation = equation.replace(letter, '(1)');
         newEquations.push(equation);
      }
    }
    newEquations.push(equation)
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
    let unique_array = []
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }
    }
    return unique_array
}
