import { TimelineMax, TweenMax } from 'gsap';
import ScrollAnim from '../modules/dev/animation/scrollAnim';
import { preloader } from './preloader';
import { css } from '../modules/dev/_helpers';

class Block10 {
  constructor() {
    this.$container = $('.block-10');
    this.$item = this.$container.find('.block-10__item');
    this.$line = this.$container.find('.block-10__decor-line');

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
      hook: .7,
      onStart() {
        _this.startAnim();
      }
    });
  }

  startAnim() {
    const tl = new TimelineMax();

    tl
      .to(this.$line, 1.5, { width: '100%' })
      .staggerTo(this.$item, .7, { autoAlpha: 1, x: 0 }, 0.2);
  }
}

export const Block10API = new Block10();
