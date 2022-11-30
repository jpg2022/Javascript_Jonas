'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
//https://restcountries.com/v2/
//old school

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     console.log(this.responseText);

//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `<article class="country">
//   <img class="country__img" src="${data.flag}" />
//   <div class="country__data">
//     <h3 class="country__name">${data.name}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row"><span>👫</span>${(
//       +data.population / 1000000
//     ).toFixed(1)} people</p>
//     <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//     <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//   </div>
// </article>`;

//     countriesContainer.insertAdjacentHTML('beforeend', html);

//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('portugal');
// getCountryData('usa');
// getCountryData('germany');

const renderCountry = function (data, classname = '') {
  const html = `<article class="country ${classname}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);

  //   countriesContainer.style.opacity = 1;
};

const getCountryDataAndNeighbor = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    //console.log(this.responseText);

    const [data] = JSON.parse(this.responseText);
    //console.log(data);
    //render country1
    renderCountry(data);
    // IF the country has a neighbor then get it
    const [neighbor] = data.borders;
    if (!neighbor) return;
    //AJAX call 2
    const request2 = new XMLHttpRequest();

    //get by neighbor code
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbor}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryDataAndNeighbor('portugal');
// getCountryDataAndNeighbor('usa');

//callback hell BAD hard to debug
// setTimeout(() => {
//   console.log('1 sec passed');
//   setTimeout(() => {
//     console.log('2 sec passed');
//     setTimeout(() => {
//       console.log('3 sec passed');
//       setTimeout(() => {
//         console.log('4 sec passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// const request2 = new XMLHttpRequest();

//     //get by neighbor code
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbor}`);
//     request2.send();

const req3 = fetch('https://restcountries.com/v2/name/portugal');

// console.log(req3);

// const getCountryData1 = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       //.json is a promise too
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

//simplified

const rendererror = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //   countriesContainer.style.opacity = 1;
};

const getCountryData1 = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(
      //cacthing error
      response => {
        console.log(response);
        if (!response.ok) {
          throw new Error(`Country not found ${response.status}`);
        }
        return response.json();
      }
    )
    .then(data => {
      renderCountry(data[0]);

      const neighbor = data[0].borders[0];
      if (!neighbor) return;

      return fetch(`https://restcountries.com/v2/alpha/${neighbor}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err}!!`);
      rendererror(`Something went wrong!! ${err}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// btn.addEventListener('click', function () {
//   getCountryData1('portugal');
// });

// getCountryData1('sjhfhsjaj');

// whereAmI1(39.39, 8.22);

// 125396988489596105772x107083

//event loop in practice

// console.log('Test Start');

// setTimeout(() => console.log('0 sec timer'), 0);

// Promise.resolve('Resolved promose 1').then(res => console.log(res));

// console.log('Test end');

//building a simple promise

const lotterypromise = new Promise(function (resolve, reject) {
  console.log('Lottery Draw Is Happening');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You win!');
    } else {
      reject('You lost sorry!!');
    }
  }, 2000);
});

//lotterypromise.then(res => console.log(res)).catch(err => console.error(err));

//promosoyong set timeout

// wait(2)
//   .then(() => {
//     console.log('I waited for 2 seconds');
//     return wait(1);
//   })
//   .then(() => console.log('I waited for 1 second'));

// Promise.resolve('abc').then(x => console.log(x));

// Promise.reject('abc').catch(x => console.error(x));

//promisfying geolocation

// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.log(err)
// );

// const getPosition1 = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getPosition1().then(pos => console.log(pos));

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const whereAmI1 = function () {
  getPosition1()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
    })

    .then(response => {
      //console.log(response);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(data.address.country);
      return fetch(`https://restcountries.com/v2/name/${data.address.country}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.error(`${err}!!`);
      rendererror(`Sometjign went wrong!! ${err}`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', whereAmI1);

//coding challange 2
const imgContainer1 = document.querySelector('.images');

const createImage = function (imagepath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imagepath;

    img.addEventListener('load', function () {
      imgContainer1.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('image not found'));
    });
  });
};

let currentimg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentimg = img;
//     console.log('img one loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentimg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentimg = img;
//     console.log('img two loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentimg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

//async await for consuming promises

const getPosition1 = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
const whereAmI2 = async function () {
  try {
    const pos = await getPosition1();
    const { latitude: lat, longitude: lng } = pos.coords;
    const respGeo = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const dataGeo = await respGeo.json();
    //   console.log(dataGeo);

    //wait for result of this promise (stop code)
    const res = await fetch(`https://restcountries.com/v2/name/usa`);
    const data = await res.json();
    // console.log(data[0]);
    renderCountry(data[0]);
    return 'You are in usa!';
  } catch (err) {
    console.error(err);
    rendererror('someting went wrong :<');
  }
};

console.log('1: Will get location');
// const city = whereAmI2();
// console.log(city);
whereAmI2().then(city => console.log(city));
console.log('FIRST');
console.log('2: Finished getting location');

//try catch

// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   alert(err.message);
// }

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);
    const data = Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);
    console.log((await data).map(d => d[0].capital));
  } catch (err) {}
};

// get3Countries('portugal', 'canada', 'tanzania');

//promise.race

// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v2/name/italy`),
//     getJSON(`https://restcountries.com/v2/name/mexico`),
//     getJSON(`https://restcountries.com/v2/name/egypt`),
//   ]);
//   console.log(res[0]);
// })();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Reqeust took too long'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v2/name/tanzania`),
  timeout(0.1),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

//promise.allsettled

Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERror'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));
