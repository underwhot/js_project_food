/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc() {
  // Calc
  const result = document.querySelector(".calculating__result span");
  let sex, height, weight, age, ratio;

  if (localStorage.getItem("sex")) {
    sex = localStorage.getItem("sex");
  } else {
    sex = "female";
    localStorage.setItem("sex", "female");
  }

  if (localStorage.getItem("ratio")) {
    ratio = localStorage.getItem("ratio");
  } else {
    ratio = "1.375";
    localStorage.setItem("ratio", "1.375");
  }

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.classList.remove(activeClass);
      if (elem.getAttribute("id") === localStorage.getItem("sex")) {
        elem.classList.add(activeClass);
      }

      if (elem.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
        elem.classList.add(activeClass);
      }
    });
  }

  initLocalSettings("#gender div", "calculating__choose-item_active");
  initLocalSettings(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = "N/A";
      return;
    }

    if (sex === "female") {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }

  calcTotal();

  function getStaticInfo(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        const target = e.target;

        if (target.getAttribute("data-ratio")) {
          ratio = +target.getAttribute("data-ratio");
          localStorage.setItem("ratio", +target.getAttribute("data-ratio"));
        } else {
          sex = target.getAttribute("id");
          localStorage.setItem("sex", target.getAttribute("id"));
        }

        elements.forEach((elem) => {
          elem.classList.remove(activeClass);
        });

        target.classList.add(activeClass);

        calcTotal();
      });
    });
  }

  getStaticInfo("#gender div", "calculating__choose-item_active");
  getStaticInfo(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  function getDynamicInfo(selector) {
    const input = document.querySelector(selector);

    input.addEventListener("input", () => {
      if (input.value.match(/\D/g)) {
        input.style.border = "1px solid red";
      } else {
        input.style.border = "none";
      }

      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }

      calcTotal();
    });
  }

  getDynamicInfo("#height");
  getDynamicInfo("#weight");
  getDynamicInfo("#age");
}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
  // Menu cards class
  class MenuCard {
    constructor(imgSrc, alt, title, desc, price, parentSelector, ...classes) {
      this.imgSrc = imgSrc;
      this.alt = alt;
      this.title = title;
      this.desc = desc;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.classes = classes;
      this.transfer = 40;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    renderCard() {
      const elem = document.createElement("div");
      if (this.classes.length === 0) {
        this.elem = "menu__item";
        elem.classList.add(this.elem);
      } else {
        this.classes.forEach((className) => elem.classList.add(className));
      }
      elem.innerHTML = `
      <img src=${this.imgSrc} alt=${this.alt} >
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">${this.desc}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
      </div>
    `;

      this.parent.append(elem);
    }
  }

  const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getResource("http://localhost:3000/menu").then((data) => {
    data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).renderCard();
    });
  });
}

module.exports = cards;


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
  // Forms
  const forms = document.querySelectorAll("form");

  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо! Скоро мы в Вами свяжемся",
    failure: "Упс! Что-то пошло не так...",
  };

  forms.forEach((form) => {
    bindPostData(form);
  });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data,
    });

    return await res.json();
  };

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;
    `;
      // form.append(statusMessage);
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hidden");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
    <div class="modal__content">
      <div class="modal__close" data-close>×</div>
      <div class="modal__title">${message}</div>
    </div>
  `;

    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hidden");
      closeModal();
    }, 4000);
  }
}

module.exports = forms;


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
  // Modal window
  const modalWindow = document.querySelector(".modal");
  const modalTImerID = setTimeout(openModal, 99000);

  document.addEventListener("click", (e) => {
    const target = e.target;

    if (target.hasAttribute("data-modal-open")) {
      openModal(modalWindow);
    }

    if (
      target.hasAttribute("data-modal-close") ||
      target.getAttribute("data-close") === ""
    ) {
      closeModal(modalWindow);
    }

    if (target === modalWindow) {
      closeModal(modalWindow);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalWindow.classList.contains("active")) {
      closeModal(modalWindow);
    }
  });

  function openModal(modalEl = modalWindow) {
    modalEl.classList.add("fade");
    modalEl.classList.add("active");
    document.body.style.overflow = "hidden";
    clearInterval(modalTImerID);
  }

  function closeModal(modalEl = modalWindow) {
    modalEl.classList.remove("fade");
    modalEl.classList.remove("active");
    document.body.style.overflow = "";
  }

  function openModalByScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal(modalWindow);
      window.removeEventListener("scroll", openModalByScroll);
    }
  }

  window.addEventListener("scroll", openModalByScroll);
}

