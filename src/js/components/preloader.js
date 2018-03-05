import { TimelineMax, TweenMax } from 'gsap';

class Preloader {
  constructor() {
    this.$preloader = $('.preloader');
    this.$img = this.$preloader.find('.preloader__img');

    this.init();
  }

  async init() {
    if (sessionStorage.getItem('resized') === 'false') {
      this.animPreloader();
    } else {
      this.resolve = new Promise(resolve => { resolve(this.animPreloader()); });
    }
    sessionStorage.setItem('resized', false);
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

      // remove!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // resolve();

      tl
        .to(this.$img, 1, { autoAlpha: 1 })
        .to(this.$preloader, .5, { autoAlpha: 0 }, '+=.3');
    });
  }
}

export const preloader = new Preloader();
