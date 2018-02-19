import { TimelineMax, TweenMax } from 'gsap';
import ScrollAnim from '../modules/dev/animation/scrollAnim';
import { preloader } from './preloader';
import { css } from '../modules/dev/_helpers';

class ExpandList {
  constructor() {
    this.$list = $('.js-expand-list');

    if (this.$list.length) this.init();
  }

  async init() {
    await preloader.wait();
    this.scrollAnim();
  }

  scrollAnim() {
    const _this = this;

    this.$list.each(function (i, $el) {
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

    const $listInner = $($el).find('.expand-list__inner');
    const $visibleItem = $listInner.children().not('.is-hidden');
    const $hiddenItem = $listInner.children('.is-hidden');
    const $btn = $($el).find('.expand-list__btn');
    const innerHeight = $listInner.outerHeight() * 2;

    tl
      .staggerTo($visibleItem, 1, { x: 0, autoAlpha: 1 }, .3)
      .to($btn, .5, { x: 0, autoAlpha: 1 }, '-=.5');

    $btn.on('click tap', () => {
      tl
        .to($listInner, .4, { height: innerHeight })
        .to($btn, .4, { autoAlpha: 0, x: -50 })
        .set($hiddenItem, { className: `-=${css.hidden}` })
        .staggerTo($hiddenItem, .5, { x: 0, autoAlpha: 1 }, .2);
    });
  }
}

export const ExpandListAPI = new ExpandList();
