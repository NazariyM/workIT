import ScrollAnim from '../modules/dev/animation/scrollAnim';
import { TweenMax, TimelineMax } from 'gsap';
import slick from 'slick-carousel';
import { css, Resp, detectIE } from '../modules/dev/_helpers';
import { Block5API } from '../sections/b-block-5';

class Slider {

	constructor() {
		this.$slider = $('.slider');
		this.$mobileSlider = $('.mobile-slider');
    this.$sliderHasProgress = $('.mobile-slider_has-progress');
    this.$mobSliderDouble = $('.mobile-slider_double');
    this.$block3Sld = $('.block-3__items-list.mobile-slider');
    this.$block3Photos = $('.block-3__photos');
    this.$block6Sld = $('.block-6__list');
    this.$valuesMobSld = $('.values__mob-slider');
    this.$teamSld = $('.team__inner_slider');
    this.$benefitsSld = $('.benefits__content-inner.mobile-slider');
		this.$sliderAnimBlock = $('[data-anim="slider"]');

		this.init();
	}

	async init() {
		this.createSlider();
		this.createMobileSlider();
		this.bindEvents();
	}

	bindEvents() {
		this.prepareSliderAnim(this.$sliderAnimBlock);
		this.animOnScroll(this.$sliderAnimBlock);
	}

