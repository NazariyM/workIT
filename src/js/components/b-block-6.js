import { TimelineMax, TweenMax } from 'gsap';
import ScrollAnim from '../modules/dev/animation/scrollAnim';
import Dot from './dot';
import { preloader } from './preloader';
import { css } from '../modules/dev/_helpers';

class Block6 {
	constructor() {
		this.$container = $('.block-6');
		this.$lampsWire = this.$container.find('.block-6__lamps-wire');
		this.$offer = this.$container.find('.block-6__offer');
		this.$offerText = this.$offer.find('.block-6__offer-text').children();
		this.$offerPic = this.$offer.find('.block-6__offer-pic');
		this.$item = this.$container.find('.block-6__item');
		this.$itemMask = this.$item.find('.block-6__item-mask');
		// this.$descr = $('.block-6__description');

		if (this.$container.length) this.init();
	}

	async init() {
		await preloader.wait();
		await this.scrollAnim();
		// await this.dot();
	}

	scrollAnim() {
		const _this = this;

		new ScrollAnim({
			el: _this.$container.get(0),
			onStart() {
				_this.startLampsAnim();
			}
		});

		new ScrollAnim({
			el: _this.$offer.get(0),
			hook: .9,
			onStart() {
				_this.startAnim();
			}
		});
	}

	startAnim() {
		const tl = new TimelineMax();

		tl
		.to(this.$offer, 1, { className: `+=${css.visible}` }, '-=1')
		.staggerTo(this.$offerText, 1, { x: 0,  autoAlpha: 1, ease: Power2.easeOut }, 0.2, '+=.5')
		.to(this.$offerPic, 1, { x: 0,  autoAlpha: 1, ease: Power2.easeOut }, '-=.7')
		.staggerTo(this.$itemMask, 1, { width: '0' }, .5, '-=.3');

	}

	startLampsAnim() {
		TweenMax
			.to(this.$lampsWire, 2, { className: `+=${css.visible}` });
	}

	// dot() {
	// 	new Dot(this.$descr);
	// }
}

export const Block6API = new Block6();
