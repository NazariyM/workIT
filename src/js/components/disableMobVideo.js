import { Resp, $window } from '../modules/dev/_helpers';

class DisableMobVideo {
  constructor() {
    this.$disabledVideos = $('video[data-mobile-disable]');
    this.$enabledVideos = $('video[data-mobile-play]');

    if (!Resp.isDesk) this.init();
  }

  init() {
    this.disableVideos();
    this.addControls();
  }

  disableVideos() {
    this.$disabledVideos.each(function () {
      $(this).remove();
    });
  }

  addControls() {
    this.$enabledVideos.each(function () {
      const $controlsAttr = $(this).attr('controls');

      if (typeof $controlsAttr !== typeof undefined && $controlsAttr !== false) {
        $(this).attr('conrols', 'true');
      } else {
        $(this).attr('conrols', 'true');
      }
    });
  }

  onResize() {
    $window.on('resize', () => {
      this.disableVideos();
      this.addControls();
    });
  }
}

export const disableVideo = new DisableMobVideo();