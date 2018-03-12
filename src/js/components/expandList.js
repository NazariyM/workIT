import { TimelineMax, TweenMax } from 'gsap';
import ScrollAnim from '../modules/dev/animation/scrollAnim';
import { preloader } from './preloader';
import { css, $window, Resp } from '../modules/dev/_helpers';

class ExpandList {
  constructor(el) {
    this.$list = $(el);
    this.$btn = this.$list.find('.expand-list__btn');
    this.$listInner = this.$list.find('.expand-list__inner');
    this.$hiddenItem = this.$listInner.children('.is-hidden');
    this.$visibleItem = this.$listInner.children().not('.is-hidden');
    this.tl = new TimelineMax();

    if (this.$list.length) this.init();
  }

  init() {
    this.scrollAnim();
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

    // else {
    //   const $mobHiddenItems = $listInner.children().eq(1).nextAll();
    //
    //   $mobHiddenItems.addClass(css.hidden);
    //
    //   const $mobVisibleItems = $listInner.children().not('.is-hidden');
    //
    //   tl
    //    .staggerTo($mobVisibleItems, 1, { x: 0, autoAlpha: 1 }, .3)
    //    .to($btn, .5, { x: 0, autoAlpha: 1 }, '-=.5');
    // }
  }

  btnAnim() {
    TweenMax.to(this.$btn, 1, { x: 0, autoAlpha: 1 });
  }

  showMore() {
    this.$btn.on('click tap', (e) => {
      e.preventDefault();

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
