import { TimelineMax } from 'gsap';

class Preloader {
  constructor() {
    this.$preloader = $('.preloader');
    this.$img = this.$preloader.find('.preloader__img');
    // this.$letter = this.$preloader.find('.preloader__img-letter');
    // this.$letterDot = this.$preloader.find('.preloader__img-letter-dot');

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
      const tl = new TimelineMax({
        onComplete() {
          resolve();
        }
      });

      // resolve();
      // const duration = 1;

      tl
        .to(this.$img, 1, { autoAlpha: 1 })
        // .staggerTo(this.$letter, 0.4, { autoAlpha: 1 }, 0.3)
        // .to(this.$letterDot, duration / 4, { y: -30, ease: Power2.easeOut }, '=-.3')
        // .to(this.$letterDot, duration / 2, { y: 0, ease: Bounce.easeOut, delay: duration / 12 })
        .to(this.$preloader, .5, { autoAlpha: 0 }, '+=.3');
    });
  }
}

export const preloader = new Preloader();
