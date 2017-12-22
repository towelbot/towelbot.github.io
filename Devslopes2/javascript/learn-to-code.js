// var name = "Jack";
// var age = 23;
// var shootingScore = 45.6;
//
// var message = "Hi, my name is " + name + " and I am " + age + " years old.";

// var firstName = "John";
// var lastName = "Smith";
// var dateOfBirth = "10-09-82";
// var age = 23;
// var profileImageUrl = "http://SomeDumb.url";
//
// var loginWelcomeMessage = "Welcome " + firstName + ". Happy " + age +"rd birthday!" ;
//
// console.log(loginWelcomeMessage);

// var sum = 10 + 15;
// var sub = 15 - 10;
// var mul = 10 * 3;
// var div = 9 / 3;
// var mod = 10 % 3;
//
// var msg = "10 / 3 = 3 with a remainder of " + mod;
//
// var result = 10 * ((5 + 3) - 4);
//
// console.log(sub);

// var myAccountBalance = 300;
// var nikeSBShoes = 699.23;
// var coupon = 400;
//
// if (nikeSBShoes <= myAccountBalance) {
//   myAccountBalance -= nikeSBShoes;
//   console.log("We shoes bought whatever.");
//   console.log("Account Balance: " + myAccountBalance);
// } else if (nikeSBShoes - coupon <= myAccountBalance) {
//   myAccountBalance -= (nikeSBShoes - coupon);
//   console.log("We shoes bought whatever. + Coupon nasty nasty coupon.");
//   console.log("Account Balance: " + myAccountBalance);
// } else {
//   console.log("BUDDY NAAAAAAA");
//   console.log("Account Balance: " + myAccountBalance);
// }

// var age = 23;
// var joesAge = "23";
//
// if (age === joesAge) {
//   console.log("I'm the same age as Joe");
// } else {
//   console.log("Everything is fucking garbage Mark. Everything.");
// }

// if (1 === 1 && 2 ==2) {
//   console.log("These are both True");
// }
//
// if (true === true && true === false) {
//   console.log("something else out");
// }
//
// if (1 === 3 || "joe" === "joe") {
//   console.log("One of the statements is true");
// }

// var cat1 = 5;
// var cat2 = 10;
// var cat3 = 1;
// var bubs = false;
//
// if (cat1 > cat2 && cat1 > cat3 && !bubs) {
//   console.log("Cat 1 is the cutest");
// } else if (cat2 > cat1 && cat2 > cat3 && !bubs) {
//   console.log("Cat 2 is the cutest");
// } else if (cat3 > cat1 && cat3 > cat2 || bubs) {
//   console.log("Cat 3 is the cutest");
// }

// Time for some fucking loops motherfuckers

// var total = 10;
// for (var x = 0; x < total; x++) {
//   //iterate until told not to
//   console.log(x);
// }

var students = ["John", "Paul", "Jorge", "Ringo", "Synth"];

for (var x = 0; x < students.length; x++){
  console.log(students[x]);
}
students.push("Marsters");

for (var x = 0; x < students.length; x++){
  console.log(students[x]);
}
