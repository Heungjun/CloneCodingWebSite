"use strict";

const SHOWING_CLASS = "visibled";
const slideList = document.querySelector(".section1 .banners");
const btnSlidePrev = document.querySelector(
  ".section1 .carouselBtns .carouselBtn1"
);
btnSlidePrev.addEventListener("click", () => {
  clearTimeout(slideSecTimerId);
  changeSlide(slideIndex - 1);
});
const btnSlideNext = document.querySelector(
  ".section1 .carouselBtns .carouselBtn2"
);
btnSlideNext.addEventListener("click", () => {
  clearTimeout(slideSecTimerId);
  changeSlide(slideIndex + 1);
});
const firstSlide = slideList.firstElementChild;
const lastSlide = slideList.lastElementChild;
const infoNstate = document.querySelector(
  ".section1 .gageBars .infoNstate .pageInfo"
);
infoNstate.parentElement
  .getElementsByClassName("state")[0]
  .addEventListener("click", (event) => {
    const state = event.target.dataset.state;
    if (state == "running") {
      if (slideTimerId) clearTimeout(slideTimerId);
      if (slideSecTimerId) clearTimeout(slideSecTimerId);
      event.target.src = "img/icon_play.png";
      event.target.dataset.state = "stopped";
    } else {
      const gage = document.querySelector(
        `.section1 .gageBars .gageBar${slideIndex + 1} > .gage`
      );
      const width = gage.style.width.replace("%", "");
      changeGage(slideIndex, parseInt(width) + 1);
      event.target.src = "img/icon_stop.png";
      event.target.dataset.state = "running";
    }
  });
const intervalTime = 10000;
let slideIndex = 0;

let slideTimerId;
let slideSecTimerId;
function changeSlide(index) {
  // currentSlide: 현재 슬라이드 Element default:lastSlide (아래 로직에서 first로 변경함.)
  const currentSlide =
    document.querySelector(`.section1 .banners .${SHOWING_CLASS}`) ?? lastSlide;
  currentSlide.classList.remove(SHOWING_CLASS);

  //   index validation
  if (index < 0) {
    slideIndex = slideList.childElementCount - 1;
  } else if (index >= slideList.childElementCount) {
    //   } else if (index >= 1) {
    slideIndex = 0;
  } else {
    slideIndex = index;
  }

  const nextSlide = document.querySelector(
    `.section1 .banners .banner${slideIndex + 1}`
  );
  nextSlide.classList.add(SHOWING_CLASS);
  infoNstate.innerHTML = `${slideIndex + 1} / 4`;

  //   if (slideIndex) {
  //     nextSlide = currentSlide.previousElementSibling ?? lastSlide;
  //   } else {
  //     nextSlide = currentSlide.nextElementSibling ?? firstSlide;
  //   }

  //   slideIndex = [].indexOf.call(nextSlide.parentNode.children, nextSlide) + 1;

  changeGage(slideIndex);
}

changeSlide(slideIndex);

function changeGage(slideIndex, startTime = 1) {
  if (slideSecTimerId) clearTimeout(slideSecTimerId);
  let i = startTime;
  slideSecTimerId = setInterval(() => {
    const gage = document.querySelector(
      `.section1 .gageBars .gageBar${slideIndex + 1} > .gage`
    );
    const temp = intervalTime / 100;
    gage.style.width = `${(i++ / temp) * 100}%`;

    console.log(i);
    if (i > temp) {
      clearTimeout(slideSecTimerId);
      changeSlide(slideIndex + 1);
    }
  }, 100);

  for (let j = 0; j < slideList.childElementCount; j++) {
    const target = document.querySelector(
      `.section1 .gageBars .gageBar${j + 1} > .gage`
    );
    target.style.width = j < slideIndex ? "100%" : "0";
  }
}
