import {TimelineMax, TweenMax} from 'gsap';
import slick from 'slick-carousel';
import ScrollAnim from '../modules/dev/animation/scrollAnim';
import {$body, css, Resp} from '../modules/dev/_helpers';
import Dot from '../components/dot';

class companies {
	constructor() {
		this.$block = $('.companies');
		this.$container = this.$block.find('.container');
		this.$list = this.$block.find('.companies__list_slider');
		this.$item = this.$block.find('.companies__item').not('.slick-cloned');
		this.$line = this.$block.find('.companies__decor-line');
		this.$line = this.$block.find('.companies__decor-line');
    this.$dotTarget1 = this.$item.find('p');

		if (this.$block.length) this.init();
	}

	init() {
    if (!$body.hasClass(css.animsDisabled)) this.scrollAnim();
		this.initSlider();
		this.dot();
	}

	scrollAnim() {
		const _this = this;

		new ScrollAnim({
			el: _this.$container.get(0),
			hook: .9,
			onEnter() {
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

  dot() {
    new Dot(this.$dotTarget1);
  }
}

export const companiesAPI = new companies();
