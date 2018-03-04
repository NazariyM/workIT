import { TimelineMax, TweenMax } from 'gsap';
import { preloader } from './preloader';
import {
	$body,
	$window,
	throttle,
	css,
	Resp
} from '../modules/dev/_helpers';

class Header {
	constructor() {
		this.body = document.querySelector('body');
		this.header = document.querySelector('.header');
		this.inner = document.querySelector('.header__inner');
		this.menuBtn = this.header.querySelector('.header__menu-btn');
		this.mobClose = this.header.querySelector('.header__mob-close-btn');
		this.mob = this.header.querySelector('.header__mob');
		this.mobCol2 = this.mob.querySelectorAll('.header__mob-col')[1].children;
		this.navMob = this.mob.querySelector('.nav_mob ul');
		this.langMob = this.mob.querySelector('.lang_mob ul');
		this.navMobLinks = [...this.navMob.children];
		this.langMobLinks = [...this.langMob.children];
		this.scrollTop = 0;

		this.init();
	}

	async init() {
		await preloader.wait();
		await this.startAnim();
		this.initFix();
		this.prepareHeaderAnim();
		this.bindEvents();
	}

	bindEvents() {
		this.menuBtn.addEventListener('click', () => {
      if (Resp.isMobile) this.beforeOpen();
			this.toggleMenu();
		});

		this.mobClose.addEventListener('click', () => {
      if (Resp.isMobile) this.beforeClose();
			this.toggleMenu();
		});
	}

  beforeOpen() {
    this.scrollTop = $window.scrollTop();
    this.scrollTop > 0 ? this.header.classList.add(css.menuActive) : false;
  }

  beforeClose() {
    this.body.classList.remove(css.locked);
    $body.scrollTop(this.scrollTop);
    this.header.classList.remove(css.menuActive);
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
		this.toggleNav();

		return HeaderAPI;
	}

	lockBody() {
		Resp.isMobile ? this.body.classList.toggle(css.locked) : false;
	}

	set burgerActiveState(className) {
		this.menuBtn.classList.toggle(className);
		this.mobClose.classList.toggle(className);
	}

	get burgerActiveState() {
		return this.menuBtn.classList.contains(css.active);
	}

	prepareHeaderAnim() {
		this.mobTl = new TimelineMax({ paused: true , onComplete: () => {
				this.lockBody();
				// if (Resp.isMobile) this.body.classList.add(css.locked);
      }});

		this.mobTl
		 .to(this.mob, .35, {
			y: 0
		})
		 .staggerTo(this.langMobLinks, 0.25, {
			autoAlpha: 1,
			y: 0
		}, 0.125, 'animAll')
		 .staggerTo(this.navMobLinks, 0.25, {
			autoAlpha: 1,
			y: 0
		}, 0.125, 'animAll')
		 .staggerTo(this.mobCol2, 0.25, {
			autoAlpha: 1,
			y: 0
		}, 0.125, '=-0.125');

	}

	toggleNav() {
		this.burgerActiveState ? this.mobTl.timeScale(1).play() : this.mobTl.timeScale(3).reverse();
	}

	initFix() {
		const _this = this;
		const toggleHeaderScroll = throttle(() => {
			toggleHeader();
		}, 0, this);

		function toggleHeader() {
			if (window.scrollY > 0 && !_this.header.classList.contains(css.menuActive)) {
				_this.header.classList.add(css.fixed);
			} else {
				_this.header.classList.remove(css.fixed);
			}
		}

		window.addEventListener('scroll', toggleHeaderScroll);
	}

	startAnim() {
		const tl = new TimelineMax();

		tl
			.to(this.inner, .3, { y: 0 }, 'animAll');
	}

}

export const HeaderAPI = new Header();
