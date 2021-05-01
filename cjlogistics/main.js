"use strict";

const SHOWING_CLASS = "visibled";
const slideList = document.querySelector(".section1 .banners");
const btnSlidePrev = document.querySelector(
  ".section1 .carouselBtns .carouselBtn1"
);
btnSlidePrev.addEventListener("click", () => changeSlide(true));
const btnSlideNext = document.querySelector(
  ".section1 .carouselBtns .carouselBtn2"
);
const firstSlide = slideList.firstElementChild;
const lastSlide = slideList.lastElementChild;
const intervalTime = 10000;

function changeSlide(isPrev) {
  const currentSlide =
    document.querySelector(`.section1 .banners .${SHOWING_CLASS}`) ??
    firstSlide;
  let nextSlide;

  currentSlide.classList.remove(SHOWING_CLASS);

  if (isPrev) {
    nextSlide = currentSlide.previousElementSibling ?? lastSlide;
  } else {
    nextSlide = currentSlide.nextElementSibling ?? firstSlide;
  }

  nextSlide.classList.add(SHOWING_CLASS);
}

changeSlide();
setInterval(changeSlide, intervalTime);
