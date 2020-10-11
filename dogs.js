const breedsSelect = document.querySelector('.breeds');
const img = document.querySelector('.dog-img');
const preloader = document.querySelector('.hamsterwheel');


async function init() {
  
  preloader.classList.remove('hidden');

  const res = await fetch('https://dog.ceo/api/breeds/list/all');
  const resJson = await res.json();

  const breedsArray = Object.keys(resJson.message);

  breedsArray.forEach(function(breed) {
    const opt = document.createElement('option');
      opt.value = breed;
      opt.innerText = breed;
      breedsSelect.appendChild(opt);
  });

  // get first image
  const randomRes = await fetch("https://dog.ceo/api/breeds/image/random");
  const randomResJson = await randomRes.json();
  img.src = randomResJson.message

  // add event listeners

  breedsSelect.addEventListener('change', e => getBreedImage(breedsSelect.value));

  img.addEventListener('load', function() {
    preloader.classList.add('hidden');
    img.classList.remove('hidden');
  })

};

async function getBreedImage(breed) {

  breed = validateBreed(breed);

  preloader.classList.remove('hidden');
  img.classList.add('hidden');

  const res = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
  const resJson = await res.json();
  img.src = resJson.message;
}

function validateBreed(breed) {
const errorHandling = document.querySelector('.error-handling');

  if (errorHandling.classList.contains('hidden') === false) {
    errorHandling.classList.add('hidden');
  }
  if (breed == 0) {
    errorHandling.classList.remove('hidden');
    return "germanshepherd";
  } else {
    return breed;
  }
}


/* old fetch way of doing it */

// fetch(ALL_BREEDS_URL)
//   .then(response => {
//     return response.json();
//   })
//   .then(data => {
//     const breedsObject = data.message;
//     const breedsArray = Object.keys(breedsObject);
//     breedsArray.forEach(function(breed) {
//       const opt = document.createElement('option');
//       opt.value = breed;
//       opt.innerText = breed;
//       breedsSelect.appendChild(opt);
//     });
//   }
// )

// function getBreedImage(breed) {
  
//   if (errorHandling.classList.contains('hidden') === false) {
//     errorHandling.classList.add('hidden');
//   }
    
//   if (breed == 0) {
//     breed="germanshepherd"
//     errorHandling.classList.remove('hidden');
//   }
 
//   const dogViewer = document.querySelector('.dog-viewer');
//   const preloader = document.querySelector('.hamsterwheel');
//   const img = document.querySelector('.dog-img');

//   const BREED_URL = `https://dog.ceo/api/breed/${breed}/images/random`

//   preloader.classList.remove('hidden');
//   img.classList.add('hidden');

//   fetch(BREED_URL)
//     .then(response => {
//       return response.json();
//     })
//     .then(data => {
//       img.addEventListener('load', function() {
//         img.classList.remove('hidden');
//         preloader.classList.add('hidden');
//       });

//       img.src = data.message;
//       img.alt = 'A cute photo of a ${breed} dog.';

//     });
// }

// breedsSelect.addEventListener('change', e => getBreedImage(breedsSelect.value));

init();