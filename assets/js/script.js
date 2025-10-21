'use strict';

// element toggle function (defensive)
const elementToggleFunc = function (elem) { if (elem) elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile (only if button exists)
if (sidebarBtn) sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables (may be empty)
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function (defensive)
const testimonialsModalFunc = function () {
  if (modalContainer) modalContainer.classList.toggle("active");
  if (overlay) overlay.classList.toggle("active");
}

// add click event to all modal items
if (testimonialsItem && testimonialsItem.length) {
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      const avatar = this.querySelector("[data-testimonials-avatar]");
      if (modalImg && avatar) {
        modalImg.src = avatar.src || "";
        modalImg.alt = avatar.alt || "";
      }
      if (modalTitle) modalTitle.innerHTML = this.querySelector("[data-testimonials-title]")?.innerHTML || "";
      if (modalText) modalText.innerHTML = this.querySelector("[data-testimonials-text]")?.innerHTML || "";
      testimonialsModalFunc();
    });
  }
}

if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables (defensive)
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]"); // keep original selector name
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
if (selectItems && selectItems.length) {
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      if (typeof filterFunc === "function") filterFunc(selectedValue);
    });
  }
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  if (!filterItems) return;
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen (defensive)
let lastClickedBtn = filterBtn && filterBtn.length ? filterBtn[0] : null;
if (filterBtn && filterBtn.length) {
  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      filterFunc(selectedValue);
      if (lastClickedBtn) lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (formInputs && formInputs.length) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form && form.checkValidity()) {
        if (formBtn) formBtn.removeAttribute("disabled");
      } else {
        if (formBtn) formBtn.setAttribute("disabled", "");
      }
    });
  }
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link (defensive)
if (navigationLinks && navigationLinks.length) {
  for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function () {
      for (let j = 0; j < pages.length; j++) {
        if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
          pages[j].classList.add("active");
          navigationLinks[j].classList.add("active");
          window.scrollTo(0, 0);
        } else {
          pages[j].classList.remove("active");
          navigationLinks[j].classList.remove("active");
        }
      }
    });
  }
}

// Theme toggle: persist choice and update icon (run after DOM ready)
document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  const saved = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved ? saved : (systemPrefersDark ? 'dark' : 'light');

  root.setAttribute('data-theme', initial);

  function updateIcon(theme) {
    if (!toggleBtn) return;
    const icon = toggleBtn.querySelector('ion-icon');
    if (!icon) return;
    icon.setAttribute('name', theme === 'light' ? 'sunny-outline' : 'moon-outline');
  }

  updateIcon(initial);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateIcon(next);
    });
  }
});
