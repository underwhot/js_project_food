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
