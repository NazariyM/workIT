import { TweenMax } from 'gsap';
import { Resp } from '../modules/dev/_helpers';

class Mask {
  constructor() {
    this.block = document.querySelector('.mask');

    if (this.block) this.init();
  }

  init() {
    this.detectType();
    this.setRatio();
    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.onResize();
    });
  }

  detectType() {
    this.maskType = this.block.getAttribute('data-mask-type');
    // this.video = this.block.querySelector('video');
    this.maskEl = this.block.querySelector('.mask__el');
    this.rects = this.block.querySelectorAll('rect');

    switch (this.maskType) {
      case 'image':
        this.maskTag = this.block.querySelector('mask');
        this.initImage();
        break;
      case 'video':
        this.clipPathTag = this.block.querySelector('clipPath');
        this.initVideo();
        break;
      default:
        this.initVideo();
    }
  }

  initImage() {
    this.images = this.block.querySelectorAll('image');

    // this.maskTag.remove();
    // this.rects.forEach(x => {x.remove(); });
  }

  initVideo() {

  }

  setRatio() {
    // maskType = this.maskType;

    this.maskWidth = 1219;
    this.maskHeight = 681;

    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;

    const widthTransform = winWidth / this.maskWidth;
    const heightTransform = winHeight / this.maskHeight;
    const value = heightTransform < widthTransform ? widthTransform : heightTransform;
    const offsetX = 310;

    this.imageFix(winWidth, winHeight);
    this.videoFix(winWidth, winHeight);

    TweenMax.set(this.maskEl, { transform: `scale(${value}, ${value}) translateX(${offsetX}px)` });

  }

  imageFix(winWidth, winHeight) {
    for (let img of this.images) {
      img.setAttribute('width', `${winWidth + 30}`);
      img.setAttribute('height', `${winHeight + 30}`);
    }
  }

  videoFix(winWidth, winHeight) {
    for (let rect of this.rects) {
      rect.setAttribute('width', `${winWidth + 30}`);
      rect.setAttribute('height', `${winHeight + 30}`);
    }
  }

  onResize() {
    this.setRatio();
  }

}

export const MaskAPI = new Mask();
