import { TweenMax } from 'gsap';
import { Resp } from '../modules/dev/_helpers';

class Mask {
  constructor(block, fullscreen = true) {
    this.block = document.querySelector(block);
    this.fullscreen = fullscreen;
    if (this.block) this.init();
  }

  init() {
    this.detectType();
    this.bindEvents();
  }

  bindEvents() {
    if (this.fullscreen) {
      window.addEventListener('resize', () => {
        this.fluidRatio();
      });

    } else {
      window.addEventListener('resize', () => {
        this.fixedRatio();
      });
    }
  }

  detectType() {
    this.maskType = this.block.getAttribute('data-mask-type');
    this.video = this.block.querySelector('video');
    this.rects = this.block.querySelectorAll('rect');
    this.maskTag = this.block.querySelector('mask');
    this.clipPathTag = this.block.querySelector('clipPath');
    this.isVideo = this.maskType === 'video';
    this.isVideo ? this.initVideo() : this.initImage();
    this.fullscreen ? this.fluidRatio() : this.fixedRatio();
  }

  initImage() {
    this.images = this.block.querySelectorAll('image');
    this.maskEl = this.clipPathTag.querySelectorAll('.mask__el');
    this.maskTag.remove();
  }

  initVideo() {
    this.maskEl = this.maskTag.querySelectorAll('.mask__el');

  }

  fluidRatio() {
    const stubPage = this.block.classList.contains('mask_404');

    if (!stubPage) {
      const maskWidth = 1219;
      const maskHeight = 681;
      this.maskOffsetX = 280;

      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;

      this.isVideo ? this.videoFix(winWidth, winHeight) : this.imageFix(winWidth, winHeight);

      const widthTransform = winWidth / maskWidth;
      const heightTransform = winHeight / maskHeight;

      const value = heightTransform < widthTransform ? widthTransform : heightTransform;

      if (Resp.isTablet) {
        this.maskTag.remove();
        this.removeVideo();
        this.initImage();
        this.maskOffsetX = 25;
      }
      if (Resp.isMobile) {
        this.maskTag.remove();
        this.removeVideo();
        this.initImage();
        this.maskOffsetX = -35;
      }

      TweenMax.set(this.maskEl, { transform: `scale(${value}, ${value}) translateX(${this.maskOffsetX}px)` });

    } else {

      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;

      this.imageFix(winWidth, winHeight);

      TweenMax.set(this.maskEl, { x: '-50%' });

      if (Resp.isTablet) {
        TweenMax.set(this.maskEl, { x: '-31%' });
        for (let img of this.images) {
          if (img.hasAttribute('data-mob-ratio')) {
            img.setAttribute('preserveAspectRatio', 'xMinYMid slice');
          } else {
            img.setAttribute('preserveAspectRatio', 'xMinYMax slice');
          }
        }
      }

      if (Resp.isMobile) {
        TweenMax.set(this.maskEl, { x: '-28%' });
        for (let img of this.images) {
          if (img.hasAttribute('data-mob-ratio')) {
            img.setAttribute('preserveAspectRatio', 'xMidYMid slice');
          }
        }
      }
    }
  }

  fixedRatio() {
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;

    this.isVideo ? this.videoFix(winWidth, winHeight) : this.imageFix(winWidth, winHeight);

    this.fixedOffsetX = 600;

    if (Resp.isTablet) {
      this.fixedOffsetX = 100;
      this.maskTag.remove();
      this.removeVideo();
      this.initImage();
    }

    if (Resp.isMobile) {
      this.maskTag.remove();
      this.removeVideo();
      this.initImage();
      this.fixedOffsetX = -190;
      this.fixedOffsetY = -175;
    }

    const ratioX = (winWidth - this.fixedOffsetX) / 2;

    TweenMax.set(this.maskEl, { x: ratioX, y: this.fixedOffsetY });
  }

  imageFix(winWidth, winHeight) {
    for (let img of this.images) {
      img.setAttribute('width', `${winWidth + 30}`);
      img.setAttribute('height', `${winHeight + 30}`);

      if (!this.fullscreen) {
        img.setAttribute('width', `${winWidth + 20}`);
        Resp.isMobile ? img.setAttribute('height', 314) : img.setAttribute('height', 420);
        TweenMax.set(img, { x: -10, y: -10 });
      }
    }
  }

  videoFix(winWidth, winHeight) {
    for (let rect of this.rects) {
      rect.setAttribute('width', `${winWidth}`);
      rect.setAttribute('height', `${winHeight}`);

      if (!this.fullscreen) {
        rect.setAttribute('height', `${420}`);
      }
    }
  }

  removeVideo() {
    if (this.video) this.video.remove();
  }
}

const screenMask = new Mask('.mask_screen');
const comeMask = new Mask('.mask_come', false);
