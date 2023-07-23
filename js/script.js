"use strict";

document.addEventListener("DOMContentLoaded", function () {
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
});
