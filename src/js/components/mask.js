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
      const fluid = window.addEventListener('resize', () => {
        this.fluidRatio();
      });

    } else {
      const fixed = window.addEventListener('resize', () => {
        this.fixedRatio();
      });
    }
  }

  detectType() {
    this.maskType = this.block.getAttribute('data-mask-type');
    this.rects = this.block.querySelectorAll('rect');
    this.maskTag = this.block.querySelector('mask');
    this.clipPathTag = this.block.querySelector('clipPath');
    this.maskType === 'video' ? this.initVideo() : this.initImage();
    this.fullscreen ? this.fluidRatio() : this.fixedRatio();
  }

  initImage() {
    this.images = this.block.querySelectorAll('image');
    this.maskEl = this.clipPathTag.querySelectorAll('.mask__el');

    this.maskTag.remove();
    this.rects.forEach(x => {x.remove(); });
  }

  initVideo() {
    this.maskEl = this.maskTag.querySelectorAll('.mask__el');
    this.clipPathTag.remove();
  }

  fluidRatio() {
    this.maskWidth = 1219;
    this.maskHeight = 681;

    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;

    this.maskType === 'video' ? this.videoFix(winWidth, winHeight) : this.imageFix(winWidth, winHeight);

    const widthTransform = winWidth / this.maskWidth;
    const heightTransform = winHeight / this.maskHeight;
    const offsetX = 310;
    const value = heightTransform < widthTransform ? widthTransform : heightTransform;

    TweenMax.set(this.maskEl, { transform: `scale(${value}, ${value}) translateX(${offsetX}px)` });

  }

  fixedRatio() {
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;

    this.maskType === 'video' ? this.videoFix(winWidth, winHeight) : this.imageFix(winWidth, winHeight);

    const offsetX = 700;
    const offsetY = 210;

    TweenMax.set(this.maskEl, { transform: `translate(${offsetX}px, ${offsetY}px)` });
  }

  imageFix(winWidth, winHeight) {
    for (let img of this.images) {
      img.setAttribute('width', `${winWidth + 30}`);
      img.setAttribute('height', `${winHeight + 30}`);
    }
  }

  videoFix(winWidth, winHeight) {
    for (let rect of this.rects) {
      rect.setAttribute('width', `${winWidth}`);
      rect.setAttribute('height', `${winHeight}`);
    }
  }
}

const screenMask = new Mask('.mask_screen');
const comeMask = new Mask('.mask_come', false);
