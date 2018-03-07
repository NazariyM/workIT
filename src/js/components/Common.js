import objectFitImages from 'object-fit-images';
import objectFitVideos from 'object-fit-videos';
import Validate from './validate';
import PageResize from './pageResize';
import './dot';
import './noTouch';
import './header';
import './slider';
import './b-screen';
import './b-block-3';
import './b-block-5';
import './b-block-6';
import './come';
import './b-block-10';
import './b-block-11';
import './locations-map';
import './footer';
import './homeAnims';
import './expandList';
import './preloader';
import './popup';
import './mask';

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
    objectFitVideos();
    Validate.init();
    PageResize.init();
    // Dot.init();
  }
}

/** Export initialized common scripts by default */
export default new Common();