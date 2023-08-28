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
