import 'babel-polyfill';
import objectFitImages from 'object-fit-images';
// import objectFitVideos from 'object-fit-videos';
import './header';
import './slider';
import './b-block-3';
import './preloader';
import './noTouch';

export class Common {
  /**
   * Cache data, make preparations and initialize common scripts.
   */
  constructor() {
    this.messages = {
      constructor: 'Common.js: constructor()...',
      init: 'Common.js: init()...',
      example: 'Common.js: example()...'
    };

    console.log(this.messages.constructor);

    // initialize after construction
    this.init();
  }

  /**
   * Example method.
   */
  example() {
    console.log(this.messages.example);
  };

  /**
   * Initialize common scripts.
   */
  init() {
    objectFitImages();
    console.log(this.messages.init);

    this.example();
  }
}

/** Export initialized common scripts by default */
export default new Common();