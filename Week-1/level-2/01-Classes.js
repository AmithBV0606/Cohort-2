class Animal {
    constructor(name, legCount) {
      this.name = name
      this.legCount = legCount
    }
    describe() {
      return `${this.name} has ${this.legCount} legs`
    }
    static myType() { // Static methods are not associated with any object and can be called independently without instatiating an Object.
        console.log("I'm an Animal!!")
    }
}  

let dog = new Animal("Dog", 4,);
console.log(dog.describe());
Animal.myType();