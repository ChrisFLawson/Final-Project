// Naming Carousel Variables
const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const rightArrow = document.querySelector(".carousel__button-right");
const leftArrow = document.querySelector(".carousel__button-left");
const navDots = document.querySelector(".carousel__nav");
const dots = Array.from(navDots.children);

const carouselWidth = slides[0].getBoundingClientRect().width;

// Arrange the images beside each other, moves each one by the amount of pixels each image is. Makes transition smooth.
const setSlidePosition = (slide, index) => {
  slide.style.left = carouselWidth * index + "px";
};
slides.forEach(setSlidePosition);

const updateNavDots = (currentDot, clickedNavDot) => {
  currentDot.classList.remove("current-slide");
  clickedNavDot.classList.add("current-slide");
};

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

const hideArrow = (slides, leftArrow, rightArrow, targetIndex) => {
  if (targetIndex === 0) {
    leftArrow.classList.add("is-hidden");
    rightArrow.classList.remove("is-hidden");
  } else if (targetIndex === slides.length - 1) {
    leftArrow.classList.remove("is-hidden");
    rightArrow.classList.add("is-hidden");
  } else {
    leftArrow.classList.remove("is-hidden");
    rightArrow.classList.remove("is-hidden");
  }
};

// when I click left, move slides to the left
leftArrow.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = navDots.querySelector(".current-slide");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateNavDots(currentDot, prevDot);
  hideArrow(slides, leftArrow, rightArrow, prevIndex);
});

// When I click right, move slides to the right
rightArrow.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = navDots.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateNavDots(currentDot, nextDot);
  hideArrow(slides, leftArrow, rightArrow, nextIndex);
});

// When I click nav icons move to that image

navDots.addEventListener("click", (e) => {
  // what dot was clicked
  const clickedNavDot = e.target.closest("button");

  if (!clickedNavDot) return;

  const currentSlide = track.querySelector(".current-slide");
  const currentDot = navDots.querySelector(".current-slide");
  const targetIndex = dots.findIndex((dot) => dot === clickedNavDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateNavDots(currentDot, clickedNavDot);
  hideArrow(slides, leftArrow, rightArrow, targetIndex);
});

// Function from CSS Tricks used to simulate a rising pot value
function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}
const obj = document.getElementById("value");
animateValue(obj, 0, 100000, 5000);
const accordionBtns = document.querySelectorAll(".accordion");

// ACCORDION JS
window.addEventListener("DOMContentLoaded", (event) => {
  let buttons = document.querySelectorAll("#accordion button");
  buttons.forEach((button) => {
    let content = button.nextElementSibling;
    button.addEventListener("click", (event) => {
      if (button.classList.contains("active")) {
        button.classList.remove("active");
        button.setAttribute("aria-expanded", false);
        content.style.maxHeight = null;
        content.setAttribute("aria-hidden", true);
      } else {
        button.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
        content.setAttribute("aria-hidden", false);
        button.setAttribute("aria-expanded", true);
      }
    });
  });
});
