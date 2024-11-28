const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const slides = document.querySelectorAll(".slide");
const btn = document.querySelector(".btn");

btn.addEventListener("click", function (e) {
  e.preventDefault();
});

let currSlide = 0;

const removeActive = function () {
  slides.forEach((slide) => slide.classList.remove("active"));
};

const nextSlide = function () {
  removeActive();
  if (currSlide === slides.length - 1) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  slides[currSlide].classList.add("active");
};

const prevSlide = function () {
  removeActive();

  if (currSlide === 0) {
    currSlide = slides.length - 1;
  } else {
    currSlide--;
  }
  slides[currSlide].classList.add("active");
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);
