'use strict';

/**
 * App entry point.
 *
 * @module App
 */

/** Import initialized-by-default modules/libs */
import 'babel-polyfill';
import 'dom4';
import './components/Common';

/** Import page controllers */
import Home from './pages/Home';

import { currentPage } from './modules/dev/_helpers';

/**
 * Run appropriate scripts for each page.
 **/
switch (currentPage) {
  /** Home page */
  case 'home': new Home; break;

  /** No page found */
  default: console.warn('Undefined page');
}
