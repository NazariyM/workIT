import * as PIXI from 'pixi.js';
import 'pixi-svg';

class Mask {
  constructor() {
    this.block = document.querySelector('.mask');
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.blurSize = 10;
    this.maskPosX = 240;
    this.maskPosY = 0;
    this.maskEl = new PIXI.SVG(document.querySelector('.mask__el'));
    this.blurFilter = new PIXI.filters.BlurFilter(this.blurSize);
    this.maskEl.width = this.width;
    this.maskEl.height = this.height;
    this.maskEl.position.x = this.maskPosX;
    this.maskEl.position.y = this.maskPosY;

    if (this.block) this.init();
  }

  init() {
    this.createApp();
    this.bindEvents();
    // this.video();
    this.image();
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.onResize();
    });
  }

  createApp() {
    this.app = new PIXI.Application(this.width, this.height, { transparent: true, autoResize: true });
    this.block.appendChild(this.app.view);
    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);
  }

  image() {
    const imgBlured = PIXI.Sprite.fromImage('static/img/screen_bg.jpg');
    const img = PIXI.Sprite.fromImage('static/img/screen_bg.jpg');

    img.mask = this.maskEl;

    img.x = -this.blurSize;
    img.y = -this.blurSize;
    imgBlured.x = -this.blurSize;
    imgBlured.y = -this.blurSize;
    imgBlured.filters = [this.blurFilter];

    img.width = this.width + this.blurSize * 2;
    img.height = this.height + this.blurSize * 2;
    imgBlured.width = this.width + this.blurSize * 2;
    imgBlured.height = this.height + this.blurSize * 2;

    this.container.addChild(imgBlured, img, this.maskEl);
  }

  video() {
    const video = new PIXI.Texture.fromVideo('static/video/video-sample.mp4');
    const videoSprite = new PIXI.Sprite(video);
    const videoSpriteBlur = new PIXI.Sprite(video);

    videoSprite.x = -16;
    videoSprite.y = +16;
    videoSpriteBlur.x = -16;
    videoSpriteBlur.y = +16;

    videoSprite.width = this.width + 8;
    videoSprite.height = this.height + 8;
    videoSpriteBlur.width = this.width + 8;
    videoSpriteBlur.height = this.height + 8;

    videoSpriteBlur.filters = [this.blurFilter];
    videoSprite.mask = this.maskEl;

    this.container.addChild(videoSpriteBlur, videoSprite, this.maskEl);
  }

  onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    this.app.renderer.view.style.width = `${w}px`;
    this.app.renderer.view.style.height = `${h}px`;

  }
}

export const maskAPI = new Mask();
