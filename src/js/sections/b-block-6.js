import { TimelineMax, TweenMax } from 'gsap';
import ScrollAnim from '../modules/dev/animation/scrollAnim';
import { css, Resp } from '../modules/dev/_helpers';
import Dot from '../components/dot';

class Block6 {
  constructor() {
    this.$container = $('.block-6');
    this.$offer = this.$container.find('.block-6__offer');
    this.$offerText = this.$offer.find('.block-6__offer-text').children();
    this.$offerPic = this.$offer.find('.block-6__offer-pic');
    this.$offerList = this.$offer.find('.block-6__offer-list').find('ul');
    this.$list = this.$container.find('.block-6__list');
    this.$item = this.$list.find('.block-6__item');
    this.$dotOfferTarget1 = this.$offer.find('.block-6__offer-title').find('h4');
    this.$dotOfferTarget2 = this.$offer.find('.block-6__offer-descr').find('p')[0];
    this.$dotOfferTarget3 = this.$offer.find('.block-6__offer-descr').find('p')[1];
    this.$dotItemTarget1 = $('.block-6__item-title h4');
    this.$dotItemTarget2 = $('.block-6__item-text p');

    if (this.$container.length) this.init();
  }

  init() {
    this.scrollAnim();
    this.dot();
  }

  scrollAnim() {
    const _this = this;

    new ScrollAnim({
      el: _this.$offer.get(0),
      onStart() {
        _this.offerAnim();
      }
    });

    if (this.$list.length) {
      this.$item.each((i, item) => {
        new ScrollAnim({
          el: item,
          hook: 1,
          onStart() {
            _this.itemsAnim(i, item);
          }
        });
      });
    }

    if (this.$offerList.length) {
      new ScrollAnim({
        el: _this.$offerList.get(0),
        onStart() {
          _this.offerListAnim();
        }
      });
    }
  }

  offerAnim() {
    const tl = new TimelineMax();

    tl
    .to(this.$offer, 1, { className: `+=${css.visible}` }, '-=1')
    .to(this.$offerPic, 1, { x: 0,  autoAlpha: 1, ease: Power2.easeOut }, '+=.2')
    .staggerTo(this.$offerText, 1, { x: 0,  autoAlpha: 1, ease: Power2.easeOut }, 0.2, '-=.5');
  }

  offerListAnim() {
    const tl = new TimelineMax();
    const $items = this.$offerList.children();
    let delay;
    if (Resp.isDesk) {
      delay = 1;
    } else {
      delay = 0;
    }

    tl.staggerTo($items, 1, { x: 0,  autoAlpha: 1, ease: Power2.easeOut, delay: delay }, 0.2);
  }

  itemsAnim(i, item) {
    const tl = new TimelineMax();
    const $itemMask = $(item).find('.block-6__item-mask');
    const delay = i * 0.4;

    tl
      .to($itemMask, 1, { width: '0' }, delay);
  }

  dot() {
    new Dot(this.$dotOfferTarget1);
    new Dot(this.$dotOfferTarget2);
    new Dot(this.$dotOfferTarget3);
    new Dot(this.$dotItemTarget1);
    new Dot(this.$dotItemTarget2);
  }
}

export const Block6API = new Block6();
