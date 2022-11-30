'use strict';
/* const bookings = [];
const createBooking = function (num, pass = 1, price = 199 * pass) {
  const booking = {
    num,
    pass,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 250);
createBooking('LH123', 2); */

/* const flight = 'LH1234';
const passanger = {
  name: 'Jonas',
  passport: 124856,
};

const checkin = function (num, pass) {
  num = 'LH999';
  pass.name = 'MR.' + 'pass';

  if (pass.passport == 124856) {
    alert('Checked in');
  } else {
    alert('Wrong passport');
  }
}; */
//high order functions
/* const oneWord = function (str) {
  return str.replace('/ /g', '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

const transformer = function (str, fn) {
  const out = fn(str);
  console.log(out);
  console.log(`done by ${fn.name}`);
};

transformer('hello babes', upperFirstWord);

const high5 = function () {
  console.log('high five!!');
};

document.body.addEventListener('click', high5); */

//functions returning functions

/* const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
//greeterhey is now the function returned by greet function
const greeterhey = greet('Hey!');

greeterhey('Jones');

//partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

//there is no this keyword so set it to null
const addVAT = addTax.bind(null, 0.23);

console.log(addVAT(350)); */

/* //coding challenge
const displayResults = function (type) {
  if (type == 'array') {
    console.log(poll.answers);
  } else if ((type = 'string')) {
    for (const num in poll.answers) {
      console.log(num);
    }
  }
};
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    const ans = prompt('Fav language?');
    if (ans == 0 || 1 || 2 || 3) {
      this.answers[ans] += 1;
    } else {
      alert('Invalid Choice!');
    }
    return displayResults('array');
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll)); */

//closurs

/* const secureBoking = function () {
  let passcount = 0;
  return function () {
    passcount++;
    console.log(passcount);
  };
};

const booker = secureBoking(); */

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
})();
