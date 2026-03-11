import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export const swiperTestimornials = new Swiper('[data-swiper="testimornialsSwiper"]', {
  modules: [Navigation, Pagination, Autoplay],
  // Optional parameters
  loop: true,
  speed: 1000,
  simulateTouch: true,
  centeredSlides: true,
  spaceBetween: 10,
  roundLengths: true,

  breakpoints: {
    // Когда ширина экрана >= 1024px
    1024: {
      slidesPerView: 3,
      spaceBetween: 10,
    },

    // Когда ширина экрана >= 768px
    768: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    // Когда ширина экрана >= 320px
    320: {
      slidesPerView: 1.2,
      spaceBetween: 20,
    },
  },

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
    dynamicBullets: true,
  },

  // If we need navination buttons
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // Autoplay
  // autoplay: {
  //   delay: 2500,
  //   disableOnInteraction: false,
  //   stopOnLastSlide: false,
  // },

  // speed: 4000,
});
