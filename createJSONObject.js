let data = "1C6H12O6+6O2=6Co2+6H2O";

function Molecule(coefficent){
  this.coefficent = coefficent;
  this.atoms = [];
};

function Side(){
  this.molecules = [];
};

function Equation(side1, side2){
  this.side1 = side1;
  this.side2 = side2;
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


let sides = data.split("=");
let leftMolecules = sides[0].split("+");
let rightMolecules = sides[1].split("+");

function sideToJSON(side){
  let arr = [];
   let theSide = new Side();
   for(molecule of side){
    let arr = [];
    let co = parseInt(molecule[0]);
    let rest = molecule.substr(1);
    let subscripts = rest.match(/\d+/g);
    let names = [];
    for(let j = 0; j<rest.length; j++){
      let newStr = '';
      //if it is a capital
      if(rest[j].match(/^[A-Z]*$/)){
        newStr+=rest[j];
        if(rest[j+1].match(/^[A-Z]*$/)){
        newStr+=rest[j+1];
      }
        names.push(newStr);
      }
    }

    let theMolecule = new Molecule(co);
      for(let i = 0; i < names.length; i++){
        theMolecule.addAtom(names[i], subscripts[i]);
      }
      theSide.addMolecule(theMolecule);
    } //for molecule of side end
    return theSide;
 } //sideToJSON end
 let reactants = sideToJSON(leftMolecules);
 let products = sideToJSON(rightMolecules);
 console.log(products);
 let equation = new Equation(reactants, products);
 console.log(equation);
