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

    if (this.block) this.init();
  }

  init() {
    this.createMask();
    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.onResize();
    });
  }

  createMask() {
    const blurSize = this.blurSize;
    const width = this.width;
    const height = this.height;
    const maskPosX = this.maskPosX;
    const maskPosY = this.maskPosY;

    this.app = new PIXI.Application(width, height, { transparent: true, autoResize: true });
    this.block.appendChild(this.app.view);
    this.maskImgContainer = new PIXI.Container();
    this.app.stage.addChild(this.maskImgContainer);

    const imgBlured = PIXI.Sprite.fromImage('static/img/screen_bg.jpg');
    const img = PIXI.Sprite.fromImage('static/img/screen_bg.jpg');
    const blurFilter = new PIXI.filters.BlurFilter(blurSize);
    const imgMask = new PIXI.SVG(document.querySelector('.mask__img'));
    const video = new PIXI.Texture.fromVideo('static/video/video-sample.mp4');
    const videoSprite = new PIXI.Sprite(video);
    const videoSpriteBlur = new PIXI.Sprite(video);

    // set blur
    img.x = -blurSize;
    img.y = -blurSize;
    imgBlured.x = -blurSize;
    imgBlured.y = -blurSize;
    imgBlured.filters = [blurFilter];

    img.width = width + blurSize * 2;
    img.height = height + blurSize * 2;
    imgBlured.width = width + blurSize * 2;
    imgBlured.height = height + blurSize * 2;

    // add mask
    imgMask.width = width;
    imgMask.height = height;
    imgMask.position.x = maskPosX;
    imgMask.position.y = maskPosY;
    img.mask = imgMask;

    // video
    videoSprite.width = width;
    videoSprite.height = height;
    videoSpriteBlur.width = width;
    videoSpriteBlur.height = height;

    videoSpriteBlur.filters = [blurFilter];
    videoSprite.mask = imgMask;

    // append to stage
    // this.maskImgContainer.addChild(imgBlured, img, imgMask);
    this.maskImgContainer.addChild(videoSpriteBlur, videoSprite, video);

  }

  onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    this.app.renderer.view.style.width = `${w}px`;
    this.app.renderer.view.style.height = `${h}px`;

  }
}

export const maskAPI = new Mask();
