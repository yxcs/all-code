// function greeter(person: string): string {
//   return "Hello, " + person;
// }

// let user: string = "Jane User";

// document.body.innerHTML = greeter(user);

// interface SquareConfig {
//   color?: string;
//   width?: number;
// }

// function createSquare(config: SquareConfig): { color: string; area: number } {
//   // ...
// }

// let mySquare = createSquare({ colour: "red", width: 100 });

// let Greeter: any = (function () {
//   function Greeter(message) {
//       this.greeting = message;
//   }
//   Greeter.prototype.greet = function () {
//       return "Hello, " + this.greeting;
//   };
//   return Greeter;
// })();

// let greeter: any;
// greeter = new Greeter("world");
// console.log(greeter.greet());

let pets = new Set(["Cat", "Dog", "Hamster"]);
pets["species"] = "mammals";

for (let pet in pets) {
    console.log(pet); // "species"
}

for (let pet of pets) {
    console.log(pet); // "Cat", "Dog", "Hamster"
}