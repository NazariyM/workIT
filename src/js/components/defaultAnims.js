import { TimelineMax, TweenMax } from 'gsap';
import ScrollAnim from '../modules/dev/animation/scrollAnim';
import { preloader } from './preloader';
import { css, Resp, $body } from '../modules/dev/_helpers';

class DefaultAnims {
  constructor() {
    this.blocks = [...document.querySelectorAll('.block-top')];
    this.groups = [...document.querySelectorAll('[data-anim="group"]')];
    this.titles = [...document.querySelectorAll('.block-title')];
    this.fadeTop = [...document.querySelectorAll('[data-anim="fade-top"]')];
    this.fadeLeft = [...document.querySelectorAll('[data-anim="fade-left"]')];
    this.fadeRight = [...document.querySelectorAll('[data-anim="fade-right"]')];
    this.fadeTopItems = [...document.querySelectorAll('[data-items-anim="fade-top"]')];
    this.fadeLeftItems = [...document.querySelectorAll('[data-items-anim="fade-left"]')];
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
        hook: .8,
        onStart() {
          if (!$body.hasClass(css.animsDisabled)) _this.blockTopAnim(container);
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
        hook: .8,
        onStart() {
          _this.fadeTopItemsAnim(item);
        }
      });
    }

    for (const item of this.fadeLeftItems) {
      new ScrollAnim({
        el: item,
        hook: .8,
        onStart() {
          _this.fadeLeftItemsAnim(item);
        }
      });
    }

    for (const item of this.fadeLeft) {
      new ScrollAnim({
        el: item,
        onStart() {
          if (!$body.hasClass(css.animsDisabled)) _this.fadeLeftAnim(item);
        }
      });
    }

    for (const item of this.fadeRight) {
      new ScrollAnim({
        el: item,
        onStart() {
          _this.fadeRightAnim(item);
        }
      });
    }

    for (const item of this.fadeTop) {
      new ScrollAnim({
        el: item,
        onStart() {
          if (!$body.hasClass(css.animsDisabled)) _this.fadeTopAnim(item);
        }
      });
    }
  }

  blockTopAnim(container) {
    const tl = new TimelineMax();
    const $this = $(container);
    const $items = $this.children();
    const title = $this.find('.block-title');

    tl
      .staggerTo($items, .5, { autoAlpha: 1, x: 0 }, .3)
      .set(title, { className: `+=${css.selected}` }, '-=1.5');
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

    if (decor.classList.contains('hanging-decor_office-sm')) {
      const tl = new TimelineMax();
      const $wire1 = decorWires[0];
      const $wire2 = decorWires[2];
      const $wire3 = decorWires[1];

      tl
        .to($wire1, 2, { y: 0 }, 'all')
        .to($wire2, 2, { y: 30 }, 'all')
        .to($wire3, 2, { y: -30 }, 'all');
    }

  }

  fadeLeftAnim(item) {
    const duration = item.getAttribute('data-anim-duration') || 0.5;
    const delay = item.getAttribute('data-anim-delay') || 0;

    TweenMax.to(item, duration, { autoAlpha: 1, x: 0, ease: Power2.easeOut, delay: delay });
  }

  fadeRightAnim(item) {
    const duration = item.getAttribute('data-anim-duration') || 0.5;
    const delay = item.getAttribute('data-anim-delay') || 0;

    TweenMax.to(item, duration, { autoAlpha: 1, x: 0, ease: Power2.easeOut, delay: delay });
  }

  fadeTopAnim(item) {
    const duration = item.getAttribute('data-anim-duration') || 0.5;

    TweenMax.to(item, duration, { autoAlpha: 1, y: 0, ease: Power2.easeOut });
  }

  fadeTopItemsAnim(item) {
    const tl = new TimelineMax();
    const animItems = item.children;
    const duration = item.getAttribute('data-anim-duration') || 0.5;
    const staggerDur = item.getAttribute('data-stagger-duration') || 0.3;

    tl.staggerTo(animItems, duration, { autoAlpha: 1, y: 0, ease: Power2.easeOut }, staggerDur);
  }

  fadeLeftItemsAnim(item) {
    const tl = new TimelineMax();
    const animItems = item.children;
    const duration = item.getAttribute('data-anim-duration') || 0.5;
    const staggerDur = item.getAttribute('data-stagger-duration') || 0.3;

    tl.staggerTo(animItems, duration, { autoAlpha: 1, x: 0, ease: Power2.easeOut }, staggerDur);
  }

}

export const defaultAnimsAPI = new DefaultAnims();
