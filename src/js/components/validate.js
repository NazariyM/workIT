import { $window, css } from '../modules/dev/_helpers';
import 'jquery-form-validator';
import 'jquery-form-validator/form-validator/security';

export class Validate {
	constructor() {
    this.$form = $('.form');
    this.$input = this.$form.find('.form-control');
    this.$textarea = this.$form.find('.form-textarea');
		this.submit = '[type="submit"]';
		this.thanks = '.js-submit-ty';
	}

	init() {
		Validate.initValidator();
		// this.initPopupThanks();
		this.onFocusOut();
		this.checkFill();
		this.removeError();
	}

	// initPopupThanks() {
	// 	if ($(this.thanks).length) {
	// 		let speed = 200;
	// 		$(this.thanks).on('submit', function (e) {
	// 			e.preventDefault();
	// 			$(this).parent().siblings().andSelf().not(':last-child').fadeOut(speed);
	// 			setTimeout(() => {
	// 				$(this).parent().siblings().last().fadeIn(speed);
	// 			}, speed);
	// 		});
	// 	}
	// }

	onFocusOut() {
		$(this.$input).each(function () {
			let $self = $(this);
			if ($self.hasClass('js-no-error')) {
				$self.blur(() => {
					$self.parent().removeClass('has-error');
				});
			}
		});

		$(this.submit).each(function () {
			let $self = $(this);
			if ($self.hasClass('js-no-error')) {
				$self.blur(() => {
					$self.closest('form').find('.has-error').each(function () {
						$(this).removeClass('has-error');
					});
				});
			}
		});
	}

  checkFill() {
    this.$input.add(this.$textarea).each(function () {
      checkInput($(this));
    });

    this.$input.add(this.$textarea).blur(function () {
      checkInput($(this));
    });

    this.$input.add(this.$textarea).on('keyup keydown keypress', function() {
      checkInput($(this));
    });

    function checkInput(el) {
      if (el.val() !== '') {
        el.addClass(css.fill);
      } else {
        el.removeClass(css.fill);
      }
    }
  }

  removeError() {
    this.$input.add(this.$textarea).on('click focus', (ev) => {
      $(ev.currentTarget).parent().removeClass(css.error);
    });

    // this.$input.add(this.$textarea).on('keyup keydown', (ev) => {
    // 	if (!ev.currentTarget.val()) {
    //     console.log('false');
    //   }
    //   $(ev.currentTarget).parent().removeClass(css.error);
    // });
  }

	static initValidator() {
		$.validate({
			validateOnBlur: true,
			showHelpOnFocus: false,
			addSuggestions: false,
			scrollToTopOnError: false,
			borderColorOnError: false,
			validateOnEvent: true,
			modules: 'security html5'
		});

	}
}

export default new Validate();

window.refreshValidate = function () {
	new Validate().init();
};
