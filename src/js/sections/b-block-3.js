import { TimelineMax, TweenMax } from 'gsap';
import ScrollAnim from '../modules/dev/animation/scrollAnim';
import { css } from '../modules/dev/_helpers';

class Block3 {
  constructor() {
    this.$container = $('.block-3');
    this.$lines = this.$container.find('.block-3__line');
    this.$items = this.$container.find('.block-3__item');
    this.$video = this.$items.find('video');

    if (this.$container.length) this.init();
  }

  async init() {
    const _this = this;

    new ScrollAnim({
      el: this.$container.get(0),
      onEnter: async () => {
        await _this.startLinesAnim();
      }
    });

    this.$items.each(function (i, $el) {
      new ScrollAnim({
        el: $el,
        onStart() {
          _this.startAnim($el);
        }
      });
    });
  }

  startAnim($el) {

    const tl = new TimelineMax();

    const $count = $($el).find('.block-3__item-count');
    const $countEl = $($el).find('.block-3__item-count-el');
    const $itemInner = $($el).find('.block-3__item-inner');
    const $elements = $itemInner.children();

    tl
      .staggerTo($elements, 1.5, { autoAlpha: 1, y: 0, ease: Power2.easeOut }, .3)
      .to($count, 1, { autoAlpha: 1.3, y: 0, ease: Power2.easeOut }, '-=1')
      .set($countEl, { className: `+=${css.hasAnim}` }, '-=1.1');

    if (this.$video.length) this.$video.each(function () {
      $(this)[0].play();
    });
  }

  startLinesAnim() {
    TweenMax
      .to(this.$lines, 10, { height: '100%' });
  }
}

export const Block3API = new Block3();
