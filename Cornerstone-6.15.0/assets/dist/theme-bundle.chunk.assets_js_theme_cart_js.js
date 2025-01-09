"use strict";
(self["webpackChunkbigcommerce_cornerstone"] = self["webpackChunkbigcommerce_cornerstone"] || []).push([["assets_js_theme_cart_js"],{

/***/ "./assets/js/theme/cart.js":
/*!*********************************!*\
  !*** ./assets/js/theme/cart.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cart)
/* harmony export */ });
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/bind */ "./node_modules/lodash/bind.js");
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_bind__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cart/shipping-estimator */ "./assets/js/theme/cart/shipping-estimator.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _common_cart_item_details__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./common/cart-item-details */ "./assets/js/theme/common/cart-item-details.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");


function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }







var Cart = /*#__PURE__*/function (_PageManager) {
  function Cart() {
    return _PageManager.apply(this, arguments) || this;
  }
  _inheritsLoose(Cart, _PageManager);
  var _proto = Cart.prototype;
  _proto.onReady = function onReady() {
    this.$modal = null;
    this.$cartPageContent = $('[data-cart]');
    this.$cartContent = $('[data-cart-content]');
    this.$cartMessages = $('[data-cart-status]');
    this.$cartTotals = $('[data-cart-totals]');
    this.$cartAdditionalCheckoutBtns = $('[data-cart-additional-checkout-buttons]');
    this.$overlay = $('[data-cart] .loadingOverlay').hide(); // TODO: temporary until roper pulls in his cart components
    this.$activeCartItemId = null;
    this.$activeCartItemBtnAction = null;
    this.setApplePaySupport();
    this.bindEvents();
  };
  _proto.setApplePaySupport = function setApplePaySupport() {
    if (window.ApplePaySession) {
      this.$cartPageContent.addClass('apple-pay-supported');
    }
  };
  _proto.cartUpdate = function cartUpdate($target) {
    var _this = this;
    var itemId = $target.data('cartItemid');
    this.$activeCartItemId = itemId;
    this.$activeCartItemBtnAction = $target.data('action');
    var $el = $("#qty-" + itemId);
    var oldQty = parseInt($el.val(), 10);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1;
    // Does not quality for min/max quantity
    if (newQty < minQty) {
      return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(minError);
    } else if (maxQty > 0 && newQty > maxQty) {
      return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(maxError);
    }
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this.$overlay.hide();
      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;
        _this.refreshContent(remove);
      } else {
        $el.val(oldQty);
        (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(response.data.errors.join('\n'));
      }
    });
  };
  _proto.cartUpdateQtyTextChange = function cartUpdateQtyTextChange($target, preVal) {
    var _this2 = this;
    if (preVal === void 0) {
      preVal = null;
    }
    var itemId = $target.data('cartItemid');
    var $el = $("#qty-" + itemId);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var oldQty = preVal !== null ? preVal : minQty;
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = parseInt(Number($el.val()), 10);
    var invalidEntry;

    // Does not quality for min/max quantity
    if (!Number.isInteger(newQty)) {
      invalidEntry = $el.val();
      $el.val(oldQty);
      return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(this.context.invalidEntryMessage.replace('[ENTRY]', invalidEntry));
    } else if (newQty < minQty) {
      $el.val(oldQty);
      return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(minError);
    } else if (maxQty > 0 && newQty > maxQty) {
      $el.val(oldQty);
      return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(maxError);
    }
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this2.$overlay.hide();
      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;
        _this2.refreshContent(remove);
      } else {
        $el.val(oldQty);
        return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(response.data.errors.join('\n'));
      }
    });
  };
  _proto.cartRemoveItem = function cartRemoveItem(itemId) {
    var _this3 = this;
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemRemove(itemId, function (err, response) {
      if (response.data.status === 'succeed') {
        _this3.refreshContent(true);
      } else {
        _this3.$overlay.hide();
        (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(response.data.errors.join('\n'));
      }
    });
  };
  _proto.cartEditOptions = function cartEditOptions(itemId, productId) {
    var _this4 = this;
    var context = Object.assign({
      productForChangeId: productId
    }, this.context);
    var modal = (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.defaultModal)();
    if (this.$modal === null) {
      this.$modal = $('#modal');
    }
    var options = {
      template: 'cart/modals/configure-product'
    };
    modal.open();
    this.$modal.find('.modal-content').addClass('hide-content');
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.productAttributes.configureInCart(itemId, options, function (err, response) {
      modal.updateContent(response.content);
      var optionChangeHandler = function optionChangeHandler() {
        var $productOptionsContainer = $('[data-product-attributes-wrapper]', _this4.$modal);
        var modalBodyReservedHeight = $productOptionsContainer.outerHeight();
        if ($productOptionsContainer.length && modalBodyReservedHeight) {
          $productOptionsContainer.css('height', modalBodyReservedHeight);
        }
      };
      if (_this4.$modal.hasClass('open')) {
        optionChangeHandler();
      } else {
        _this4.$modal.one(_global_modal__WEBPACK_IMPORTED_MODULE_7__.ModalEvents.opened, optionChangeHandler);
      }
      _this4.productDetails = new _common_cart_item_details__WEBPACK_IMPORTED_MODULE_8__["default"](_this4.$modal, context);
      _this4.bindGiftWrappingForm();
    });
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].hooks.on('product-option-change', function (event, currentTarget) {
      var $form = $(currentTarget).find('form');
      var $submit = $('input.button', $form);
      var $messageBox = $('.alertMessageBox');
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.productAttributes.optionChange(productId, $form.serialize(), function (err, result) {
        var data = result.data || {};
        if (err) {
          (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(err);
          return false;
        }
        if (data.purchasing_message) {
          $('p.alertBox-message', $messageBox).text(data.purchasing_message);
          $submit.prop('disabled', true);
          $messageBox.show();
        } else {
          $submit.prop('disabled', false);
          $messageBox.hide();
        }
        if (!data.purchasable || !data.instock) {
          $submit.prop('disabled', true);
        } else {
          $submit.prop('disabled', false);
        }
      });
    });
  };
  _proto.refreshContent = function refreshContent(remove) {
    var _this5 = this;
    var $cartItemsRows = $('[data-item-row]', this.$cartContent);
    var $cartPageTitle = $('[data-cart-page-title]');
    var options = {
      template: {
        content: 'cart/content',
        totals: 'cart/totals',
        pageTitle: 'cart/page-title',
        statusMessages: 'cart/status-messages',
        additionalCheckoutButtons: 'cart/additional-checkout-buttons'
      }
    };
    this.$overlay.show();

    // Remove last item from cart? Reload
    if (remove && $cartItemsRows.length === 1) {
      return window.location.reload();
    }
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.getContent(options, function (err, response) {
      _this5.$cartContent.html(response.content);
      _this5.$cartTotals.html(response.totals);
      _this5.$cartMessages.html(response.statusMessages);
      _this5.$cartAdditionalCheckoutBtns.html(response.additionalCheckoutButtons);
      $cartPageTitle.replaceWith(response.pageTitle);
      var quantity = $('[data-cart-quantity]', _this5.$cartContent).data('cartQuantity') || 0;
      if (!quantity) {
        return window.location.reload();
      }
      _this5.bindEvents();
      _this5.$overlay.hide();
      $('body').trigger('cart-quantity-update', quantity);
      $("[data-cart-itemid='" + _this5.$activeCartItemId + "']", _this5.$cartContent).filter("[data-action='" + _this5.$activeCartItemBtnAction + "']").trigger('focus');
    });
  };
  _proto.bindCartEvents = function bindCartEvents() {
    var _this6 = this;
    var debounceTimeout = 400;
    var cartUpdate = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdate, debounceTimeout), this);
    var cartUpdateQtyTextChange = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdateQtyTextChange, debounceTimeout), this);
    var cartRemoveItem = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartRemoveItem, debounceTimeout), this);
    var preVal;

    // cart update
    $('[data-cart-update]', this.$cartContent).on('click', function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault();

      // update cart quantity
      cartUpdate($target);
    });

    // cart qty manually updates
    $('.cart-item-qty-input', this.$cartContent).on({
      focus: function onQtyFocus() {
        preVal = this.value;
      },
      change: function change(event) {
        var $target = $(event.currentTarget);
        event.preventDefault();

        // update cart quantity
        cartUpdateQtyTextChange($target, preVal);
      }
    });
    $('.cart-remove', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('cartItemid');
      var string = $(event.currentTarget).data('confirmDelete');
      (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(string, {
        icon: 'warning',
        showCancelButton: true,
        onConfirm: function onConfirm() {
          // remove item from cart
          cartRemoveItem(itemId);
        }
      });
      event.preventDefault();
    });
    $('[data-item-edit]', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemEdit');
      var productId = $(event.currentTarget).data('productId');
      event.preventDefault();
      // edit item in cart
      _this6.cartEditOptions(itemId, productId);
    });
  };
  _proto.bindPromoCodeEvents = function bindPromoCodeEvents() {
    var _this7 = this;
    var $couponContainer = $('.coupon-code');
    var $couponForm = $('.coupon-form');
    var $codeInput = $('[name="couponcode"]', $couponForm);
    $('.coupon-code-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).hide();
      $couponContainer.show();
      $couponContainer.attr('aria-hidden', false);
      $('.coupon-code-cancel').show();
      $codeInput.trigger('focus');
    });
    $('.coupon-code-cancel').on('click', function (event) {
      event.preventDefault();
      $couponContainer.hide();
      $couponContainer.attr('aria-hidden', true);
      $('.coupon-code-cancel').hide();
      $('.coupon-code-add').show();
    });
    $couponForm.on('submit', function (event) {
      var code = $codeInput.val();
      event.preventDefault();

      // Empty code
      if (!code) {
        return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)($codeInput.data('error'));
      }
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.applyCode(code, function (err, response) {
        if (response.data.status === 'success') {
          _this7.refreshContent();
        } else {
          (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(response.data.errors.join('\n'));
        }
      });
    });
  };
  _proto.bindGiftCertificateEvents = function bindGiftCertificateEvents() {
    var _this8 = this;
    var $certContainer = $('.gift-certificate-code');
    var $certForm = $('.cart-gift-certificate-form');
    var $certInput = $('[name="certcode"]', $certForm);
    $('.gift-certificate-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).toggle();
      $certContainer.toggle();
      $certContainer.attr('aria-hidden', false);
      $('.gift-certificate-cancel').toggle();
    });
    $('.gift-certificate-cancel').on('click', function (event) {
      event.preventDefault();
      $certContainer.toggle();
      $certContainer.attr('aria-hidden', true);
      $('.gift-certificate-add').toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $certForm.on('submit', function (event) {
      var code = $certInput.val();
      event.preventDefault();
      if (!(0,_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__["default"])(code)) {
        var validationDictionary = (0,_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__.createTranslationDictionary)(_this8.context);
        return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(validationDictionary.invalid_gift_certificate);
      }
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.applyGiftCertificate(code, function (err, resp) {
        if (resp.data.status === 'success') {
          _this8.refreshContent();
        } else {
          (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(resp.data.errors.join('\n'));
        }
      });
    });
  };
  _proto.bindGiftWrappingEvents = function bindGiftWrappingEvents() {
    var _this9 = this;
    var modal = (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.defaultModal)();
    $('[data-item-giftwrap]').on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemGiftwrap');
      var options = {
        template: 'cart/modals/gift-wrapping-form'
      };
      event.preventDefault();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.getItemGiftWrappingOptions(itemId, options, function (err, response) {
        modal.updateContent(response.content);
        _this9.bindGiftWrappingForm();
      });
    });
  };
  _proto.bindGiftWrappingForm = function bindGiftWrappingForm() {
    $('.giftWrapping-select').on('change', function (event) {
      var $select = $(event.currentTarget);
      var id = $select.val();
      var index = $select.data('index');
      if (!id) {
        return;
      }
      var allowMessage = $select.find("option[value=" + id + "]").data('allowMessage');
      $(".giftWrapping-image-" + index).hide();
      $("#giftWrapping-image-" + index + "-" + id).show();
      if (allowMessage) {
        $("#giftWrapping-message-" + index).show();
      } else {
        $("#giftWrapping-message-" + index).hide();
      }
    });
    $('.giftWrapping-select').trigger('change');
    function toggleViews() {
      var value = $('input:radio[name ="giftwraptype"]:checked').val();
      var $singleForm = $('.giftWrapping-single');
      var $multiForm = $('.giftWrapping-multiple');
      if (value === 'same') {
        $singleForm.show();
        $multiForm.hide();
      } else {
        $singleForm.hide();
        $multiForm.show();
      }
    }
    $('[name="giftwraptype"]').on('click', toggleViews);
    toggleViews();
  };
  _proto.bindEvents = function bindEvents() {
    this.bindCartEvents();
    this.bindPromoCodeEvents();
    this.bindGiftWrappingEvents();
    this.bindGiftCertificateEvents();

    // initiate shipping estimator module
    var shippingErrorMessages = {
      country: this.context.shippingCountryErrorMessage,
      province: this.context.shippingProvinceErrorMessage
    };
    this.shippingEstimator = new _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_6__["default"]($('[data-shipping-estimator]'), shippingErrorMessages);
  };
  return Cart;
}(_page_manager__WEBPACK_IMPORTED_MODULE_2__["default"]);


/***/ }),

/***/ "./assets/js/theme/cart/shipping-estimator.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/cart/shipping-estimator.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShippingEstimator)
/* harmony export */ });
/* harmony import */ var _common_state_country__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/state-country */ "./assets/js/theme/common/state-country.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");






