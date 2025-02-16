// Destructuring in ES6 specifies a “pattern” to decompose the object or array value 
  // from the function into separate variable assignments

function foo() {
  return [1, 2, 3];
}
function bar() {
  return {x: 4, y: 5, z: 6};
}

// much simpler With ES6

// arrays
var [a, b, c] = foo(); //?
a;
b;
c;


// objects
// long syntax: if you want to define new variables
let { x: bam, y: baz, z: bap  } = bar(); //?
bam; 
baz; 
bap; 
// no x, y, z here yet!
x;
y;
z;

// short syntax: if property names are being matched (becomes the same as array syntax). We leave out the x: part
var {x, y, z} = bar();
x;
y;
z;


// You can also spread an object into another object. 
// A common use case is to simply add a property to an object without mutating the original
const point2D = {x: 1, y: 2};
/** Create a new object by using all the point2D props along with z */
const point3D = {...point2D, z: 3};