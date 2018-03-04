import { preloader } from './preloader';

class WaitPreloader {

  init() {
    return new Promise(resolve => {
      let waitInerval = setInterval(() => {
        if (Preloader.resolved === true) {
          clearInterval(waitInerval);

          // resolver
          resolve();
        }
      }, 100);
    });
  }

}

export default new WaitPreloader();