var ShippingEstimator = /*#__PURE__*/function () {
  function ShippingEstimator($element, shippingErrorMessages) {
    this.$element = $element;
    this.$state = $('[data-field-type="State"]', this.$element);
    this.isEstimatorFormOpened = false;
    this.shippingErrorMessages = shippingErrorMessages;
    this.initFormValidation();
    this.bindStateCountryChange();
    this.bindEstimatorEvents();
  }
  var _proto = ShippingEstimator.prototype;
  _proto.initFormValidation = function initFormValidation() {
    var _this = this;
    var shippingEstimatorAlert = $('.shipping-quotes');
    this.shippingEstimator = 'form[data-shipping-estimator]';
    this.shippingValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: this.shippingEstimator + " .shipping-estimate-submit",
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__.announceInputErrorMessage
    });
    $('.shipping-estimate-submit', this.$element).on('click', function (event) {
      // estimator error messages are being injected in html as a result
      // of user submit; clearing and adding role on submit provides
      // regular announcement of these error messages
      if (shippingEstimatorAlert.attr('role')) {
        shippingEstimatorAlert.removeAttr('role');
      }
      shippingEstimatorAlert.attr('role', 'alert');
      // When switching between countries, the state/region is dynamic
      // Only perform a check for all fields when country has a value
      // Otherwise areAll('valid') will check country for validity
      if ($(_this.shippingEstimator + " select[name=\"shipping-country\"]").val()) {
        _this.shippingValidator.performCheck();
      }
      if (_this.shippingValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
    this.bindValidation();
    this.bindStateValidation();
    this.bindUPSRates();
  };
  _proto.bindValidation = function bindValidation() {
    this.shippingValidator.add([{
      selector: this.shippingEstimator + " select[name=\"shipping-country\"]",
      validate: function validate(cb, val) {
        var countryId = Number(val);
        var result = countryId !== 0 && !Number.isNaN(countryId);
        cb(result);
      },
      errorMessage: this.shippingErrorMessages.country
    }]);
  };
  _proto.bindStateValidation = function bindStateValidation() {
    var _this2 = this;
    this.shippingValidator.add([{
      selector: $(this.shippingEstimator + " select[name=\"shipping-state\"]"),
      validate: function validate(cb) {
        var result;
        var $ele = $(_this2.shippingEstimator + " select[name=\"shipping-state\"]");
        if ($ele.length) {
          var eleVal = $ele.val();
          result = eleVal && eleVal.length && eleVal !== 'State/province';
        }
        cb(result);
      },
      errorMessage: this.shippingErrorMessages.province
    }]);
  }

  /**
   * Toggle between default shipping and ups shipping rates
   */;
  _proto.bindUPSRates = function bindUPSRates() {
    var UPSRateToggle = '.estimator-form-toggleUPSRate';
    $('body').on('click', UPSRateToggle, function (event) {
      var $estimatorFormUps = $('.estimator-form--ups');
      var $estimatorFormDefault = $('.estimator-form--default');
      event.preventDefault();
      $estimatorFormUps.toggleClass('u-hiddenVisually');
      $estimatorFormDefault.toggleClass('u-hiddenVisually');
    });
  };
  _proto.bindStateCountryChange = function bindStateCountryChange() {
    var _this3 = this;
    var $last;

    // Requests the states for a country with AJAX
    (0,_common_state_country__WEBPACK_IMPORTED_MODULE_0__["default"])(this.$state, this.context, {
      useIdForStates: true
    }, function (err, field) {
      if (err) {
        (0,_global_modal__WEBPACK_IMPORTED_MODULE_5__.showAlertModal)(err);
        throw new Error(err);
      }
      var $field = $(field);
      if (_this3.shippingValidator.getStatus(_this3.$state) !== 'undefined') {
        _this3.shippingValidator.remove(_this3.$state);
      }
      if ($last) {
        _this3.shippingValidator.remove($last);
      }
      if ($field.is('select')) {
        $last = field;
        _this3.bindStateValidation();
      } else {
        $field.attr('placeholder', 'State/province');
        _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__.Validators.cleanUpStateValidation(field);
      }

      // When you change a country, you swap the state/province between an input and a select dropdown
      // Not all countries require the province to be filled
      // We have to remove this class when we swap since nod validation doesn't cleanup for us
      $(_this3.shippingEstimator).find('.form-field--success').removeClass('form-field--success');
    });
  };
  _proto.toggleEstimatorFormState = function toggleEstimatorFormState(toggleButton, buttonSelector, $toggleContainer) {
    var changeAttributesOnToggle = function changeAttributesOnToggle(selectorToActivate) {
      $(toggleButton).attr('aria-labelledby', selectorToActivate);
      $(buttonSelector).text($("#" + selectorToActivate).text());
    };
    if (!this.isEstimatorFormOpened) {
      changeAttributesOnToggle('estimator-close');
      $toggleContainer.removeClass('u-hidden');
    } else {
      changeAttributesOnToggle('estimator-add');
      $toggleContainer.addClass('u-hidden');
    }
    this.isEstimatorFormOpened = !this.isEstimatorFormOpened;
  };
  _proto.bindEstimatorEvents = function bindEstimatorEvents() {
    var _this4 = this;
    var $estimatorContainer = $('.shipping-estimator');
    var $estimatorForm = $('.estimator-form');
    (0,_common_collapsible__WEBPACK_IMPORTED_MODULE_4__["default"])();
    $estimatorForm.on('submit', function (event) {
      var params = {
        country_id: $('[name="shipping-country"]', $estimatorForm).val(),
        state_id: $('[name="shipping-state"]', $estimatorForm).val(),
        city: $('[name="shipping-city"]', $estimatorForm).val(),
        zip_code: $('[name="shipping-zip"]', $estimatorForm).val()
      };
      event.preventDefault();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.getShippingQuotes(params, 'cart/shipping-quotes', function (err, response) {
        $('.shipping-quotes').html(response.content);

        // bind the select button
        $('.select-shipping-quote').on('click', function (clickEvent) {
          var quoteId = $('.shipping-quote:checked').val();
          clickEvent.preventDefault();
          _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.submitShippingQuote(quoteId, function () {
            window.location.reload();
          });
        });
      });
    });
    $('.shipping-estimate-show').on('click', function (event) {
      event.preventDefault();
      _this4.toggleEstimatorFormState(event.currentTarget, '.shipping-estimate-show__btn-name', $estimatorContainer);
    });
  };
  return ShippingEstimator;
}();


/***/ }),

/***/ "./assets/js/theme/common/cart-item-details.js":
/*!*****************************************************!*\
  !*** ./assets/js/theme/common/cart-item-details.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CartItemDetails)
/* harmony export */ });
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _product_details_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./product-details-base */ "./assets/js/theme/common/product-details-base.js");
/* harmony import */ var _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/ie-helpers */ "./assets/js/theme/common/utils/ie-helpers.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");

function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }



var CartItemDetails = /*#__PURE__*/function (_ProductDetailsBase) {
  function CartItemDetails($scope, context, productAttributesData) {
    var _this;
    if (productAttributesData === void 0) {
      productAttributesData = {};
    }
    _this = _ProductDetailsBase.call(this, $scope, context) || this;
    var $form = $('#CartEditProductFieldsForm', _this.$scope);
    var $productOptionsElement = $('[data-product-attributes-wrapper]', $form);
    var hasOptions = $productOptionsElement.html().trim().length;
    var hasDefaultOptions = $productOptionsElement.find('[data-default]').length;
    $productOptionsElement.on('change', function () {
      _this.setProductVariant();
    });
    var optionChangeCallback = _product_details_base__WEBPACK_IMPORTED_MODULE_2__.optionChangeDecorator.call(_this, hasDefaultOptions);

    // Update product attributes. Also update the initial view in case items are oos
    // or have default variant properties that change the view
    if ((lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(productAttributesData) || hasDefaultOptions) && hasOptions) {
      var productId = _this.context.productForChangeId;
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.productAttributes.optionChange(productId, $form.serialize(), 'products/bulk-discount-rates', optionChangeCallback);
    } else {
      _this.updateProductAttributes(productAttributesData);
    }
    return _this;
  }
  _inheritsLoose(CartItemDetails, _ProductDetailsBase);
  var _proto = CartItemDetails.prototype;
  _proto.setProductVariant = function setProductVariant() {
    var unsatisfiedRequiredFields = [];
    var options = [];
    $.each($('[data-product-attribute]'), function (index, value) {
      var optionLabel = value.children[0].innerText;
      var optionTitle = optionLabel.split(':')[0].trim();
      var required = optionLabel.toLowerCase().includes('required');
      var type = value.getAttribute('data-product-attribute');
      if ((type === 'input-file' || type === 'input-text' || type === 'input-number') && value.querySelector('input').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }
      if (type === 'textarea' && value.querySelector('textarea').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }
      if (type === 'date') {
        var isSatisfied = Array.from(value.querySelectorAll('select')).every(function (select) {
          return select.selectedIndex !== 0;
        });
        if (isSatisfied) {
          var dateString = Array.from(value.querySelectorAll('select')).map(function (x) {
            return x.value;
          }).join('-');
          options.push(optionTitle + ":" + dateString);
          return;
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
      if (type === 'set-select') {
        var select = value.querySelector('select');
        var selectedIndex = select.selectedIndex;
        if (selectedIndex !== 0) {
          options.push(optionTitle + ":" + select.options[selectedIndex].innerText);
          return;
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
      if (type === 'set-rectangle' || type === 'set-radio' || type === 'swatch' || type === 'input-checkbox' || type === 'product-list') {
        var checked = value.querySelector(':checked');
        if (checked) {
          var getSelectedOptionLabel = function getSelectedOptionLabel() {
            var productVariantslist = (0,_utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__.convertIntoArray)(value.children);
            var matchLabelForCheckedInput = function matchLabelForCheckedInput(inpt) {
              return inpt.dataset.productAttributeValue === checked.value;
            };
            return productVariantslist.filter(matchLabelForCheckedInput)[0];
          };
          if (type === 'set-rectangle' || type === 'set-radio' || type === 'product-list') {
            var label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__.isBrowserIE ? getSelectedOptionLabel().innerText.trim() : checked.labels[0].innerText;
            if (label) {
              options.push(optionTitle + ":" + label);
            }
          }
          if (type === 'swatch') {
            var _label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__.isBrowserIE ? getSelectedOptionLabel().children[0] : checked.labels[0].children[0];
            if (_label) {
              options.push(optionTitle + ":" + _label.title);
            }
          }
          if (type === 'input-checkbox') {
            options.push(optionTitle + ":Yes");
          }
          return;
        }
        if (type === 'input-checkbox') {
          options.push(optionTitle + ":No");
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
    });
    var productVariant = unsatisfiedRequiredFields.length === 0 ? options.sort().join(', ') : 'unsatisfied';
    var view = $('.modal-header-title');
    if (productVariant) {
      productVariant = productVariant === 'unsatisfied' ? '' : productVariant;
      if (view.attr('data-event-type')) {
        view.attr('data-product-variant', productVariant);
      } else {
        var productName = view.html().match(/'(.*?)'/)[1];
        var card = $("[data-name=\"" + productName + "\"]");
        card.attr('data-product-variant', productVariant);
      }
    }
  }

  /**
   * Hide or mark as unavailable out of stock attributes if enabled
   * @param  {Object} data Product attribute data
   */;
  _proto.updateProductAttributes = function updateProductAttributes(data) {
    _ProductDetailsBase.prototype.updateProductAttributes.call(this, data);
    this.$scope.find('.modal-content').removeClass('hide-content');
  };
  return CartItemDetails;
}(_product_details_base__WEBPACK_IMPORTED_MODULE_2__["default"]);


/***/ }),

/***/ "./assets/js/theme/common/gift-certificate-validator.js":
/*!**************************************************************!*\
  !*** ./assets/js/theme/common/gift-certificate-validator.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(cert) {
  if (typeof cert !== 'string' || cert.length === 0) {
    return false;
  }

  // Add any custom gift certificate validation logic here
  return true;
}

/***/ }),

/***/ "./assets/js/theme/common/state-country.js":
/*!*************************************************!*\
  !*** ./assets/js/theme/common/state-country.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/transform */ "./node_modules/lodash/transform.js");
/* harmony import */ var lodash_transform__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_transform__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");






/**
 * If there are no options from bcapp, a text field will be sent. This will create a select element to hold options after the remote request.
 * @returns {jQuery|HTMLElement}
 */
function makeStateRequired(stateElement, context) {
  var attrs = lodash_transform__WEBPACK_IMPORTED_MODULE_1___default()(stateElement.prop('attributes'), function (result, item) {
    var ret = result;
    ret[item.name] = item.value;
    return ret;
  });
  var replacementAttributes = {
    id: attrs.id,
    'data-label': attrs['data-label'],
    "class": 'form-select',
    name: attrs.name,
    'data-field-type': attrs['data-field-type']
  };
  stateElement.replaceWith($('<select></select>', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  var $hiddenInput = $('[name*="FormFieldIsText"]');
  if ($hiddenInput.length !== 0) {
    $hiddenInput.remove();
  }
  if ($newElement.prev().find('small').length === 0) {
    // String is injected from localizer
    $newElement.prev().append("<small>" + context.required + "</small>");
  } else {
    $newElement.prev().find('small').show();
  }
  return $newElement;
}

/**
 * If a country with states is the default, a select will be sent,
 * In this case we need to be able to switch to an input field and hide the required field
 */
function makeStateOptional(stateElement) {
  var attrs = lodash_transform__WEBPACK_IMPORTED_MODULE_1___default()(stateElement.prop('attributes'), function (result, item) {
    var ret = result;
    ret[item.name] = item.value;
    return ret;
  });
  var replacementAttributes = {
    type: 'text',
    id: attrs.id,
    'data-label': attrs['data-label'],
    "class": 'form-input',
    name: attrs.name,
    'data-field-type': attrs['data-field-type']
  };
  stateElement.replaceWith($('<input />', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  if ($newElement.length !== 0) {
    (0,_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__.insertStateHiddenField)($newElement);
    $newElement.prev().find('small').hide();
  }
  return $newElement;
}

/**
 * Adds the array of options from the remote request to the newly created select box.
 * @param {Object} statesArray
 * @param {jQuery} $selectElement
 * @param {Object} options
 */
function addOptions(statesArray, $selectElement, options) {
  var container = [];
  container.push("<option value=\"\">" + statesArray.prefix + "</option>");
  if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()($selectElement)) {
    statesArray.states.forEach(function (stateObj) {
      if (options.useIdForStates) {
        container.push("<option value=\"" + stateObj.id + "\">" + stateObj.name + "</option>");
      } else {
        container.push("<option value=\"" + stateObj.name + "\">" + (stateObj.label ? stateObj.label : stateObj.name) + "</option>");
      }
    });
    $selectElement.html(container.join(' '));
  }
}

/**
 *
 * @param {jQuery} stateElement
 * @param {Object} context
 * @param {Object} options
 * @param {Function} callback
 */
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(stateElement, context, options, callback) {
  if (context === void 0) {
    context = {};
  }
  /**
   * Backwards compatible for three parameters instead of four
   *
   * Available options:
   *
   * useIdForStates {Bool} - Generates states dropdown using id for values instead of strings
   */
  if (typeof options === 'function') {
    /* eslint-disable no-param-reassign */
    callback = options;
    options = {};
    /* eslint-enable no-param-reassign */
  }
  $('select[data-field-type="Country"]').on('change', function (event) {
    var countryName = $(event.currentTarget).val();
    if (countryName === '') {
      return;
    }
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.country.getByName(countryName, function (err, response) {
      if (err) {
        (0,_global_modal__WEBPACK_IMPORTED_MODULE_4__.showAlertModal)(context.state_error);
        return callback(err);
      }
      var $currentInput = $('[data-field-type="State"]');
      if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(response.data.states)) {
        // The element may have been replaced with a select, reselect it
        var $selectElement = makeStateRequired($currentInput, context);
        addOptions(response.data, $selectElement, options);
        callback(null, $selectElement);
      } else {
        var newElement = makeStateOptional($currentInput, context);
        callback(null, newElement);
      }
    });
  });
}

/***/ }),

/***/ "./assets/js/theme/common/utils/translations-utils.js":
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTranslationDictionary: () => (/* binding */ createTranslationDictionary)
/* harmony export */ });
var TRANSLATIONS = 'translations';
var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};
var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);
    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};

