import {TimelineMax, TweenMax} from 'gsap';
import {preloader} from './preloader';
import ScrollAnim from '../modules/dev/animation/scrollAnim';
import {
  $body,
  $scrolledElements,
  $window,
  $header,
  throttle,
  Resp,
  css
} from '../modules/dev/_helpers';

class Header {
  constructor() {
    this.$header = $header;

    this.init();
  }

  async init() {
    await preloader.wait();
    await this.startAnim();
    this.initFix();
  }

  initFix() {
    const toggleHeaderScroll = throttle(() => {
      toggleHeader();
    }, 0, this);

    function toggleHeader() {
      if ($window.scrollTop() > 0) {
        $header.addClass(css.fixed);
      } else {
        $header.removeClass(css.fixed);
      }
    }

    $window.on('scroll', toggleHeaderScroll);
  }

  startAnim() {
    const tl = new TimelineMax();

    tl.to(this.$header, .3, {y: 0});
  }

}

export const HeaderAPI = new Header();

// toggleNav() {
//   this.$btn.on('click', function () {
//     const $that = $(this);
//
//     $that.toggleClass(css.active);
//     $that.prev(this.$nav).toggleClass(css.active);
//   });
// }
//
// onResize() {
//   $window.on('resize', () => {
//     this.$nav.removeClass(css.active);
//     this.$btn.removeClass(css.active);
//     $body.removeClass(css.locked);
//   });
// }