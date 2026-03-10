
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

export const swiperTestimornials = new Swiper('[data-swiper="testimornialsSwiper"]', {
  modules: [Navigation, Pagination, Autoplay],
  // Optional parameters
  loop: true,
  slidesPerView: 1,
  speed: 1000,
  simulateTouch: false,
  centeredSlides: false,
  spaceBetween: 20,
  roundLengths: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: false,
    dynamicBullets: true,
  },

  // Autoplay
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
    stopOnLastSlide: false,
  },

  speed: 4000,
});