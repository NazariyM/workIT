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
    if (detectIE()) this.posterFix();
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

  posterFix() {
    this.$blocks.each((i, block) => {
      const $block = $(block);
      const $video = $block.find('video');
      const $poster = $video.attr('poster');
      const $btn = $($block).find('button');
      const $img = `<img class="video-block__poster-fix" src='${$poster}'>`;

      $block.append($img);

      $btn.on('click', function () {
        const $posterImg = $(this).siblings('.video-block__poster-fix');

        $posterImg.remove();
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
