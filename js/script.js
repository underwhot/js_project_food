"use strict";

document.addEventListener("DOMContentLoaded", function () {
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

  // Modal window
  const modalWindow = document.querySelector(".modal");
  const modalTImerID = setTimeout(openModal, 99000);

  document.addEventListener("click", (e) => {
    const target = e.target;

    if (target.hasAttribute("data-modal-open")) {
      openModal(modalWindow);
    }

    if (target.hasAttribute("data-modal-close")) {
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
      this.transfer = 37;
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

  new MenuCard(
    "./img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    10,
    ".menu .container"
  ).renderCard();

  new MenuCard(
    "./img/tabs/elite.jpg",
    "elite",
    'Меню "Премиум"',
    'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    15,
    ".menu .container",
    "menu__item",
    "big",
    "additional"
  ).renderCard();

  new MenuCard(
    "./img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    12,
    ".menu .container",
    "menu__item"
  ).renderCard();

  // Forms
  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'Загрузка',
    success: 'Спасибо! Скоро мы в Вами свяжемся',
    failure: 'Упс! Что-то пошло не так...',
  }

  forms.forEach((form) => {
    postData(form);
  }) 

  function postData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;
      form.append(statusMessage);

      const request = new XMLHttpRequest();
      request.open('POST', 'server.php');

      request.setRequestHeader('Content-type', 'application/json');
      const formData = new FormData(form);

      const object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });

      const json = JSON.stringify(object);

      request.send(json);

      request.addEventListener('load', () => {
        if (request.status === 200) {
          console.log(request.response);
          statusMessage.textContent = message.success;
          form.reset();
          setTimeout(() => {
            statusMessage.remove();
          }, 2000);
        } else {
          statusMessage.textContent = message.failure;
        }
      })
    })
  }
});
