import * as commonFunctions from "./modules/functions.js";
import { swiperTestimornials } from "./modules/swip.js";

document.addEventListener("DOMContentLoaded", () => {
  "use strict";
  commonFunctions.isWebp();

  //burger
  document.querySelector(".burger").addEventListener("click", function () {
    this.classList.toggle("active");
    document.querySelector(".hamburger").classList.toggle("open");
  });

  //tabs gallery
  function tabs(selectorTab, selectorContent, selectorParent, activeClass) {
    const tabs = document.querySelectorAll(selectorTab);
    const tabsContent = document.querySelectorAll(selectorContent);
    const tabsParent = document.querySelector(selectorParent);

    function hideTabContent() {
      tabsContent.forEach((item) => {
        item.style.display = "none";
      });
      tabs.forEach((item) => {
        item.classList.remove(activeClass);
      });
    }

    function showTabContent(i) {
      tabsContent[i].classList.add('tab-content-active');
      tabsContent[i].style.display = "grid";
      tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent(0);

    tabs.forEach((item, i) => {
      item.addEventListener("click", () => {
        hideTabContent();
        showTabContent(i);
      });
    });

    tabsParent.addEventListener("click", (e) => {
      const target = e.target;
      if (target && target.classList.contains(tabs)) {
        tabs.forEach((item, i) => {
          if (target == item) {
            hideTabContent();
            showTabContent(i);
          }
        });
      }
    });
  }

  tabs(".tab-btn", ".tab-content", ".tab-nav", "tab-btn-active");

  //swiper
  swiperTestimornials.update();

  //footer data
  const footerData = document.getElementById("footerYear");
  let currentData = new Date().getFullYear();
  footerData.textContent = currentData;
});
