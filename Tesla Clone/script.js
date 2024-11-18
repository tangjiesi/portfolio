const sections = document.querySelectorAll(".home");
const title = document.querySelector(".car_model_title");
const paragraph = document.querySelector(".car_model_paragraph");
const link = document.querySelector(".car_model_link");
const left_btn = document.querySelector(".home_button_order");
const right_btn = document.querySelector(".home_button_exist");
const main = document.querySelector("main");

class Page {
  constructor(
    _sections,
    _title,
    _paragraph1,
    _paragraph2,
    _link,
    _left_btn,
    _right_btn
  ) {
    this.sections = _sections;
    this.title = _title;
    this.paragraph1 = _paragraph1;
    this.paragraph2 = _paragraph2;

    this.link = _link;
    this.left_btn = _left_btn;
    this.right_btn = _right_btn;
  }
}

let page = new Page(sections, title, paragraph, link, left_btn, right_btn);

const createObserver = function (elements) {
  let options = {
    root: null,
    threshold: 0.5,
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver(handleIntersect, options);

  elements.forEach((element) => {
    observer.observe(element);
  });
};

const handleIntersect = function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let current_id = entry.target.id;
      switch (current_id) {
        case "model-s":
          page.title = "Model S";
          page.paragraph1 = "限時利率最低達 2.08%";
          page.paragraph2 = "或指定財務方案月付最低 $26,910 起";
          page.link = "立即預約試駕";
          page.left_btn = "立即訂購";
          page.right_btn = "了解更多內容";
          break;
        case "model-y":
          page.title = "Model Y";
          page.paragraph1 = "指定車款及期數享限時最低 0 利率起";
          page.paragraph2 = "或指定首付方案月付最低 $9,999 起";
          break;
        case "model-3":
          page.title = "Model 3";

          break;
        case "model-x":
          page.title = "Model X";
          page.paragraph1 = "限時利率最低達 2.08%";
          page.paragraph2 = "或指定財務方案月付最低 $29,780 起";
          page.link = "立即預約試駕";
          page.left_btn = "立即訂購";
          page.right_btn = "了解更多內容";
          break;
        case "solar-panels":
          page.title = "太陽能發電系統";
          page.paragraph1 = "全方位能源供應";
          page.paragraph2 = "";
          page.link = "";
          break;
        case "solar-roof":
          page.title = "精品配件";
          page.paragraph1 = "";
          break;
        default:
          break;
      }

      title.textContent = page.title;
      paragraph.childNodes[0].textContent = page.paragraph1;
      paragraph.childNodes[2].textContent = page.paragraph2;
      paragraph.childNodes[3].textContent = page.link;
      left_btn.childNodes[1].textContent = page.left_btn;
      right_btn.childNodes[1].textContent = page.right_btn;
    }
  });
};

createObserver(sections);

main.addEventListener("scroll", (e) => {
  let viewHeight = e.currentTarget.offsetHeight;
  let currentOffset = e.currentTarget.scrollTop % viewHeight;
  let opacityValue = Math.abs(1 - currentOffset / (viewHeight / 2));

  title.style.opacity = opacityValue;
  paragraph.style.opacity = opacityValue;
  link.style.opacity = opacityValue;
  left_btn.style.opacity = opacityValue;
  right_btn.style.opacity = opacityValue;
});
