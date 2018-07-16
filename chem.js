let data = "1C6H12O6+6O2=6CO2+6H2O";
function Molecule(coefficent){
  this.coefficent = coefficent;
  this.atoms = [];
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
console.log(leftMolecules);
