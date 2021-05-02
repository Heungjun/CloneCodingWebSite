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
btnSlideNext.addEventListener("click", () => changeSlide());
const firstSlide = slideList.firstElementChild;
const lastSlide = slideList.lastElementChild;
const infoNstate = document.querySelector(
  ".section1 .gageBars .infoNstate .pageInfo"
);
const intervalTime = 10000;

function changeSlide(isPrev) {
  if (slideTimerId) clearTimeout(slideTimerId);
  const currentSlide =
    document.querySelector(`.section1 .banners .${SHOWING_CLASS}`) ?? lastSlide;

  currentSlide.classList.remove(SHOWING_CLASS);

  let nextSlide;
  if (isPrev) {
    nextSlide = currentSlide.previousElementSibling ?? lastSlide;
  } else {
    nextSlide = currentSlide.nextElementSibling ?? firstSlide;
  }

  let index = [].indexOf.call(nextSlide.parentNode.children, nextSlide) + 1;
  changeIndex(index);

  let i = 1;
  let slideSecTimerId = setInterval(() => {
    const gage = document.querySelector(
      `.section1 .gageBars .gageBar${index} > .gage`
    );
    console.log(i);
    gage.style.width = `${(i++ * 100000) / intervalTime}%`;
    if (i > 10) clearTimeout(slideSecTimerId);
  }, 1000);

  nextSlide.classList.add(SHOWING_CLASS);
  slideTimerId = setTimeout(changeSlide, intervalTime);
}

let slideTimerId;
changeSlide();
// setInterval(changeSlide, intervalTime);

function changeIndex(index) {
  infoNstate.innerHTML = `${index} / 4`;
}
