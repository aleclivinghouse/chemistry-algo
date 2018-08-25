module.exports = function stringToJSON(data){
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
