//object person
/*const person = {
    name: 'John Doe',
    age: 30
};

//use somewhere else
module.exports = person;*/

//class
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greeting() {
        console.log(`My name is ${this.name} and i am ${this.age}.`)
    }
}
module.exports = Person;