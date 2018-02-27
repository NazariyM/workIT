import { TimelineMax, TweenMax } from 'gsap';
import { preloader } from './preloader';
import ScrollAnim from '../modules/dev/animation/scrollAnim';
import {
  throttle,
  debounce,
  css
} from '../modules/dev/_helpers';

class Header {
  constructor() {
    this.header = document.querySelector('.header');
	  this.menuBtn = this.header.querySelector('.header__menu-btn');
	  this.burger = this.menuBtn.querySelector('.header__menu-burger');
	  this.burgerLines = [...this.burger.children];
	  this.headerMob = this.header.querySelector('.header__mob');
	  this.headerMobCol2 = this.headerMob.querySelectorAll('.header__mob-col')[1].children;
	  this.navMob = this.headerMob.querySelector('.nav_mob ul');
	  this.langMob = this.headerMob.querySelector('.lang_mob ul');
	  this.navMobLinks = [...this.navMob.children];
	  this.langMobLinks = [...this.langMob.children];

	  this.init();
  }

  async init() {
    await preloader.wait();
    await this.startAnim();
    this.initFix();
	  this.prepareBurgerAnim();
	  this.prepareHeaderAnim();
	  this.bindEvents();
	  this.clearResize();
  }

	bindEvents() {
		this.menuBtn.addEventListener('click', () => {
			this.toggleMenu();
		});
	}

	toggleMenu(state = false) {
		switch (state) {
			case 'open':
				this.menuBtn.classList.add(css.active);
				break;
			case 'close':
				this.menuBtn.classList.remove(css.active);
				break;
			default:
				this.burgerActiveState = css.active;
		}
		this.toggleBurger();
		this.toggleNav();

		return HeaderAPI;
	}

	set burgerActiveState(className) {
		this.menuBtn.classList.toggle(className);
	}

	get burgerActiveState() {
		return this.menuBtn.classList.contains(css.active);
	}

	prepareBurgerAnim() {
		this.burgerTl = new TimelineMax({ paused: true });

		this.burgerTl
			.to(this.burgerLines[0], 0.6, {
				rotation: 45,
				y: 7
			}, 0)
			.to(this.burgerLines[1], 0.4, {
				alpha: 0,
				width: 0
			}, 0)
			.to(this.burgerLines[2], 0.6, {
				rotation: -45,
				y: -7
			}, 0);
	}

	prepareHeaderAnim() {
		this.headerMobTl = new TimelineMax({ paused: true });

		this.headerMobTl
			.to(this.headerMob, .5, {
				y: 0
			})
			.staggerTo(this.langMobLinks, 0.3, {
				autoAlpha: 1,
				y: 0
			}, 0.125, 'animAll')
			.staggerTo(this.navMobLinks, 0.3, {
				autoAlpha: 1,
				y: 0
			}, 0.125, 'animAll')
			.staggerTo(this.headerMobCol2, 0.3, {
				autoAlpha: 1,
				y: 0
			}, 0.125, '=-0.125');
	}

	toggleBurger() {
		this.burgerActiveState ? this.burgerTl.play() : this.burgerTl.reverse();
	}

	toggleNav() {
		this.burgerActiveState ? this.headerMobTl.timeScale(1).play() : this.headerMobTl.timeScale(2).reverse();
	}

	clearResize() {
		window.addEventListener('resize', debounce(clear, this, 250));

		function clear() {
			this.menuBtn.classList.remove(css.active);
			TweenMax.set(this.headerMob, { clearProps: 'all' });
			TweenMax.set(this.burgerLines, { clearProps: 'all' });
			this.prepareBurgerAnim();
			this.prepareHeaderAnim();
		}
	}

  initFix() {
  	const _this = this;
    const toggleHeaderScroll = throttle(() => {
	    toggleHeader();
    }, 0, this);

    function toggleHeader() {
	    if (window.scrollY > 0) {
	      _this.header.classList.add(css.fixed);
      } else {
        _this.header.classList.remove(css.fixed);
      }
    }

	  window.addEventListener('scroll', toggleHeaderScroll);
  }

  startAnim() {
    const tl = new TimelineMax();

    tl.to(this.header, .3, { y: 0 });
  }

}

export const HeaderAPI = new Header();
