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
  // Get current date + 2 days;
  // function getNextDays() {
  //   const year = new Date().getFullYear(),
  //     month = new Date().getMonth(),
  //     day = new Date().getDate();

  //   return `${year}-${month + 1}-${day + 20}`;
  // }

  // const deadline = getNextDays();
  const deadline = "2023-12-31";

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

  setClock(".timer", deadline);
});
