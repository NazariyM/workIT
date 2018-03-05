import * as PIXI from 'pixi.js';
// import 'pixi-svg';
// var SVGGraphics = require('pixi-vector-graphics');
import SVGGraphics from 'pixi-svg-graphics';
import { Resp } from '../modules/dev/_helpers';

class ScreenMask {
  constructor() {
    this.block = document.querySelector('.screen-mask');
    this.imgSrc = this.block.getAttribute('data-img-src');
    this.videoSrc = this.block.getAttribute('data-video-src');
    this.blurSize = 10;
    this.blurFilter = new PIXI.filters.BlurFilter(this.blurSize);
    // this.maskEl = new PIXI.SVG(this.block.querySelector('.screen-mask__el'));
    var svg = document.querySelector('svg#MySVGTag');
    this.maskEl = new PIXI.Graphics();
    SVGGraphics.drawSVG(this.maskEl, svg);

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.maskEl.width = this.width;
    this.maskEl.height = this.height;
    this.maskEl.position.x = 260;
    this.maskEl.position.y = 0;

    this.init();
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
  }

  image() {
    // const SVGGraphics = require('pixi-svg-graphics');

    // var svg = document.querySelector('svg#MySVGTag')

    // var graphics = new SVGGraphics(svg);

    const imgBlured = PIXI.Sprite.fromImage(this.imgSrc);
    const img = PIXI.Sprite.fromImage(this.imgSrc);

    img.mask = this.maskEl;

    if (Resp.isDesk) {
      img.x = -this.blurSize;
      img.y = -this.blurSize;
      imgBlured.x = -this.blurSize;
      imgBlured.y = -this.blurSize;
      imgBlured.filters = [this.blurFilter];

      img.width = this.width + this.blurSize * 3;
      img.height = this.height + this.blurSize * 3;
      imgBlured.width = this.width + this.blurSize * 3;
      imgBlured.height = this.height + this.blurSize * 3;
    }

    if (Resp.isTablet) {
      this.maskEl.width = this.width + 1080;
      this.maskEl.position.x = 30;

      img.x = -this.blurSize - 450;
      img.y = -this.blurSize;
      imgBlured.x = -this.blurSize - 450;
      imgBlured.y = -this.blurSize;
      imgBlured.filters = [this.blurFilter];

      img.width = this.width + 1000;
      img.height = this.height + this.blurSize * 3;
      imgBlured.width = this.width + 1000;
      imgBlured.height = this.height + this.blurSize * 3;
    }

    if (Resp.isMobile) {
      this.maskEl.width = this.width + 750;
      this.maskEl.position.x = -50;

      img.x = -this.blurSize - 300;
      img.y = -this.blurSize;
      imgBlured.x = -this.blurSize - 300;
      imgBlured.y = -this.blurSize;
      imgBlured.filters = [this.blurFilter];

      img.width = this.width + 800;
      img.height = this.height + this.blurSize * 3;
      imgBlured.width = this.width + 800;
      imgBlured.height = this.height + this.blurSize * 3;
    }

    this.app.stage.addChild(imgBlured, img, this.maskEl);

  }

  video() {
    const _this = this;

    const video = new PIXI.Texture.fromVideo(this.videoSrc);
    const videoSprite = new PIXI.Sprite(video);
    const videoSpriteBlur = new PIXI.Sprite(video);

    video.baseTexture.source.loop = true;
    video.baseTexture.source.muted = true;

    videoSprite.x = -this.blurSize * 2;
    videoSprite.y = -this.blurSize * 2;
    videoSpriteBlur.x = -this.blurSize * 2;
    videoSpriteBlur.y = -this.blurSize * 2;

    videoSprite.width = _this.width + this.blurSize * 4;
    videoSprite.height = _this.height + this.blurSize * 4;
    videoSpriteBlur.width = _this.width + this.blurSize * 4;
    videoSpriteBlur.height = _this.height + this.blurSize * 4;

    videoSpriteBlur.filters = [_this.blurFilter];
    videoSprite.mask = this.maskEl;

    _this.app.stage.addChild(videoSpriteBlur, videoSprite, _this.maskEl);

    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      const button = new PIXI.Graphics()
        .beginFill(0x0, 0.5)
        .drawRoundedRect(0, 0, 100, 100, 10)
        .endFill()
        .beginFill(0xffffff)
        .moveTo(36, 30)
        .lineTo(36, 70)
        .lineTo(70, 50);

      button.x = (this.app.screen.width - button.width) / 2;
      button.y = (this.app.screen.height - button.height) / 2;

      button.interactive = true;
      button.buttonMode = true;

      button.on('pointertap', onPlayVideo);

      function onPlayVideo() {

        button.destroy();

        video.baseTexture.source.play();
      }

      _this.app.stage.addChild(button);
    }

  }

  onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    this.app.renderer.view.style.width = `${w}px`;
    this.app.renderer.view.style.height = `${h}px`;
  }
}

export const screenMaskAPI = new ScreenMask();
