import { TweenMax } from 'gsap';
import { Resp } from '../modules/dev/_helpers';

class Mask {
  constructor(block, fullscreen) {
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
    this.rects = this.block.querySelectorAll('rect');
    this.clipPathTag = this.block.querySelector('clipPath');
    this.maskTag = this.block.querySelector('mask');

    switch (this.maskType) {
      case 'video':
        this.maskEl = this.maskTag.querySelector('.mask__el');
        this.initVideo();
        break;
      case 'image':
        this.maskEl = this.clipPathTag.querySelector('.mask__el');
        this.initImage();
        break;
      default:
        this.initVideo();
    }
  }

  initImage() {
    // height


    this.images = this.block.querySelectorAll('image');

    this.maskTag.remove();
    this.rects.forEach(x => {x.remove(); });
  }

  initVideo() {
    this.clipPathTag.remove();
  }

  setRatio(maskType) {
    maskType = this.maskType;

    this.maskWidth = 1219;
    this.maskHeight = 681;

    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;

    maskType === 'video' ? this.videoFix(winWidth, winHeight) : this.imageFix(winWidth, winHeight);

    const widthTransform = winWidth / this.maskWidth;
    const heightTransform = winHeight / this.maskHeight;
    const offsetX = 310;
    const value = heightTransform < widthTransform ? widthTransform : heightTransform;

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
