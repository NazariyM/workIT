import { Resp, $window } from '../modules/dev/_helpers';

class DisableMobVideo {
  constructor() {
    this.$videos = $('video[data-mobile-disable]');

    if (!Resp.isDesk && this.$videos.length) this.init();
  }

  init() {
    this.disableVideos();
  }

  disableVideos() {
    this.$videos.each(function () {
      $(this).remove();
    });
  }

  onResize() {
    $window.on('resize', this.disableVideos());
  }
}

export const disableVideo = new DisableMobVideo();