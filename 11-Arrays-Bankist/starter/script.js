'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////
//slicing arrays
/* let arr = ['a', 'b', 'c', 'd', 'e'];

////console.log(arr.slice(2));
////console.log(arr.slice(-2));

const arr2 = ['j', 'i', 'h', 'g', 'g'];
////console.log(arr2);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]; */

/* for (const movement of movements) {
  if (movement > 0) {
    ////console.log(`You withdrew ${Math.abs(movement)}`);
  }
}
//passes each element of array
movements.forEach(function (movement) {
  ////console.log(`You moved ${movement}`);
}); */

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (val, key, map) {
  ////console.log(`${key}: ${val}`);
});

const currenciesisUnique = new Set(['USD', 'GBP', 'USD']);

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  //clear html container

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  containerMovements.innerHTML = '';
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const etousd = 1.1;
const movusd = movements.map(function (mov) {
  return mov * etousd;
});
//console.log(movusd);

const movementsforUSD = [];
for (const mov of movements) {
  movementsforUSD.push(mov * etousd);
}
//console.log(movementsforUSD);

//this function modifies the accounts array
const createusernames = function (accounts) {
  accounts.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

const updateUI = function (acc) {
  //display movements
  displayMovements(acc.movements);
  //display balance
  calcDisplayBalance(acc);
  //display summary
  calcDisplaySummary(acc);
};

createusernames(accounts);
//console.log(accounts);

//currentaccount is now a global variable
let currentaccount;

btnLogin.addEventListener('click', function (e) {
  //prevent form from submitting/refreshing
  e.preventDefault();
  currentaccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentaccount?.pin === Number(inputLoginPin.value)) {
    //display UI and Welcome msg
    labelWelcome.textContent = `Welcome back ${
      currentaccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;

    //clear
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentaccount);
  } //if statments
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);

  //gets entire account object
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentaccount.balance >= amount &&
    receiverAcc?.username !== currentaccount.username
  ) {
    //do transfer
    currentaccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentaccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentaccount.movements.some(mov => mov >= amount / 10)) {
    currentaccount.movements.push(amount);
    updateUI(currentaccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentaccount.username &&
    inputClosePin.value === currentaccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentaccount.username
    );
    accounts.splice(index, 1);

    //hide UI
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = '';
});

let sortclicked = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentaccount.movements, !sortclicked);
  sortclicked = !sortclicked;
});

/* //filter method
//filter above 0
const deposit = movements.filter(function (mov) {
  return mov > 0;
});
//console.log(deposit);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);

const withdrawals = movements.filter(function (mov) {
  return mov < 0;
});

//console.log(withdrawals);
 */

//reduce method
//accumaltor is like a snowball
//console.log(movements);
const balance = movements.reduce(function (acc, cur, i, arr) {
  ////console.log(`${acc}`);
  return acc + cur;
}, 0);
//console.log(balance);
//console.log('blance1');
const balance1 = movements.reduce((acc, cur) => acc + cur, 0);
//console.log(balance1);

const calcDisplayBalance = function (acc) {
  const balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  acc.balance = balance;
  labelBalance.textContent = `${acc.balance} EUR`;
};

const calcDisplaySummary = function (account) {
  const income = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income}€`;
  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, cur) => acc + cur);
  labelSumInterest.textContent = `${interest}€`;
};

//maximum value of movements array

const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
//console.log(max);

//coding challange 2
const dogages = [5, 2, 4, 1, 15, 8, 3];
const dogtohuman = function (ages) {
  const humanages = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const adults = humanages.filter(age => age >= 18);
  const avg = adults.reduce((acc, age) => acc + age, 0) / adults.length;
  return avg;
};
//console.log(dogtohuman(dogages));

//pipeline
const totaldepositusd = movements
  .filter(mov => mov > 0)
  .map(mov => mov * 1.1)
  .reduce((acc, cur) => acc + cur, 0);

//console.log(totaldepositusd);

//coding challenge 3

const dogtohuman2 = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

//find method

const firstwidthdrawal = movements.find(mov => mov < 0);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');

//conditions

const anyDeposits = movements.some(mov => mov > 1500);
//console.log(anyDeposits);

//every

//console.log(account4.movements.every(mov => mov > 0));

//seperate callback blocks

const deposit1 = mov => mov > 0;

//console.log(movements.some(deposit1));

//array methods practice

const bankdepositsum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);
console.log(bankdepositsum);

const numdeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);

console.log(numdeposits1000);

const { deposits, withdrawal } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      //cur > 0 ? (sums.deposits += cur) : (sums.withdrawal += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawal'] += cur;
      return sums;
    },
    { deposits: 0, withdrawal: 0 }
  );
console.log(deposits, withdrawal);

//Title case
//this is a nice title -> This Is a Nice Title

const convertTitleCase = function (title) {
  const capatilize = str => str[0].toUpperCase() + str.slice(1);

  const execptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word =>
      execptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(' ');
  return titleCase;
};

console.log(convertTitleCase('this is a nice title'));

//coding challange 4

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

const test = function (array) {
  array.forEach(obj => {
    obj.reccomended = obj.weight ** 0.75 * 28;
  });
};
let message = '';
const logeating = function (array, owner) {
  message = '';
  array.forEach(obj => {
    obj.owners.forEach(own => {
      if (own === owner) {
        console.log(owner);
        message = obj.curFood > obj.reccomended ? true : false;
        //console.log(message);
      } else {
        //message = 'owner not found';
      }
    });
  });
  if (message === '') {
    message = 'owner not found';
  }
  return message;
};
test(dogs);

const out = logeating(dogs, 'John');
const toomuch = [];
const toolittle = [];
const sorter = function (array) {
  array.forEach(obj => {
    if (obj.curFood > obj.reccomended) {
      console.log('too much');
      toomuch.push(...obj.owners);
    } else {
      toolittle.push(...obj.owners);
    }
  });
};
console.log(dogs);
sorter(dogs);
console.log(toomuch);
