"use strict";

import tabs from "./modules/tabs";
import modal from "./modules/modal";
import timer from "./modules/timer";
import cards from "./modules/cards";
import calc from "./modules/calc";
import forms from "./modules/forms";
import slider from "./modules/slider";
import { openModal } from "./modules/modal";

document.addEventListener("DOMContentLoaded", function () {
  const modalTimerId = setTimeout(
    () => openModal(".modal", modalTimerId),
    99000
  );

  tabs(".tabcontent", ".tabheader__item", "tabheader__item_active");
  modal(".modal", modalTimerId);
  timer(".timer", "2023-12-31");
  cards();
  calc();
  forms("form", modalTimerId);
  slider({
    container: ".offer__slider",
    wrapper: ".offer__slider-wrapper",
    slide: ".offer__slide",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    totalCounter: "#total",
    currentCounter: "#current",
    field: ".offer__slider-inner",
  });
});
