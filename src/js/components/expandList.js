import { TimelineMax, TweenMax } from 'gsap';
import ScrollAnim from '../modules/dev/animation/scrollAnim';
import { preloader } from './preloader';
import {$body, css} from '../modules/dev/_helpers';

class ExpandList {
  constructor(el) {
    this.$list = $(el);
    this.$btn = this.$list.find('.expand-list__btn');
    this.$listInner = this.$list.find('.expand-list__inner');
    this.$visibleItem = this.$listInner.find('.expand-list__item').not('.is-hidden');
    this.tl = new TimelineMax();

    if (this.$list.length) this.init();
  }

  init() {
    if (!$body.hasClass(css.animsDisabled)) this.scrollAnim();
    this.showMore();
  }

  scrollAnim() {
    const _this = this;

    this.$visibleItem.each((i, item) => {
      new ScrollAnim({
        el: item,
        onStart() {
          _this.itemsAnim(i, item);
        }
      });
    });

    new ScrollAnim({
      el: _this.$btn[0],
      onStart() {
        _this.btnAnim();
      }
    });
  }

  itemsAnim(i, item) {
    const delay = i * 0.3;

    this.tl
      .to($(item), .8, { x: 0, autoAlpha: 1 }, delay);
  }

  btnAnim() {
    TweenMax.to(this.$btn, 1, { x: 0, autoAlpha: 1 });
  }

  showMore() {
    this.$btn.on('click tap', (e) => {
      e.preventDefault();
      this.$hiddenItem = this.$listInner.find('.expand-list__item.is-hidden');

      this.tl
        .to(this.$btn, .4, { autoAlpha: 0, x: -50 })
        .set(this.$hiddenItem, { className: `-=${css.hidden}` })
        .to(this.$listInner, .4, { height: 'auto' })
        .staggerTo(this.$hiddenItem, .5, { x: 0, autoAlpha: 1 }, .2);
    });
  }
}

$('.js-expand-list').each((i, el) => {
  new ExpandList(el);
});
