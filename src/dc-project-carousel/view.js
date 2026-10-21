/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
console.log( 'Hello World! (from create-block-dc-project-carousel block)' );
/* eslint-enable no-console */







// const container = document.querySelector(".carousel-container");
// const track = document.getElementById('track');
// let slides = Array.from(track.children);
// const nextButton = document.getElementById('next');
// const prevButton = document.getElementById('prev');
//   const dotsContainer = document.querySelector(".pagination-dots");
//  const totalOriginalSlides = slides.length;
// console.log('dots container: ', dotsContainer);

// let currentIndex = 1; // Start at 1 because we will prepend a clone
//   let isMoving = false;
  
//   // // Touch / Drag States
//   // let startX = 0;
//   // let currentTranslate = 0;
//   // let prevTranslate = 0;
//   // let isDragging = false;

// // Clone first and last slides for infinite loop illusion
// const firstClone = slides[0].cloneNode(true);
// const lastClone = slides[slides.length - 1].cloneNode(true);

// // add first clone to the end and last clone to the beginning
// track.appendChild(firstClone);
// track.insertBefore(lastClone, slides[0]);

// //Updates slides list with newly appended clones
// slides = Array.from(track.children);
// let index = 1;

// // Get dynamic slide width on load/resize
// const getSlideWidth = () => slides[0].getBoundingClientRect().width;
// let slideWidth = getSlideWidth();

// // Set initial position without animation
// const setTrackPosition = (animate = true) => {
//   track.style.transition = animate ? 'transform 0.4s ease-in-out' : 'none';
//   track.style.transform = `translateX(${-slideWidth * index}px)`;
// };
// setTrackPosition(false);

//   // 2. Generate Dynamic Dots
//   for (let i = 0; i < totalOriginalSlides; i++) {
//     const dot = document.createElement("div");
//     dot.classList.add("dot");
//     if (i === 1) dot.classList.add("active");
//     dot.dataset.index = i;
//     dotsContainer.appendChild(dot);
//   }
//   const dots = Array.from(dotsContainer.children);

//   console.log('dots', dots);

// function updateDots() {
//   dots.forEach(dot => dot.classList.remove('active'));
//   // Map index back to real original dots
//   let activeDot = (index - totalOriginalSlides) % totalOriginalSlides;
//   if (activeDot < 0) activeDot += totalOriginalSlides;
//   dots[activeDot].classList.add('active');
//   console.log('current index', index);
// }


// function moveToSlide(smooth = true) {
//   track.style.transition = smooth ? 'transform 0.3s ease-in-out' : 'none';
//   track.style.transform = `translateX(${-slideWidth * index}px)`;

// }
 
// nextButton.addEventListener('click', () => {
//     console.log('index', index);
//   if (index >= slides.length - 1) return;
//   index++;
//   moveToSlide(true);
//     updateDots();
// });

// prevButton.addEventListener('click', () => {
//   if (index <= 0) return;
//   index--;
//   moveToSlide(true);
//     updateDots();
// });

//   dots.forEach(dot => {
//     dot.addEventListener("click", (e) => {
//       const targetDotIdx = parseInt(e.target.dataset.index);
//     //   moveToSlide(targetDotIdx + 1);
//        moveToSlide(targetDotIdx + 1, true);
//       console.log('dot click fired', targetDotIdx+1);
//     });
//   });

// track.addEventListener('transitionend', () => {
//   if (slides[index].isEqualNode(firstClone)) {
//     index = 1;
//     moveToSlide(false);
//   }
//   if (slides[index].isEqualNode(lastClone)) {
//     index = slides.length - 2;
//     moveToSlide(false);
//   }
// });

// let resizeTimeout;
// window.addEventListener('resize', () => {
//   clearTimeout(resizeTimeout);
//   resizeTimeout = setTimeout(() => {
//     slideWidth = getSlideWidth();
//     setTrackPosition(false); // Recalculate and snap immediately without animation
//   }, 100);
// });




// Components
const carouselContainer = document.querySelector('.carousel');
const slideWrapper = document.querySelector('.carousel__slides');
const slides = document.querySelectorAll('.carousel__slide');
const navdotWrapper = document.querySelector('.carousel__navdots');

const dotsContainer = document.querySelector('.carousel__navdots');


function createNavDots() {
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    dot.setAttribute("type", "button");
    dotsContainer.appendChild(dot);
    if (dotsContainer.firstElementChild === dot) {
  dot.setAttribute("aria-disabled", "true");
} else (
  dot.setAttribute("aria-disabled", "false" )
)
  });
}
createNavDots();

const navdots = document.querySelectorAll('.carousel__navdots button');

