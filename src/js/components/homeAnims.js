import { TimelineMax, TweenMax } from 'gsap';
import ScrollAnim from '../modules/dev/animation/scrollAnim';
import { preloader } from './preloader';
import { css } from '../modules/dev/_helpers';

export default class HomeAnims {
  constructor() {
    this.containers = [...document.querySelectorAll('.block-top')];
    this.group = [...document.querySelectorAll('[data-anim="group"]')];

    this.init();
    // if (this.containers.length) this.init();
  }

  async init() {
    await preloader.wait();
    this.scrollAnim();
  }

  scrollAnim() {
    const _this = this;

    for (const container of this.containers) {
      const section = container.closest('section');

      new ScrollAnim({
        el: section,
        onStart() {
          _this.blockTopAnim(container);
        }
      });
    }

    for (const group of this.group) {
      new ScrollAnim({
        el: group,
        hook: .8,
        onStart() {
          _this.groupAnim(group);
        }
      });
    }
  }

  blockTopAnim(...container) {
    const tl = new TimelineMax();

    for (const el of container) {
      const item = el.children;
      const title = el.querySelector('.block-title');

      tl
        .staggerTo(item, .7, { autoAlpha: 1, x: 0 }, 0.6)
        .to(title, 2, { className: `+=${css.selected}` }, '-=1.3');
    }
  }

  groupAnim(...group) {
    const tl = new TimelineMax();

    for (const el of group) {
      const item = el.children;

      tl.staggerTo(item, .7, { autoAlpha: 1, x: 0 }, 0.6);
    }
  }
}
