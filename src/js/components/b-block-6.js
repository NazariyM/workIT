import { TimelineMax, TweenMax } from 'gsap';
import ScrollAnim from '../modules/dev/animation/scrollAnim';
import { preloader } from './preloader';
// import '../modules/dep/DrawSVGPlugin';
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

    if (this.$container.length) this.init();
  }

  async init() {
    await preloader.wait();
    await this.scrollAnim();
  }

  scrollAnim() {
    const _this = this;

    new ScrollAnim({
      el: _this.$container.get(0),
      hook: .9,
      onStart() {
        _this.startAnim();
      }
    });
  }

  startAnim() {
    const tl = new TimelineMax();

    tl
    .to(this.$lampsWire, 2, { className: `+=${css.visible}` })
    .to(this.$offer, 1, { className: `+=${css.visible}` }, '-=1')
    .staggerFromTo(this.$offerText, 1, { x: -50, autoAlpha: 0 }, { x: 0,  autoAlpha: 1, ease: Power2.easeOut, clearProps: 'transform, visibility, opacity' }, 0.2)
    .fromTo(this.$offerPic, 1, { x: -50, autoAlpha: 0 }, { x: 0,  autoAlpha: 1, ease: Power2.easeOut, clearProps: 'transform, visibility, opacity' }, '-=.8')
    .staggerTo(this.$itemMask, 1, { width: '0' }, .5, '-=.6');

  }
}

export const Block6API = new Block6();
