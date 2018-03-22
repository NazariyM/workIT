import { $body, css } from '../modules/dev/_helpers';

/**
 * Website's public API (example).
 * Make some functions and methods accessible in global scope.
 *
 * @module PublicAPI
 */

export class PublicAPI {
  disableAnim() {
    $body.addClass(css.animsDisabled);
    return this;
  }
}

/** Expose Public API */
export default window.PublicAPI = new PublicAPI;

// PublicAPI.disableAnim();
