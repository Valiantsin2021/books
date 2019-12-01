// parsing numeric strings

// a number can be parsed out of a string's character contents with parseInt or Number
// parseInt is more tolerant than Number, it strips out non-numeric characters

// Parse a string as a number when you don’t know/care what other non-numeric characters there may be on the right-hand side. 
// Coerce a string (to a number) when the only acceptable values are numeric and something like "42px" should be rejected as a number.

var a = '42';
var b = '42px';
Number(a); //?
Number(b); //?
parseInt(a); //?
parseInt(b); //?
parseFloat(b); //?

// BE CAREFUL TO USE parseInt() correctly, only pass a string to it
// parseInt converts the value to a string first. So if you pass in something irregular (a non-string value), you get irregular results
// '0' from '0.000008)
parseInt( 0.000008 ); //?
// '8' from 8e-7
parseInt( 0.0000008 ); //? 
// 'fa' from 'false'
parseInt( false, 16 ); //?
// 'f' from 'function'
parseInt( parseInt, 16 ); //?  
parseInt( "0x10" ); //?
parseInt( '103', 2); //?   


// parsing to Boolean

// truthy values
var a = '0';
var b = [];
var c = {};
Boolean(a); //?
Boolean(b); //?
Boolean(c); //?
Boolean('a'); //?

// falsy values
var d = '';
var e = 0;
var f = null;
var g;
Boolean(d); //?
Boolean(e); //?
Boolean(f); //?
Boolean(g); //?
// IMPORTANT: don't boolean check falsy values that are wrapped by object wrappers. Object wrappers do not end up being falsy 

// Just like the unary + operator coerces a value to a number (see above), the unary ! negate operator explicitly coerces a value to a boolean. 
// The problem is that it also flips the value from truthy to falsy or vice versa. 
// So, the most common way JS developers explicitly coerce to boolean is to use the !! double-negate operator

!!a; //?
!!b; //?
!!c; //?

!!d; //?
!!e; //?
!!f; //?
!!g; //?
