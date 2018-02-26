import slick from 'slick-carousel';
import { $window, css, Resp } from '../modules/dev/_helpers';

class Slider {

  constructor() {
    this.$sliderBlock = $('.slider');
    this.$mobileSlider = $('.js-mobile-slider');

    this.init();
  }

  init() {
    this.createSlider();
    this.disableVideoLoad();
    // this.createMobileSlider();
  }

  createMobileSlider() {
    this.$mobileSlider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      infinite: true,
      arrows: false,
      speed: 400,
      cssEase: 'cubic-bezier(0.74, 0.1, 0.32, 0.98)',
      useTransform: true,
      adaptiveHeight: true,
      mobileFirst: true,
      accessibility: false,
      rows: 0,
      responsive: [
        {
          breakpoint: 767,
          settings: 'unslick'
        }
      ]
    });
  }

  createSlider() {
    const _this = this;
    const arrLeft = `<svg class="icon icon-arr-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 93.06 42.5">
    <polygon points="1.14 22.38 20.98 42.5 23.75 39.69 7.56 23.26 93.06 23.26 93.06 19.21 7.57 19.21 23.79 2.82 21 0 0 21.23 1.14 22.38"/>
</svg>`;
    const arrRight = `<svg class="icon icon-arr-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 93.06 42.5">
    <polygon points="91.92 20.12 72.08 0 69.31 2.82 85.5 19.24 0 19.24 0 23.29 85.49 23.29 69.27 39.68 72.06 42.5 93.06 21.27 91.92 20.12"/>
</svg>`;

    this.$sliderBlock.each(function () {
      const $slider = $(this).find('.js-slider');

      $slider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        infinite: true,
        arrows: true,
        speed: 800,
        cssEase: 'cubic-bezier(0.74, 0.1, 0.32, 0.98)',
        useTransform: true,
        adaptiveHeight: true,
        accessibility: false,
        swipe: true,
        rows: 0,
        prevArrow: `<button type="button" class="slider__btn slider-btn_prev">${arrLeft}</button>`,
        nextArrow: `<button type="button" class="slider__btn slider-btn_next">${arrRight}</button>`,
        appendArrows: $('.slider__buttons', this),
        onInit: bindEvents()
      });

      function bindEvents() {
        $slider.on('init afterChange reInit', (event, slick, currentSlide) => {
          const $currentCount = $slider.siblings('.slider__controls').find('.slider__count-current');
          const $allCount = $slider.siblings('.slider__controls').find('.slider__count-all');
          let i = (currentSlide ? currentSlide : 0) + 1;

          // count slides
          $currentCount.text(`0${i}`);
          $allCount.text(`0${slick.slideCount}`);

          _this.playVideo($slider);

        });
      }

      $slider.on('beforeChange', () => {
        const $countDecor = $slider.siblings('.slider__controls').find('.slider__count-decor');
        const animEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd onanimationend ananimationend';

        $countDecor.addClass(css.hasAnim).one(animEnd, function () {
          $(this).removeClass(css.hasAnim);
        });

        _this.playVideo($slider, true);

      });
    });
  }

  playVideo($slider, pauseOnChange = false) {
    const $item = $slider.find('.slider__item').not('.slick-cloned');
    const $btn = $item.find('.js-play-btn');
    const $video = $item.find('video');

    $video.each(function () {
      const $this = $(this);
      const $autoplay = $this.is('[autoplay]');
      const $video = $this[0];

      if ($autoplay) {
        $video.play();
      }
      if (pauseOnChange && !$autoplay) {
        $video.pause();
        $btn.removeClass(css.hide);
      }
    });

    $btn.on('click', function () {
      const $this = $(this);
      const $video = $this.next()[0];

      $this.addClass(css.hide);
      $video.play();

      $this.next().on('click', () => {
        $video.pause();
        $btn.removeClass(css.hide);
      });
    });

  }

  disableVideoLoad() {
    // const
  }

}

export const slider = new Slider();
