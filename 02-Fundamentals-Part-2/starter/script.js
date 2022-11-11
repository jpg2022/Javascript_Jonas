'use strict';
/*
function logger(){
    console.log("My name is jonas");


}


logger();


//experssion

const calcage = function(birthYear){
    return 2037 - birthYear
}

const age2  = calcage(1991)

console.log(age2)
*/
/*
//arrow function

const calcage = function(birthYear){
    return 2037 - birthYear
}
const calcage2 = birthYear => 2037 - birthYear

const age3 = calcage2(1991)
console.log(age3)

const yearsUntilRetire = (birthYear, firstName) => {
    const age = 2037 - birthYear
    const retirement = 65 - age
    return `${firstName} retires in ${retirement} years`
}


console.log(yearsUntilRetire(1991, "John"))
*/
/*
//nested functions
function cutFruitPieces(fruit){
    return fruit * 4
}

function fruitprocessor(apples, oraanges){
    const applePieces = cutFruitPieces(apples)
    const orangePieces = cutFruitPieces(oraanges)
    const juice = `Juice with ${applePieces} and  
    ${orangePieces} oragnes.`
return juice

}
console.log(fruitprocessor(4, 3))
*/

//arrays
/*
const friend1 = 'Michael'
const friend2 = 'Steven'
const friend3 = 'Peter'
const friends = ['Michael', 'Steven','Peter']
console.log(friends)
const years = new Array(1991,2008,2023)

console.log(friends[0])
console.log(friends.length)

friends[2]='Jay'
console.log(friends)
*/
/*
//array methods
const friends = ['Michael', 'Steven','Peter']
friends.push('Jay')
console.log(friends)

friends.unshift('John')
console.log(friends)

//remove elements
friends.pop()
console.log(friends)
*/
/*
//hashmap (or javascript objects)
const jonas = {
    firstname: 'Jonas',
    lastname: 'Schem',
    age: 2037-1991

}

console.log(jonas["lastname"])

*/

//object methods
const jonas = {
    firstname: 'Jonas',
    lastname: 'Schem',
    birthyear:1991,
    age: 2037-1991,
    job: "Teacher",
    hasdriverslicense:true,
    calcAge: function(){
        this.age = 2037 - this.birthyear
        return this.age
    },
    getSummary: function(){
        return `${this.firstname} is ${this.age}-years old`
    }
}

console.log(jonas.calcAge())
console.log(jonas.getSummary())
