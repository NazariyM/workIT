import { TimelineMax, TweenMax } from 'gsap';
import { preloader } from './preloader';
import {$scrolledElements, css, Resp} from '../modules/dev/_helpers';

class Screen {
  constructor() {
    this.$block = $('.screen');
    this.$container = this.$block.find('.screen__container');
    this.$item = this.$container.children();
    this.$more = this.$block.find('.screen__more');
    this.$mask = this.$block.find('.mask_screen');
    this.$maskRect = this.$mask.find('rect');
    this.$maskBlur = this.$mask.find('feGaussianBlur');

    if (this.$container.length) this.init();
  }

  async init() {
    await preloader.wait();
    await this.startAnim();
    this.scrollNext();
  }

  startAnim() {
    const _this = this;
    const tl = new TimelineMax({ delay: .2 });

    if (Resp.isDesk) {
      tl
        .staggerTo(_this.$item, .5, { autoAlpha: 1, y: 0 }, 0.3)
        .to(_this.$more, .7, {
          y: 0, onComplete: function () {
            _this.$more.addClass(css.hasAnim);
          }
        })
        .to(this.$maskRect, .5, { fillOpacity: .3 }, '-=.2');
    } else {
      tl
        .staggerTo(_this.$item, .5, { autoAlpha: 1, y: 0 }, 0.3)
        .to(_this.$more, .7, {
          y: 0, onComplete: function () {
            _this.$more.addClass(css.hasAnim);
          }
        })
        .to(this.$maskBlur, .7, { attr: { stdDeviation: 10 } });
    }
  }

  scrollNext() {
    this.$more.on('click', function () {
      const $section = $(this).closest('section').next().offset().top;

      $scrolledElements.animate({ scrollTop: $section }, 700);
    });
  }
}

export const ScreenAPI = new Screen();
