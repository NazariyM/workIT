import { Resp, detectIE, css } from '../modules/dev/_helpers';

class VideoBlock {
  constructor() {
    this.$blocks = $('.video-block');
    this.$disabledVideos = $('video[data-mobile-disable="true"]');

    this.init();
  }

  init() {
    this.play();

    if (!Resp.isDesk) this.disableOnMob();
  }

  play() {
    this.$blocks.each((i, $block) => {
      const $btn = $($block).find('button');
      const $video = $($block).find('video');

      $btn.on('click', function () {
        const $this = $(this);

        $this.addClass(css.hide);
        $video[0].play();

        $video.on('click', () => {
          $video[0].pause();
          $btn.removeClass(css.hide);
        });
      });
    });
  }

  disableOnMob() {
    this.$disabledVideos.each(function () {
      $(this).remove();
    });
  }
}

export const VideoBlockAPI = new VideoBlock();
