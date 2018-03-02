import {TimelineMax, TweenMax} from 'gsap';
import ScrollAnim from '../modules/dev/animation/scrollAnim';
import {preloader} from './preloader';
import { Resp } from '../modules/dev/_helpers';
import slick from 'slick-carousel';

class Block10 {
	constructor() {
		this.$container = $('.block-10');
		this.$list = this.$container.find('.block-10__list');
		this.$item = this.$container.find('.block-10__item').not('.slick-cloned');
		this.$line = this.$container.find('.block-10__decor-line');

		if (this.$container.length) this.init();
	}

	async init() {
		await preloader.wait();
		await this.scrollAnim();
		this.initSlider();
	}

	scrollAnim() {
		const _this = this;

		new ScrollAnim({
			el: _this.$list.get(0),
			hook: .9,
			onStart() {
				_this.startAnim();
			}
		});
	}

	startAnim() {
		const tl = new TimelineMax();

		tl
			.to(this.$line, 2, {width: '100%'})
			.staggerTo(this.$item, .7, {autoAlpha: 1, x: 0}, 0.2, '-=1');
	}

	initSlider() {
		const $itemCount = this.$list.children().length;
		const defaultOptions = {
			slidesToShow: 4,
			slidesToScroll: 1,
			dots: false,
			infinite: true,
			arrows: false,
			autoplay: true,
			autoplaySpeed: 2400,
			speed: 800,
			cssEase: 'cubic-bezier(0.74, 0.1, 0.32, 0.98)',
			useTransform: true,
			accessibility: false,
			rows: 0
		};

		if ($itemCount > 4) {
			this.$list.slick($.extend({}, defaultOptions, {
				slidesToShow: 4,
				slidesToScroll: 1,
				responsive: [{
					breakpoint: 1199,
					settings: 'unslick'
				}]
			}));
		}

		if (!Resp.isDesk) {
			this.$list.slick($.extend({}, defaultOptions, {
				slidesToShow: 2,
				slidesToScroll: 1,
				autoplay: false,
				infinite: false,
				responsive: [{
					breakpoint: 767,
					settings: {
						slidesToShow: 1.17
					}
				}]
			}));
		}
	}
}

export const Block10API = new Block10();
