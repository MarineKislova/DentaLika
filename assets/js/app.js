import * as commonFunctions from "./modules/functions.js";
import { swiperTestimornials } from "./modules/swip.js";

document.addEventListener("DOMContentLoaded", () => {
  "use strict";
  commonFunctions.isWebp();

  //burger
  // Сохраняем элементы в переменные для удобства
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".hamburger");
  const menuLinks = document.querySelectorAll(".hamburger a"); // Выбираем все ссылки внутри меню

  // Логика открытия/закрытия по кнопке
  burger.addEventListener("click", function () {
    this.classList.toggle("active");
    menu.classList.toggle("open");
  });

  // Закрытие меню при клике на ссылку (якорь)
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      burger.classList.remove("active");
      menu.classList.remove("open");
    });
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
  if (document.querySelector(".testimornialsSwiper")) {
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

  // ЛОГИКА ПЕРЕВОДА: Если не RU и не UA — предлагаем English
  const userLang = navigator.language || navigator.userLanguage;
  console.log("Detected browser language:", userLang);

  // Проверяем: если в языке браузера НЕТ "ru" И НЕТ "uk" (украинский)
  if (!userLang.includes("uk") && !userLang.includes("ru")) {
    const translateOverlay = document.createElement("div");
    translateOverlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.6); z-index: 10000;
        display: flex; align-items: center; justify-content: center;
        backdrop-filter: blur(4px);
    `;

    translateOverlay.innerHTML = `
        <div style="background:#fff; padding:40px 30px; border-radius:16px; box-shadow:0 20px 40px rgba(0,0,0,0.4); max-width:420px; text-align:center; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; position: relative;">
            <button id="closeTranslate" style="position:absolute; top:15px; right:15px; background:none; border:none; color:#ccc; font-size:24px; cursor:pointer; line-height:1;">✕</button>
            
            <div style="font-size: 40px; margin-bottom: 15px;">🌐</div>
            <h3 style="margin:0 0 10px; color:#111; font-size:22px;">Switch to English?</h3>
            <p style="margin:0 0 25px; color:#555; font-size:16px; line-height:1.5;">It looks like you're visiting from abroad. Would you like to translate this page into English?</p>
            
            <button id="goTranslate" style="background:#007bff; color:#fff; border:none; padding:14px; border-radius:8px; cursor:pointer; font-weight:600; width:100%; font-size:16px; transition: background 0.3s;">Translate to English</button>
            <button id="noThanks" style="background:none; border:none; color:#007bff; margin-top:15px; cursor:pointer; font-size:14px; text-decoration:underline;">No, stay on origin langua</button>
        </div>
    `;
    document.body.appendChild(translateOverlay);

    // Функция самого перевода
    const startTranslation = () => {
      const currentUrl = window.location.href;
      // sl=auto (автоопределение оригинала) или sl=uk (явно указать украинский)
      // tl=en (всегда переводить НА английский)
      window.location.href = `https://translate.google.com/translate?sl=uk&tl=en&u=${encodeURIComponent(currentUrl)}`;
    };

    document.getElementById("goTranslate").addEventListener("click", startTranslation);

    // Закрытие (три варианта: крестик, кнопка "нет" или клик мимо окна)
    const closeBanner = () => translateOverlay.remove();
    document.getElementById("closeTranslate").addEventListener("click", closeBanner);
    document.getElementById("noThanks").addEventListener("click", closeBanner);
    translateOverlay.addEventListener("click", (e) => {
      if (e.target === translateOverlay) closeBanner();
    });
  }
});
