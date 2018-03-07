import { TimelineMax, TweenMax } from 'gsap';
import ScrollAnim from '../modules/dev/animation/scrollAnim';
// import { preloader } from './preloader';
import { css, Resp } from '../modules/dev/_helpers';
import Dot from './dot';

class Block6 {
  constructor() {
    this.$container = $('.block-6');
    this.$lampsWires = this.$container.find('.block-6__lamps-wire');
    this.$offer = this.$container.find('.block-6__offer');
    this.$offerText = this.$offer.find('.block-6__offer-text').children();
    this.$offerPic = this.$offer.find('.block-6__offer-pic');
    this.$list = this.$container.find('.block-6__list');
    this.$itemMask = this.$list.find('.block-6__item-mask');
    this.$dotTarget1 = $('.block-6__item-title h4');
    this.$dotTarget2 = $('.block-6__item-text p');

    if (this.$container.length) this.init();
  }

  async init() {
    // await preloader.wait();
    await this.scrollAnim();
    this.dot();
  }

  scrollAnim() {
    const _this = this;

    new ScrollAnim({
      el: _this.$container.get(0),
      onStart() {
        _this.lampsAnim();
      }
    });

    new ScrollAnim({
      el: _this.$offer.get(0),
      hook: .9,
      onStart() {
        _this.offerAnim();
      }
    });

    new ScrollAnim({
      el: _this.$list.get(0),
      hook: .9,
      onStart() {
        _this.listAnim();
      }
    });
  }

  lampsAnim() {
    const _this = this;

    if (Resp.isDesk) {
      TweenMax
       .to(this.$lampsWires, 2, { y: 0 });

    } else if (Resp.isTablet) {

      const tl = new TimelineMax();
      const $wire1 = _this.$lampsWires[0];
      const $wire2 = _this.$lampsWires[2];
      const $wire3 = _this.$lampsWires[1];

      tl
       .to($wire1, 2, { y: -217 }, 'all')
       .to($wire2, 2, { y: -218 }, 'all')
       .to($wire3, 2, { y: -158 }, 'all');
    }
  }

  offerAnim() {
    const tl = new TimelineMax();

    tl
    .to(this.$offer, 1, { className: `+=${css.visible}` }, '-=1')
    .to(this.$offerPic, 1, { x: 0,  autoAlpha: 1, ease: Power2.easeOut }, '+=.2')
    .staggerTo(this.$offerText, 1, { x: 0,  autoAlpha: 1, ease: Power2.easeOut }, 0.2, '-=.5');
  }

  listAnim() {
    const tl = new TimelineMax();

    tl
    .staggerTo(this.$itemMask, 1, { width: '0' }, .5, '-=.3');
  }

  dot() {
    new Dot(this.$dotTarget1);
    new Dot(this.$dotTarget2);
  }
}

export const Block6API = new Block6();
