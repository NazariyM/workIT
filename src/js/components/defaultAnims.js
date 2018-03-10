import { TimelineMax, TweenMax } from 'gsap';
import ScrollAnim from '../modules/dev/animation/scrollAnim';
import { preloader } from './preloader';
import { css, Resp } from '../modules/dev/_helpers';

class DefaultAnims {
  constructor() {
    this.blocks = [...document.querySelectorAll('.block-top')];
    this.groups = [...document.querySelectorAll('[data-anim="group"]')];
    this.titles = [...document.querySelectorAll('.block-title')];
    this.fadeTopItems = [...document.querySelectorAll('[data-item-anim="fade-top"]')];
    this.hangingDecors = [...document.querySelectorAll('.hanging-decor')];

    this.init();
  }

  async init() {
    await preloader.wait();
    await this.scrollAnim();
  }

  scrollAnim() {
    const _this = this;

    for (const container of this.blocks) {
      const section = container.closest('section');

      new ScrollAnim({
        el: section,
        onStart() {
          _this.blockTopAnim(container);
        }
      });
    }

    for (const decor of this.hangingDecors) {
      const section = decor.closest('section');

      new ScrollAnim({
        el: section,
        onStart() {
          _this.hangingDecorAnim(decor);
        }
      });
    }

    for (const group of this.groups) {
      new ScrollAnim({
        el: group,
        hook: .8,
        onStart() {
          _this.groupAnim(group);
        }
      });
    }

    for (const item of this.fadeTopItems) {
      new ScrollAnim({
        el: item,
        onStart() {
          _this.fadeTopItemsAnim(item);
        }
      });
    }
  }

  blockTopAnim(container) {
    const tl = new TimelineMax();

    const item = container.children;
    const label = container.querySelector('.block-label');
    const title = container.querySelector('.block-title');

    tl
     .to(label, .5, { autoAlpha: 1, x: 0 })
     .to(title, .5, { autoAlpha: 1, x: 0 })
     .set(title, { className: `+=${css.selected}` }, '-=1')
     .staggerTo(item, .5, { autoAlpha: 1, x: 0 }, '-=1');
  }

  groupAnim(group) {
    const tl = new TimelineMax();

    const item = group.children;

    tl.staggerTo(item, .7, { autoAlpha: 1, x: 0 }, 0.6);
  }

  hangingDecorAnim(decor) {
    const decorWires = decor.querySelectorAll('.hanging-decor__wire');

    TweenMax
      .to(decorWires, 2, { y: 0 });

    if (decor.classList.contains('hanging-decor_lamps') && Resp.isTablet) {
      const tl = new TimelineMax();
      const $wire1 = decorWires[0];
      const $wire2 = decorWires[2];
      const $wire3 = decorWires[1];

      tl
        .to($wire1, 2, { y: -217 }, 'all')
        .to($wire2, 2, { y: -218 }, 'all')
        .to($wire3, 2, { y: -158 }, 'all');
    }

    // if (decor.classList.contains('hanging-decor_items')) {
    //
    // }

  }

  fadeTopItemsAnim(item) {
    const tl = new TimelineMax();
    const animItems = item.children;

    tl.staggerTo(animItems, .5, { autoAlpha: 1, y: 0 }, 0.3);
  }
}

export const defaultAnimsAPI = new DefaultAnims();
