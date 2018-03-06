import { TweenMax } from 'gsap';
import { Resp } from '../modules/dev/_helpers';

class Mask {
  constructor() {
    this.svg = document.querySelector('.mask');
    this.maskEl = this.svg.querySelector('.mask__el');
    this.image = this.svg.querySelectorAll('image');

    if (this.svg) this.init();

  }

  init() {
    this.setRatio();
    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.onResize();
    });
  }

  setRatio() {
    const elWidth = 1219;
    const elHeight = 681;

    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;

    // fix for IE, FF etc.
    for (let img of this.image) {
      img.setAttribute('width', `${winWidth + 30}`);
      img.setAttribute('height', `${winHeight + 30}`);
    }

    const widthTransform = winWidth / elWidth;
    const heightTransform = winHeight / elHeight;
    const value = heightTransform < widthTransform ? widthTransform : heightTransform;

    TweenMax.set(this.maskEl, { transform: `scale(${value}, ${value}) translateX(310px)` });
  }

  onResize() {
    this.setRatio();
  }
}

export const MaskAPI = new Mask();
