import { TimelineMax, TweenMax } from 'gsap';

class Preloader {
  constructor() {
    this.$preloader = $('.preloader');

    this.init();
  }

  async init() {
    if (sessionStorage.getItem('resized') === 'false') {
      this.animPreloader();
    } else {
      const waitLoad = new Promise(resolve => {
        resolve(this.animPreloader());
      });
    }
    sessionStorage.setItem('resized', false);
  }

  wait() {
    return this.resolve;
  }

  animPreloader() {
    this.resolve = new Promise(resolve => {

      // delete it
      resolve();

      const tl = new TimelineMax({
        onComplete() {
          resolve();
        }
      });

      tl
        .to(this.$preloader, .5, { autoAlpha: 0 }, '+=1');
    });
  }
}

export const preloader = new Preloader();
