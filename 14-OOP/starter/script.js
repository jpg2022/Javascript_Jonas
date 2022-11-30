'use strict';
//constructor function

const person = function (firstname, birthyear) {
  this.firstname = firstname;
  this.birthyear = birthyear;

  //Dont do this!
  //   this.calcage = function () {
  //     console.log(2037 - this.birthyear);
  //   };
};

//calls person constructor function
const jonas = new person('jonas', 1991);

// console.log(jonas);

const matilda = new person('matilda', 2017);

const jack = new person('jack', 1975);

// console.log(matilda, jack);

//prototypes

person.prototype.calcAge = function () {
  console.log(2037 - this.birthyear);
};

// jonas.calcAge();
// matilda.calcAge();

//coding challange 1

//ES6 classes

// const personCL = class{

// }

class personCL {
  constructor(fullname, birthyear) {
    this.fullname = fullname;
    this.birthyear = birthyear;
  }
  //this puts it into the prototype
  calcAge() {
    console.log(2037 - this.birthyear);
  }

  set fullname(name) {
    if (name.includes(' ')) this._fullname = name;
    else alert(`${name} is not a full name!`);
  }

  get fullname() {
    return this._fullname;
  }

  static hey() {
    console.log('hey!');
  }
}

// personCL.hey();

const jessica = new personCL('Jesccia Davis', 1996);
// console.log(jessica);
// jessica.calcAge();

personCL.prototype.greet = function () {
  console.log(`Hey ${this.firstname}!`);
};

// jessica.greet();

const account = {
  owner: 'jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};
// console.log(account.latest);

account.latest = 50;
// console.log(account.movements);

person.hey = function () {
  console.log('hey!');
};

const personproto = {
  calcAge() {
    console.log(2037 - this.birthyear);
  },

  init(firstname, birthyear) {
    this.firstname = firstname;
    this.birthyear = birthyear;
  },
};

const steven = Object.create(personproto);
steven.init('Steven', 1979);

// steven.name = 'Steven';
// steven.birthyear = 2002;

//coding challaenge 2

//inhertitance

const student = function (firstname, birthyear, course) {
  //inheritance of person
  person.call(this, firstname, birthyear);
  this.course = course;
};

//must link this prototype first before setting other prototypes!!
student.prototype = Object.create(person.prototype);

student.prototype.introduce = function () {
  console.log(`My name is ${this.firstname} and study ${this.course}`);
};
const mike = new student('Mike', 2020, 'CS');
// console.log(mike);
// mike.introduce();

//this works bc of inheritance!!
// mike.calcAge();

//coding challanege 3

const car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

car.prototype.accelerate = function () {
  this.speed = this.speed + 10;
  return this.speed;
};

car.prototype.brake = function () {
  this.speed = this.speed - 5;
  return this.speed;
};

const bwm = new car('BMW', 120);

// console.log(bwm.accelerate());

const EV = function (make, speed, charge) {
  car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
  console.log(`Charge is ${this.charge}`);
};
EV.prototype.accelerate = function () {
  this.speed -= 20;
  this.charge -= 1;
  console.log(
    `${this.make} is going at ${this.speed} km/hr with a charge of ${this.charge}`
  );
};
const tesla = new EV('Tesla', 85, 55);
// tesla.accelerate();
// tesla.chargeBattery(56);

class StudentCL extends personCL {
  constructor(fullname, birthyear, course) {
    super(fullname, birthyear);
    this.course = course;
  }

  introduce() {
    console.log(`my name is ${this.fullname} and study ${this.course}`);
  }
}

const martha = new StudentCL('Martha jones', 2012, 'CS');
// martha.introduce();

class account1 {
  //public fields
  local = navigator.language;
  //   movements = [];
  //private fields
  #movements = [];
  #pin;
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    //created at creation of object

    //protected!

    console.log('New account created!');
  }

  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  //return this to make chainable
  withdraw(val) {
    this.deposit(-val);
    return this;
  }
  //private method
  #approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log('loan approved!');
    }
    return this;
  }
}

const acc1 = new account1('jonas', 'EUR', 1111);

acc1.deposit(250);
acc1.withdraw(-140);

console.log(acc1);

acc1.requestLoan(500);

//chaining

acc1.deposit(300).deposit(500).withdraw(35).requestLoan(2500).withdraw(4000);
