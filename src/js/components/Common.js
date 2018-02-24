import objectFitImages from 'object-fit-images';
// import objectFitVideos from 'object-fit-videos';
import './noTouch';
import './header';
import './slider';
import './b-screen';
import './b-block-3';
import './b-block-5';
import './b-block-6';
import './b-block-10';
import './locations-map';
import './footer';
import './homeAnims';
import './expandList';
import './preloader';
import './popup';
import Validate from './validate';

export class Common {
  /**
   * Cache data, make preparations and initialize common scripts.
   */
  constructor() {
    this.init();
  }
  /**
   * Initialize common scripts.
   */
  init() {
    objectFitImages();
    Validate.init();
  }
}

/** Export initialized common scripts by default */
export default new Common();