module.exports = modal;


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
  // Slider
  const slides = document.querySelectorAll(".offer__slide"),
    slider = document.querySelector(".offer__slider"),
    prevSlide = document.querySelector(".offer__slider-prev"),
    nextSlide = document.querySelector(".offer__slider-next"),
    totalCount = document.querySelector("#total"),
    currentCount = document.querySelector("#current"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    slidesField = document.querySelector(".offer__slider-inner"),
    slideWidth = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  currentCount.textContent = addZeroBeforeNum(slideIndex);
  totalCount.textContent = addZeroBeforeNum(slides.length);

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";
  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = slideWidth;
  });

  slider.style.position = "relative";

  const indicators = document.createElement("ol"),
    dots = [];
  indicators.classList.add("carousel-indicators");
  indicators.style.cssText = `
position: absolute;
right: 0;
bottom: 0;
left: 0;
z-index: 15;
display: flex;
justify-content: center;
margin-right: 15%;
margin-left: 15%;
list-style: none;
`;
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.style.cssText = `
  box-sizing: content-box;
  flex: 0 1 auto;
  width: 30px;
  height: 6px;
  margin-right: 3px;
  margin-left: 3px;
  cursor: pointer;
  background-color: #fff;
  background-clip: padding-box;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  opacity: .5;
  transition: opacity .6s ease;
`;

    if (i === 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
  }

  nextSlide.addEventListener("click", () => {
    if (offset === getOnlyDigits(slideWidth) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += getOnlyDigits(slideWidth);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex >= slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    currentCount.textContent = addZeroBeforeNum(slideIndex);

    renderDots(dots);
  });

  prevSlide.addEventListener("click", () => {
    if (offset === 0) {
      offset = getOnlyDigits(slideWidth) * (slides.length - 1);
    } else {
      offset -= getOnlyDigits(slideWidth);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex <= 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    currentCount.textContent = addZeroBeforeNum(slideIndex);

    renderDots(dots);
  });

  function addZeroBeforeNum(num) {
    return num < 10 ? `0${num}` : num;
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");

      slideIndex = slideTo;
      offset = getOnlyDigits(slideWidth) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      currentCount.textContent = addZeroBeforeNum(slideIndex);

      renderDots(dots);
    });
  });

  function renderDots(dots) {
    dots.forEach((dot) => (dot.style.opacity = "0.5"));
    dots[slideIndex - 1].style.opacity = 1;
  }

  function getOnlyDigits(str) {
    return +str.replace(/\D/g, "");
  }
}

module.exports = slider;


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
  // Tabs
  const tabItems = document.querySelectorAll(".tabcontent"),
    tabBtns = document.querySelectorAll(".tabheader__item");

  hideTabContent();
  showTabContent();

  document.addEventListener("click", function (e) {
    const target = e.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabBtns.forEach(function (item, i) {
        if (target === item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  function hideTabContent() {
    tabItems.forEach(function (tab) {
      tab.classList.add("hidden");
      tab.classList.remove("fade");
    });

    tabBtns.forEach(function (btn) {
      btn.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabItems[i].classList.remove("hidden");
    tabItems[i].classList.add("fade");
    tabBtns[i].classList.add("tabheader__item_active");
  }
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
  // Timer
  const deadline = "2023-12-31";

  setClock(".timer", deadline);

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());

    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((t / 1000 / 60) % 60);
      seconds = Math.floor((t / 1000) % 60);
    }

    return {
      total: t,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }
}

module.exports = timer;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/


document.addEventListener("DOMContentLoaded", function () {
  const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
    modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
    timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
    cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
    calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
    forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
    slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");

  tabs();
  modal();
  timer();
  cards();
  calc();
  forms();
  slider();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map