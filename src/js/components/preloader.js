import { TimelineMax } from 'gsap';
// import '../modules/dep/DrawSVGPlugin';
import { $scrolledElements, css } from '../modules/dev/_helpers';

class Preloader {
  constructor() {
    this.$preloader = $('.preloader');
    this.$letter = this.$preloader.find('.preloader__img-letter');
    this.$letterDot = this.$preloader.find('.preloader__img-letter-dot');

    this.init();
  }

  init() {
    this.animPreloader();
  }

  wait() {
    return this.resolve;
  }

  animPreloader() {
    this.resolve = new Promise(resolve => {
      const tl = new TimelineMax({ onComplete() { resolve(); } });

      tl
        .staggerTo(this.$letter, 0.15, { autoAlpha: 1 }, 0.2)
        .fromTo(this.$letterDot, 0.2, {
          autoAlpha: 1,
          scale: 0,
          transformOrigin: '50% 50%'
        }, { scale: 1 }, '+=.1')
        .to(this.$preloader, .3, {
          autoAlpha: 0
        }, '+=.25');
    });
  }
}

export const preloader = new Preloader();
