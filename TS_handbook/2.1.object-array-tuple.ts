{ // object type & type inference

  // const person: {
  //   name: string,
  //   age: number
  // } = {
  const person = { // better to infer it, but the above object type is what's happening behind the scenes
    name: 'Murat',
    age: 36
  };

  // hover over to see inference
  person.name; //?
}


{ // array type, union types

  const person = {
    name: 'Max',
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: [2, 'author'] // TS can infer union type too: (string | number)[]
  }

  // TS knows that hobbies is a string[] and iterates seamlessly
  for (let hobby of person.hobbies) {
    hobby.toUpperCase(); //?
  }
}


{ // tuple type: provides even more strict array typing
  
  const person: {
    name: string,
    age: number,
    hobbies: string[],
    role: [number, string, boolean]
  } = {
    name: 'Max',
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: [2, 'author', true]
  }

  person.role = [10, 'someRole', true];
  person; //?

  
  //////
  let nameNumber: [string, number]; // tuple type
  nameNumber = ['Jenny', 8675309];

  let [name, number] = nameNumber;
  name; //?
  typeof name; //?
  number; //?
  typeof number; //?
}


//  type inference example
type Adder = (numbers: { a: number, b: number }) => number;

function iTakeAnAdder(adder: Adder) {
    return adder({ a: 1, b: 2 });
}

iTakeAnAdder(({a, b}) => { // Types of `a` and `b` are inferred
    a = "hello"; // Would Error: cannot assign `string` to a `number`
    return a + b;
})