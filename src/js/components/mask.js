import { Resp, detectIE } from '../modules/dev/_helpers';

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
    // const box = this.maskEl.getBBox();
    // const elW = box.width;
    // const elH = box.height;

    const elW = 1220;
    const elH = 681;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // this.svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    // console.log(this.image);

    for (let img of this.image) {
      img.setAttribute('width', `${width + 30}`);
      img.setAttribute('height', `${height + 30}`);
    }

    // this.maskElRatio = elW / elH;

    // this.ratio = width / height;

    this.ratio1 = width / elW;
    this.ratio2 = height / elH;

    // if (!Resp.isDesk) {
    //   this.ratio = this.height / this.width;
    // }

    this.maskEl.style.transform = `scale(${this.ratio2}, ${this.ratio1}) translate(310px, 20px)`;

    // this.maskEl.style.transform = `scale(${this.ratio2}, ${this.ratio1}) translateX(310px)`;

    // this.maskEl.style.transform = `scale(${this.maskElRatio}, ${this.ratio}) translate(100px, 0px)`;
    // this.maskEl.style.transform = `scale(${this.ratio1 * this.ratio2}) translate(100px, 0px)`;
  }

  onResize() {
    this.setRatio();
  }
}

export const MaskAPI = new Mask();
