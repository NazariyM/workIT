import { TimelineMax, TweenMax } from 'gsap';
import ScrollAnim from '../modules/dev/animation/scrollAnim';
import { preloader } from './preloader';
import { css } from '../modules/dev/_helpers';

class Block5 {
  constructor() {
    this.$container = $('.block-5');
    this.$item = this.$container.find('.block-5__item');

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
      hook: .6,
      onStart() {
        _this.startAnim();
      }
    });
  }

  startAnim() {
    const tl = new TimelineMax();

    this.$item.each(function () {
      const $this = $(this);
      const $img = $this.find('.block-5__item-img-wrap');
      const $items = $this.find('.block-5__item-text').children();

      tl
        .staggerTo($img, .5, { autoAlpha: 1, y: 0, ease: Power2.easeOut }, 0.2)
        .staggerTo($items, .5, { autoAlpha: 1, y: 0, ease: Power2.easeOut }, 0.2, '-=.2');
    });
  }
}

export const Block5API = new Block5();
