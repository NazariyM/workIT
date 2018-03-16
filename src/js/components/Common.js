import objectFitImages from 'object-fit-images';
import objectFitVideos from 'object-fit-videos';
import Validate from './validate';
import PageResize from './pageResize';
import './videoBlock';
import './dot';
import './noTouch';
import './header';
import './slider';
import './footer';
import './defaultAnims';
import './expandList';
import './preloader';
import './popup';
import '../sections/b-screen';
import '../sections/b-block-3';
// import '../sections/b-block-5';
import '../sections/b-block-6';
import '../sections/companies';
import '../sections/locations-map';
import '../sections/come';
import '../sections/mask';

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
  }
}

/** Export initialized common scripts by default */
export default new Common();