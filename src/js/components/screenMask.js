import * as PIXI from 'pixi.js';
import 'pixi-svg';
import { Resp, detectIE } from '../modules/dev/_helpers';

class ScreenMask {
  constructor() {
    this.block = document.querySelector('.screen-mask');
    this.imgSrc = this.block.getAttribute('data-img-src');
    this.videoSrc = this.block.getAttribute('data-video-src');
    this.blurSize = 10;
    this.blurFilter = new PIXI.filters.BlurFilter(this.blurSize);

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.init();
  }

  init() {
    this.createApp();
    this.isVideoLoaded();
    this.checkDeviceType();
    this.bindEvents();

    // this.video();
    // this.image();
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.onResize();
      this.removeVideoOnMobile();
    });
  }

  isVideoLoaded() {
    this.videoSrc ? this.video() : this.image();
  }

  createApp() {
    this.app = new PIXI.Application(this.width, this.height, { transparent: true, autoResize: true });
    this.block.appendChild(this.app.view);
  }

  image() {
    const imgBlured = PIXI.Sprite.fromImage(this.imgSrc);
    const img = PIXI.Sprite.fromImage(this.imgSrc);

    imgBlured.filters = [this.blurFilter];

    if (detectIE()) {
      const ieBlur = new PIXI.filters.BlurFilter(5);
      imgBlured.filters = [ieBlur];
      this.app.stage.addChild(img, imgBlured);
    } else {
      this.maskEl = new PIXI.SVG(this.block.querySelector('.screen-mask__el'));

      this.maskEl.width = this.width;
      this.maskEl.height = this.height;
      this.maskEl.position.x = 260;
      this.maskEl.position.y = 0;

      img.mask = this.maskEl;

      this.app.stage.addChild(imgBlured, img, this.maskEl);
    }

    if (Resp.isDesk) {
      img.x = -this.blurSize;
      img.y = -this.blurSize;
      imgBlured.x = -this.blurSize;
      imgBlured.y = -this.blurSize;

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

      img.width = this.width + 800;
      img.height = this.height + this.blurSize * 3;
      imgBlured.width = this.width + 800;
      imgBlured.height = this.height + this.blurSize * 3;
    }

  }

  video() {
    const video = new PIXI.Texture.fromVideo(this.videoSrc);
    const videoSprite = new PIXI.Sprite(video);
    const videoSpriteBlur = new PIXI.Sprite(video);

    video.baseTexture.source.loop = true;
    video.baseTexture.source.muted = true;

    if (detectIE()) {
      this.image();
    } else {
      this.maskEl = new PIXI.SVG(this.block.querySelector('.screen-mask__el'));

      this.maskEl.width = this.width;
      this.maskEl.height = this.height;
      this.maskEl.position.x = 260;
      this.maskEl.position.y = 0;

      videoSprite.mask = this.maskEl;
      videoSpriteBlur.filters = [this.blurFilter];

      this.app.stage.addChild(videoSpriteBlur, videoSprite, this.maskEl);

      if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        const button = new PIXI.Graphics()
          .beginFill(0x0, 0.5)
          .drawRoundedRect(0, 0, 100, 100, 10)
          .endFill()
          .beginFill(0xffffff)
          .moveTo(36, 30)
          .lineTo(36, 70)
          .lineTo(70, 50);

        button.x = 100;
        button.y = 100;

        // button.x = (this.app.screen.width - button.width) / 2;
        // button.y = (this.app.screen.height - button.height) / 2;

        button.interactive = true;
        button.buttonMode = true;

        button.on('pointertap', onPlayVideo);

        function onPlayVideo() {

          button.destroy();

          video.baseTexture.source.play();
        }

        this.app.stage.addChild(button);
      }
    }

    if (Resp.isDesk) {
      videoSprite.x = -this.blurSize * 2;
      videoSprite.y = -this.blurSize * 2;
      videoSpriteBlur.x = -this.blurSize * 2;
      videoSpriteBlur.y = -this.blurSize * 2;

      videoSprite.width = this.width + this.blurSize * 4;
      videoSprite.height = this.height + this.blurSize * 4;
      videoSpriteBlur.width = this.width + this.blurSize * 4;
      videoSpriteBlur.height = this.height + this.blurSize * 4;
    }

    if (Resp.isTablet) {
      this.maskEl.width = this.width + 1080;
      this.maskEl.position.x = 30;

      videoSprite.x = -this.blurSize - 450;
      videoSprite.y = -this.blurSize;
      videoSpriteBlur.x = -this.blurSize - 450;
      videoSpriteBlur.y = -this.blurSize;
      videoSpriteBlur.filters = [this.blurFilter];

      videoSprite.width = this.width + 1000;
      videoSprite.height = this.height + this.blurSize * 3;
      videoSpriteBlur.width = this.width + 1000;
      videoSpriteBlur.height = this.height + this.blurSize * 3;
    }

    if (Resp.isMobile) {
      this.maskEl.width = this.width + 750;
      this.maskEl.position.x = -50;

      videoSprite.x = -this.blurSize - 300;
      videoSprite.y = -this.blurSize;
      videoSpriteBlur.x = -this.blurSize - 300;
      videoSpriteBlur.y = -this.blurSize;
      videoSpriteBlur.filters = [this.blurFilter];

      videoSprite.width = this.width + 800;
      videoSprite.height = this.height + this.blurSize * 3;
      videoSpriteBlur.width = this.width + 800;
      videoSpriteBlur.height = this.height + this.blurSize * 3;
    }

  }

  checkDeviceType() {
    (Resp.isMobile) ? this.image() : this.video();
  }

  removeVideoOnMobile() {
    if (Resp.isMobile) this.image();
  }

  onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    this.app.renderer.view.style.width = `${w}px`;
    this.app.renderer.view.style.height = `${h}px`;
  }
}

export const screenMaskAPI = new ScreenMask();
