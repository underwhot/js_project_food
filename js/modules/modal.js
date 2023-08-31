function openModal(modalSelector, modalTimerId) {
  const modalWindow = document.querySelector(modalSelector);

  modalWindow.classList.add("fade");
  modalWindow.classList.add("active");
  document.body.style.overflow = "hidden";

  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function closeModal(modalSelector) {
  const modalWindow = document.querySelector(modalSelector);

  modalWindow.classList.remove("fade");
  modalWindow.classList.remove("active");
  document.body.style.overflow = "";
}

function modal(modalSelector, modalTimerId) {
  // Modal window
  const modalWindow = document.querySelector(modalSelector);

  document.addEventListener("click", (e) => {
    const target = e.target;

    if (target.hasAttribute("data-modal-open")) {
      openModal(modalSelector, modalTimerId);
    }

    if (
      target.hasAttribute("data-modal-close") ||
      target.getAttribute("data-close") === ""
    ) {
      closeModal(modalSelector);
    }

    if (target === modalWindow) {
      closeModal(modalSelector);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalWindow.classList.contains("active")) {
      closeModal(modalSelector);
    }
  });

  function openModalByScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", openModalByScroll);
    }
  }

  window.addEventListener("scroll", openModalByScroll);
}

export default modal;
export { closeModal, openModal };
