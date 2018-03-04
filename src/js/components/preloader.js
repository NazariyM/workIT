import { TimelineMax } from 'gsap';

class Preloader {
  constructor() {
    this.$preloader = $('.preloader');
    this.$img = this.$preloader.find('.preloader__img');

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

      resolve();

      tl
        .to(this.$img, 1, { autoAlpha: 1 })
        .to(this.$preloader, .5, { autoAlpha: 0 }, '+=.3')
        .set(this.$preloader, { css: { display: 'none' } });
    });
  }
}

export const preloader = new Preloader();
