import {$body, Resp} from '../modules/dev/_helpers';

export class MobileVideo {

  constructor() {
    this.$video = $('video[data-mobile-autoplay="true"]');
  }

  bindEvents() {
    //only once
    $body.one('touchstart', () => {
      this.$video.each((index, el) => {
        //if not playing
        if ($(el).get(0).paused) {
          //play video
          $(el).get(0).play();
        }
      });
    });
  }

  init() {
    if (!Resp.isDesk) {
      this.bindEvents();
    }
  }

}

export default new MobileVideo();