	createMobileSlider() {
		const _this = this;

		const defaultOptions = {
			dots: false,
			infinite: false,
			arrows: false,
			speed: 400,
			cssEase: 'cubic-bezier(0.74, 0.1, 0.32, 0.98)',
			useTransform: true,
			adaptiveHeight: true,
			mobileFirst: true,
			accessibility: false,
			rows: 0
		};

		this.$mobSliderDouble.slick($.extend({}, defaultOptions, {
			slidesToShow: 1.14,
			slidesToScroll: 1,
			responsive: [{
				breakpoint: 1199,
				settings: 'unslick'
			},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1.26
					}
				}]
		}));

    this.$block3Photos.slick($.extend({}, defaultOptions, {
      slidesToShow: 1.14,
      slidesToScroll: 1,
      responsive: [{
        breakpoint: 1199,
        settings: 'unslick'
      },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1.23
          }
        }, {
          breakpoint: 319,
          settings: 'unslick'
	      }]
    }));

		this.$block3Sld.slick($.extend({}, defaultOptions, {
			slidesToShow: 1.14,
			slidesToScroll: 1,
			responsive: [{
				breakpoint: 767,
				settings: 'unslick'
			}]
		}));

		this.$block6Sld.slick($.extend({}, defaultOptions, {
			slidesToShow: 1.14,
			slidesToScroll: 1,
			responsive: [{
				breakpoint: 1199,
				settings: 'unslick'
			},
			 {
				breakpoint: 767,
				settings: {
					slidesToScroll: 1.13,
					slidesToShow: 1.87
				}
			}]
		}));

    this.$valuesMobSld.slick($.extend({}, defaultOptions, {
      slidesToShow: 1.14,
      slidesToScroll: 1,
      responsive: [{
        breakpoint: 1199,
        settings: 'unslick'
      },
        {
          breakpoint: 767,
          settings: {
            slidesToScroll: 2,
            slidesToShow: 2.52
          }
        }, {
          breakpoint: 319,
          settings: 'unslick'
        }]
    }));

    this.$teamSld.slick($.extend({}, defaultOptions, {
      slidesToShow: 1.14,
      slidesToScroll: 1,
      responsive: [{
        breakpoint: 1199,
        settings: 'unslick'
      },
        {
          breakpoint: 767,
          settings: {
            slidesToScroll: 1,
            slidesToShow: 2.46
          }
        }, {
          breakpoint: 319,
          settings: 'unslick'
        }]
    }));

    this.$sliderHasProgress.slick($.extend({}, defaultOptions, {
      slidesToShow: 1.14,
      slidesToScroll: 1,
	    dots: true,
	    dotsClass: 'team__inner-progress',
      onInit: setProgress('.team__inner-progress'),
      responsive: [{
        breakpoint: 1199,
        settings: 'unslick'
      },
        {
          breakpoint: 767,
          settings: {
            slidesToScroll: 1,
            slidesToShow: 2.46
          }
        }, {
          breakpoint: 319,
          settings: 'unslick'
        }]
    }));

    this.$benefitsSld.slick($.extend({}, defaultOptions, {
      slidesToShow: 1.14,
      slidesToScroll: 2,
      responsive: [{
        breakpoint: 1199,
        settings: 'unslick'
      },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2.5
          }
        }, {
          breakpoint: 319,
          settings: 'unslick'
        }]
    }));

    function setProgress(progressClass) {

      _this.$sliderHasProgress.each((i, slider) => {

        $(slider).on('init afterChange reInit', (event, slick, currentSlide) => {
        	const progressDot = $(progressClass).find('li');
          const slideCount = slick.slideCount - 2;

          const dotLength = 80 / slideCount;

          progressDot.css('width', `${dotLength}px`)
        });
      });
    }

		this.$mobileSlider.each(function (i, slider) {
			const $slider = $(slider);

			if (!Resp.isDesk) _this.detectShadowedSld($slider);

			$slider.on('afterChange', function () {
				const $lastSlide = $(this).find('.slick-slide').last();
				$lastSlide.is('.slick-active') ? $slider.addClass('is-last-slide') : $slider.removeClass('is-last-slide');
			});
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

		const defaultOptions = {
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      infinite: true,
      arrows: true,
      speed: 800,
      cssEase: 'cubic-bezier(0.74, 0.1, 0.32, 0.98)',
      useTransform: true,
      adaptiveHeight: false,
      accessibility: false,
      swipe: true,
      rows: 0,
      prevArrow: `<button type="button" class="slider__btn slider-btn_prev">${arrLeft}</button>`,
      nextArrow: `<button type="button" class="slider__btn slider-btn_next">${arrRight}</button>`
		};

		this.$slider.each(function (i, slider) {
			const $slider = $(slider).find('.slider__body');
			const $sliderHasNav = $(slider).hasClass('slider_has-nav');
			const $sliderHasNavVert = $(slider).hasClass('slider_has-nav-vertical');

      if (!$sliderHasNav && !$sliderHasNavVert) {
        $slider.slick($.extend({}, defaultOptions, {
          appendArrows: $('.slider__buttons', this),
          onInit: _this.countSlides($slider, true),
        }));
      }

      if ($sliderHasNav) {
        const $viewSlider = $(this).find('.slider__body');
        const $sliderNav = $(this).find('.slider__nav');

        $viewSlider.slick($.extend({}, defaultOptions, {
          appendArrows: $('.slider__buttons', this),
          onInit: _this.countSlides($viewSlider, false),
          asNavFor: '.slider__nav',
          speed: 800,
          cssEase: 'cubic-bezier(0.74, 0.1, 0.32, 0.98)'
        }));

        $sliderNav.slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          speed: 800,
          asNavFor: '.slider__body',
          dots: false,
          arrows: false,
          focusOnSelect: true,
          cssEase: 'cubic-bezier(0.74, 0.1, 0.32, 0.98)',
	        rows: 0,
          responsive: [{
            breakpoint: 1199,
            settings: 'unslick'
          }]
        });
      }

      if ($sliderHasNavVert) {
        const $viewSlider = $(this).find('.slider__body');
        const $sliderNav = $(this).find('.slider__nav');

        $viewSlider.slick($.extend({}, defaultOptions, {
          appendArrows: $('.slider__buttons', this),
          onInit: _this.countSlides($viewSlider, false),
          asNavFor: '.slider__nav',
          speed: 800,
          cssEase: 'cubic-bezier(0.74, 0.1, 0.32, 0.98)'
        }));

        $sliderNav.slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          speed: 800,
          asNavFor: '.slider__body',
          dots: false,
          arrows: false,
          focusOnSelect: true,
          cssEase: 'cubic-bezier(0.74, 0.1, 0.32, 0.98)',
          rows: 0,
          vertical: true,
          responsive: [{
            breakpoint: 1199,
            settings: 'unslick'
          }]
        });
      }

      Block5API.prepareSlider().then(() => {
        const $preparedSld = $(this).find('.block-5__list-slider');

        $preparedSld.slick($.extend({}, defaultOptions, {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          appendArrows: $('.slider__buttons', this),
          onInit: _this.countSlides($preparedSld, false),
          responsive: [{
            breakpoint: 1199,
            settings: 'unslick'
          }]
        }));

        _this.decorAnim($preparedSld);
      });

      _this.decorAnim($slider);

		});
	}

	countSlides(slider, video = true) {
    slider.on('init afterChange reInit', (event, slick, currentSlide) => {
      const $currentCount = slider.siblings('.slider__controls').find('.slider__count-current');
      const $allCount = slider.siblings('.slider__controls').find('.slider__count-all');
      let i = (currentSlide ? currentSlide : 0) + 1;

      $currentCount.text(`0${i}`);
      $allCount.text(`0${slick.slideCount}`);

      if (video) this.playVideo(slider);

    });
	}

	decorAnim(slider) {
    slider.on('beforeChange', () => {
      const $countDecor = slider.siblings('.slider__controls').find('.slider__count-decor');
      const animEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd onanimationend ananimationend';

      $countDecor.addClass(css.hasAnim).one(animEnd, function () {
        $(this).removeClass(css.hasAnim);
      });

      this.playVideo(slider, true);

    });
	}

	playVideo($slider, pauseOnChange = false) {
		const $item = $slider.find('.slider__item').not('.slick-cloned');
		const $btn = $item.find('.video-block__play-btn');
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

	}

	detectShadowedSld($slider) {
		const _this = this;
		new ScrollAnim({
			el: $slider[0],
			onEnter() {
				_this.addShadowOnScroll($slider);
			}
		});
	}

	addShadowOnScroll($slider) {
		TweenMax.set($slider, { delay: 1, className: `+=${'is-shadowed'}` });
	}

	animOnScroll($animBlock) {
		const _this = this;

		$animBlock.each((i, el) => {
			new ScrollAnim({
				el: $(el)[0],
				onEnter() {
					_this.startSliderAnim($animBlock);
				}
			});
		});
	}

	prepareSliderAnim($animBlock) {
		const tl = new TimelineMax();
		const $item = $animBlock.find('.slider__item.slick-active');
		const $controls = $animBlock.next('.slider__controls');
		const $text = $item.find('.slider__text').children();
		const $media = $item.find('.slider__media');

		tl.set($text, { autoAlpha: 0, x: -80 })
			.set($media, { autoAlpha: 0, x: -80 })
			.set($controls, { autoAlpha: 0, x: -80 });
	}

	startSliderAnim($animBlock) {
		const tl = new TimelineMax();
		const $item = $animBlock.find('.slider__item.slick-active');
		const $controls = $animBlock.next('.slider__controls');
		const $text = $item.find('.slider__text').children();
		const $media = $item.find('.slider__media');

		tl
			.staggerTo($text, .7, { autoAlpha: 1, x: 0 }, 0.3)
			.to($media, .7, { autoAlpha: 1, x: 0 }, 'all-=0.3')
			.to($controls, .7, { autoAlpha: 1, x: 0 }, 'all-=0.3');
	}

}

export const slider = new Slider();
