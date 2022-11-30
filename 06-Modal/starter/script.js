'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnclosemodal = document.querySelector('.close-modal');
const btnsopenmodal = document.querySelectorAll('.show-modal');
const clicked = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closedmodal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
//assigns click events to buttons and their functions
for (let i = 0; i < btnsopenmodal.length; i++) {
  console.log(btnsopenmodal[i].addEventListener('click', clicked));
}
btnclosemodal.addEventListener('click', closedmodal);
overlay.addEventListener('click', closedmodal);

document.addEventListener('keydown', function (e) {
  if (e.key == 'Escape' && !modal.classList.contains('hidden')) {
    closedmodal();
  }
});
