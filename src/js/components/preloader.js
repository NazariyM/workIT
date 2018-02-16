import {TimelineMax} from 'gsap';
import {$body, css} from '../modules/dev/_helpers';

class Preloader {
  constructor() {
    this.$preloader = $('.preloader');

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
      const tl = new TimelineMax();

      tl
        .to(this.$preloader, 1, {
          autoAlpha: 0
        });
    });
  }
}

export const preloader = new Preloader();