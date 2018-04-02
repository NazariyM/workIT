import { TimelineMax, TweenMax } from 'gsap';
import { preloader } from '../components/preloader';
import { $scrolledElements, css, Resp } from '../modules/dev/_helpers';

class Screen {
  constructor() {
    this.$block = $('.screen');
    this.$container = this.$block.find('.screen__container');
    this.$item = this.$container.children();
    this.$more = this.$block.find('.screen__more');
    this.$mask = this.$block.find('.mask_screen');
    this.$maskRect = this.$mask.find('rect');

    if (this.$container.length) this.init();

    // calc
    if (!Resp.isDesk) {
      function calcVH() {
        const vH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        document.querySelector('.screen').setAttribute('style', 'height:' + vH + 'px;');
      }

      calcVH();
      window.addEventListener('orientationchange', () => {
        setTimeout(() => {
          calcVH();
        }, 500);
      }, true);
    }
  }

  async init() {
    await preloader.wait();
    await this.startAnim();
    this.scrollNext();
  }

  startAnim() {
    const tl = new TimelineMax({ delay: .2 });

    tl
      .staggerTo(this.$item, .5, { autoAlpha: 1, y: 0 }, 0.3)
      .to(this.$maskRect, .7, { fillOpacity: '0.4' })
      .to(this.$more, .7, {
        y: 0, onComplete: () => {
          this.$more.addClass(css.hasAnim);
        }
      });
  }

  scrollNext() {
    this.$more.on('click', function () {
      const $section = $(this).closest('section').next().offset().top - 60;

      $scrolledElements.animate({ scrollTop: $section }, 700);
    });
  }

}

export const ScreenAPI = new Screen();