// Parameters
const n_slides = slides.length;
const n_slidesCloned = 1;
let slideWidth = slides[0].offsetWidth;
let spaceBtwSlides = Number(window.getComputedStyle(slideWrapper).getPropertyValue('grid-column-gap').slice(0, -2)); // drop px at the end
function index_slideCurrent() {
  return Math.round(slideWrapper.scrollLeft / (slideWidth + spaceBtwSlides) - n_slidesCloned);
}

// Nav dot click handler
function goto(index) {
  slideWrapper.scrollTo((slideWidth + spaceBtwSlides) * (index + n_slidesCloned), 0);
}
for (let i = 0; i < n_slides; i++) {
  navdots[i].addEventListener('click', () => goto(i));
}

// Marking nav dots
function markNavdot(index) {
  navdots[index].classList.add('is-active');
  navdots[index].setAttribute('aria-disabled', 'true');
}
function updateNavdot() {
  const c = index_slideCurrent();
  if (c < 0 || c >= n_slides) return; // in these cases, forward() and rewind() will be executed soon
  markNavdot(c);
}
let scrollTimer;
slideWrapper.addEventListener('scroll', () => {
  // reset
  navdots.forEach(navdot => {
    navdot.classList.remove('is-active');
    navdot.setAttribute('aria-disabled', 'false');
  });
  // handle infinite scrolling
  if (scrollTimer) clearTimeout(scrollTimer); // to cancel if scroll continues
  scrollTimer = setTimeout(() => {
    if (slideWrapper.scrollLeft < (slideWidth + spaceBtwSlides) * (n_slidesCloned - 1/2)) {
      forward();
    }
    if (slideWrapper.scrollLeft > (slideWidth + spaceBtwSlides) * ((n_slides - 1 + n_slidesCloned) + 1/2)) {
      rewind();
    }
  }, 100);
  // mark the navdot
  updateNavdot();
});

// Handle window resizing
let resizeTimer;
window.addEventListener('resize', () => {
  // update parameters
  slideWidth = slides[0].offsetWidth;
  spaceBtwSlides = Number(window.getComputedStyle(slideWrapper).getPropertyValue('grid-column-gap').slice(0, -2)); // drop px at the end
  // for autoplay
  if(resizeTimer) clearTimeout(resizeTimer);
  stop();
  resizeTimer = setTimeout(()=>{
    play();
  }, 400);
});

// Infinite scrolling
const firstSlideClone = slides[0].cloneNode(true);
firstSlideClone.setAttribute('aria-hidden', 'true');
slideWrapper.append(firstSlideClone);

const lastSlideClone = slides[n_slides - 1].cloneNode(true);
lastSlideClone.setAttribute('aria-hidden', 'true');
slideWrapper.prepend(lastSlideClone);

function rewind() {
  slideWrapper.classList.remove('smooth-scroll');
  setTimeout(() => { // wait for smooth scroll to be disabled
    slideWrapper.scrollTo((slideWidth + spaceBtwSlides) * n_slidesCloned, 0);
    slideWrapper.classList.add('smooth-scroll');
  }, 100);
}

function forward() {
  slideWrapper.classList.remove('smooth-scroll');
  setTimeout(() => { // wait for smooth scroll to be disabled
    slideWrapper.scrollTo((slideWidth + spaceBtwSlides) * (n_slides - 1 + n_slidesCloned), 0);
    slideWrapper.classList.add('smooth-scroll');
  }, 100);
}

// Autoplay
function next() {
  goto(index_slideCurrent() + 1);
}
const pause = 2500;
let itv;
function play() {
  // early return if the user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  clearInterval(itv);
  slideWrapper.setAttribute("aria-live", "off");
  itv = setInterval(next, pause);
}
function stop() {
  clearInterval(itv);
  slideWrapper.setAttribute("aria-live", "polite");
}
const observer = new IntersectionObserver(callback, {threshold: 0.99});
observer.observe(carouselContainer);
function callback(entries, observer) {
  entries.forEach((entry) => {
    console.log(`entry.intersectionRatio: ${entry.intersectionRatio}`)
    if (entry.isIntersecting) {
      console.log(`entry.isIntersecting is true.`)
      play();
    } else {
      console.log(`entry.isIntersecting is false.`)
      stop();
    }
  })
}
// for mouse users
carouselContainer.addEventListener("pointerenter", () => stop());
carouselContainer.addEventListener("pointerleave", () => play());
// for keyboard users
carouselContainer.addEventListener("focus", () => stop(), true);
carouselContainer.addEventListener("blur", () => {
  if (carouselContainer.matches(":hover")) return;
  play();
}, true);
// for touch device users
carouselContainer.addEventListener("touchstart", () => stop());

// Initialization
goto(0);
markNavdot(0);
slideWrapper.classList.add('smooth-scroll');
