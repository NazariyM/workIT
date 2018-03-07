import { TimelineMax, TweenMax } from 'gsap';
import ScrollAnim from '../modules/dev/animation/scrollAnim';
import { Resp } from '../modules/dev/_helpers';

class Come {
  constructor() {
    this.$block = $('.come');
    this.$container = this.$block.find('.container');
    this.$mask = this.$block.find('.mask_come');
    this.$maskRect = this.$mask.find('rect');
    this.$maskBlur = this.$mask.find('feGaussianBlur');

    if (this.$block.length) this.init();
  }

  init() {
    const _this = this;

    new ScrollAnim({
      el: this.$block.get(0),
      hook: .75,
      onEnter: async () => {
        await _this.startAnim();
      }
    });
  }

  startAnim() {
    const tl = new TimelineMax();
    const item = this.$container.children();

    if (Resp.isDesk) {
      tl
        .to(this.$mask, .6, { autoAlpha: 1, x: 0 })
        .staggerTo(item, .6, { autoAlpha: 1, x: 0 }, .25, '-=.3')
        .to(this.$maskRect, 1, { fillOpacity: .5 }, '-=.3');
    } else {

      tl
        .to(this.$mask, .6, { autoAlpha: 1, x: 0 })
        .staggerTo(item, .6, { autoAlpha: 1, x: 0 }, .25, '-=.3')
        .to(this.$maskBlur, .7, { attr: { stdDeviation: 8 } });
    }
  }
}

export const comeAPI = new Come();
