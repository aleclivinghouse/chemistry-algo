
//LCM TEST//////////////

function findLCM(A) {
    var n = A.length, a = Math.abs(A[0]);
    for (var i = 1; i < n; i++){
      var b = Math.abs(A[i]), c = a;
       while (a && b){ a > b ? a %= b : b %= a; }
       a = Math.abs(c*A[i])/(a+b);
     }
    return a;
}


let thing = [1, 2, 3];
// console.log(findLCM(thing));



let toPrint = 5/2 * 2;
console.log(toPrint);


//lcm / denominator is toMultiply
// toMultiply 2 numberator
