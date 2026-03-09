import * as commonFunctions from "./modules/functions.js";

document.addEventListener("DOMContentLoaded", () => {
  "use strict";
  commonFunctions.isWebp();

  document.querySelector(".burger").addEventListener("click", function () {
    this.classList.toggle("active");
    document.querySelector(".hamburger").classList.toggle("open");
  });

  //footer data
  const footerData = document.getElementById("footerYear");
  let currentData = new Date().getFullYear();
  footerData.textContent = currentData;
});
