import { TimelineMax, TweenMax } from 'gsap';
import ScrollAnim from '../modules/dev/animation/scrollAnim';

class Block11 {
  constructor() {
    this.$container = $('.block-11');
    this.$list = this.$container.find('.block-11__list');
    this.$items = this.$container.find('.block-11__item');
    this.$more = this.$container.find('.block-11__more');

    if (this.$container.length) this.init();
  }

  async init() {
    const _this = this;

    new ScrollAnim({
      el: this.$list.get(0),
      onEnter: async () => {
        await _this.startAnim();
      }
    });
  }

  startAnim() {
    const _this = this;
    const tl = new TimelineMax();
    const $item = this.$items.children();

    tl
      .staggerTo($item, .7, { autoAlpha: 1, x: 0 }, 0.3)
      .to(_this.$more, .7, { autoAlpha: 1, x: 0 });

  }
}

export const Block11API = new Block11();
