import * as PIXI from 'pixi.js';
import 'pixi-svg';
import { detectSafari } from '../modules/dev/_helpers';

class Mask {
  constructor() {
    this.block = document.querySelector('.mask');
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.blurSize = 10;
    this.maskPosX = 240;
    this.maskPosY = 0;
    this.maskEl = new PIXI.SVG(this.block.querySelector('.mask__el'));
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
    this.video();
    // this.image();
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

    img.width = this.width + this.blurSize * 3;
    img.height = this.height + this.blurSize * 3;
    imgBlured.width = this.width + this.blurSize * 3;
    imgBlured.height = this.height + this.blurSize * 3;

    this.container.addChild(imgBlured, img, this.maskEl);

  }

  video() {
    const _this = this;

    const video = new PIXI.Texture.fromVideo('static/video/video-sample.mp4');
    const videoSprite = new PIXI.Sprite(video);
    const videoSpriteBlur = new PIXI.Sprite(video);

    video.baseTexture.source.loop = true;
    video.baseTexture.source.muted = true;

    const videoLoaded = new Promise((resolve) => {
      resolve(video.baseTexture.hasLoaded);
    });

    videoLoaded.then(() => {
      video.baseTexture.source.pause();
    });

    videoSprite.x = -15;
    videoSprite.y = +15;
    videoSpriteBlur.x = -15;
    videoSpriteBlur.y = +15;

    videoSprite.width = _this.width + 30;
    videoSprite.height = _this.height + 30;
    videoSpriteBlur.width = _this.width + 30;
    videoSpriteBlur.height = _this.height + 30;

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

export const maskAPI = new Mask();
