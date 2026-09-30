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







const container = document.querySelector(".carousel-container");
const track = document.getElementById('track');
let slides = Array.from(track.children);
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
  const dotsContainer = document.querySelector(".pagination-dots");
 const totalOriginalSlides = slides.length;
console.log('dots container: ', dotsContainer);

let currentIndex = 1; // Start at 1 because we will prepend a clone
  let isMoving = false;
  
  // Touch / Drag States
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let isDragging = false;

// Clone first and last slides for infinite loop illusion
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

// add first clone to the end and last clone to the beginning
track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

//Updates slides list with newly appended clones
slides = Array.from(track.children);
let index = 1;

// Get dynamic slide width on load/resize
const getSlideWidth = () => slides[0].getBoundingClientRect().width;
let slideWidth = getSlideWidth();

// Set initial position without animation
const setTrackPosition = (animate = true) => {
  track.style.transition = animate ? 'transform 0.4s ease-in-out' : 'none';
  track.style.transform = `translateX(${-slideWidth * index}px)`;
};
setTrackPosition(false);

  // 2. Generate Dynamic Dots
  for (let i = 0; i < totalOriginalSlides; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 1) dot.classList.add("active");
    dot.dataset.index = i;
    dotsContainer.appendChild(dot);
  }
  const dots = Array.from(dotsContainer.children);

  console.log('dots', dots);

function updateDots() {
  dots.forEach(dot => dot.classList.remove('active'));
  // Map index back to real original dots
  let activeDot = (index - totalOriginalSlides) % totalOriginalSlides;
  if (activeDot < 0) activeDot += totalOriginalSlides;
  dots[activeDot].classList.add('active');
  console.log('current index', index);
}


function moveToSlide(smooth = true) {
  track.style.transition = smooth ? 'transform 0.3s ease-in-out' : 'none';
  track.style.transform = `translateX(${-slideWidth * index}px)`;

}
 
nextButton.addEventListener('click', () => {
    console.log('index', index);
  if (index >= slides.length - 1) return;
  index++;
  moveToSlide(true);
    updateDots();
});

prevButton.addEventListener('click', () => {
  if (index <= 0) return;
  index--;
  moveToSlide(true);
    updateDots();
});

  dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
      const targetDotIdx = parseInt(e.target.dataset.index);
    //   moveToSlide(targetDotIdx + 1);
       moveToSlide(targetDotIdx + 1, true);
      console.log('dot click fired', targetDotIdx+1);
    });
  });

track.addEventListener('transitionend', () => {
  if (slides[index].isEqualNode(firstClone)) {
    index = 1;
    moveToSlide(false);
  }
  if (slides[index].isEqualNode(lastClone)) {
    index = slides.length - 2;
    moveToSlide(false);
  }
});

let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    slideWidth = getSlideWidth();
    setTrackPosition(false); // Recalculate and snap immediately without animation
  }, 100);
});


// 7. Swipe / Gesture Support (Mouse & Touch)
  function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
  }

  function dragStart(event) {
    if (isMoving) return;
    isDragging = true;
    startX = getPositionX(event);
    track.classList.remove("smooth-transition");
    
    // Save snapshot of current base coordinate position
    prevTranslate = -currentIndex * container.offsetWidth;
  }

  function dragMove(event) {
    if (!isDragging) return;
    const currentX = getPositionX(event);
    const diffX = currentX - startX;
    
    // Move track fluidly with the thumb/mouse pointer
    currentTranslate = prevTranslate + diffX;
    track.style.transform = `translateX(${currentTranslate}px)`;
  }

  function dragEnd() {
    if (!isDragging) return;
    isDragging = false;
    
    const endTranslate = -currentIndex * container.offsetWidth;
    const movedBy = currentTranslate - endTranslate;

    // Threshold: Swipe 15% of the frame size to trigger a transition
    const threshold = container.offsetWidth * 0.15;

    if (movedBy < -threshold) {
      moveToSlide(currentIndex + 1); // Swiped Left -> Next
    } else if (movedBy > threshold) {
      moveToSlide(currentIndex - 1); // Swiped Right -> Prev
    } else {
      moveToSlide(currentIndex);     // Stay on Current Slide
    }
  }

  // Bind Mouse & Touch Events
  track.addEventListener("touchstart", dragStart, { passive: true });
  track.addEventListener("touchmove", dragMove, { passive: true });
  track.addEventListener("touchend", dragEnd);

  track.addEventListener("mousedown", dragStart);
  track.addEventListener("mousemove", dragMove);
  track.addEventListener("mouseup", dragEnd);
  track.addEventListener("mouseleave", () => { if (isDragging) dragEnd(); });