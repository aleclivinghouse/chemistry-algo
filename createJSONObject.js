
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
let data = '2FeCl3+MgO=Fe2O3+MgCl2'
let sides = data.split("=");
let leftMolecules = sides[0].split("+");
let rightMolecules = sides[1].split("+");

function sideToJSON(side){
  let arr = [];
   let theSide = new Side();
   for(molecule of side){
    let arr = [];
    let capitalRegex = /[A-Z]/;
    let lowerCaseRegex = /[a-z]/;
    let numRegex = /[0-9]/;
    let co = parseInt(molecule[0]);
    if(numRegex.test(co)===false){
      co = 1;
    }
    let theMolecule = new Molecule(co);


    let rest = molecule.substr(1);

    for(let j = 0; j<rest.length-1; j++){
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
           let atom = '';
           atom += rest[j];
           theMolecule.addAtom(atom, 1);
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

 ///////////////////////////////////
 ///////////////////////////////////

 function balance(equation){
   let reactants = buildMap(equation.reactants);
   let products = buildMap(equation.products);

   //if the maps are not equal on both sides
   for(let item in reactants){
     if(reactants[item] < products[item]){
       let theAtom = item;
       let reactants = equation.reactants;
       for(let molecule of reactants.molecules){
         if(molecule.contains(theAtom)){
             molecule.coefficent+=1;
           }
           console.log(equation);
           return balance(equation);
         }
       } //if end

    if(reactants[item] > products[item]){
          let theAtom = item;
          let products = equation.products;
          for(let molecule of products.molecules){
            if(molecule.contains(theAtom)){
                molecule.coefficent+=1;
                return balance(equation);
              }
            }
          } //if end
      }
       return equation;
    } //balance end
//////////////////////////////
/////////////////////////////


function buildMap(side){
    let map = {};
    for(let molecule of side.molecules){
        let coefficent = molecule.coefficent;
        for(let atom of molecule.atoms){
          if(!map[atom.name]){
           map[atom.name] = atom.subscript * coefficent;
         } else {
           map[atom.name] += atom.subscript * coefficent;
         }
        }
    }
     return map;
} //buildMap end


balance(equation);
