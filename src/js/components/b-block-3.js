import { TimelineMax, TweenMax, CSSRulePlugin } from 'gsap';
import ScrollAnim from '../modules/dev/animation/scrollAnim';
// import '../../../node_modules/scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min';
// import '../../../node_modules/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
import { $window, css, Resp } from '../modules/dev/_helpers';

class Block3 {
  constructor() {
    this.$container = $('.block-3');
    this.$title = this.$container.find('.block-3__title');
    this.$titleSel = this.$container.find('.has-green-selection b');
    this.$label = this.$container.find('.block-3__label');
    this.$items = this.$container.find('.block-3__item');
    this.$lines = this.$container.find('.block-3__line');

    if (this.$container.length) this.init();
  }

  async init() {
    const _this = this;

    new ScrollAnim({
      el: this.$container.get(0),
      hook: .8,
      onEnter: async () => {
        await _this.startAnim();
      }
    });

    this.$items.each(function (i, item) {
      const $this = $(this);
      const $inner = $this.find('.block-3__item-inner');
      const $count = $this.find('.block-3__item-count');
      const $countEl = $this.find('.block-3__item-count-el');

      new ScrollAnim({
        el: item,
        hook: .8,
        onEnter: async () => {
          await startItemsAnim();

          function startItemsAnim() {
            const tl = new TimelineMax();
            tl
              .to($count, 1, { y: 0, autoAlpha: 1, ease: Power0.easeIn })
              .fromTo($countEl, 1, { y: 0 }, { y: -30 })
              .to($countEl, 1, { y: 0, clearProps: 'transform' })
              .to($inner, 1, { y: 0, autoAlpha: 1, ease: Power0.easeIn, clearProps: 'visibility' }, '-=2');
          }

        }
      });
    });
  }

  startAnim() {

    return new Promise(resolve => {
      const tl = new TimelineMax({ onComplete() { resolve(); } });

      tl
        .to(this.$lines, 5, { height: '100%' })
        // .to(this.$count, 1, { y: 0, autoAlpha: 1, ease: Power0.easeIn }, '-=4.5')
        // .fromTo(this.$countEl, 1.3, { y: 0 }, { y: -30 }, '-=3.6')
        // .to(this.$countEl, 1.3, { y: 0, clearProps: 'transform' }, '-=2.7')
        .to(this.$label, .5, { x: 0, ease: Power0.easeIn }, '-=4.5')
        .to(this.$title, 1, { x: 0, ease: Power0.easeIn, className: `+=${css.selected}` }, '-=4.5')
        .to(this.$titleSel, 2, { ease: Power4.easeIn });
    });
  }

  // startItemsAnim() {
  //
  //   return new Promise(resolve => {
  //     const tl = new TimelineMax({ onComplete() { resolve(); } });
  //
  //     tl
  //       .staggerTo(this.$itemInner, 1, { y: 0, autoAlpha: 1, ease: Power0.easeIn, clearProps: 'visibility' }, 0.3, '-=5.2');
  //   });
  // }

}

export const Block3API = new Block3();