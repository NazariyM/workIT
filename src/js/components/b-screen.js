import {TimelineMax, TweenMax, CSSRulePlugin} from 'gsap';
import {preloader} from './preloader';
import {css} from '../modules/dev/_helpers';

class Screen {
  constructor() {
    this.$block = $('.screen');
    this.$container = this.$block.find('.screen__container');
    this.$item = this.$container.children();
    this.$more = this.$block.find('.screen__more');

    if (this.$container.length) this.init();
  }

  async init() {
    await preloader.wait();
    await this.startAnim();
  }

  startAnim() {
    const _this = this;
    const tl = new TimelineMax();

    tl
      .staggerTo(_this.$item, .5, {autoAlpha: 1, y: 0}, 0.3)
      .to(_this.$more, .7, {
        y: 0, onComplete: function () {
          _this.$more.addClass(css.hasAnim);
        }
      }, '+=.2');
  }
}

export const ScreenAPI = new Screen();