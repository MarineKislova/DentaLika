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

  //tabs gallery and contact
  function tabs(selectorTab, selectorContent, selectorParent, activeClass, display = "block") {
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
      tabsContent[i].classList.add("tab-content-active");
      tabsContent[i].style.display = display;
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

  if (document.querySelector(".tab-btn")) {
    tabs(".tab-btn", ".tab-content", ".tab-nav", "tab-btn-active", "grid");
  }

  if (document.querySelector(".contact__tab-btn")) {
    tabs(".contact__tab-btn", ".contact__content", ".contact__tabs", "contact-btn-active", "flex");
  }

  //swiper
  if (document.querySelector("testimornialsSwiper")) {
    swiperTestimornials.update();
  }

  // accordion

  function initAccordion() {
    const items = document.querySelectorAll(".accordion__item");

    items.forEach((item) => {
      const header = item.querySelector(".accordion-toggle");
      const body = item.querySelector(".accordion__item-body");
      const icon = item.querySelector(".accordion-icon");

      header.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        // 1. Закрываем все открытые элементы
        items.forEach((el) => {
          el.classList.remove("active");
          el.querySelector(".accordion__item-body").style.display = "none";
          el.querySelector(".accordion-icon").textContent = "+";
        });

        // 2. Если текущий не был открыт — открываем его
        if (!isOpen) {
          item.classList.add("active");
          body.style.display = "block";
          icon.textContent = "-";
        }
      });
    });
  }

  // Запуск
  initAccordion();

  // Настройка даты для формы записи
  const dateInput = document.getElementById("date");

  if (dateInput) {
    const now = new Date();

    // Смещаем время на часовой пояс пользователя, чтобы дата была точной
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const today = `${year}-${month}-${day}`;

    // Сначала удаляем старый атрибут, если он был, и ставим новый
    dateInput.removeAttribute("min");
    dateInput.setAttribute("min", today);

    // Устанавливаем значение по умолчанию
    dateInput.value = today;

    console.log("Минимальная дата установлена на: " + today); // Для проверки в консоли
  }

  // отправка в телеграмм
  function sendToTelegramm(formId, btnId, statusId) {
    const formElement = document.getElementById(formId);
    if (!formElement) return;

    formElement.addEventListener("submit", async function (e) {
      e.preventDefault();

      const form = this;
      const btn = document.getElementById(btnId);
      const status = document.getElementById(statusId);
      const formData = new FormData(form);

      // Проверка ловушки (если поле заполнено — это бот)
      if (formData.get("honey")) {
        console.warn("Spam detected");
        return;
      }

      btn.disabled = true;
      status.textContent = "Отправка...";

      try {
        const response = await fetch("send.php", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          status.textContent = "Успешно отправлено!";
          form.reset();
        } else {
          status.textContent = "Ошибка при отправке.";
        }
      } catch (error) {
        status.textContent = "Ошибка сети.";
      } finally {
        btn.disabled = false;
      }
    });
  }
  //в телеграмм запись на косультацию
  if (document.getElementById("tg-form")) {
    sendToTelegramm("tg-form", "submit-btn", "status-message");
  }
  

  //в телеграмм запись к врачу
  if (document.getElementById("tg-form-appointment")) {
    sendToTelegramm("tg-form-appointment", "submit-btn-appointment", "status-message-appointment");
  }

  //footer data
  const footerData = document.getElementById("footerYear");
  let currentData = new Date().getFullYear();
  footerData.textContent = currentData;
});
