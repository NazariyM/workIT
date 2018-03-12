import { TimelineMax, TweenMax } from 'gsap';
import ScrollAnim from '../modules/dev/animation/scrollAnim';
import { css, Resp } from '../modules/dev/_helpers';
import Dot from '../components/dot';

class Block5 {
  constructor() {
    this.$container = $('.block-5');
    this.$item = this.$container.find('.block-5__item');
    this.$list = this.$container.find('.block-5__list');
    this.$dotTarget = this.$item.find('p');

    if (this.$container.length) this.init();
  }

  init() {
    this.scrollAnim();
    this.dot();
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
    const _this = this;

    const tl = new TimelineMax();

    if (Resp.isDesk) {
      this.$item.each(function () {
        const $this = $(this);
        const $img = $this.find('.block-5__item-img-wrap');
        const $items = $this.find('.block-5__item-text').children();

        tl
         .staggerTo($img, .5, { autoAlpha: 1, y: 0, ease: Power2.easeOut }, 0.2)
         .staggerTo($items, .5, { autoAlpha: 1, y: 0, ease: Power2.easeOut }, 0.2, '-=.2');
      });
    } else {
      const $img = _this.$item.find('.block-5__item-img-wrap');
      const $items = _this.$item.find('.block-5__item-text').children();

      tl
       .staggerTo($img, .5, { autoAlpha: 1, x: 0, ease: Power2.easeOut }, 0.25)
       .staggerTo($items, .5, { autoAlpha: 1, x: 0, ease: Power2.easeOut }, 0.25, '-=.2');
    }

  }

  dot() {
    new Dot(this.$dotTarget);
  }
}

export const Block5API = new Block5();
