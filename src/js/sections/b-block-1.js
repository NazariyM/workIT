import { TimelineMax, TweenMax } from 'gsap';
import ScrollAnim from '../modules/dev/animation/scrollAnim';

class Block1 {
  constructor() {
    this.$block = $('.block-1');

    if (this.$block.length) this.init();
  }

  init() {
    this.scrollAnim();
  }

  scrollAnim() {
    const _this = this;

    this.$block.each((i, block) => {
      const $animatedBlock = $(block).filter('[data-self-anim="true"]');
      const $list = $animatedBlock.find('.block-1__list');

      new ScrollAnim({
        el: $list[0],
        onEnter: async () => {
          await _this.startAnim(block);
        }
      });
    });
  }

  startAnim(block) {
    const tl = new TimelineMax();

    this.$items = $(block).find('.block-1__item').children();
    this.$more = $(block).find('.block-1__more');

    tl
      .staggerTo(this.$items, .7, { autoAlpha: 1, x: 0 }, 0.15)
      .to(this.$more, .7, { autoAlpha: 1, x: 0 });

  }
}

export const Block1API = new Block1();
