'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterindex, mainindex) {
    return [this.starterMenu[starterindex], this.mainMenu[mainindex]];
  },

  orderDelivery: function (starterindex = 1, mainindex = 0, time = 20, adress) {
    console.log('Order received!');
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your pasts with ${ing1}, ${ing2}, ${ing3}`);
  },

  orderPizza: function (mainingredient, ...otheringredients) {
    console.log(mainingredient);
    console.log(otheringredients);
  },
};

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

const airline = 'TAP Air portugal';
const plane = 'A320';

console.log(plane[0]);
console.log(plane[1]);
console.log('B320'[0]);

console.log(airline.indexOf('r'));

console.log(airline.slice(4));

console.log(airline.slice(0, airline.indexOf(' '))); //gets first word

const checkmiddleseat = function (seat) {
  //B and E are middle seats
  if (seat.slice(-1) == 'B' || 'E') {
    console.log('is middle');
  }
};

/*
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
*/
/*
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const [players1, players2] = game.players;
const gk = game.team1;
const allPlayers = [gk, game.team2, ...players1, ...players2];
const players1final = [gk, ...players1, 'Thiago', 'Coutinho', 'Perisic'];
//console.log(players1final);
const { team1: team1, x: odds, team2: team2 } = game.odds;

function printGoals(...players) {
  for (let i = 0; i < players.length; i++) {
    console.log(...players);
    console.log(players.length);
  }
}
*/
/*
restaurant.orderPizza('kale', 'others', 'lame');
*/
/*
//spread bc on right hand side
const arr = [1, 2, ...[3, 4]];
//rest bc on left hand side
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(others);

const [pizza, , risotto, ...otherfood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];

//objects

const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

//functions

const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};

add(2, 3);
add(5, 3, 7, 2);
add(5, 4, 6, 52, 4);

const x = [23, 5, 7];
add(...x);
*/
/*
//spread operator
const arr2 = [7, 8, 9];
const newArr = [1, 2, ...arr2];
console.log(newArr);
console.log(...newArr);

const newmenu = [...restaurant.mainMenu, 'Gnucci'];
console.log(newmenu);

//copy array
const mainmenucopy = [...restaurant.mainMenu];
console.log(mainmenucopy);

//join arrays
const menu2 = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu2);

//iterables, arrays, strings,maps,sets

const str = 'Jonas';
const letters = [...str, '', 'S.'];
console.log(letters);

const ingredients = [
  //prompt("Lets's make pasts!"),
  // prompt('ing2?'),
  //prompt('ing3?j'),
];

restaurant.orderPasta(...ingredients);

//objects with spread operator

const newRestraunt = { foundedin: 1998, ...restaurant, founder: 'Guiseppe' };
const restrauntcopy = {...restaurant}

*/
/*
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

//default values
const { name, openingHours, categories } = restaurant;

const {
  name: restrauntname,
  openingHours: hours,
  categories: tags,
} = restaurant;

const { menu = [], starterMenu: starters = [] } = restaurant;

//mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

({ a, b } = obj);

//nested objects

const {
  fri: { open: o, close: c },
} = openingHours;

const arr = [2, 3, 4];
const [x, y, z] = arr;

let [main, , secondary] = restaurant.categories;

*/
//console.log(secondary);
/*
const temp = main;

main = secondary;
secondary = temp;
*/
//nested destructing
/*
[main, secondary] = [secondary, main];

const [starter, maincourse] = restaurant.order(2, 0);

const nested = [2, 4, [5, 6]];
//const [i, , j] = nested;

const [i, , [j, k]] = nested;

//default values

const [p = 1, q = 1, r = 1] = [8, 9];
*/
