import { $body, $window, css, debounce, Resp } from '../modules/dev/_helpers';

class NoTouch {
  constructor() {
    NoTouch.init();
  }

  static init() {
    const toggleNoTouch = () => {
      if (Resp.isDesk) {
        $body.addClass(css.noTouch);
      } else {
        $body.removeClass(css.noTouch);
      }
    };

    toggleNoTouch();
    $window.on('resize', debounce(toggleNoTouch, this, 250));
  }
}

export default new NoTouch();
