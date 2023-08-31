function tabs(tabsSelector, tabsContentSelector, activeClass) {
  // Tabs
  const tabItems = document.querySelectorAll(tabsSelector),
    tabBtns = document.querySelectorAll(tabsContentSelector);

  hideTabContent();
  showTabContent();

  document.addEventListener("click", function (e) {
    const target = e.target;

    if (target && target.classList.contains(tabsContentSelector.slice(1))) {
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
      btn.classList.remove(activeClass);
    });
  }

  function showTabContent(i = 0) {
    tabItems[i].classList.remove("hidden");
    tabItems[i].classList.add("fade");
    tabBtns[i].classList.add(activeClass);
  }
}

export default tabs;