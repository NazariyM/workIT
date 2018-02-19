import Popup from 'vintage-popup';

class Popups {
  constructor() {
    this.$popup = $('[data-popup-target]');
    // Popup.expose($);
   
    this.init();
  }

  init() {
    this.$popup.on('click tap', function (e) {
      e.preventDefault();
    });
   
    $('.js-modal-close').on('click tap', function (e) {
      e.preventDefault();
    });
   
    this.$popup.popup({
      closeOnEsc: false,
      closeBtnSelector: '.js-popup-close'
    });
  }
}

export default new Popups();
