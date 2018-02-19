import { TimelineMax, TweenMax, CSSRulePlugin } from 'gsap';
import ScrollAnim from '../modules/dev/animation/scrollAnim';
import { css } from '../modules/dev/_helpers';

class Footer {
  constructor() {
    this.$footer = $('.footer');
    this.$containerItems = this.$footer.find('.footer__container').children();
    this.$addition = this.$footer.find('.footer__addition');

    if (this.$footer.length) this.init();
  }

  async init() {
    const _this = this;

    new ScrollAnim({
      el: this.$footer.get(0),
      onEnter: async () => {
        await _this.startAnim();
      }
    });
  }

  startAnim() {

    const tl = new TimelineMax();

    tl
      .staggerTo(this.$containerItems, 1.5, { autoAlpha: 1, y: 0, ease: Power2.easeOut }, .3)
      .to(this.$addition, 1, { autoAlpha: 1, y: 0, ease: Power2.easeOut }, '-=.7');
  }
}

export const FooterAPI = new Footer();