/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */
var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
    validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
    validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9jYXJ0X2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXlDO0FBRThCO0FBQ1M7QUFDakM7QUFDVztBQUNpQjtBQUNsQjtBQUFBLElBRXBDUyxJQUFJLDBCQUFBQyxZQUFBO0VBQUEsU0FBQUQsS0FBQTtJQUFBLE9BQUFDLFlBQUEsQ0FBQUMsS0FBQSxPQUFBQyxTQUFBO0VBQUE7RUFBQUMsY0FBQSxDQUFBSixJQUFBLEVBQUFDLFlBQUE7RUFBQSxJQUFBSSxNQUFBLEdBQUFMLElBQUEsQ0FBQU0sU0FBQTtFQUFBRCxNQUFBLENBQ3JCRSxPQUFPLEdBQVAsU0FBQUEsT0FBT0EsQ0FBQSxFQUFHO0lBQ04sSUFBSSxDQUFDQyxNQUFNLEdBQUcsSUFBSTtJQUNsQixJQUFJLENBQUNDLGdCQUFnQixHQUFHQyxDQUFDLENBQUMsYUFBYSxDQUFDO0lBQ3hDLElBQUksQ0FBQ0MsWUFBWSxHQUFHRCxDQUFDLENBQUMscUJBQXFCLENBQUM7SUFDNUMsSUFBSSxDQUFDRSxhQUFhLEdBQUdGLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQztJQUM1QyxJQUFJLENBQUNHLFdBQVcsR0FBR0gsQ0FBQyxDQUFDLG9CQUFvQixDQUFDO0lBQzFDLElBQUksQ0FBQ0ksMkJBQTJCLEdBQUdKLENBQUMsQ0FBQyx5Q0FBeUMsQ0FBQztJQUMvRSxJQUFJLENBQUNLLFFBQVEsR0FBR0wsQ0FBQyxDQUFDLDZCQUE2QixDQUFDLENBQzNDTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDYixJQUFJLENBQUNDLGlCQUFpQixHQUFHLElBQUk7SUFDN0IsSUFBSSxDQUFDQyx3QkFBd0IsR0FBRyxJQUFJO0lBRXBDLElBQUksQ0FBQ0Msa0JBQWtCLENBQUMsQ0FBQztJQUN6QixJQUFJLENBQUNDLFVBQVUsQ0FBQyxDQUFDO0VBQ3JCLENBQUM7RUFBQWYsTUFBQSxDQUVEYyxrQkFBa0IsR0FBbEIsU0FB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QyxnQ0FBZ0MsR0FBc0MxUSxPQUFPLENBQTdFMFEsZ0NBQWdDO0lBQUVDLCtCQUErQixHQUFLM1EsT0FBTyxDQUEzQzJRLCtCQUErQjtFQUNuRyxJQUFNQyxnQkFBZ0IsR0FBR1Isc0JBQXNCLENBQUNLLHdCQUF3QixFQUFFQyxnQ0FBZ0MsRUFBRUMsK0JBQStCLENBQUM7RUFDNUksSUFBTUUsYUFBYSxHQUFHcFEsTUFBTSxDQUFDcVEsTUFBTSxDQUFDRixnQkFBZ0IsQ0FBQ1osWUFBWSxDQUFDLENBQUM7RUFDbkUsSUFBTWUsZUFBZSxHQUFHdFEsTUFBTSxDQUFDMFAsSUFBSSxDQUFDUyxnQkFBZ0IsQ0FBQ1osWUFBWSxDQUFDLENBQUMsQ0FBQy9DLEdBQUcsQ0FBQyxVQUFBK0QsR0FBRztJQUFBLE9BQUlBLEdBQUcsQ0FBQy9FLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQ2dGLEdBQUcsQ0FBQyxDQUFDO0VBQUEsRUFBQztFQUVwRyxPQUFPRixlQUFlLENBQUNHLE1BQU0sQ0FBQyxVQUFDQyxHQUFHLEVBQUVILEdBQUcsRUFBRVgsQ0FBQyxFQUFLO0lBQzNDYyxHQUFHLENBQUNILEdBQUcsQ0FBQyxHQUFHSCxhQUFhLENBQUNSLENBQUMsQ0FBQztJQUMzQixPQUFPYyxHQUFHO0VBQ2QsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ1YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2NhcnQuanMiLCJ3ZWJwYWNrOi8vYmlnY29tbWVyY2UtY29ybmVyc3RvbmUvLi9hc3NldHMvanMvdGhlbWUvY2FydC9zaGlwcGluZy1lc3RpbWF0b3IuanMiLCJ3ZWJwYWNrOi8vYmlnY29tbWVyY2UtY29ybmVyc3RvbmUvLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2NhcnQtaXRlbS1kZXRhaWxzLmpzIiwid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9naWZ0LWNlcnRpZmljYXRlLXZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9iaWdjb21tZXJjZS1jb3JuZXJzdG9uZS8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vc3RhdGUtY291bnRyeS5qcyIsIndlYnBhY2s6Ly9iaWdjb21tZXJjZS1jb3JuZXJzdG9uZS8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XG5pbXBvcnQgeyBiaW5kLCBkZWJvdW5jZSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgY2hlY2tJc0dpZnRDZXJ0VmFsaWQgZnJvbSAnLi9jb21tb24vZ2lmdC1jZXJ0aWZpY2F0ZS12YWxpZGF0b3InO1xuaW1wb3J0IHsgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IH0gZnJvbSAnLi9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzJztcbmltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgU2hpcHBpbmdFc3RpbWF0b3IgZnJvbSAnLi9jYXJ0L3NoaXBwaW5nLWVzdGltYXRvcic7XG5pbXBvcnQgeyBkZWZhdWx0TW9kYWwsIHNob3dBbGVydE1vZGFsLCBNb2RhbEV2ZW50cyB9IGZyb20gJy4vZ2xvYmFsL21vZGFsJztcbmltcG9ydCBDYXJ0SXRlbURldGFpbHMgZnJvbSAnLi9jb21tb24vY2FydC1pdGVtLWRldGFpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0IGV4dGVuZHMgUGFnZU1hbmFnZXIge1xuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIHRoaXMuJG1vZGFsID0gbnVsbDtcbiAgICAgICAgdGhpcy4kY2FydFBhZ2VDb250ZW50ID0gJCgnW2RhdGEtY2FydF0nKTtcbiAgICAgICAgdGhpcy4kY2FydENvbnRlbnQgPSAkKCdbZGF0YS1jYXJ0LWNvbnRlbnRdJyk7XG4gICAgICAgIHRoaXMuJGNhcnRNZXNzYWdlcyA9ICQoJ1tkYXRhLWNhcnQtc3RhdHVzXScpO1xuICAgICAgICB0aGlzLiRjYXJ0VG90YWxzID0gJCgnW2RhdGEtY2FydC10b3RhbHNdJyk7XG4gICAgICAgIHRoaXMuJGNhcnRBZGRpdGlvbmFsQ2hlY2tvdXRCdG5zID0gJCgnW2RhdGEtY2FydC1hZGRpdGlvbmFsLWNoZWNrb3V0LWJ1dHRvbnNdJyk7XG4gICAgICAgIHRoaXMuJG92ZXJsYXkgPSAkKCdbZGF0YS1jYXJ0XSAubG9hZGluZ092ZXJsYXknKVxuICAgICAgICAgICAgLmhpZGUoKTsgLy8gVE9ETzogdGVtcG9yYXJ5IHVudGlsIHJvcGVyIHB1bGxzIGluIGhpcyBjYXJ0IGNvbXBvbmVudHNcbiAgICAgICAgdGhpcy4kYWN0aXZlQ2FydEl0ZW1JZCA9IG51bGw7XG4gICAgICAgIHRoaXMuJGFjdGl2ZUNhcnRJdGVtQnRuQWN0aW9uID0gbnVsbDtcblxuICAgICAgICB0aGlzLnNldEFwcGxlUGF5U3VwcG9ydCgpO1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9XG5cbiAgICBzZXRBcHBsZVBheVN1cHBvcnQoKSB7XG4gICAgICAgIGlmICh3aW5kb3cuQXBwbGVQYXlTZXNzaW9uKSB7XG4gICAgICAgICAgICB0aGlzLiRjYXJ0UGFnZUNvbnRlbnQuYWRkQ2xhc3MoJ2FwcGxlLXBheS1zdXBwb3J0ZWQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhcnRVcGRhdGUoJHRhcmdldCkge1xuICAgICAgICBjb25zdCBpdGVtSWQgPSAkdGFyZ2V0LmRhdGEoJ2NhcnRJdGVtaWQnKTtcbiAgICAgICAgdGhpcy4kYWN0aXZlQ2FydEl0ZW1JZCA9IGl0ZW1JZDtcbiAgICAgICAgdGhpcy4kYWN0aXZlQ2FydEl0ZW1CdG5BY3Rpb24gPSAkdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xuXG4gICAgICAgIGNvbnN0ICRlbCA9ICQoYCNxdHktJHtpdGVtSWR9YCk7XG4gICAgICAgIGNvbnN0IG9sZFF0eSA9IHBhcnNlSW50KCRlbC52YWwoKSwgMTApO1xuICAgICAgICBjb25zdCBtYXhRdHkgPSBwYXJzZUludCgkZWwuZGF0YSgncXVhbnRpdHlNYXgnKSwgMTApO1xuICAgICAgICBjb25zdCBtaW5RdHkgPSBwYXJzZUludCgkZWwuZGF0YSgncXVhbnRpdHlNaW4nKSwgMTApO1xuICAgICAgICBjb25zdCBtaW5FcnJvciA9ICRlbC5kYXRhKCdxdWFudGl0eU1pbkVycm9yJyk7XG4gICAgICAgIGNvbnN0IG1heEVycm9yID0gJGVsLmRhdGEoJ3F1YW50aXR5TWF4RXJyb3InKTtcbiAgICAgICAgY29uc3QgbmV3UXR5ID0gJHRhcmdldC5kYXRhKCdhY3Rpb24nKSA9PT0gJ2luYycgPyBvbGRRdHkgKyAxIDogb2xkUXR5IC0gMTtcbiAgICAgICAgLy8gRG9lcyBub3QgcXVhbGl0eSBmb3IgbWluL21heCBxdWFudGl0eVxuICAgICAgICBpZiAobmV3UXR5IDwgbWluUXR5KSB7XG4gICAgICAgICAgICByZXR1cm4gc2hvd0FsZXJ0TW9kYWwobWluRXJyb3IpO1xuICAgICAgICB9IGVsc2UgaWYgKG1heFF0eSA+IDAgJiYgbmV3UXR5ID4gbWF4UXR5KSB7XG4gICAgICAgICAgICByZXR1cm4gc2hvd0FsZXJ0TW9kYWwobWF4RXJyb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XG5cbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuaXRlbVVwZGF0ZShpdGVtSWQsIG5ld1F0eSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJG92ZXJsYXkuaGlkZSgpO1xuXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT09ICdzdWNjZWVkJykge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBxdWFudGl0eSBpcyBjaGFuZ2VkIFwiMVwiIGZyb20gXCIwXCIsIHdlIGhhdmUgdG8gcmVtb3ZlIHRoZSByb3cuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlID0gKG5ld1F0eSA9PT0gMCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KHJlbW92ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcbiAgICAgICAgICAgICAgICBzaG93QWxlcnRNb2RhbChyZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlKCR0YXJnZXQsIHByZVZhbCA9IG51bGwpIHtcbiAgICAgICAgY29uc3QgaXRlbUlkID0gJHRhcmdldC5kYXRhKCdjYXJ0SXRlbWlkJyk7XG4gICAgICAgIGNvbnN0ICRlbCA9ICQoYCNxdHktJHtpdGVtSWR9YCk7XG4gICAgICAgIGNvbnN0IG1heFF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1heCcpLCAxMCk7XG4gICAgICAgIGNvbnN0IG1pblF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1pbicpLCAxMCk7XG4gICAgICAgIGNvbnN0IG9sZFF0eSA9IHByZVZhbCAhPT0gbnVsbCA/IHByZVZhbCA6IG1pblF0eTtcbiAgICAgICAgY29uc3QgbWluRXJyb3IgPSAkZWwuZGF0YSgncXVhbnRpdHlNaW5FcnJvcicpO1xuICAgICAgICBjb25zdCBtYXhFcnJvciA9ICRlbC5kYXRhKCdxdWFudGl0eU1heEVycm9yJyk7XG4gICAgICAgIGNvbnN0IG5ld1F0eSA9IHBhcnNlSW50KE51bWJlcigkZWwudmFsKCkpLCAxMCk7XG4gICAgICAgIGxldCBpbnZhbGlkRW50cnk7XG5cbiAgICAgICAgLy8gRG9lcyBub3QgcXVhbGl0eSBmb3IgbWluL21heCBxdWFudGl0eVxuICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIobmV3UXR5KSkge1xuICAgICAgICAgICAgaW52YWxpZEVudHJ5ID0gJGVsLnZhbCgpO1xuICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xuICAgICAgICAgICAgcmV0dXJuIHNob3dBbGVydE1vZGFsKHRoaXMuY29udGV4dC5pbnZhbGlkRW50cnlNZXNzYWdlLnJlcGxhY2UoJ1tFTlRSWV0nLCBpbnZhbGlkRW50cnkpKTtcbiAgICAgICAgfSBlbHNlIGlmIChuZXdRdHkgPCBtaW5RdHkpIHtcbiAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcbiAgICAgICAgICAgIHJldHVybiBzaG93QWxlcnRNb2RhbChtaW5FcnJvcik7XG4gICAgICAgIH0gZWxzZSBpZiAobWF4UXR5ID4gMCAmJiBuZXdRdHkgPiBtYXhRdHkpIHtcbiAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcbiAgICAgICAgICAgIHJldHVybiBzaG93QWxlcnRNb2RhbChtYXhFcnJvcik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuaXRlbVVwZGF0ZShpdGVtSWQsIG5ld1F0eSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJG92ZXJsYXkuaGlkZSgpO1xuXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT09ICdzdWNjZWVkJykge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBxdWFudGl0eSBpcyBjaGFuZ2VkIFwiMVwiIGZyb20gXCIwXCIsIHdlIGhhdmUgdG8gcmVtb3ZlIHRoZSByb3cuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlID0gKG5ld1F0eSA9PT0gMCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KHJlbW92ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBzaG93QWxlcnRNb2RhbChyZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhcnRSZW1vdmVJdGVtKGl0ZW1JZCkge1xuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuaXRlbVJlbW92ZShpdGVtSWQsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT09ICdzdWNjZWVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQodHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuJG92ZXJsYXkuaGlkZSgpO1xuICAgICAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKHJlc3BvbnNlLmRhdGEuZXJyb3JzLmpvaW4oJ1xcbicpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FydEVkaXRPcHRpb25zKGl0ZW1JZCwgcHJvZHVjdElkKSB7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB7IHByb2R1Y3RGb3JDaGFuZ2VJZDogcHJvZHVjdElkLCAuLi50aGlzLmNvbnRleHQgfTtcbiAgICAgICAgY29uc3QgbW9kYWwgPSBkZWZhdWx0TW9kYWwoKTtcblxuICAgICAgICBpZiAodGhpcy4kbW9kYWwgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuJG1vZGFsID0gJCgnI21vZGFsJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdGVtcGxhdGU6ICdjYXJ0L21vZGFscy9jb25maWd1cmUtcHJvZHVjdCcsXG4gICAgICAgIH07XG5cbiAgICAgICAgbW9kYWwub3BlbigpO1xuICAgICAgICB0aGlzLiRtb2RhbC5maW5kKCcubW9kYWwtY29udGVudCcpLmFkZENsYXNzKCdoaWRlLWNvbnRlbnQnKTtcblxuICAgICAgICB1dGlscy5hcGkucHJvZHVjdEF0dHJpYnV0ZXMuY29uZmlndXJlSW5DYXJ0KGl0ZW1JZCwgb3B0aW9ucywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIG1vZGFsLnVwZGF0ZUNvbnRlbnQocmVzcG9uc2UuY29udGVudCk7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25DaGFuZ2VIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0ICRwcm9kdWN0T3B0aW9uc0NvbnRhaW5lciA9ICQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlcy13cmFwcGVyXScsIHRoaXMuJG1vZGFsKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2RhbEJvZHlSZXNlcnZlZEhlaWdodCA9ICRwcm9kdWN0T3B0aW9uc0NvbnRhaW5lci5vdXRlckhlaWdodCgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCRwcm9kdWN0T3B0aW9uc0NvbnRhaW5lci5sZW5ndGggJiYgbW9kYWxCb2R5UmVzZXJ2ZWRIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgJHByb2R1Y3RPcHRpb25zQ29udGFpbmVyLmNzcygnaGVpZ2h0JywgbW9kYWxCb2R5UmVzZXJ2ZWRIZWlnaHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICh0aGlzLiRtb2RhbC5oYXNDbGFzcygnb3BlbicpKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9uQ2hhbmdlSGFuZGxlcigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRtb2RhbC5vbmUoTW9kYWxFdmVudHMub3BlbmVkLCBvcHRpb25DaGFuZ2VIYW5kbGVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0RGV0YWlscyA9IG5ldyBDYXJ0SXRlbURldGFpbHModGhpcy4kbW9kYWwsIGNvbnRleHQpO1xuXG4gICAgICAgICAgICB0aGlzLmJpbmRHaWZ0V3JhcHBpbmdGb3JtKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHV0aWxzLmhvb2tzLm9uKCdwcm9kdWN0LW9wdGlvbi1jaGFuZ2UnLCAoZXZlbnQsIGN1cnJlbnRUYXJnZXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRmb3JtID0gJChjdXJyZW50VGFyZ2V0KS5maW5kKCdmb3JtJyk7XG4gICAgICAgICAgICBjb25zdCAkc3VibWl0ID0gJCgnaW5wdXQuYnV0dG9uJywgJGZvcm0pO1xuICAgICAgICAgICAgY29uc3QgJG1lc3NhZ2VCb3ggPSAkKCcuYWxlcnRNZXNzYWdlQm94Jyk7XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5vcHRpb25DaGFuZ2UocHJvZHVjdElkLCAkZm9ybS5zZXJpYWxpemUoKSwgKGVyciwgcmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHJlc3VsdC5kYXRhIHx8IHt9O1xuXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBzaG93QWxlcnRNb2RhbChlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEucHVyY2hhc2luZ19tZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJ3AuYWxlcnRCb3gtbWVzc2FnZScsICRtZXNzYWdlQm94KS50ZXh0KGRhdGEucHVyY2hhc2luZ19tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdC5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAkbWVzc2FnZUJveC5zaG93KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgJG1lc3NhZ2VCb3guaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghZGF0YS5wdXJjaGFzYWJsZSB8fCAhZGF0YS5pbnN0b2NrKSB7XG4gICAgICAgICAgICAgICAgICAgICRzdWJtaXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkc3VibWl0LnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWZyZXNoQ29udGVudChyZW1vdmUpIHtcbiAgICAgICAgY29uc3QgJGNhcnRJdGVtc1Jvd3MgPSAkKCdbZGF0YS1pdGVtLXJvd10nLCB0aGlzLiRjYXJ0Q29udGVudCk7XG4gICAgICAgIGNvbnN0ICRjYXJ0UGFnZVRpdGxlID0gJCgnW2RhdGEtY2FydC1wYWdlLXRpdGxlXScpO1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiAnY2FydC9jb250ZW50JyxcbiAgICAgICAgICAgICAgICB0b3RhbHM6ICdjYXJ0L3RvdGFscycsXG4gICAgICAgICAgICAgICAgcGFnZVRpdGxlOiAnY2FydC9wYWdlLXRpdGxlJyxcbiAgICAgICAgICAgICAgICBzdGF0dXNNZXNzYWdlczogJ2NhcnQvc3RhdHVzLW1lc3NhZ2VzJyxcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsQ2hlY2tvdXRCdXR0b25zOiAnY2FydC9hZGRpdGlvbmFsLWNoZWNrb3V0LWJ1dHRvbnMnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcblxuICAgICAgICAvLyBSZW1vdmUgbGFzdCBpdGVtIGZyb20gY2FydD8gUmVsb2FkXG4gICAgICAgIGlmIChyZW1vdmUgJiYgJGNhcnRJdGVtc1Jvd3MubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuZ2V0Q29udGVudChvcHRpb25zLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kY2FydENvbnRlbnQuaHRtbChyZXNwb25zZS5jb250ZW50KTtcbiAgICAgICAgICAgIHRoaXMuJGNhcnRUb3RhbHMuaHRtbChyZXNwb25zZS50b3RhbHMpO1xuICAgICAgICAgICAgdGhpcy4kY2FydE1lc3NhZ2VzLmh0bWwocmVzcG9uc2Uuc3RhdHVzTWVzc2FnZXMpO1xuICAgICAgICAgICAgdGhpcy4kY2FydEFkZGl0aW9uYWxDaGVja291dEJ0bnMuaHRtbChyZXNwb25zZS5hZGRpdGlvbmFsQ2hlY2tvdXRCdXR0b25zKTtcblxuICAgICAgICAgICAgJGNhcnRQYWdlVGl0bGUucmVwbGFjZVdpdGgocmVzcG9uc2UucGFnZVRpdGxlKTtcblxuICAgICAgICAgICAgY29uc3QgcXVhbnRpdHkgPSAkKCdbZGF0YS1jYXJ0LXF1YW50aXR5XScsIHRoaXMuJGNhcnRDb250ZW50KS5kYXRhKCdjYXJ0UXVhbnRpdHknKSB8fCAwO1xuXG4gICAgICAgICAgICBpZiAoIXF1YW50aXR5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgICAgICAgICB0aGlzLiRvdmVybGF5LmhpZGUoKTtcblxuICAgICAgICAgICAgJCgnYm9keScpLnRyaWdnZXIoJ2NhcnQtcXVhbnRpdHktdXBkYXRlJywgcXVhbnRpdHkpO1xuXG4gICAgICAgICAgICAkKGBbZGF0YS1jYXJ0LWl0ZW1pZD0nJHt0aGlzLiRhY3RpdmVDYXJ0SXRlbUlkfSddYCwgdGhpcy4kY2FydENvbnRlbnQpXG4gICAgICAgICAgICAgICAgLmZpbHRlcihgW2RhdGEtYWN0aW9uPScke3RoaXMuJGFjdGl2ZUNhcnRJdGVtQnRuQWN0aW9ufSddYClcbiAgICAgICAgICAgICAgICAudHJpZ2dlcignZm9jdXMnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZENhcnRFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0IGRlYm91bmNlVGltZW91dCA9IDQwMDtcbiAgICAgICAgY29uc3QgY2FydFVwZGF0ZSA9IGJpbmQoZGVib3VuY2UodGhpcy5jYXJ0VXBkYXRlLCBkZWJvdW5jZVRpbWVvdXQpLCB0aGlzKTtcbiAgICAgICAgY29uc3QgY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UgPSBiaW5kKGRlYm91bmNlKHRoaXMuY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UsIGRlYm91bmNlVGltZW91dCksIHRoaXMpO1xuICAgICAgICBjb25zdCBjYXJ0UmVtb3ZlSXRlbSA9IGJpbmQoZGVib3VuY2UodGhpcy5jYXJ0UmVtb3ZlSXRlbSwgZGVib3VuY2VUaW1lb3V0KSwgdGhpcyk7XG4gICAgICAgIGxldCBwcmVWYWw7XG5cbiAgICAgICAgLy8gY2FydCB1cGRhdGVcbiAgICAgICAgJCgnW2RhdGEtY2FydC11cGRhdGVdJywgdGhpcy4kY2FydENvbnRlbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgY2FydCBxdWFudGl0eVxuICAgICAgICAgICAgY2FydFVwZGF0ZSgkdGFyZ2V0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2FydCBxdHkgbWFudWFsbHkgdXBkYXRlc1xuICAgICAgICAkKCcuY2FydC1pdGVtLXF0eS1pbnB1dCcsIHRoaXMuJGNhcnRDb250ZW50KS5vbih7XG4gICAgICAgICAgICBmb2N1czogZnVuY3Rpb24gb25RdHlGb2N1cygpIHtcbiAgICAgICAgICAgICAgICBwcmVWYWwgPSB0aGlzLnZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYW5nZTogZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgY2FydCBxdWFudGl0eVxuICAgICAgICAgICAgICAgIGNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlKCR0YXJnZXQsIHByZVZhbCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuY2FydC1yZW1vdmUnLCB0aGlzLiRjYXJ0Q29udGVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbUlkID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdjYXJ0SXRlbWlkJyk7XG4gICAgICAgICAgICBjb25zdCBzdHJpbmcgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2NvbmZpcm1EZWxldGUnKTtcbiAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKHN0cmluZywge1xuICAgICAgICAgICAgICAgIGljb246ICd3YXJuaW5nJyxcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxuICAgICAgICAgICAgICAgIG9uQ29uZmlybTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgaXRlbSBmcm9tIGNhcnRcbiAgICAgICAgICAgICAgICAgICAgY2FydFJlbW92ZUl0ZW0oaXRlbUlkKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCdbZGF0YS1pdGVtLWVkaXRdJywgdGhpcy4kY2FydENvbnRlbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnaXRlbUVkaXQnKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RJZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgncHJvZHVjdElkJyk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgLy8gZWRpdCBpdGVtIGluIGNhcnRcbiAgICAgICAgICAgIHRoaXMuY2FydEVkaXRPcHRpb25zKGl0ZW1JZCwgcHJvZHVjdElkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZFByb21vQ29kZUV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgJGNvdXBvbkNvbnRhaW5lciA9ICQoJy5jb3Vwb24tY29kZScpO1xuICAgICAgICBjb25zdCAkY291cG9uRm9ybSA9ICQoJy5jb3Vwb24tZm9ybScpO1xuICAgICAgICBjb25zdCAkY29kZUlucHV0ID0gJCgnW25hbWU9XCJjb3Vwb25jb2RlXCJdJywgJGNvdXBvbkZvcm0pO1xuXG4gICAgICAgICQoJy5jb3Vwb24tY29kZS1hZGQnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmhpZGUoKTtcbiAgICAgICAgICAgICRjb3Vwb25Db250YWluZXIuc2hvdygpO1xuICAgICAgICAgICAgJGNvdXBvbkNvbnRhaW5lci5hdHRyKCdhcmlhLWhpZGRlbicsIGZhbHNlKTtcbiAgICAgICAgICAgICQoJy5jb3Vwb24tY29kZS1jYW5jZWwnKS5zaG93KCk7XG4gICAgICAgICAgICAkY29kZUlucHV0LnRyaWdnZXIoJ2ZvY3VzJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5jb3Vwb24tY29kZS1jYW5jZWwnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkY291cG9uQ29udGFpbmVyLmhpZGUoKTtcbiAgICAgICAgICAgICRjb3Vwb25Db250YWluZXIuYXR0cignYXJpYS1oaWRkZW4nLCB0cnVlKTtcbiAgICAgICAgICAgICQoJy5jb3Vwb24tY29kZS1jYW5jZWwnKS5oaWRlKCk7XG4gICAgICAgICAgICAkKCcuY291cG9uLWNvZGUtYWRkJykuc2hvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkY291cG9uRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29kZSA9ICRjb2RlSW5wdXQudmFsKCk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIC8vIEVtcHR5IGNvZGVcbiAgICAgICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaG93QWxlcnRNb2RhbCgkY29kZUlucHV0LmRhdGEoJ2Vycm9yJykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5hcHBseUNvZGUoY29kZSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwocmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kR2lmdENlcnRpZmljYXRlRXZlbnRzKCkge1xuICAgICAgICBjb25zdCAkY2VydENvbnRhaW5lciA9ICQoJy5naWZ0LWNlcnRpZmljYXRlLWNvZGUnKTtcbiAgICAgICAgY29uc3QgJGNlcnRGb3JtID0gJCgnLmNhcnQtZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtJyk7XG4gICAgICAgIGNvbnN0ICRjZXJ0SW5wdXQgPSAkKCdbbmFtZT1cImNlcnRjb2RlXCJdJywgJGNlcnRGb3JtKTtcblxuICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1hZGQnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KS50b2dnbGUoKTtcbiAgICAgICAgICAgICRjZXJ0Q29udGFpbmVyLnRvZ2dsZSgpO1xuICAgICAgICAgICAgJGNlcnRDb250YWluZXIuYXR0cignYXJpYS1oaWRkZW4nLCBmYWxzZSk7XG4gICAgICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jYW5jZWwnKS50b2dnbGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtY2FuY2VsJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICRjZXJ0Q29udGFpbmVyLnRvZ2dsZSgpO1xuICAgICAgICAgICAgJGNlcnRDb250YWluZXIuYXR0cignYXJpYS1oaWRkZW4nLCB0cnVlKTtcbiAgICAgICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWFkZCcpLnRvZ2dsZSgpO1xuICAgICAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtY2FuY2VsJykudG9nZ2xlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRjZXJ0Rm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29kZSA9ICRjZXJ0SW5wdXQudmFsKCk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGlmICghY2hlY2tJc0dpZnRDZXJ0VmFsaWQoY29kZSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uRGljdGlvbmFyeSA9IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSh0aGlzLmNvbnRleHQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzaG93QWxlcnRNb2RhbCh2YWxpZGF0aW9uRGljdGlvbmFyeS5pbnZhbGlkX2dpZnRfY2VydGlmaWNhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5hcHBseUdpZnRDZXJ0aWZpY2F0ZShjb2RlLCAoZXJyLCByZXNwKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3AuZGF0YS5zdGF0dXMgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwocmVzcC5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRHaWZ0V3JhcHBpbmdFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0IG1vZGFsID0gZGVmYXVsdE1vZGFsKCk7XG5cbiAgICAgICAgJCgnW2RhdGEtaXRlbS1naWZ0d3JhcF0nKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtSWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2l0ZW1HaWZ0d3JhcCcpO1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJ2NhcnQvbW9kYWxzL2dpZnQtd3JhcHBpbmctZm9ybScsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBtb2RhbC5vcGVuKCk7XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LmdldEl0ZW1HaWZ0V3JhcHBpbmdPcHRpb25zKGl0ZW1JZCwgb3B0aW9ucywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBtb2RhbC51cGRhdGVDb250ZW50KHJlc3BvbnNlLmNvbnRlbnQpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kR2lmdFdyYXBwaW5nRm9ybSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRHaWZ0V3JhcHBpbmdGb3JtKCkge1xuICAgICAgICAkKCcuZ2lmdFdyYXBwaW5nLXNlbGVjdCcpLm9uKCdjaGFuZ2UnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCAkc2VsZWN0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gJHNlbGVjdC52YWwoKTtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gJHNlbGVjdC5kYXRhKCdpbmRleCcpO1xuXG4gICAgICAgICAgICBpZiAoIWlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBhbGxvd01lc3NhZ2UgPSAkc2VsZWN0LmZpbmQoYG9wdGlvblt2YWx1ZT0ke2lkfV1gKS5kYXRhKCdhbGxvd01lc3NhZ2UnKTtcblxuICAgICAgICAgICAgJChgLmdpZnRXcmFwcGluZy1pbWFnZS0ke2luZGV4fWApLmhpZGUoKTtcbiAgICAgICAgICAgICQoYCNnaWZ0V3JhcHBpbmctaW1hZ2UtJHtpbmRleH0tJHtpZH1gKS5zaG93KCk7XG5cbiAgICAgICAgICAgIGlmIChhbGxvd01lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAkKGAjZ2lmdFdyYXBwaW5nLW1lc3NhZ2UtJHtpbmRleH1gKS5zaG93KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoYCNnaWZ0V3JhcHBpbmctbWVzc2FnZS0ke2luZGV4fWApLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmdpZnRXcmFwcGluZy1zZWxlY3QnKS50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICBmdW5jdGlvbiB0b2dnbGVWaWV3cygpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gJCgnaW5wdXQ6cmFkaW9bbmFtZSA9XCJnaWZ0d3JhcHR5cGVcIl06Y2hlY2tlZCcpLnZhbCgpO1xuICAgICAgICAgICAgY29uc3QgJHNpbmdsZUZvcm0gPSAkKCcuZ2lmdFdyYXBwaW5nLXNpbmdsZScpO1xuICAgICAgICAgICAgY29uc3QgJG11bHRpRm9ybSA9ICQoJy5naWZ0V3JhcHBpbmctbXVsdGlwbGUnKTtcblxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSAnc2FtZScpIHtcbiAgICAgICAgICAgICAgICAkc2luZ2xlRm9ybS5zaG93KCk7XG4gICAgICAgICAgICAgICAgJG11bHRpRm9ybS5oaWRlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRzaW5nbGVGb3JtLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAkbXVsdGlGb3JtLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICQoJ1tuYW1lPVwiZ2lmdHdyYXB0eXBlXCJdJykub24oJ2NsaWNrJywgdG9nZ2xlVmlld3MpO1xuXG4gICAgICAgIHRvZ2dsZVZpZXdzKCk7XG4gICAgfVxuXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy5iaW5kQ2FydEV2ZW50cygpO1xuICAgICAgICB0aGlzLmJpbmRQcm9tb0NvZGVFdmVudHMoKTtcbiAgICAgICAgdGhpcy5iaW5kR2lmdFdyYXBwaW5nRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuYmluZEdpZnRDZXJ0aWZpY2F0ZUV2ZW50cygpO1xuXG4gICAgICAgIC8vIGluaXRpYXRlIHNoaXBwaW5nIGVzdGltYXRvciBtb2R1bGVcbiAgICAgICAgY29uc3Qgc2hpcHBpbmdFcnJvck1lc3NhZ2VzID0ge1xuICAgICAgICAgICAgY291bnRyeTogdGhpcy5jb250ZXh0LnNoaXBwaW5nQ291bnRyeUVycm9yTWVzc2FnZSxcbiAgICAgICAgICAgIHByb3ZpbmNlOiB0aGlzLmNvbnRleHQuc2hpcHBpbmdQcm92aW5jZUVycm9yTWVzc2FnZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zaGlwcGluZ0VzdGltYXRvciA9IG5ldyBTaGlwcGluZ0VzdGltYXRvcigkKCdbZGF0YS1zaGlwcGluZy1lc3RpbWF0b3JdJyksIHNoaXBwaW5nRXJyb3JNZXNzYWdlcyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHN0YXRlQ291bnRyeSBmcm9tICcuLi9jb21tb24vc3RhdGUtY291bnRyeSc7XG5pbXBvcnQgbm9kIGZyb20gJy4uL2NvbW1vbi9ub2QnO1xuaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCB7IFZhbGlkYXRvcnMsIGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UgfSBmcm9tICcuLi9jb21tb24vdXRpbHMvZm9ybS11dGlscyc7XG5pbXBvcnQgY29sbGFwc2libGVGYWN0b3J5IGZyb20gJy4uL2NvbW1vbi9jb2xsYXBzaWJsZSc7XG5pbXBvcnQgeyBzaG93QWxlcnRNb2RhbCB9IGZyb20gJy4uL2dsb2JhbC9tb2RhbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXBwaW5nRXN0aW1hdG9yIHtcbiAgICBjb25zdHJ1Y3RvcigkZWxlbWVudCwgc2hpcHBpbmdFcnJvck1lc3NhZ2VzKSB7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcblxuICAgICAgICB0aGlzLiRzdGF0ZSA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScsIHRoaXMuJGVsZW1lbnQpO1xuICAgICAgICB0aGlzLmlzRXN0aW1hdG9yRm9ybU9wZW5lZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNoaXBwaW5nRXJyb3JNZXNzYWdlcyA9IHNoaXBwaW5nRXJyb3JNZXNzYWdlcztcbiAgICAgICAgdGhpcy5pbml0Rm9ybVZhbGlkYXRpb24oKTtcbiAgICAgICAgdGhpcy5iaW5kU3RhdGVDb3VudHJ5Q2hhbmdlKCk7XG4gICAgICAgIHRoaXMuYmluZEVzdGltYXRvckV2ZW50cygpO1xuICAgIH1cblxuICAgIGluaXRGb3JtVmFsaWRhdGlvbigpIHtcbiAgICAgICAgY29uc3Qgc2hpcHBpbmdFc3RpbWF0b3JBbGVydCA9ICQoJy5zaGlwcGluZy1xdW90ZXMnKTtcblxuICAgICAgICB0aGlzLnNoaXBwaW5nRXN0aW1hdG9yID0gJ2Zvcm1bZGF0YS1zaGlwcGluZy1lc3RpbWF0b3JdJztcbiAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvciA9IG5vZCh7XG4gICAgICAgICAgICBzdWJtaXQ6IGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IC5zaGlwcGluZy1lc3RpbWF0ZS1zdWJtaXRgLFxuICAgICAgICAgICAgdGFwOiBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlLFxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuc2hpcHBpbmctZXN0aW1hdGUtc3VibWl0JywgdGhpcy4kZWxlbWVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgLy8gZXN0aW1hdG9yIGVycm9yIG1lc3NhZ2VzIGFyZSBiZWluZyBpbmplY3RlZCBpbiBodG1sIGFzIGEgcmVzdWx0XG4gICAgICAgICAgICAvLyBvZiB1c2VyIHN1Ym1pdDsgY2xlYXJpbmcgYW5kIGFkZGluZyByb2xlIG9uIHN1Ym1pdCBwcm92aWRlc1xuICAgICAgICAgICAgLy8gcmVndWxhciBhbm5vdW5jZW1lbnQgb2YgdGhlc2UgZXJyb3IgbWVzc2FnZXNcbiAgICAgICAgICAgIGlmIChzaGlwcGluZ0VzdGltYXRvckFsZXJ0LmF0dHIoJ3JvbGUnKSkge1xuICAgICAgICAgICAgICAgIHNoaXBwaW5nRXN0aW1hdG9yQWxlcnQucmVtb3ZlQXR0cigncm9sZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzaGlwcGluZ0VzdGltYXRvckFsZXJ0LmF0dHIoJ3JvbGUnLCAnYWxlcnQnKTtcbiAgICAgICAgICAgIC8vIFdoZW4gc3dpdGNoaW5nIGJldHdlZW4gY291bnRyaWVzLCB0aGUgc3RhdGUvcmVnaW9uIGlzIGR5bmFtaWNcbiAgICAgICAgICAgIC8vIE9ubHkgcGVyZm9ybSBhIGNoZWNrIGZvciBhbGwgZmllbGRzIHdoZW4gY291bnRyeSBoYXMgYSB2YWx1ZVxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIGFyZUFsbCgndmFsaWQnKSB3aWxsIGNoZWNrIGNvdW50cnkgZm9yIHZhbGlkaXR5XG4gICAgICAgICAgICBpZiAoJChgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSBzZWxlY3RbbmFtZT1cInNoaXBwaW5nLWNvdW50cnlcIl1gKS52YWwoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLmFyZUFsbCgndmFsaWQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5iaW5kVmFsaWRhdGlvbigpO1xuICAgICAgICB0aGlzLmJpbmRTdGF0ZVZhbGlkYXRpb24oKTtcbiAgICAgICAgdGhpcy5iaW5kVVBTUmF0ZXMoKTtcbiAgICB9XG5cbiAgICBiaW5kVmFsaWRhdGlvbigpIHtcbiAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5hZGQoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSBzZWxlY3RbbmFtZT1cInNoaXBwaW5nLWNvdW50cnlcIl1gLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb3VudHJ5SWQgPSBOdW1iZXIodmFsKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gY291bnRyeUlkICE9PSAwICYmICFOdW1iZXIuaXNOYU4oY291bnRyeUlkKTtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLnNoaXBwaW5nRXJyb3JNZXNzYWdlcy5jb3VudHJ5LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgYmluZFN0YXRlVmFsaWRhdGlvbigpIHtcbiAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5hZGQoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAkKGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctc3RhdGVcIl1gKSxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgJGVsZSA9ICQoYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gc2VsZWN0W25hbWU9XCJzaGlwcGluZy1zdGF0ZVwiXWApO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICgkZWxlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlVmFsID0gJGVsZS52YWwoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZWxlVmFsICYmIGVsZVZhbC5sZW5ndGggJiYgZWxlVmFsICE9PSAnU3RhdGUvcHJvdmluY2UnO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5zaGlwcGluZ0Vycm9yTWVzc2FnZXMucHJvdmluY2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgYmV0d2VlbiBkZWZhdWx0IHNoaXBwaW5nIGFuZCB1cHMgc2hpcHBpbmcgcmF0ZXNcbiAgICAgKi9cbiAgICBiaW5kVVBTUmF0ZXMoKSB7XG4gICAgICAgIGNvbnN0IFVQU1JhdGVUb2dnbGUgPSAnLmVzdGltYXRvci1mb3JtLXRvZ2dsZVVQU1JhdGUnO1xuXG4gICAgICAgICQoJ2JvZHknKS5vbignY2xpY2snLCBVUFNSYXRlVG9nZ2xlLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRlc3RpbWF0b3JGb3JtVXBzID0gJCgnLmVzdGltYXRvci1mb3JtLS11cHMnKTtcbiAgICAgICAgICAgIGNvbnN0ICRlc3RpbWF0b3JGb3JtRGVmYXVsdCA9ICQoJy5lc3RpbWF0b3ItZm9ybS0tZGVmYXVsdCcpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkZXN0aW1hdG9yRm9ybVVwcy50b2dnbGVDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xuICAgICAgICAgICAgJGVzdGltYXRvckZvcm1EZWZhdWx0LnRvZ2dsZUNsYXNzKCd1LWhpZGRlblZpc3VhbGx5Jyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRTdGF0ZUNvdW50cnlDaGFuZ2UoKSB7XG4gICAgICAgIGxldCAkbGFzdDtcblxuICAgICAgICAvLyBSZXF1ZXN0cyB0aGUgc3RhdGVzIGZvciBhIGNvdW50cnkgd2l0aCBBSkFYXG4gICAgICAgIHN0YXRlQ291bnRyeSh0aGlzLiRzdGF0ZSwgdGhpcy5jb250ZXh0LCB7IHVzZUlkRm9yU3RhdGVzOiB0cnVlIH0sIChlcnIsIGZpZWxkKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwoZXJyKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgJGZpZWxkID0gJChmaWVsZCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLmdldFN0YXR1cyh0aGlzLiRzdGF0ZSkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5yZW1vdmUodGhpcy4kc3RhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJGxhc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLnJlbW92ZSgkbGFzdCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkZmllbGQuaXMoJ3NlbGVjdCcpKSB7XG4gICAgICAgICAgICAgICAgJGxhc3QgPSBmaWVsZDtcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRTdGF0ZVZhbGlkYXRpb24oKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGZpZWxkLmF0dHIoJ3BsYWNlaG9sZGVyJywgJ1N0YXRlL3Byb3ZpbmNlJyk7XG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5jbGVhblVwU3RhdGVWYWxpZGF0aW9uKGZpZWxkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gV2hlbiB5b3UgY2hhbmdlIGEgY291bnRyeSwgeW91IHN3YXAgdGhlIHN0YXRlL3Byb3ZpbmNlIGJldHdlZW4gYW4gaW5wdXQgYW5kIGEgc2VsZWN0IGRyb3Bkb3duXG4gICAgICAgICAgICAvLyBOb3QgYWxsIGNvdW50cmllcyByZXF1aXJlIHRoZSBwcm92aW5jZSB0byBiZSBmaWxsZWRcbiAgICAgICAgICAgIC8vIFdlIGhhdmUgdG8gcmVtb3ZlIHRoaXMgY2xhc3Mgd2hlbiB3ZSBzd2FwIHNpbmNlIG5vZCB2YWxpZGF0aW9uIGRvZXNuJ3QgY2xlYW51cCBmb3IgdXNcbiAgICAgICAgICAgICQodGhpcy5zaGlwcGluZ0VzdGltYXRvcikuZmluZCgnLmZvcm0tZmllbGQtLXN1Y2Nlc3MnKS5yZW1vdmVDbGFzcygnZm9ybS1maWVsZC0tc3VjY2VzcycpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB0b2dnbGVFc3RpbWF0b3JGb3JtU3RhdGUodG9nZ2xlQnV0dG9uLCBidXR0b25TZWxlY3RvciwgJHRvZ2dsZUNvbnRhaW5lcikge1xuICAgICAgICBjb25zdCBjaGFuZ2VBdHRyaWJ1dGVzT25Ub2dnbGUgPSAoc2VsZWN0b3JUb0FjdGl2YXRlKSA9PiB7XG4gICAgICAgICAgICAkKHRvZ2dsZUJ1dHRvbikuYXR0cignYXJpYS1sYWJlbGxlZGJ5Jywgc2VsZWN0b3JUb0FjdGl2YXRlKTtcbiAgICAgICAgICAgICQoYnV0dG9uU2VsZWN0b3IpLnRleHQoJChgIyR7c2VsZWN0b3JUb0FjdGl2YXRlfWApLnRleHQoKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzRXN0aW1hdG9yRm9ybU9wZW5lZCkge1xuICAgICAgICAgICAgY2hhbmdlQXR0cmlidXRlc09uVG9nZ2xlKCdlc3RpbWF0b3ItY2xvc2UnKTtcbiAgICAgICAgICAgICR0b2dnbGVDb250YWluZXIucmVtb3ZlQ2xhc3MoJ3UtaGlkZGVuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGFuZ2VBdHRyaWJ1dGVzT25Ub2dnbGUoJ2VzdGltYXRvci1hZGQnKTtcbiAgICAgICAgICAgICR0b2dnbGVDb250YWluZXIuYWRkQ2xhc3MoJ3UtaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc0VzdGltYXRvckZvcm1PcGVuZWQgPSAhdGhpcy5pc0VzdGltYXRvckZvcm1PcGVuZWQ7XG4gICAgfVxuXG4gICAgYmluZEVzdGltYXRvckV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgJGVzdGltYXRvckNvbnRhaW5lciA9ICQoJy5zaGlwcGluZy1lc3RpbWF0b3InKTtcbiAgICAgICAgY29uc3QgJGVzdGltYXRvckZvcm0gPSAkKCcuZXN0aW1hdG9yLWZvcm0nKTtcbiAgICAgICAgY29sbGFwc2libGVGYWN0b3J5KCk7XG4gICAgICAgICRlc3RpbWF0b3JGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgY291bnRyeV9pZDogJCgnW25hbWU9XCJzaGlwcGluZy1jb3VudHJ5XCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxuICAgICAgICAgICAgICAgIHN0YXRlX2lkOiAkKCdbbmFtZT1cInNoaXBwaW5nLXN0YXRlXCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxuICAgICAgICAgICAgICAgIGNpdHk6ICQoJ1tuYW1lPVwic2hpcHBpbmctY2l0eVwiXScsICRlc3RpbWF0b3JGb3JtKS52YWwoKSxcbiAgICAgICAgICAgICAgICB6aXBfY29kZTogJCgnW25hbWU9XCJzaGlwcGluZy16aXBcIl0nLCAkZXN0aW1hdG9yRm9ybSkudmFsKCksXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5nZXRTaGlwcGluZ1F1b3RlcyhwYXJhbXMsICdjYXJ0L3NoaXBwaW5nLXF1b3RlcycsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgJCgnLnNoaXBwaW5nLXF1b3RlcycpLmh0bWwocmVzcG9uc2UuY29udGVudCk7XG5cbiAgICAgICAgICAgICAgICAvLyBiaW5kIHRoZSBzZWxlY3QgYnV0dG9uXG4gICAgICAgICAgICAgICAgJCgnLnNlbGVjdC1zaGlwcGluZy1xdW90ZScpLm9uKCdjbGljaycsIGNsaWNrRXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBxdW90ZUlkID0gJCgnLnNoaXBwaW5nLXF1b3RlOmNoZWNrZWQnKS52YWwoKTtcblxuICAgICAgICAgICAgICAgICAgICBjbGlja0V2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuc3VibWl0U2hpcHBpbmdRdW90ZShxdW90ZUlkLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5zaGlwcGluZy1lc3RpbWF0ZS1zaG93Jykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlRXN0aW1hdG9yRm9ybVN0YXRlKGV2ZW50LmN1cnJlbnRUYXJnZXQsICcuc2hpcHBpbmctZXN0aW1hdGUtc2hvd19fYnRuLW5hbWUnLCAkZXN0aW1hdG9yQ29udGFpbmVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBQcm9kdWN0RGV0YWlsc0Jhc2UsIHsgb3B0aW9uQ2hhbmdlRGVjb3JhdG9yIH0gZnJvbSAnLi9wcm9kdWN0LWRldGFpbHMtYmFzZSc7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGlzQnJvd3NlcklFLCBjb252ZXJ0SW50b0FycmF5IH0gZnJvbSAnLi91dGlscy9pZS1oZWxwZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FydEl0ZW1EZXRhaWxzIGV4dGVuZHMgUHJvZHVjdERldGFpbHNCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGUsIGNvbnRleHQsIHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSA9IHt9KSB7XG4gICAgICAgIHN1cGVyKCRzY29wZSwgY29udGV4dCk7XG5cbiAgICAgICAgY29uc3QgJGZvcm0gPSAkKCcjQ2FydEVkaXRQcm9kdWN0RmllbGRzRm9ybScsIHRoaXMuJHNjb3BlKTtcbiAgICAgICAgY29uc3QgJHByb2R1Y3RPcHRpb25zRWxlbWVudCA9ICQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlcy13cmFwcGVyXScsICRmb3JtKTtcbiAgICAgICAgY29uc3QgaGFzT3B0aW9ucyA9ICRwcm9kdWN0T3B0aW9uc0VsZW1lbnQuaHRtbCgpLnRyaW0oKS5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGhhc0RlZmF1bHRPcHRpb25zID0gJHByb2R1Y3RPcHRpb25zRWxlbWVudC5maW5kKCdbZGF0YS1kZWZhdWx0XScpLmxlbmd0aDtcblxuICAgICAgICAkcHJvZHVjdE9wdGlvbnNFbGVtZW50Lm9uKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFByb2R1Y3RWYXJpYW50KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IG9wdGlvbkNoYW5nZUNhbGxiYWNrID0gb3B0aW9uQ2hhbmdlRGVjb3JhdG9yLmNhbGwodGhpcywgaGFzRGVmYXVsdE9wdGlvbnMpO1xuXG4gICAgICAgIC8vIFVwZGF0ZSBwcm9kdWN0IGF0dHJpYnV0ZXMuIEFsc28gdXBkYXRlIHRoZSBpbml0aWFsIHZpZXcgaW4gY2FzZSBpdGVtcyBhcmUgb29zXG4gICAgICAgIC8vIG9yIGhhdmUgZGVmYXVsdCB2YXJpYW50IHByb3BlcnRpZXMgdGhhdCBjaGFuZ2UgdGhlIHZpZXdcbiAgICAgICAgaWYgKChpc0VtcHR5KHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSkgfHwgaGFzRGVmYXVsdE9wdGlvbnMpICYmIGhhc09wdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RJZCA9IHRoaXMuY29udGV4dC5wcm9kdWN0Rm9yQ2hhbmdlSWQ7XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5vcHRpb25DaGFuZ2UocHJvZHVjdElkLCAkZm9ybS5zZXJpYWxpemUoKSwgJ3Byb2R1Y3RzL2J1bGstZGlzY291bnQtcmF0ZXMnLCBvcHRpb25DaGFuZ2VDYWxsYmFjayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzKHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRQcm9kdWN0VmFyaWFudCgpIHtcbiAgICAgICAgY29uc3QgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcyA9IFtdO1xuICAgICAgICBjb25zdCBvcHRpb25zID0gW107XG5cbiAgICAgICAgJC5lYWNoKCQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlXScpLCAoaW5kZXgsIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25MYWJlbCA9IHZhbHVlLmNoaWxkcmVuWzBdLmlubmVyVGV4dDtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvblRpdGxlID0gb3B0aW9uTGFiZWwuc3BsaXQoJzonKVswXS50cmltKCk7XG4gICAgICAgICAgICBjb25zdCByZXF1aXJlZCA9IG9wdGlvbkxhYmVsLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ3JlcXVpcmVkJyk7XG4gICAgICAgICAgICBjb25zdCB0eXBlID0gdmFsdWUuZ2V0QXR0cmlidXRlKCdkYXRhLXByb2R1Y3QtYXR0cmlidXRlJyk7XG5cbiAgICAgICAgICAgIGlmICgodHlwZSA9PT0gJ2lucHV0LWZpbGUnIHx8IHR5cGUgPT09ICdpbnB1dC10ZXh0JyB8fCB0eXBlID09PSAnaW5wdXQtbnVtYmVyJykgJiYgdmFsdWUucXVlcnlTZWxlY3RvcignaW5wdXQnKS52YWx1ZSA9PT0gJycgJiYgcmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3RleHRhcmVhJyAmJiB2YWx1ZS5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYScpLnZhbHVlID09PSAnJyAmJiByZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnZGF0ZScpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc1NhdGlzZmllZCA9IEFycmF5LmZyb20odmFsdWUucXVlcnlTZWxlY3RvckFsbCgnc2VsZWN0JykpLmV2ZXJ5KChzZWxlY3QpID0+IHNlbGVjdC5zZWxlY3RlZEluZGV4ICE9PSAwKTtcblxuICAgICAgICAgICAgICAgIGlmIChpc1NhdGlzZmllZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlU3RyaW5nID0gQXJyYXkuZnJvbSh2YWx1ZS5xdWVyeVNlbGVjdG9yQWxsKCdzZWxlY3QnKSkubWFwKCh4KSA9PiB4LnZhbHVlKS5qb2luKCctJyk7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06JHtkYXRlU3RyaW5nfWApO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnc2V0LXNlbGVjdCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3QgPSB2YWx1ZS5xdWVyeVNlbGVjdG9yKCdzZWxlY3QnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZEluZGV4ID0gc2VsZWN0LnNlbGVjdGVkSW5kZXg7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRJbmRleCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9OiR7c2VsZWN0Lm9wdGlvbnNbc2VsZWN0ZWRJbmRleF0uaW5uZXJUZXh0fWApO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnc2V0LXJlY3RhbmdsZScgfHwgdHlwZSA9PT0gJ3NldC1yYWRpbycgfHwgdHlwZSA9PT0gJ3N3YXRjaCcgfHwgdHlwZSA9PT0gJ2lucHV0LWNoZWNrYm94JyB8fCB0eXBlID09PSAncHJvZHVjdC1saXN0Jykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrZWQgPSB2YWx1ZS5xdWVyeVNlbGVjdG9yKCc6Y2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgIGlmIChjaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdldFNlbGVjdGVkT3B0aW9uTGFiZWwgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9kdWN0VmFyaWFudHNsaXN0ID0gY29udmVydEludG9BcnJheSh2YWx1ZS5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRjaExhYmVsRm9yQ2hlY2tlZElucHV0ID0gaW5wdCA9PiBpbnB0LmRhdGFzZXQucHJvZHVjdEF0dHJpYnV0ZVZhbHVlID09PSBjaGVja2VkLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb2R1Y3RWYXJpYW50c2xpc3QuZmlsdGVyKG1hdGNoTGFiZWxGb3JDaGVja2VkSW5wdXQpWzBdO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3NldC1yZWN0YW5nbGUnIHx8IHR5cGUgPT09ICdzZXQtcmFkaW8nIHx8IHR5cGUgPT09ICdwcm9kdWN0LWxpc3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IGlzQnJvd3NlcklFID8gZ2V0U2VsZWN0ZWRPcHRpb25MYWJlbCgpLmlubmVyVGV4dC50cmltKCkgOiBjaGVja2VkLmxhYmVsc1swXS5pbm5lclRleHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9OiR7bGFiZWx9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3N3YXRjaCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gaXNCcm93c2VySUUgPyBnZXRTZWxlY3RlZE9wdGlvbkxhYmVsKCkuY2hpbGRyZW5bMF0gOiBjaGVja2VkLmxhYmVsc1swXS5jaGlsZHJlblswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06JHtsYWJlbC50aXRsZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnaW5wdXQtY2hlY2tib3gnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9Olllc2ApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnaW5wdXQtY2hlY2tib3gnKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06Tm9gKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBwcm9kdWN0VmFyaWFudCA9IHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMubGVuZ3RoID09PSAwID8gb3B0aW9ucy5zb3J0KCkuam9pbignLCAnKSA6ICd1bnNhdGlzZmllZCc7XG4gICAgICAgIGNvbnN0IHZpZXcgPSAkKCcubW9kYWwtaGVhZGVyLXRpdGxlJyk7XG5cbiAgICAgICAgaWYgKHByb2R1Y3RWYXJpYW50KSB7XG4gICAgICAgICAgICBwcm9kdWN0VmFyaWFudCA9IHByb2R1Y3RWYXJpYW50ID09PSAndW5zYXRpc2ZpZWQnID8gJycgOiBwcm9kdWN0VmFyaWFudDtcbiAgICAgICAgICAgIGlmICh2aWV3LmF0dHIoJ2RhdGEtZXZlbnQtdHlwZScpKSB7XG4gICAgICAgICAgICAgICAgdmlldy5hdHRyKCdkYXRhLXByb2R1Y3QtdmFyaWFudCcsIHByb2R1Y3RWYXJpYW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZHVjdE5hbWUgPSB2aWV3Lmh0bWwoKS5tYXRjaCgvJyguKj8pJy8pWzFdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhcmQgPSAkKGBbZGF0YS1uYW1lPVwiJHtwcm9kdWN0TmFtZX1cIl1gKTtcbiAgICAgICAgICAgICAgICBjYXJkLmF0dHIoJ2RhdGEtcHJvZHVjdC12YXJpYW50JywgcHJvZHVjdFZhcmlhbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZSBvciBtYXJrIGFzIHVuYXZhaWxhYmxlIG91dCBvZiBzdG9jayBhdHRyaWJ1dGVzIGlmIGVuYWJsZWRcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGRhdGEgUHJvZHVjdCBhdHRyaWJ1dGUgZGF0YVxuICAgICAqL1xuICAgIHVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzKGRhdGEpIHtcbiAgICAgICAgc3VwZXIudXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMoZGF0YSk7XG5cbiAgICAgICAgdGhpcy4kc2NvcGUuZmluZCgnLm1vZGFsLWNvbnRlbnQnKS5yZW1vdmVDbGFzcygnaGlkZS1jb250ZW50Jyk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGNlcnQpIHtcbiAgICBpZiAodHlwZW9mIGNlcnQgIT09ICdzdHJpbmcnIHx8IGNlcnQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBBZGQgYW55IGN1c3RvbSBnaWZ0IGNlcnRpZmljYXRlIHZhbGlkYXRpb24gbG9naWMgaGVyZVxuICAgIHJldHVybiB0cnVlO1xufVxuIiwiaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkIH0gZnJvbSAnLi91dGlscy9mb3JtLXV0aWxzJztcbmltcG9ydCB7IHNob3dBbGVydE1vZGFsIH0gZnJvbSAnLi4vZ2xvYmFsL21vZGFsJztcblxuLyoqXG4gKiBJZiB0aGVyZSBhcmUgbm8gb3B0aW9ucyBmcm9tIGJjYXBwLCBhIHRleHQgZmllbGQgd2lsbCBiZSBzZW50LiBUaGlzIHdpbGwgY3JlYXRlIGEgc2VsZWN0IGVsZW1lbnQgdG8gaG9sZCBvcHRpb25zIGFmdGVyIHRoZSByZW1vdGUgcmVxdWVzdC5cbiAqIEByZXR1cm5zIHtqUXVlcnl8SFRNTEVsZW1lbnR9XG4gKi9cbmZ1bmN0aW9uIG1ha2VTdGF0ZVJlcXVpcmVkKHN0YXRlRWxlbWVudCwgY29udGV4dCkge1xuICAgIGNvbnN0IGF0dHJzID0gXy50cmFuc2Zvcm0oc3RhdGVFbGVtZW50LnByb3AoJ2F0dHJpYnV0ZXMnKSwgKHJlc3VsdCwgaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCByZXQgPSByZXN1bHQ7XG4gICAgICAgIHJldFtpdGVtLm5hbWVdID0gaXRlbS52YWx1ZTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlcGxhY2VtZW50QXR0cmlidXRlcyA9IHtcbiAgICAgICAgaWQ6IGF0dHJzLmlkLFxuICAgICAgICAnZGF0YS1sYWJlbCc6IGF0dHJzWydkYXRhLWxhYmVsJ10sXG4gICAgICAgIGNsYXNzOiAnZm9ybS1zZWxlY3QnLFxuICAgICAgICBuYW1lOiBhdHRycy5uYW1lLFxuICAgICAgICAnZGF0YS1maWVsZC10eXBlJzogYXR0cnNbJ2RhdGEtZmllbGQtdHlwZSddLFxuICAgIH07XG5cbiAgICBzdGF0ZUVsZW1lbnQucmVwbGFjZVdpdGgoJCgnPHNlbGVjdD48L3NlbGVjdD4nLCByZXBsYWNlbWVudEF0dHJpYnV0ZXMpKTtcblxuICAgIGNvbnN0ICRuZXdFbGVtZW50ID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJyk7XG4gICAgY29uc3QgJGhpZGRlbklucHV0ID0gJCgnW25hbWUqPVwiRm9ybUZpZWxkSXNUZXh0XCJdJyk7XG5cbiAgICBpZiAoJGhpZGRlbklucHV0Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAkaGlkZGVuSW5wdXQucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgaWYgKCRuZXdFbGVtZW50LnByZXYoKS5maW5kKCdzbWFsbCcpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvLyBTdHJpbmcgaXMgaW5qZWN0ZWQgZnJvbSBsb2NhbGl6ZXJcbiAgICAgICAgJG5ld0VsZW1lbnQucHJldigpLmFwcGVuZChgPHNtYWxsPiR7Y29udGV4dC5yZXF1aXJlZH08L3NtYWxsPmApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRuZXdFbGVtZW50LnByZXYoKS5maW5kKCdzbWFsbCcpLnNob3coKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJG5ld0VsZW1lbnQ7XG59XG5cbi8qKlxuICogSWYgYSBjb3VudHJ5IHdpdGggc3RhdGVzIGlzIHRoZSBkZWZhdWx0LCBhIHNlbGVjdCB3aWxsIGJlIHNlbnQsXG4gKiBJbiB0aGlzIGNhc2Ugd2UgbmVlZCB0byBiZSBhYmxlIHRvIHN3aXRjaCB0byBhbiBpbnB1dCBmaWVsZCBhbmQgaGlkZSB0aGUgcmVxdWlyZWQgZmllbGRcbiAqL1xuZnVuY3Rpb24gbWFrZVN0YXRlT3B0aW9uYWwoc3RhdGVFbGVtZW50KSB7XG4gICAgY29uc3QgYXR0cnMgPSBfLnRyYW5zZm9ybShzdGF0ZUVsZW1lbnQucHJvcCgnYXR0cmlidXRlcycpLCAocmVzdWx0LCBpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHJldCA9IHJlc3VsdDtcbiAgICAgICAgcmV0W2l0ZW0ubmFtZV0gPSBpdGVtLnZhbHVlO1xuXG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfSk7XG5cbiAgICBjb25zdCByZXBsYWNlbWVudEF0dHJpYnV0ZXMgPSB7XG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgaWQ6IGF0dHJzLmlkLFxuICAgICAgICAnZGF0YS1sYWJlbCc6IGF0dHJzWydkYXRhLWxhYmVsJ10sXG4gICAgICAgIGNsYXNzOiAnZm9ybS1pbnB1dCcsXG4gICAgICAgIG5hbWU6IGF0dHJzLm5hbWUsXG4gICAgICAgICdkYXRhLWZpZWxkLXR5cGUnOiBhdHRyc1snZGF0YS1maWVsZC10eXBlJ10sXG4gICAgfTtcblxuICAgIHN0YXRlRWxlbWVudC5yZXBsYWNlV2l0aCgkKCc8aW5wdXQgLz4nLCByZXBsYWNlbWVudEF0dHJpYnV0ZXMpKTtcblxuICAgIGNvbnN0ICRuZXdFbGVtZW50ID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJyk7XG5cbiAgICBpZiAoJG5ld0VsZW1lbnQubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIGluc2VydFN0YXRlSGlkZGVuRmllbGQoJG5ld0VsZW1lbnQpO1xuICAgICAgICAkbmV3RWxlbWVudC5wcmV2KCkuZmluZCgnc21hbGwnKS5oaWRlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuICRuZXdFbGVtZW50O1xufVxuXG4vKipcbiAqIEFkZHMgdGhlIGFycmF5IG9mIG9wdGlvbnMgZnJvbSB0aGUgcmVtb3RlIHJlcXVlc3QgdG8gdGhlIG5ld2x5IGNyZWF0ZWQgc2VsZWN0IGJveC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZXNBcnJheVxuICogQHBhcmFtIHtqUXVlcnl9ICRzZWxlY3RFbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICovXG5mdW5jdGlvbiBhZGRPcHRpb25zKHN0YXRlc0FycmF5LCAkc2VsZWN0RWxlbWVudCwgb3B0aW9ucykge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IFtdO1xuXG4gICAgY29udGFpbmVyLnB1c2goYDxvcHRpb24gdmFsdWU9XCJcIj4ke3N0YXRlc0FycmF5LnByZWZpeH08L29wdGlvbj5gKTtcblxuICAgIGlmICghXy5pc0VtcHR5KCRzZWxlY3RFbGVtZW50KSkge1xuICAgICAgICBzdGF0ZXNBcnJheS5zdGF0ZXMuZm9yRWFjaCgoc3RhdGVPYmopID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnVzZUlkRm9yU3RhdGVzKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnB1c2goYDxvcHRpb24gdmFsdWU9XCIke3N0YXRlT2JqLmlkfVwiPiR7c3RhdGVPYmoubmFtZX08L29wdGlvbj5gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnB1c2goYDxvcHRpb24gdmFsdWU9XCIke3N0YXRlT2JqLm5hbWV9XCI+JHtzdGF0ZU9iai5sYWJlbCA/IHN0YXRlT2JqLmxhYmVsIDogc3RhdGVPYmoubmFtZX08L29wdGlvbj5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNlbGVjdEVsZW1lbnQuaHRtbChjb250YWluZXIuam9pbignICcpKTtcbiAgICB9XG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7alF1ZXJ5fSBzdGF0ZUVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlRWxlbWVudCwgY29udGV4dCA9IHt9LCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIC8qKlxuICAgICAqIEJhY2t3YXJkcyBjb21wYXRpYmxlIGZvciB0aHJlZSBwYXJhbWV0ZXJzIGluc3RlYWQgb2YgZm91clxuICAgICAqXG4gICAgICogQXZhaWxhYmxlIG9wdGlvbnM6XG4gICAgICpcbiAgICAgKiB1c2VJZEZvclN0YXRlcyB7Qm9vbH0gLSBHZW5lcmF0ZXMgc3RhdGVzIGRyb3Bkb3duIHVzaW5nIGlkIGZvciB2YWx1ZXMgaW5zdGVhZCBvZiBzdHJpbmdzXG4gICAgICovXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gICAgICAgIGNhbGxiYWNrID0gb3B0aW9ucztcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gICAgfVxuXG4gICAgJCgnc2VsZWN0W2RhdGEtZmllbGQtdHlwZT1cIkNvdW50cnlcIl0nKS5vbignY2hhbmdlJywgZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCBjb3VudHJ5TmFtZSA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkudmFsKCk7XG5cbiAgICAgICAgaWYgKGNvdW50cnlOYW1lID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdXRpbHMuYXBpLmNvdW50cnkuZ2V0QnlOYW1lKGNvdW50cnlOYW1lLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKGNvbnRleHQuc3RhdGVfZXJyb3IpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCAkY3VycmVudElucHV0ID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJyk7XG5cbiAgICAgICAgICAgIGlmICghXy5pc0VtcHR5KHJlc3BvbnNlLmRhdGEuc3RhdGVzKSkge1xuICAgICAgICAgICAgICAgIC8vIFRoZSBlbGVtZW50IG1heSBoYXZlIGJlZW4gcmVwbGFjZWQgd2l0aCBhIHNlbGVjdCwgcmVzZWxlY3QgaXRcbiAgICAgICAgICAgICAgICBjb25zdCAkc2VsZWN0RWxlbWVudCA9IG1ha2VTdGF0ZVJlcXVpcmVkKCRjdXJyZW50SW5wdXQsIGNvbnRleHQpO1xuXG4gICAgICAgICAgICAgICAgYWRkT3B0aW9ucyhyZXNwb25zZS5kYXRhLCAkc2VsZWN0RWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgJHNlbGVjdEVsZW1lbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdFbGVtZW50ID0gbWFrZVN0YXRlT3B0aW9uYWwoJGN1cnJlbnRJbnB1dCwgY29udGV4dCk7XG5cbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCBuZXdFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4iLCJjb25zdCBUUkFOU0xBVElPTlMgPSAndHJhbnNsYXRpb25zJztcbmNvbnN0IGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkgPSAoZGljdGlvbmFyeSkgPT4gISFPYmplY3Qua2V5cyhkaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLmxlbmd0aDtcbmNvbnN0IGNob29zZUFjdGl2ZURpY3Rpb25hcnkgPSAoLi4uZGljdGlvbmFyeUpzb25MaXN0KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWN0aW9uYXJ5SnNvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeSA9IEpTT04ucGFyc2UoZGljdGlvbmFyeUpzb25MaXN0W2ldKTtcbiAgICAgICAgaWYgKGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkoZGljdGlvbmFyeSkpIHtcbiAgICAgICAgICAgIHJldHVybiBkaWN0aW9uYXJ5O1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBkZWZpbmVzIFRyYW5zbGF0aW9uIERpY3Rpb25hcnkgdG8gdXNlXG4gKiBAcGFyYW0gY29udGV4dCBwcm92aWRlcyBhY2Nlc3MgdG8gMyB2YWxpZGF0aW9uIEpTT05zIGZyb20gZW4uanNvbjpcbiAqIHZhbGlkYXRpb25fbWVzc2FnZXMsIHZhbGlkYXRpb25fZmFsbGJhY2tfbWVzc2FnZXMgYW5kIGRlZmF1bHRfbWVzc2FnZXNcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgPSAoY29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHsgdmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiB9ID0gY29udGV4dDtcbiAgICBjb25zdCBhY3RpdmVEaWN0aW9uYXJ5ID0gY2hvb3NlQWN0aXZlRGljdGlvbmFyeSh2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OKTtcbiAgICBjb25zdCBsb2NhbGl6YXRpb25zID0gT2JqZWN0LnZhbHVlcyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubWFwKGtleSA9PiBrZXkuc3BsaXQoJy4nKS5wb3AoKSk7XG5cbiAgICByZXR1cm4gdHJhbnNsYXRpb25LZXlzLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcbiAgICAgICAgYWNjW2tleV0gPSBsb2NhbGl6YXRpb25zW2ldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbn07XG4iXSwibmFtZXMiOlsiUGFnZU1hbmFnZXIiLCJjaGVja0lzR2lmdENlcnRWYWxpZCIsImNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSIsInV0aWxzIiwiU2hpcHBpbmdFc3RpbWF0b3IiLCJkZWZhdWx0TW9kYWwiLCJzaG93QWxlcnRNb2RhbCIsIk1vZGFsRXZlbnRzIiwiQ2FydEl0ZW1EZXRhaWxzIiwiQ2FydCIsIl9QYWdlTWFuYWdlciIsImFwcGx5IiwiYXJndW1lbnRzIiwiX2luaGVyaXRzTG9vc2UiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJvblJlYWR5IiwiJG1vZGFsIiwiJGNhcnRQYWdlQ29udGVudCIsIiQiLCIkY2FydENvbnRlbnQiLCIkY2FydE1lc3NhZ2VzIiwiJGNhcnRUb3RhbHMiLCIkY2FydEFkZGl0aW9uYWxDaGVja291dEJ0bnMiLCIkb3ZlcmxheSIsImhpZGUiLCIkYWN0aXZlQ2FydEl0ZW1JZCIsIiRhY3RpdmVDYXJ0SXRlbUJ0bkFjdGlvbiIsInNldEFwcGxlUGF5U3VwcG9ydCIsImJpbmRFdmVudHMiLCJ3aW5kb3ciLCJBcHBsZVBheVNlc3Npb24iLCJhZGRDbGFzcyIsImNhcnRVcGRhdGUiLCIkdGFyZ2V0IiwiX3RoaXMiLCJpdGVtSWQiLCJkYXRhIiwiJGVsIiwib2xkUXR5IiwicGFyc2VJbnQiLCJ2YWwiLCJtYXhRdHkiLCJtaW5RdHkiLCJtaW5FcnJvciIsIm1heEVycm9yIiwibmV3UXR5Iiwic2hvdyIsImFwaSIsImNhcnQiLCJpdGVtVXBkYXRlIiwiZXJyIiwicmVzcG9uc2UiLCJzdGF0dXMiLCJyZW1vdmUiLCJyZWZyZXNoQ29udGVudCIsImVycm9ycyIsImpvaW4iLCJjYXJ0VXBkYXRlUXR5VGV4dENoYW5nZSIsInByZVZhbCIsIl90aGlzMiIsIk51bWJlciIsImludmFsaWRFbnRyeSIsImlzSW50ZWdlciIsImNvbnRleHQiLCJpbnZhbGlkRW50cnlNZXNzYWdlIiwicmVwbGFjZSIsImNhcnRSZW1vdmVJdGVtIiwiX3RoaXMzIiwiaXRlbVJlbW92ZSIsImNhcnRFZGl0T3B0aW9ucyIsInByb2R1Y3RJZCIsIl90aGlzNCIsIk9iamVjdCIsImFzc2lnbiIsInByb2R1Y3RGb3JDaGFuZ2VJZCIsIm1vZGFsIiwib3B0aW9ucyIsInRlbXBsYXRlIiwib3BlbiIsImZpbmQiLCJwcm9kdWN0QXR0cmlidXRlcyIsImNvbmZpZ3VyZUluQ2FydCIsInVwZGF0ZUNvbnRlbnQiLCJjb250ZW50Iiwib3B0aW9uQ2hhbmdlSGFuZGxlciIsIiRwcm9kdWN0T3B0aW9uc0NvbnRhaW5lciIsIm1vZGFsQm9keVJlc2VydmVkSGVpZ2h0Iiwib3V0ZXJIZWlnaHQiLCJsZW5ndGgiLCJjc3MiLCJoYXNDbGFzcyIsIm9uZSIsIm9wZW5lZCIsInByb2R1Y3REZXRhaWxzIiwiYmluZEdpZnRXcmFwcGluZ0Zvcm0iLCJob29rcyIsIm9uIiwiZXZlbnQiLCJjdXJyZW50VGFyZ2V0IiwiJGZvcm0iLCIkc3VibWl0IiwiJG1lc3NhZ2VCb3giLCJvcHRpb25DaGFuZ2UiLCJzZXJpYWxpemUiLCJyZXN1bHQiLCJwdXJjaGFzaW5nX21lc3NhZ2UiLCJ0ZXh0IiwicHJvcCIsInB1cmNoYXNhYmxlIiwiaW5zdG9jayIsIl90aGlzNSIsIiRjYXJ0SXRlbXNSb3dzIiwiJGNhcnRQYWdlVGl0bGUiLCJ0b3RhbHMiLCJwYWdlVGl0bGUiLCJzdGF0dXNNZXNzYWdlcyIsImFkZGl0aW9uYWxDaGVja291dEJ1dHRvbnMiLCJsb2NhdGlvbiIsInJlbG9hZCIsImdldENvbnRlbnQiLCJodG1sIiwicmVwbGFjZVdpdGgiLCJxdWFudGl0eSIsInRyaWdnZXIiLCJmaWx0ZXIiLCJiaW5kQ2FydEV2ZW50cyIsIl90aGlzNiIsImRlYm91bmNlVGltZW91dCIsIl9iaW5kIiwiX2RlYm91bmNlIiwicHJldmVudERlZmF1bHQiLCJmb2N1cyIsIm9uUXR5Rm9jdXMiLCJ2YWx1ZSIsImNoYW5nZSIsInN0cmluZyIsImljb24iLCJzaG93Q2FuY2VsQnV0dG9uIiwib25Db25maXJtIiwiYmluZFByb21vQ29kZUV2ZW50cyIsIl90aGlzNyIsIiRjb3Vwb25Db250YWluZXIiLCIkY291cG9uRm9ybSIsIiRjb2RlSW5wdXQiLCJhdHRyIiwiY29kZSIsImFwcGx5Q29kZSIsImJpbmRHaWZ0Q2VydGlmaWNhdGVFdmVudHMiLCJfdGhpczgiLCIkY2VydENvbnRhaW5lciIsIiRjZXJ0Rm9ybSIsIiRjZXJ0SW5wdXQiLCJ0b2dnbGUiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeSIsImludmFsaWRfZ2lmdF9jZXJ0aWZpY2F0ZSIsImFwcGx5R2lmdENlcnRpZmljYXRlIiwicmVzcCIsImJpbmRHaWZ0V3JhcHBpbmdFdmVudHMiLCJfdGhpczkiLCJnZXRJdGVtR2lmdFdyYXBwaW5nT3B0aW9ucyIsIiRzZWxlY3QiLCJpZCIsImluZGV4IiwiYWxsb3dNZXNzYWdlIiwidG9nZ2xlVmlld3MiLCIkc2luZ2xlRm9ybSIsIiRtdWx0aUZvcm0iLCJzaGlwcGluZ0Vycm9yTWVzc2FnZXMiLCJjb3VudHJ5Iiwic2hpcHBpbmdDb3VudHJ5RXJyb3JNZXNzYWdlIiwicHJvdmluY2UiLCJzaGlwcGluZ1Byb3ZpbmNlRXJyb3JNZXNzYWdlIiwic2hpcHBpbmdFc3RpbWF0b3IiLCJkZWZhdWx0Iiwic3RhdGVDb3VudHJ5Iiwibm9kIiwiVmFsaWRhdG9ycyIsImFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UiLCJjb2xsYXBzaWJsZUZhY3RvcnkiLCIkZWxlbWVudCIsIiRzdGF0ZSIsImlzRXN0aW1hdG9yRm9ybU9wZW5lZCIsImluaXRGb3JtVmFsaWRhdGlvbiIsImJpbmRTdGF0ZUNvdW50cnlDaGFuZ2UiLCJiaW5kRXN0aW1hdG9yRXZlbnRzIiwic2hpcHBpbmdFc3RpbWF0b3JBbGVydCIsInNoaXBwaW5nVmFsaWRhdG9yIiwic3VibWl0IiwidGFwIiwicmVtb3ZlQXR0ciIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsImJpbmRWYWxpZGF0aW9uIiwiYmluZFN0YXRlVmFsaWRhdGlvbiIsImJpbmRVUFNSYXRlcyIsImFkZCIsInNlbGVjdG9yIiwidmFsaWRhdGUiLCJjYiIsImNvdW50cnlJZCIsImlzTmFOIiwiZXJyb3JNZXNzYWdlIiwiJGVsZSIsImVsZVZhbCIsIlVQU1JhdGVUb2dnbGUiLCIkZXN0aW1hdG9yRm9ybVVwcyIsIiRlc3RpbWF0b3JGb3JtRGVmYXVsdCIsInRvZ2dsZUNsYXNzIiwiJGxhc3QiLCJ1c2VJZEZvclN0YXRlcyIsImZpZWxkIiwiRXJyb3IiLCIkZmllbGQiLCJnZXRTdGF0dXMiLCJpcyIsImNsZWFuVXBTdGF0ZVZhbGlkYXRpb24iLCJyZW1vdmVDbGFzcyIsInRvZ2dsZUVzdGltYXRvckZvcm1TdGF0ZSIsInRvZ2dsZUJ1dHRvbiIsImJ1dHRvblNlbGVjdG9yIiwiJHRvZ2dsZUNvbnRhaW5lciIsImNoYW5nZUF0dHJpYnV0ZXNPblRvZ2dsZSIsInNlbGVjdG9yVG9BY3RpdmF0ZSIsIiRlc3RpbWF0b3JDb250YWluZXIiLCIkZXN0aW1hdG9yRm9ybSIsInBhcmFtcyIsImNvdW50cnlfaWQiLCJzdGF0ZV9pZCIsImNpdHkiLCJ6aXBfY29kZSIsImdldFNoaXBwaW5nUXVvdGVzIiwiY2xpY2tFdmVudCIsInF1b3RlSWQiLCJzdWJtaXRTaGlwcGluZ1F1b3RlIiwiUHJvZHVjdERldGFpbHNCYXNlIiwib3B0aW9uQ2hhbmdlRGVjb3JhdG9yIiwiaXNCcm93c2VySUUiLCJjb252ZXJ0SW50b0FycmF5IiwiX1Byb2R1Y3REZXRhaWxzQmFzZSIsIiRzY29wZSIsInByb2R1Y3RBdHRyaWJ1dGVzRGF0YSIsImNhbGwiLCIkcHJvZHVjdE9wdGlvbnNFbGVtZW50IiwiaGFzT3B0aW9ucyIsInRyaW0iLCJoYXNEZWZhdWx0T3B0aW9ucyIsInNldFByb2R1Y3RWYXJpYW50Iiwib3B0aW9uQ2hhbmdlQ2FsbGJhY2siLCJfaXNFbXB0eSIsInVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzIiwidW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcyIsImVhY2giLCJvcHRpb25MYWJlbCIsImNoaWxkcmVuIiwiaW5uZXJUZXh0Iiwib3B0aW9uVGl0bGUiLCJzcGxpdCIsInJlcXVpcmVkIiwidG9Mb3dlckNhc2UiLCJpbmNsdWRlcyIsInR5cGUiLCJnZXRBdHRyaWJ1dGUiLCJxdWVyeVNlbGVjdG9yIiwicHVzaCIsImlzU2F0aXNmaWVkIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsImV2ZXJ5Iiwic2VsZWN0Iiwic2VsZWN0ZWRJbmRleCIsImRhdGVTdHJpbmciLCJtYXAiLCJ4IiwiY2hlY2tlZCIsImdldFNlbGVjdGVkT3B0aW9uTGFiZWwiLCJwcm9kdWN0VmFyaWFudHNsaXN0IiwibWF0Y2hMYWJlbEZvckNoZWNrZWRJbnB1dCIsImlucHQiLCJkYXRhc2V0IiwicHJvZHVjdEF0dHJpYnV0ZVZhbHVlIiwibGFiZWwiLCJsYWJlbHMiLCJ0aXRsZSIsInByb2R1Y3RWYXJpYW50Iiwic29ydCIsInZpZXciLCJwcm9kdWN0TmFtZSIsIm1hdGNoIiwiY2FyZCIsImNlcnQiLCJpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkIiwibWFrZVN0YXRlUmVxdWlyZWQiLCJzdGF0ZUVsZW1lbnQiLCJhdHRycyIsIl90cmFuc2Zvcm0iLCJpdGVtIiwicmV0IiwibmFtZSIsInJlcGxhY2VtZW50QXR0cmlidXRlcyIsIiRuZXdFbGVtZW50IiwiJGhpZGRlbklucHV0IiwicHJldiIsImFwcGVuZCIsIm1ha2VTdGF0ZU9wdGlvbmFsIiwiYWRkT3B0aW9ucyIsInN0YXRlc0FycmF5IiwiJHNlbGVjdEVsZW1lbnQiLCJjb250YWluZXIiLCJwcmVmaXgiLCJzdGF0ZXMiLCJmb3JFYWNoIiwic3RhdGVPYmoiLCJjYWxsYmFjayIsImNvdW50cnlOYW1lIiwiZ2V0QnlOYW1lIiwic3RhdGVfZXJyb3IiLCIkY3VycmVudElucHV0IiwibmV3RWxlbWVudCIsIlRSQU5TTEFUSU9OUyIsImlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkiLCJkaWN0aW9uYXJ5Iiwia2V5cyIsImNob29zZUFjdGl2ZURpY3Rpb25hcnkiLCJpIiwiSlNPTiIsInBhcnNlIiwidW5kZWZpbmVkIiwidmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIiwiYWN0aXZlRGljdGlvbmFyeSIsImxvY2FsaXphdGlvbnMiLCJ2YWx1ZXMiLCJ0cmFuc2xhdGlvbktleXMiLCJrZXkiLCJwb3AiLCJyZWR1Y2UiLCJhY2MiXSwic291cmNlUm9vdCI6IiJ9