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
const intervalTime = 10000;
let slideIndex = 0;

let slideTimerId;
let slideSecTimerId;
function changeSlide(index) {
  // 버튼 클릭으로 Index 변경할 시, 기존 timer kill
  if (slideTimerId) clearTimeout(slideTimerId);

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

  slideTimerId = setTimeout(changeSlide, intervalTime, slideIndex + 1);
}

changeSlide(slideIndex);

function changeGage(slideIndex) {
  let i = 1;
  slideSecTimerId = setInterval(() => {
    const gage = document.querySelector(
      `.section1 .gageBars .gageBar${slideIndex + 1} > .gage`
    );
    const temp = intervalTime / 100;
    gage.style.width = `${(i++ / temp) * 100}%`;
    if (i > 100) clearTimeout(slideSecTimerId);
  }, 100);

  for (let j = 0; j < slideList.childElementCount; j++) {
    const target = document.querySelector(
      `.section1 .gageBars .gageBar${j + 1} > .gage`
    );
    target.style.width = j < slideIndex ? "100%" : "0";
  }
}
