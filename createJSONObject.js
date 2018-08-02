
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
    let arr = [];
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
console.log(next);

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

let print = createEquations(next);
console.log(print);
