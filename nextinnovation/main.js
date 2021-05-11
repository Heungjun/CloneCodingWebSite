"use strict";

// HTML - Swiper
const SLIDE_SHOW = "swiper-slides__list--now";
const slideList = document.querySelector(".swiper-slides");
const slideFirst = slideList.firstElementChild;
const slideLast = slideList.lastElementChild;

// JS - Swiper
let slideIndex = 0;
const slideInterval = 5000;
let slideTimerId = setTimeout(slideChangeNext, slideInterval);

// HTML - Append
slideList.appendChild(slideFirst.cloneNode(true));
slideList.insertBefore(slideLast.cloneNode(true), slideFirst);
changeSlideList();

// addEvent
const swiperSlidesUp = document.querySelectorAll(
  ".swiper-slides__button > :first-child"
);
swiperSlidesUp.forEach(function (element) {
  element.addEventListener("click", () => {
    if (slideTimerId) clearTimeout(slideTimerId);

    slideIndex--;
    changeSlideList();

    if (slideIndex < 0) {
      slideIndex = slideList.childElementCount - 2;
      slideList.style.transitionDuration = "0ms";
      setTimeout(changeSlideList, 700);

      slideList.style.transitionDuration = "1000ms";
    }

    slideTimerId = setTimeout(slideChangeNext, slideInterval);
  });
});
const swiperSlidesDown = document.querySelectorAll(
  ".swiper-slides__button > :last-child"
);
swiperSlidesDown.forEach(function (element) {
  element.addEventListener("click", slideChangeNext);
});

function slideChangeNext() {
  if (slideTimerId) clearTimeout(slideTimerId);

  slideIndex++;
  changeSlideList();
  if (slideIndex >= 3) {
    slideIndex = 0;
    changeSlideList();
  }

  slideTimerId = setTimeout(slideChangeNext, slideInterval);
}

function changeSlideList() {
  slideList.style.transform = `translate3d(0px, ${
    -100 * (slideIndex + 1)
  }vh, 0px)`;
}
