var People;
(function (People) {
    class Person {
        constructor(firstName, lastName, age, _ssn) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.age = age;
            this._ssn = _ssn;
        }
    }
    People.Person = Person;
})(People || (People = {}));
let p = new People.Person("John", "Smith", 29, "123-90-4567");
console.log(`Last name: ${p.lastName} `);
