import ScrollAnim from '../modules/dev/animation/scrollAnim';
import { TweenMax, TimelineMax } from 'gsap';
import slick from 'slick-carousel';
import {css, Resp, detectIE, $window} from '../modules/dev/_helpers';

class Slider {

	constructor() {
		this.$slider = $('.slider');
		this.$mobileSlider = $('.mobile-slider');
		this.$mobSliderDouble = $('.mobile-slider_double');
		this.$block3Sld = $('.block-3__items-list');
		this.$block6Sld = $('.block-6__list');
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

		this.$slider.each(function () {
			const $slider = $(this).find('.slider__body');

			$slider.slick({
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
			const $video = detectIE() ? $this.next().find('video')[0] : $this.next()[0];

			$this.addClass(css.hide);
			$video.play();

			$this.next().on('click', () => {
				$video.pause();
				$btn.removeClass(css.hide);
			});
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
