'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const section1 = document.querySelector('#section--1');
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();

//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//event delegation

//1. add event listener to common parent element

//2. what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  //console.log(e.target);

  //matching strategy
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//DOM traversing
const h11 = document.querySelector('h1');

//console.log(h11.querySelectorAll('.highlight'));
//console.log(h11.childNoes);
//console.log(h11.children);

h11.firstElementChild.style.color = 'white';

//going upwards

//console.log(h11.parentNode);
//console.log(h11.parentElement);

h11.closest('.header').style.background = 'var(--gradient-secondary)';

//go sideways

//console.log(h11.previousElementSibling);
//console.log(h11.nextElementSibling);

//trick move up to the parent elements and find all sibligs from there
//console.log(h11.parentElement.children);

// [...h11.parentElement.children].forEach(function (el) {
//   if (el != h11) el.style.transform = 'scale(0.5)';
// });

//go downwards

//tab component

const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  //Guard clause
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //activate content area

  tabContent.forEach(c => c.classList.remove('operations__content--active'));

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// tabs.forEach(t => t.addEventListener('click', () => console.log('TAB')));

//menu fade animation

const nav = document.querySelector('.nav');

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// //sticky navigation

// const initialcoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function (e) {
//   //console.log(this.window.scrollY);

//   if (this.window.scrollY > initialcoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// //sticky intersection oberserver api

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => console.log(entry));
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);

// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
//console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries; //same as entries[0]
  //console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//reveal sections

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  //section.classList.add('section--hidden');
});

//lazy loading images

const imgTargets = document.querySelectorAll('img[data-src]');

const loadimg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  //replace src attribute with data-src

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadimg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

//Slider

const slider = document.querySelector('.slider');

const slides = document.querySelectorAll('.slide');

const btnLeft = document.querySelector('.slider__btn--left');

const btnRight = document.querySelector('.slider__btn--right');

let curSlide = 0;

const maxSlide = slides.length;
const dotContainer = document.querySelector('.dots');

//assign index to buttons
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data--slide="${i}"></button`
    );
  });
};

createDots();

const activatedots = function (slide) {
  document
    .querySelectorAll('.dots__dt')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
activatedots();

// slider.style.transform = 'scale(0.4) translateX(-800px)';
// slider.style.overflow = 'visible';

//replaced by function
// slides.forEach((s, i) => {
//   s.style.transform = `translateX(${100 * i}%)`;
// });

const gotoSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

gotoSlide(0);

//go the next slide
btnRight.addEventListener('click', function () {
  nextSlide();
});

const prevslide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  gotoSlide(curSlide);
  activatedots(curSlide);
};

btnLeft.addEventListener('click', function () {
  prevslide();
});

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  gotoSlide(curSlide);
  activatedots(curSlide);
};

document.addEventListener('keydown', function (e) {
  console.log(e);
  if (e.key === 'ArrowLeft') prevslide();
  e.key === 'ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    curSlide = +e.target.dataset.slide;
    console.log(curSlide);
    gotoSlide(curSlide);
    activatedots(curSlide);
  }
});

//////////////////////////////////////////

////console.log(document.documentElement);
////console.log(document.head);
////console.log(document.body);

//const header = document.querySelector('.header');

////console.log(allSections);

document.getElementById('section--1');
const allBtns = document.getElementsByTagName('button');
//////console.log(allBtns);

//////console.log(document.getElementsByClassName('btn'));

//creating and inserting elements

const message = document.createElement('div');

message.classList.add('cookie-message');
message.textContent = 'WE used cookies for tracking your data';

message.innerHTML =
  'WE are tracking via cookies. <button class="btn btn--close-cookie"> Got It! </button>';

//header.prepend(message);
//header.append(message.cloneNode(true));
header.append(message);

//header.before(message);
//header.after(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

//styles

message.style.backgroundColor = '#37383d';

message.style.width = '120%';

////console.log(getComputedStyle(message).height);

//how to change height of objs using pixels
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

//attributes

const logo = document.querySelector('.nav__logo');
////console.log(logo.alt);
////console.log(logo.src);

//smooth scroll

const btnScrollTo = document.querySelector('.btn--scroll-to');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  ////console.log(s1coords);

  ////console.log(e.target.getBoundingClientRect());

  ////console.log('Current scrool (X/Y)', window.pageXOffset, pageYOffset);

  // //scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  //more modern scroll
  section1.scrollIntoView({ behavior: 'smooth' });
});

//Events
const alerth1 = function (e) {
  alert('addeventLister: Great!');

  //now remove it so it only happens onces
  h1.removeEventListener('mouseenter', alerth1);
};
const h1 = document.querySelector('h1');
h1.addEventListener('mouseenter', alerth1);

// h1.onmouseenter = function (e) {
//   alert('addeventLister: Great! :(');
// };

//bubbling

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1));

const randcolor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

//////console.log(randcolor(0, 255));

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randcolor();
  ////console.log('Link', e.target, e.currentTarget);

  //stop bubble
  //e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randcolor();
  ////console.log('Container', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randcolor();
    ////console.log('Nav', e.target, e.currentTarget);
  },
  true
);
