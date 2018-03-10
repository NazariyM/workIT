import { TimelineMax, TweenMax } from 'gsap';
import ScrollAnim from '../modules/dev/animation/scrollAnim';
import { css, Resp } from '../modules/dev/_helpers';
import Dot from '../components/dot';

class Block6 {
  constructor() {
    this.$container = $('.block-6');
    this.$offer = this.$container.find('.block-6__offer');
    this.$offerText = this.$offer.find('.block-6__offer-text').children();
    this.$offerPic = this.$offer.find('.block-6__offer-pic');
    this.$list = this.$container.find('.block-6__list');
    this.$itemMask = this.$list.find('.block-6__item-mask');
    this.$dotTarget1 = $('.block-6__item-title h4');
    this.$dotTarget2 = $('.block-6__item-text p');

    if (this.$container.length) this.init();
  }

  init() {
    this.scrollAnim();
    this.dot();
  }

  scrollAnim() {
    const _this = this;

    new ScrollAnim({
      el: _this.$offer.get(0),
      onStart() {
        _this.offerAnim();
      }
    });

    if (this.$list.length)
      new ScrollAnim({
        el: _this.$list.get(0),
        onStart() {
          _this.listAnim();
        }
      });
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
