import { $window, Resp, throttle } from '../modules/dev/_helpers';

export class PageResize {
  constructor() {
    this.init();
  }

  getResp() {
    if (Resp.isDesk) {
      this.resp = 'desk';
    } else if (Resp.isTablet) {
      this.resp = 'tablet';
    } else if (Resp.isMobile) {
      this.resp = 'mobile';
    }
  }

  wait() {
    return this.resolve;
  }

  init() {

    this.resolve = new Promise(resolve => {
      sessionStorage.getItem('resized');
      this.getResp();

      const refreshPage = throttle(() => {
        if (Resp.isDesk) {
          this.currentResp = 'desk';
        } else if (Resp.isTablet) {
          this.currentResp = 'tablet';
        } else if (Resp.isMobile) {
          this.currentResp = 'mobile';
        }

        if (this.resp !== this.currentResp) {
          this.resp = this.currentResp;

          sessionStorage.setItem('resized', true);
          location.reload();
        }
      }, 250, this);

      $window.on('resize', refreshPage);
      resolve();
    });
  }

}

export default new PageResize();
