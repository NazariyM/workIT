import { TimelineMax, TweenMax } from 'gsap';
import ScrollAnim from '../modules/dev/animation/scrollAnim';
import { preloader } from './preloader';
import { css } from '../modules/dev/_helpers';

export default class HomeAnims {
  constructor() {
    this.containers = [...document.querySelectorAll('.block-top')];
    this.groups = [...document.querySelectorAll('[data-anim="group"]')];
    this.titles = [...document.querySelectorAll('.block-title')];

    this.init();
  }

  async init() {
    await preloader.wait();
    await this.scrollAnim();
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

    for (const group of this.groups) {
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
      const label = el.querySelector('.block-label');
      const title = el.querySelector('.block-title');

      tl
       .to(label, .5, { autoAlpha: 1, x: 0 })
       .to(title, .5, { autoAlpha: 1, x: 0 })
       .set(title, { className: `+=${css.selected}` }, '-=1')
       .staggerTo(item, .5, { autoAlpha: 1, x: 0 }, '-=1');
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
