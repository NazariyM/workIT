import objectFitImages from 'object-fit-images';
import objectFitVideos from 'object-fit-videos';
import Validate from './validate';
import PageResize from './pageResize';
import './noTouch';
import './header';
import './slider';
import './b-screen';
import './b-block-3';
import './b-block-5';
import './b-block-6';
import './b-block-10';
import './b-block-11';
import './locations-map';
import './footer';
import './homeAnims';
import './expandList';
import './preloader';
import './popup';
import './screenMask';

// import './dot';

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

// var polys = document.querySelectorAll('polygon,polyline');
// [].forEach.call(polys,convertPolyToPath);
//
// function convertPolyToPath(poly){
//   var svgNS = poly.ownerSVGElement.namespaceURI;
//   var path = document.createElementNS(svgNS,'path');
//   var points = poly.getAttribute('points').split(/\s+|,/);
//   var x0=points.shift(), y0=points.shift();
//   var pathdata = 'M'+x0+','+y0+'L'+points.join(' ');
//   if (poly.tagName=='polygon') pathdata+='z';
//   path.setAttribute('d',pathdata);
//   poly.parentNode.replaceChild(path,poly);
// }

// let svgWidth = 1220;
// let svgHeight = 681;
// let count = -1;
// function replacer(match) {
//   count++;
//   if (count % 2) {
//     return match / svgHeight;
//   } else {
//     return match / svgWidth;
//   }
// }
// let svgPath = 'M846.94,470.89L725.63 0 494.05 0 372.74 470.89 236 0 0 0 239.32 681 506.37 681 609.84 277.9 713.32 681 980.36 681 1219.68 0 983.69 0 846.94 470.89z';
// let nuPath = svgPath.replace(/(\d+(\.\d+)?)/g, replacer);
// console.log(nuPath);
