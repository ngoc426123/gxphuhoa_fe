import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

@Plugin({
  options: {
    default: {

    }
  }
})
export default class SlideVideoHome {
  init() {
    this.initDOM();
    this.handleEvents();
  }

  initDOM() {
    this.$swiper = this.$element.find('.swiper');
  }

  handleEvents() {
    this.swiper = new Swiper(this.$swiper[0], {
      slidesPerView: 2,
      spaceBetween: 10,
      breakpoints: {
        768: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        991: {
          slidesPerView: 4,
          spaceBetween: 20
        }
      }
    });
  }
}