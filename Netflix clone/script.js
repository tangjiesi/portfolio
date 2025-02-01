const body = document.querySelector("body");
const quesBtn = document.querySelectorAll("li .ques");
const inputEmail = document.querySelectorAll(".input-address");
const startBtn = document.querySelector(".start-btn");
const links = document.querySelectorAll("a");
const movieRank = document.querySelector(".movie-ranking");
const ranks = document.querySelector(".ranks");
const rank = document.querySelectorAll(".rank");
const prevContainer = document.querySelector(".prev-btn");
const nextContainer = document.querySelector(".next-btn");
const rankBtn = document.querySelectorAll(".btn button");
const closeBtns = document.querySelectorAll(".pic button");
const overlay = document.querySelector(".overlay");

links.forEach((link) =>
  link.addEventListener("click", (e) => {
    e.preventDefault();
  })
);

function btnRankHandler() {
  // 左邊btn 如果滑動大於0則出現 否則不出現
  if (this.scrollLeft > 0) {
    prevContainer.style.transform = "translateX(0)";
  } else {
    prevContainer.style.transform = "";
  }

  // 右邊btn 如果滑動到最右邊則不出現 否則出現
  if (this.scrollLeft + this.clientWidth >= this.scrollWidth) {
    nextContainer.style.transform = "translateX(100%)";
  } else {
    nextContainer.style.transform = "";
  }
}

ranks.addEventListener("scroll", btnRankHandler);

// 計算寬度加上before突出
const rankWidth = document.querySelector(".rank").offsetWidth + 10;

function rankMoveBtn() {
  const scrollMove = Math.floor(ranks.clientWidth / rankWidth) * rankWidth;
  if (this.dataset.btn === "prev") {
    ranks.scrollLeft -=
      scrollMove -
      (ranks.scrollLeft + ranks.clientWidth >= ranks.scrollWidth ? 26 : 0);
    // 如果滑動到最右邊就 -36+10 否則 -0
    // 36為btn的寬度 +10為單邊margin
  } else {
    ranks.scrollLeft += scrollMove - (ranks.scrollLeft > 0 ? 0 : 36);
    // 如果滑動不在最左邊就 -0 否則 -36
    // 36為btn的寬度
  }
}

rankBtn.forEach((btn) => btn.addEventListener("click", rankMoveBtn));

// popup

let isPopup = false;
let popupEl;

function popupActive() {
  popupEl = document.querySelector(`[data-no="${this.dataset.text}"]`);
  console.log(popupEl);
  popupEl.classList.add("popup--active");
  body.style.overflowY = "hidden";
  isPopup = true;
}

function closePopup() {
  if (!isPopup) return;
  popupEl.classList.remove("popup--active");
  body.style.overflowY = "";
  isPopup = false;
}

rank.forEach((rank) => rank.addEventListener("click", popupActive));

closeBtns.forEach((btn) => btn.addEventListener("click", closePopup));

overlay.addEventListener("click", closePopup);

// 節流降地事件觸發頻率 減緩效能
function throttle(func, delay) {
  let lastTime = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastTime >= delay) func(...args);
    lastTime = now;
  };
}
// 紀錄是否正在觀察
let isObserving = false;

function resizeHandler() {
  // 大於600不觀察
  if (window.innerWidth > 600) {
    // 大於600清除active
    startBtn.classList.remove("start-btn--active");
    if (isObserving) {
      stopObserving();
    }
    return;
  }

  // 小於等於600且尚未觀察 啟動觀察
  if (!isObserving) {
    startObserving();
  }
}

function startBtnHandler() {
  // 取得視窗的頂部與底部位置
  const windowTop = 0;
  const windowBottom = window.innerHeight;

  inputEmail.forEach((input) => {
    const rect = input.getBoundingClientRect();

    if (Math.floor(rect.bottom) <= windowTop) {
      // 當元素的底部超過視窗頂部
      startBtn.classList.add("start-btn--active");
    } else if (Math.floor(rect.top) < windowBottom) {
      // 當元素的頂部進入視窗
      startBtn.classList.remove("start-btn--active");
    }
  });
}

// 啟動 EventListener
function startObserving() {
  // 先執行一次以確保視窗小於600時能正常執行
  startBtnHandler();
  const throttleHandler = throttle(startBtnHandler, 16); // 1000ms / 60hz
  window.addEventListener("scroll", throttleHandler);
  isObserving = true;
}

// 移除 EventListener
function stopObserving() {
  window.removeEventListener("scroll", startBtnHandler);
  isObserving = false;
}

const throttleHandler = throttle(resizeHandler, 16);
window.addEventListener("resize", throttleHandler);
resizeHandler();

// 常見問題手風琴功能

function questionHandler(e) {
  e.preventDefault();
  if (this.classList.contains("ques--active")) {
    this.classList.remove("ques--active");
  } else {
    quesBtn.forEach((btn) => {
      btn.classList.remove("ques--active");
    });

    this.classList.add("ques--active");
  }
}

quesBtn.forEach((btn) => btn.addEventListener("click", questionHandler));
