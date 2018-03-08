import { TimelineMax, TweenMax } from 'gsap';
import ScrollAnim from '../modules/dev/animation/scrollAnim';

class Events {
  constructor() {
    this.$block = $('.events');
    this.$list = this.$block.find('.events__list');
    this.$items = this.$block.find('.events__item');
    this.$more = this.$block.find('.events__more');

    if (this.$block.length) this.init();
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

export const EventsAPI = new Events();
