(self["webpackChunkbigcommerce_cornerstone"] = self["webpackChunkbigcommerce_cornerstone"] || []).push([["assets_js_theme_catalog_js-assets_js_theme_common_faceted-search_js-assets_js_theme_global_co-3f5afe"],{

/***/ "./assets/js/theme/catalog.js":
/*!************************************!*\
  !*** ./assets/js/theme/catalog.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CatalogPage)
/* harmony export */ });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }



var CatalogPage = /*#__PURE__*/function (_PageManager) {
  function CatalogPage(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    window.addEventListener('beforeunload', function () {
      if (document.activeElement.id === 'sort') {
        window.localStorage.setItem('sortByStatus', 'selected');
      }
    });
    return _this;
  }
  _inheritsLoose(CatalogPage, _PageManager);
  var _proto = CatalogPage.prototype;
  _proto.arrangeFocusOnSortBy = function arrangeFocusOnSortBy() {
    var $sortBySelector = $('[data-sort-by="product"] #sort');
    if (window.localStorage.getItem('sortByStatus')) {
      $sortBySelector.trigger('focus');
      window.localStorage.removeItem('sortByStatus');
    }
  };
  _proto.onSortBySubmit = function onSortBySubmit(event, currentTarget) {
    var url = url__WEBPACK_IMPORTED_MODULE_2__.parse(window.location.href, true);
    var queryParams = $(currentTarget).serialize().split('=');
    url.query[queryParams[0]] = queryParams[1];
    delete url.query.page;
    event.preventDefault();
    window.location = url__WEBPACK_IMPORTED_MODULE_2__.format({
      pathname: url.pathname,
      search: _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__["default"].buildQueryString(url.query)
    });
  };
  return CatalogPage;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./assets/js/theme/common/faceted-search.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/common/faceted-search.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash_union__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/union */ "./node_modules/lodash/union.js");
/* harmony import */ var lodash_union__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_union__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_without__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/without */ "./node_modules/lodash/without.js");
/* harmony import */ var lodash_without__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_without__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/extend */ "./node_modules/lodash/extend.js");
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_extend__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _collapsible__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _utils_form_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _nod__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./nod */ "./assets/js/theme/common/nod.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");










var defaultOptions = {
  accordionToggleSelector: '#facetedSearch .accordion-navigation, #facetedSearch .facetedSearch-toggle',
  blockerSelector: '#facetedSearch .blocker',
  clearFacetSelector: '#facetedSearch .facetedSearch-clearLink',
  componentSelector: '#facetedSearch-navList',
  facetNavListSelector: '#facetedSearch .navList',
  priceRangeErrorSelector: '#facet-range-form .form-inlineMessage',
  priceRangeFieldsetSelector: '#facet-range-form .form-fieldset',
  priceRangeFormSelector: '#facet-range-form',
  priceRangeMaxPriceSelector: $('#facetedSearch').length ? '#facet-range-form [name=max_price]' : '#facet-range-form [name=price_max]',
  priceRangeMinPriceSelector: $('#facetedSearch').length ? '#facet-range-form [name=min_price]' : '#facet-range-form [name=price_min]',
  showMoreToggleSelector: '#facetedSearch .accordion-content .toggleLink',
  facetedSearchFilterItems: '#facetedSearch-filterItems .form-input',
  modal: (0,_global_modal__WEBPACK_IMPORTED_MODULE_6__["default"])('#modal')[0],
  modalOpen: false
};

/**
 * Faceted search view component
 */
var FacetedSearch = /*#__PURE__*/function () {
  /**
   * @param {object} requestOptions - Object with options for the ajax requests
   * @param {function} callback - Function to execute after fetching templates
   * @param {object} options - Configurable options
   * @example
   *
   * let requestOptions = {
   *      templates: {
   *          productListing: 'category/product-listing',
   *          sidebar: 'category/sidebar'
   *     }
   * };
   *
   * let templatesDidLoad = function(content) {
   *     $productListingContainer.html(content.productListing);
   *     $facetedSearchContainer.html(content.sidebar);
   * };
   *
   * let facetedSearch = new FacetedSearch(requestOptions, templatesDidLoad);
   */
  function FacetedSearch(requestOptions, callback, options) {
    var _this = this;
    // Private properties
    this.requestOptions = requestOptions;
    this.callback = callback;
    this.options = lodash_extend__WEBPACK_IMPORTED_MODULE_2___default()({}, defaultOptions, options);
    this.collapsedFacets = [];
    this.collapsedFacetItems = [];

    // Init collapsibles
    (0,_collapsible__WEBPACK_IMPORTED_MODULE_7__["default"])();

    // Init price validator
    this.initPriceValidator();

    // Show limited items by default
    $(this.options.facetNavListSelector).each(function (index, navList) {
      _this.collapseFacetItems($(navList));
    });

    // Mark initially collapsed accordions
    $(this.options.accordionToggleSelector).each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      var collapsible = $accordionToggle.data('collapsibleInstance');
      if (collapsible.isCollapsed) {
        _this.collapsedFacets.push(collapsible.targetId);
      }
    });

    // Collapse all facets if initially hidden
    // NOTE: Need to execute after Collapsible gets bootstrapped
    setTimeout(function () {
      if ($(_this.options.componentSelector).is(':hidden')) {
        _this.collapseAllFacets();
      }
    });

    // Observe user events
    this.onStateChange = this.onStateChange.bind(this);
    this.onToggleClick = this.onToggleClick.bind(this);
    this.onAccordionToggle = this.onAccordionToggle.bind(this);
    this.onClearFacet = this.onClearFacet.bind(this);
    this.onFacetClick = this.onFacetClick.bind(this);
    this.onRangeSubmit = this.onRangeSubmit.bind(this);
    this.onSortBySubmit = this.onSortBySubmit.bind(this);
    this.filterFacetItems = this.filterFacetItems.bind(this);
    this.bindEvents();
  }

  // Public methods
  var _proto = FacetedSearch.prototype;
  _proto.refreshView = function refreshView(content) {
    if (content) {
      this.callback(content);
    }

    // Init collapsibles
    (0,_collapsible__WEBPACK_IMPORTED_MODULE_7__["default"])();

    // Init price validator
    this.initPriceValidator();

    // Restore view state
    this.restoreCollapsedFacets();
    this.restoreCollapsedFacetItems();

    // Bind events
    this.bindEvents();
  };
  _proto.updateView = function updateView() {
    var _this2 = this;
    $(this.options.blockerSelector).show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__.api.getPage(_utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].getUrl(), this.requestOptions, function (err, content) {
      $(_this2.options.blockerSelector).hide();
      if (err) {
        throw new Error(err);
      }

      // Refresh view with new content
      _this2.refreshView(content);

      // Refresh range view when shop-by-price enabled
      var urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('search_query')) {
        $('.reset-filters').show();
      }
      $('input[name="price_min"]').attr('value', urlParams.get('price_min'));
      $('input[name="price_max"]').attr('value', urlParams.get('price_max'));
    });
  };
  _proto.expandFacetItems = function expandFacetItems($navList) {
    var id = $navList.attr('id');

    // Remove
    this.collapsedFacetItems = lodash_without__WEBPACK_IMPORTED_MODULE_1___default()(this.collapsedFacetItems, id);
  };
  _proto.collapseFacetItems = function collapseFacetItems($navList) {
    var id = $navList.attr('id');
    var hasMoreResults = $navList.data('hasMoreResults');
    if (hasMoreResults) {
      this.collapsedFacetItems = lodash_union__WEBPACK_IMPORTED_MODULE_0___default()(this.collapsedFacetItems, [id]);
    } else {
      this.collapsedFacetItems = lodash_without__WEBPACK_IMPORTED_MODULE_1___default()(this.collapsedFacetItems, id);
    }
  };
  _proto.toggleFacetItems = function toggleFacetItems($navList) {
    var id = $navList.attr('id');

    // Toggle depending on `collapsed` flag
    if (this.collapsedFacetItems.includes(id)) {
      this.getMoreFacetResults($navList);
      return true;
    }
    this.collapseFacetItems($navList);
    return false;
  };
  _proto.getMoreFacetResults = function getMoreFacetResults($navList) {
    var _this3 = this;
    var facet = $navList.data('facet');
    var facetUrl = _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].getUrl();
    if (this.requestOptions.showMore) {
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__.api.getPage(facetUrl, {
        template: this.requestOptions.showMore,
        params: {
          list_all: facet
        }
      }, function (err, response) {
        if (err) {
          throw new Error(err);
        }
        _this3.options.modal.open();
        _this3.options.modalOpen = true;
        _this3.options.modal.updateContent(response);
      });
    }
    this.collapseFacetItems($navList);
    return false;
  };
  _proto.filterFacetItems = function filterFacetItems(event) {
    var $items = $('.navList-item');
    var query = $(event.currentTarget).val().toLowerCase();
    $items.each(function (index, element) {
      var text = $(element).text().toLowerCase();
      if (text.indexOf(query) !== -1) {
        $(element).show();
      } else {
        $(element).hide();
      }
    });
  };
  _proto.expandFacet = function expandFacet($accordionToggle) {
    var collapsible = $accordionToggle.data('collapsibleInstance');
    collapsible.open();
  };
  _proto.collapseFacet = function collapseFacet($accordionToggle) {
    var collapsible = $accordionToggle.data('collapsibleInstance');
    collapsible.close();
  };
  _proto.collapseAllFacets = function collapseAllFacets() {
    var _this4 = this;
    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      _this4.collapseFacet($accordionToggle);
    });
  };
  _proto.expandAllFacets = function expandAllFacets() {
    var _this5 = this;
    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      _this5.expandFacet($accordionToggle);
    });
  }

  // Private methods
  ;
  _proto.initPriceValidator = function initPriceValidator() {
    if ($(this.options.priceRangeFormSelector).length === 0) {
      return;
    }
    var validator = (0,_nod__WEBPACK_IMPORTED_MODULE_9__["default"])();
    var selectors = {
      errorSelector: this.options.priceRangeErrorSelector,
      fieldsetSelector: this.options.priceRangeFieldsetSelector,
      formSelector: this.options.priceRangeFormSelector,
      maxPriceSelector: this.options.priceRangeMaxPriceSelector,
      minPriceSelector: this.options.priceRangeMinPriceSelector
    };
    _utils_form_utils__WEBPACK_IMPORTED_MODULE_8__.Validators.setMinMaxPriceValidation(validator, selectors, this.options.validationErrorMessages);
    this.priceRangeValidator = validator;
  };
  _proto.restoreCollapsedFacetItems = function restoreCollapsedFacetItems() {
    var _this6 = this;
    var $navLists = $(this.options.facetNavListSelector);

    // Restore collapsed state for each facet
    $navLists.each(function (index, navList) {
      var $navList = $(navList);
      var id = $navList.attr('id');
      var shouldCollapse = _this6.collapsedFacetItems.includes(id);
      if (shouldCollapse) {
        _this6.collapseFacetItems($navList);
      } else {
        _this6.expandFacetItems($navList);
      }
    });
  };
  _proto.restoreCollapsedFacets = function restoreCollapsedFacets() {
    var _this7 = this;
    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      var collapsible = $accordionToggle.data('collapsibleInstance');
      var id = collapsible.targetId;
      var shouldCollapse = _this7.collapsedFacets.includes(id);
      if (shouldCollapse) {
        _this7.collapseFacet($accordionToggle);
      } else {
        _this7.expandFacet($accordionToggle);
      }
    });
  };
  _proto.bindEvents = function bindEvents() {
    // Clean-up
    this.unbindEvents();

    // DOM events
    $(window).on('statechange', this.onStateChange);
    $(window).on('popstate', this.onPopState);
    $(document).on('click', this.options.showMoreToggleSelector, this.onToggleClick);
    $(document).on('toggle.collapsible', this.options.accordionToggleSelector, this.onAccordionToggle);
    $(document).on('keyup', this.options.facetedSearchFilterItems, this.filterFacetItems);
    $(this.options.clearFacetSelector).on('click', this.onClearFacet);

    // Hooks
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__.hooks.on('facetedSearch-facet-clicked', this.onFacetClick);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__.hooks.on('facetedSearch-range-submitted', this.onRangeSubmit);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__.hooks.on('sortBy-submitted', this.onSortBySubmit);
  };
  _proto.unbindEvents = function unbindEvents() {
    // DOM events
    $(window).off('statechange', this.onStateChange);
    $(window).off('popstate', this.onPopState);
    $(document).off('click', this.options.showMoreToggleSelector, this.onToggleClick);
    $(document).off('toggle.collapsible', this.options.accordionToggleSelector, this.onAccordionToggle);
    $(document).off('keyup', this.options.facetedSearchFilterItems, this.filterFacetItems);
    $(this.options.clearFacetSelector).off('click', this.onClearFacet);

    // Hooks
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__.hooks.off('facetedSearch-facet-clicked', this.onFacetClick);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__.hooks.off('facetedSearch-range-submitted', this.onRangeSubmit);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__.hooks.off('sortBy-submitted', this.onSortBySubmit);
  };
  _proto.onClearFacet = function onClearFacet(event) {
    var $link = $(event.currentTarget);
    var url = $link.attr('href');
    event.preventDefault();
    event.stopPropagation();

    // Update URL
    _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].goToUrl(url);
  };
  _proto.onToggleClick = function onToggleClick(event) {
    var $toggle = $(event.currentTarget);
    var $navList = $($toggle.attr('href'));

    // Prevent default
    event.preventDefault();

    // Toggle visible items
    this.toggleFacetItems($navList);
  };
  _proto.onFacetClick = function onFacetClick(event, currentTarget) {
    var $link = $(currentTarget);
    var url = $link.attr('href');
    event.preventDefault();
    $link.toggleClass('is-selected');

    // Update URL
    _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].goToUrl(url);
    if (this.options.modalOpen) {
      this.options.modal.close();
    }
  };
  _proto.onSortBySubmit = function onSortBySubmit(event, currentTarget) {
    var url = url__WEBPACK_IMPORTED_MODULE_4__.parse(window.location.href, true);
    var queryParams = $(currentTarget).serialize().split('=');
    url.query[queryParams[0]] = queryParams[1];
    delete url.query.page;

    // Url object `query` is not a traditional JavaScript Object on all systems, clone it instead
    var urlQueryParams = {};
    Object.assign(urlQueryParams, url.query);
    event.preventDefault();
    _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].goToUrl(url__WEBPACK_IMPORTED_MODULE_4__.format({
      pathname: url.pathname,
      search: _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].buildQueryString(urlQueryParams)
    }));
  };
  _proto.onRangeSubmit = function onRangeSubmit(event, currentTarget) {
    event.preventDefault();
    if (!this.priceRangeValidator.areAll(_nod__WEBPACK_IMPORTED_MODULE_9__["default"].constants.VALID)) {
      return;
    }
    var url = url__WEBPACK_IMPORTED_MODULE_4__.parse(window.location.href, true);
    var queryParams = decodeURI($(currentTarget).serialize()).split('&');
    queryParams = _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].parseQueryParams(queryParams);
    for (var key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        url.query[key] = queryParams[key];
      }
    }

    // Url object `query` is not a traditional JavaScript Object on all systems, clone it instead
    var urlQueryParams = {};
    Object.assign(urlQueryParams, url.query);
    _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].goToUrl(url__WEBPACK_IMPORTED_MODULE_4__.format({
      pathname: url.pathname,
      search: _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].buildQueryString(urlQueryParams)
    }));
  };
  _proto.onStateChange = function onStateChange() {
    this.updateView();
  };
  _proto.onAccordionToggle = function onAccordionToggle(event) {
    var $accordionToggle = $(event.currentTarget);
    var collapsible = $accordionToggle.data('collapsibleInstance');
    var id = collapsible.targetId;
    if (collapsible.isCollapsed) {
      this.collapsedFacets = lodash_union__WEBPACK_IMPORTED_MODULE_0___default()(this.collapsedFacets, [id]);
    } else {
      this.collapsedFacets = lodash_without__WEBPACK_IMPORTED_MODULE_1___default()(this.collapsedFacets, id);
    }
  };
  _proto.onPopState = function onPopState() {
    if (document.location.hash !== '') return;
    $(window).trigger('statechange');
  };
  return FacetedSearch;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FacetedSearch);

/***/ }),

/***/ "./assets/js/theme/common/utils/url-utils.js":
/*!***************************************************!*\
  !*** ./assets/js/theme/common/utils/url-utils.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");

var urlUtils = {
  getUrl: function getUrl() {
    return "" + window.location.pathname + window.location.search;
  },
  goToUrl: function goToUrl(url) {
    window.history.pushState({}, document.title, url);
    $(window).trigger('statechange');
  },
  replaceParams: function replaceParams(url, params) {
    var parsed = url__WEBPACK_IMPORTED_MODULE_0__.parse(url, true);
    var param;

    // Let the formatter use the query object to build the new url
    parsed.search = null;
    for (param in params) {
      if (params.hasOwnProperty(param)) {
        parsed.query[param] = params[param];
      }
    }
    return url__WEBPACK_IMPORTED_MODULE_0__.format(parsed);
  },
  buildQueryString: function buildQueryString(queryData) {
    var out = '';
    var key;
    for (key in queryData) {
      if (queryData.hasOwnProperty(key)) {
        if (Array.isArray(queryData[key])) {
          var ndx = void 0;
          for (ndx in queryData[key]) {
            if (queryData[key].hasOwnProperty(ndx)) {
              out += "&" + key + "=" + queryData[key][ndx];
            }
          }
        } else {
          out += "&" + key + "=" + queryData[key];
        }
      }
    }
    return out.substring(1);
  },
  parseQueryParams: function parseQueryParams(queryData) {
    var params = {};
    for (var i = 0; i < queryData.length; i++) {
      var temp = queryData[i].split('=');
      if (temp[0] in params) {
        if (Array.isArray(params[temp[0]])) {
          params[temp[0]].push(temp[1]);
        } else {
          params[temp[0]] = [params[temp[0]], temp[1]];
        }
      } else {
        params[temp[0]] = temp[1];
      }
    }
    return params;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (urlUtils);

/***/ }),

/***/ "./assets/js/theme/global/compare-products.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/global/compare-products.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");

function decrementCounter(counter, item) {
  var index = counter.indexOf(item);
  if (index > -1) {
    counter.splice(index, 1);
  }
}
function incrementCounter(counter, item) {
  counter.push(item);
}
function updateCounterNav(counter, $link, urls) {
  if (counter.length !== 0) {
    if (!$link.is('visible')) {
      $link.addClass('show');
    }
    $link.attr('href', urls.compare + "/" + counter.join('/'));
    $link.find('span.countPill').html(counter.length);
  } else {
    $link.removeClass('show');
  }
}
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_ref) {
  var noCompareMessage = _ref.noCompareMessage,
    urls = _ref.urls;
  var compareCounter = [];
  var $compareLink = $('a[data-compare-nav]');
  $('body').on('compareReset', function () {
    var $checked = $('body').find('input[name="products\[\]"]:checked');
    compareCounter = $checked.length ? $checked.map(function (index, element) {
      return element.value;
    }).get() : [];
    updateCounterNav(compareCounter, $compareLink, urls);
  });
  $('body').triggerHandler('compareReset');
  $('body').on('click', '[data-compare-id]', function (event) {
    var product = event.currentTarget.value;
    var $clickedCompareLink = $('a[data-compare-nav]');
    if (event.currentTarget.checked) {
      incrementCounter(compareCounter, product);
    } else {
      decrementCounter(compareCounter, product);
    }
    updateCounterNav(compareCounter, $clickedCompareLink, urls);
  });
  $('body').on('click', 'a[data-compare-nav]', function () {
    var $clickedCheckedInput = $('body').find('input[name="products\[\]"]:checked');
    if ($clickedCheckedInput.length <= 1) {
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showAlertModal)(noCompareMessage);
      return false;
    }
  });
}

/***/ }),

/***/ "?4f7e":
/*!********************************!*\
  !*** ./util.inspect (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9jYXRhbG9nX2pzLWFzc2V0c19qc190aGVtZV9jb21tb25fZmFjZXRlZC1zZWFyY2hfanMtYXNzZXRzX2pzX3RoZW1lX2dsb2JhbF9jby0zZjVhZmUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF5QztBQUNPO0FBQzFCO0FBQUEsSUFFREcsV0FBVywwQkFBQUMsWUFBQTtFQUM1QixTQUFBRCxZQUFZRSxPQUFPLEVBQUU7SUFBQSxJQUFBQyxLQUFBO0lBQ2pCQSxLQUFBLEdBQUFGLFlBQUEsQ0FBQUcsSUFBQSxPQUFNRixPQUFPLENBQUM7SUFFZEcsTUFBTSxDQUFDQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsWUFBTTtNQUMxQyxJQUFJQyxRQUFRLENBQUNDLGFBQWEsQ0FBQ0MsRUFBRSxLQUFLLE1BQU0sRUFBRTtRQUN0Q0osTUFBTSxDQUFDSyxZQUFZLENBQUNDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDO01BQzNEO0lBQ0osQ0FBQyxDQUFDO0lBQUMsT0FBQVIsS0FBQTtFQUNQO0VBQUNTLGNBQUEsQ0FBQVosV0FBQSxFQUFBQyxZQUFBO0VBQUEsSUFBQVksTUFBQSxHQUFBYixXQUFBLENBQUFjLFNBQUE7RUFBQUQsTUFBQSxDQUVERSxvQkFBb0IsR0FBcEIsU0FBQUEsb0JBQW9CQSxDQUFBLEVBQUc7SUFDbkIsSUFBTUMsZUFBZSxHQUFHQyxDQUFDLENBQUMsZ0NBQWdDLENBQUM7SUFFM0QsSUFBSVosTUFBTSxDQUFDSyxZQUFZLENBQUNRLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRTtNQUM3Q0YsZUFBZSxDQUFDRyxPQUFPLENBQUMsT0FBTyxDQUFDO01BQ2hDZCxNQUFNLENBQUNLLFlBQVksQ0FBQ1UsVUFBVSxDQUFDLGNBQWMsQ0FBQztJQUNsRDtFQUNKLENBQUM7RUFBQVAsTUFBQSxDQUVEUSxjQUFjLEdBQWQsU0FBQUEsY0FBY0EsQ0FBQ0MsS0FBSyxFQUFF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LEdBQUdwTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUNzTCxJQUFJLENBQUMsb0NBQW9DLENBQUM7SUFFakYsSUFBSWMsb0JBQW9CLENBQUM5SixNQUFNLElBQUksQ0FBQyxFQUFFO01BQ2xDcUksc0RBQWMsQ0FBQ2UsZ0JBQWdCLENBQUM7TUFDaEMsT0FBTyxLQUFLO0lBQ2hCO0VBQ0osQ0FBQyxDQUFDO0FBQ047Ozs7Ozs7Ozs7QUM3REEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iaWdjb21tZXJjZS1jb3JuZXJzdG9uZS8uL2Fzc2V0cy9qcy90aGVtZS9jYXRhbG9nLmpzIiwid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9mYWNldGVkLXNlYXJjaC5qcyIsIndlYnBhY2s6Ly9iaWdjb21tZXJjZS1jb3JuZXJzdG9uZS8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vdXRpbHMvdXJsLXV0aWxzLmpzIiwid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2dsb2JhbC9jb21wYXJlLXByb2R1Y3RzLmpzIiwid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lL2lnbm9yZWR8L2hvbWUvZGl0LTE3L0Rlc2t0b3AvWmVlbERhYmhpL1plZWxEYWJoaS9Db3JuZXJzdG9uZS02LjE1LjAvbm9kZV9tb2R1bGVzL29iamVjdC1pbnNwZWN0fC4vdXRpbC5pbnNwZWN0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XG5pbXBvcnQgdXJsVXRpbHMgZnJvbSAnLi9jb21tb24vdXRpbHMvdXJsLXV0aWxzJztcbmltcG9ydCBVcmwgZnJvbSAndXJsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0YWxvZ1BhZ2UgZXh0ZW5kcyBQYWdlTWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICBzdXBlcihjb250ZXh0KTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuaWQgPT09ICdzb3J0Jykge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc29ydEJ5U3RhdHVzJywgJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFycmFuZ2VGb2N1c09uU29ydEJ5KCkge1xuICAgICAgICBjb25zdCAkc29ydEJ5U2VsZWN0b3IgPSAkKCdbZGF0YS1zb3J0LWJ5PVwicHJvZHVjdFwiXSAjc29ydCcpO1xuXG4gICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NvcnRCeVN0YXR1cycpKSB7XG4gICAgICAgICAgICAkc29ydEJ5U2VsZWN0b3IudHJpZ2dlcignZm9jdXMnKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc29ydEJ5U3RhdHVzJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblNvcnRCeVN1Ym1pdChldmVudCwgY3VycmVudFRhcmdldCkge1xuICAgICAgICBjb25zdCB1cmwgPSBVcmwucGFyc2Uod2luZG93LmxvY2F0aW9uLmhyZWYsIHRydWUpO1xuICAgICAgICBjb25zdCBxdWVyeVBhcmFtcyA9ICQoY3VycmVudFRhcmdldCkuc2VyaWFsaXplKCkuc3BsaXQoJz0nKTtcblxuICAgICAgICB1cmwucXVlcnlbcXVlcnlQYXJhbXNbMF1dID0gcXVlcnlQYXJhbXNbMV07XG4gICAgICAgIGRlbGV0ZSB1cmwucXVlcnkucGFnZTtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBVcmwuZm9ybWF0KHsgcGF0aG5hbWU6IHVybC5wYXRobmFtZSwgc2VhcmNoOiB1cmxVdGlscy5idWlsZFF1ZXJ5U3RyaW5nKHVybC5xdWVyeSkgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgaG9va3MsIGFwaSB9IGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgVXJsIGZyb20gJ3VybCc7XG5pbXBvcnQgdXJsVXRpbHMgZnJvbSAnLi91dGlscy91cmwtdXRpbHMnO1xuaW1wb3J0IG1vZGFsRmFjdG9yeSBmcm9tICcuLi9nbG9iYWwvbW9kYWwnO1xuaW1wb3J0IGNvbGxhcHNpYmxlRmFjdG9yeSBmcm9tICcuL2NvbGxhcHNpYmxlJztcbmltcG9ydCB7IFZhbGlkYXRvcnMgfSBmcm9tICcuL3V0aWxzL2Zvcm0tdXRpbHMnO1xuaW1wb3J0IG5vZCBmcm9tICcuL25vZCc7XG5cblxuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgYWNjb3JkaW9uVG9nZ2xlU2VsZWN0b3I6ICcjZmFjZXRlZFNlYXJjaCAuYWNjb3JkaW9uLW5hdmlnYXRpb24sICNmYWNldGVkU2VhcmNoIC5mYWNldGVkU2VhcmNoLXRvZ2dsZScsXG4gICAgYmxvY2tlclNlbGVjdG9yOiAnI2ZhY2V0ZWRTZWFyY2ggLmJsb2NrZXInLFxuICAgIGNsZWFyRmFjZXRTZWxlY3RvcjogJyNmYWNldGVkU2VhcmNoIC5mYWNldGVkU2VhcmNoLWNsZWFyTGluaycsXG4gICAgY29tcG9uZW50U2VsZWN0b3I6ICcjZmFjZXRlZFNlYXJjaC1uYXZMaXN0JyxcbiAgICBmYWNldE5hdkxpc3RTZWxlY3RvcjogJyNmYWNldGVkU2VhcmNoIC5uYXZMaXN0JyxcbiAgICBwcmljZVJhbmdlRXJyb3JTZWxlY3RvcjogJyNmYWNldC1yYW5nZS1mb3JtIC5mb3JtLWlubGluZU1lc3NhZ2UnLFxuICAgIHByaWNlUmFuZ2VGaWVsZHNldFNlbGVjdG9yOiAnI2ZhY2V0LXJhbmdlLWZvcm0gLmZvcm0tZmllbGRzZXQnLFxuICAgIHByaWNlUmFuZ2VGb3JtU2VsZWN0b3I6ICcjZmFjZXQtcmFuZ2UtZm9ybScsXG4gICAgcHJpY2VSYW5nZU1heFByaWNlU2VsZWN0b3I6ICQoJyNmYWNldGVkU2VhcmNoJykubGVuZ3RoID8gJyNmYWNldC1yYW5nZS1mb3JtIFtuYW1lPW1heF9wcmljZV0nIDogJyNmYWNldC1yYW5nZS1mb3JtIFtuYW1lPXByaWNlX21heF0nLFxuICAgIHByaWNlUmFuZ2VNaW5QcmljZVNlbGVjdG9yOiAkKCcjZmFjZXRlZFNlYXJjaCcpLmxlbmd0aCA/ICcjZmFjZXQtcmFuZ2UtZm9ybSBbbmFtZT1taW5fcHJpY2VdJyA6ICcjZmFjZXQtcmFuZ2UtZm9ybSBbbmFtZT1wcmljZV9taW5dJyxcbiAgICBzaG93TW9yZVRvZ2dsZVNlbGVjdG9yOiAnI2ZhY2V0ZWRTZWFyY2ggLmFjY29yZGlvbi1jb250ZW50IC50b2dnbGVMaW5rJyxcbiAgICBmYWNldGVkU2VhcmNoRmlsdGVySXRlbXM6ICcjZmFjZXRlZFNlYXJjaC1maWx0ZXJJdGVtcyAuZm9ybS1pbnB1dCcsXG4gICAgbW9kYWw6IG1vZGFsRmFjdG9yeSgnI21vZGFsJylbMF0sXG4gICAgbW9kYWxPcGVuOiBmYWxzZSxcbn07XG5cbi8qKlxuICogRmFjZXRlZCBzZWFyY2ggdmlldyBjb21wb25lbnRcbiAqL1xuY2xhc3MgRmFjZXRlZFNlYXJjaCB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlcXVlc3RPcHRpb25zIC0gT2JqZWN0IHdpdGggb3B0aW9ucyBmb3IgdGhlIGFqYXggcmVxdWVzdHNcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIEZ1bmN0aW9uIHRvIGV4ZWN1dGUgYWZ0ZXIgZmV0Y2hpbmcgdGVtcGxhdGVzXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBDb25maWd1cmFibGUgb3B0aW9uc1xuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiBsZXQgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICogICAgICB0ZW1wbGF0ZXM6IHtcbiAgICAgKiAgICAgICAgICBwcm9kdWN0TGlzdGluZzogJ2NhdGVnb3J5L3Byb2R1Y3QtbGlzdGluZycsXG4gICAgICogICAgICAgICAgc2lkZWJhcjogJ2NhdGVnb3J5L3NpZGViYXInXG4gICAgICogICAgIH1cbiAgICAgKiB9O1xuICAgICAqXG4gICAgICogbGV0IHRlbXBsYXRlc0RpZExvYWQgPSBmdW5jdGlvbihjb250ZW50KSB7XG4gICAgICogICAgICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5odG1sKGNvbnRlbnQucHJvZHVjdExpc3RpbmcpO1xuICAgICAqICAgICAkZmFjZXRlZFNlYXJjaENvbnRhaW5lci5odG1sKGNvbnRlbnQuc2lkZWJhcik7XG4gICAgICogfTtcbiAgICAgKlxuICAgICAqIGxldCBmYWNldGVkU2VhcmNoID0gbmV3IEZhY2V0ZWRTZWFyY2gocmVxdWVzdE9wdGlvbnMsIHRlbXBsYXRlc0RpZExvYWQpO1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlcXVlc3RPcHRpb25zLCBjYWxsYmFjaywgb3B0aW9ucykge1xuICAgICAgICAvLyBQcml2YXRlIHByb3BlcnRpZXNcbiAgICAgICAgdGhpcy5yZXF1ZXN0T3B0aW9ucyA9IHJlcXVlc3RPcHRpb25zO1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IF8uZXh0ZW5kKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRzID0gW107XG4gICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcyA9IFtdO1xuXG4gICAgICAgIC8vIEluaXQgY29sbGFwc2libGVzXG4gICAgICAgIGNvbGxhcHNpYmxlRmFjdG9yeSgpO1xuXG4gICAgICAgIC8vIEluaXQgcHJpY2UgdmFsaWRhdG9yXG4gICAgICAgIHRoaXMuaW5pdFByaWNlVmFsaWRhdG9yKCk7XG5cbiAgICAgICAgLy8gU2hvdyBsaW1pdGVkIGl0ZW1zIGJ5IGRlZmF1bHRcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMuZmFjZXROYXZMaXN0U2VsZWN0b3IpLmVhY2goKGluZGV4LCBuYXZMaXN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlRmFjZXRJdGVtcygkKG5hdkxpc3QpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gTWFyayBpbml0aWFsbHkgY29sbGFwc2VkIGFjY29yZGlvbnNcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMuYWNjb3JkaW9uVG9nZ2xlU2VsZWN0b3IpLmVhY2goKGluZGV4LCBhY2NvcmRpb25Ub2dnbGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRhY2NvcmRpb25Ub2dnbGUgPSAkKGFjY29yZGlvblRvZ2dsZSk7XG4gICAgICAgICAgICBjb25zdCBjb2xsYXBzaWJsZSA9ICRhY2NvcmRpb25Ub2dnbGUuZGF0YSgnY29sbGFwc2libGVJbnN0YW5jZScpO1xuXG4gICAgICAgICAgICBpZiAoY29sbGFwc2libGUuaXNDb2xsYXBzZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxhcHNlZEZhY2V0cy5wdXNoKGNvbGxhcHNpYmxlLnRhcmdldElkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQ29sbGFwc2UgYWxsIGZhY2V0cyBpZiBpbml0aWFsbHkgaGlkZGVuXG4gICAgICAgIC8vIE5PVEU6IE5lZWQgdG8gZXhlY3V0ZSBhZnRlciBDb2xsYXBzaWJsZSBnZXRzIGJvb3RzdHJhcHBlZFxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5jb21wb25lbnRTZWxlY3RvcikuaXMoJzpoaWRkZW4nKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sbGFwc2VBbGxGYWNldHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gT2JzZXJ2ZSB1c2VyIGV2ZW50c1xuICAgICAgICB0aGlzLm9uU3RhdGVDaGFuZ2UgPSB0aGlzLm9uU3RhdGVDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblRvZ2dsZUNsaWNrID0gdGhpcy5vblRvZ2dsZUNsaWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25BY2NvcmRpb25Ub2dnbGUgPSB0aGlzLm9uQWNjb3JkaW9uVG9nZ2xlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25DbGVhckZhY2V0ID0gdGhpcy5vbkNsZWFyRmFjZXQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbkZhY2V0Q2xpY2sgPSB0aGlzLm9uRmFjZXRDbGljay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uUmFuZ2VTdWJtaXQgPSB0aGlzLm9uUmFuZ2VTdWJtaXQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblNvcnRCeVN1Ym1pdCA9IHRoaXMub25Tb3J0QnlTdWJtaXQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5maWx0ZXJGYWNldEl0ZW1zID0gdGhpcy5maWx0ZXJGYWNldEl0ZW1zLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgLy8gUHVibGljIG1ldGhvZHNcbiAgICByZWZyZXNoVmlldyhjb250ZW50KSB7XG4gICAgICAgIGlmIChjb250ZW50KSB7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrKGNvbnRlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSW5pdCBjb2xsYXBzaWJsZXNcbiAgICAgICAgY29sbGFwc2libGVGYWN0b3J5KCk7XG5cbiAgICAgICAgLy8gSW5pdCBwcmljZSB2YWxpZGF0b3JcbiAgICAgICAgdGhpcy5pbml0UHJpY2VWYWxpZGF0b3IoKTtcblxuICAgICAgICAvLyBSZXN0b3JlIHZpZXcgc3RhdGVcbiAgICAgICAgdGhpcy5yZXN0b3JlQ29sbGFwc2VkRmFjZXRzKCk7XG4gICAgICAgIHRoaXMucmVzdG9yZUNvbGxhcHNlZEZhY2V0SXRlbXMoKTtcblxuICAgICAgICAvLyBCaW5kIGV2ZW50c1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVWaWV3KCkge1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5ibG9ja2VyU2VsZWN0b3IpLnNob3coKTtcblxuICAgICAgICBhcGkuZ2V0UGFnZSh1cmxVdGlscy5nZXRVcmwoKSwgdGhpcy5yZXF1ZXN0T3B0aW9ucywgKGVyciwgY29udGVudCkgPT4ge1xuICAgICAgICAgICAgJCh0aGlzLm9wdGlvbnMuYmxvY2tlclNlbGVjdG9yKS5oaWRlKCk7XG5cbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUmVmcmVzaCB2aWV3IHdpdGggbmV3IGNvbnRlbnRcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFZpZXcoY29udGVudCk7XG5cbiAgICAgICAgICAgIC8vIFJlZnJlc2ggcmFuZ2UgdmlldyB3aGVuIHNob3AtYnktcHJpY2UgZW5hYmxlZFxuICAgICAgICAgICAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcblxuICAgICAgICAgICAgaWYgKHVybFBhcmFtcy5oYXMoJ3NlYXJjaF9xdWVyeScpKSB7XG4gICAgICAgICAgICAgICAgJCgnLnJlc2V0LWZpbHRlcnMnKS5zaG93KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJwcmljZV9taW5cIl0nKS5hdHRyKCd2YWx1ZScsIHVybFBhcmFtcy5nZXQoJ3ByaWNlX21pbicpKTtcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJwcmljZV9tYXhcIl0nKS5hdHRyKCd2YWx1ZScsIHVybFBhcmFtcy5nZXQoJ3ByaWNlX21heCcpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZXhwYW5kRmFjZXRJdGVtcygkbmF2TGlzdCkge1xuICAgICAgICBjb25zdCBpZCA9ICRuYXZMaXN0LmF0dHIoJ2lkJyk7XG5cbiAgICAgICAgLy8gUmVtb3ZlXG4gICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcyA9IF8ud2l0aG91dCh0aGlzLmNvbGxhcHNlZEZhY2V0SXRlbXMsIGlkKTtcbiAgICB9XG5cbiAgICBjb2xsYXBzZUZhY2V0SXRlbXMoJG5hdkxpc3QpIHtcbiAgICAgICAgY29uc3QgaWQgPSAkbmF2TGlzdC5hdHRyKCdpZCcpO1xuICAgICAgICBjb25zdCBoYXNNb3JlUmVzdWx0cyA9ICRuYXZMaXN0LmRhdGEoJ2hhc01vcmVSZXN1bHRzJyk7XG5cbiAgICAgICAgaWYgKGhhc01vcmVSZXN1bHRzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlZEZhY2V0SXRlbXMgPSBfLnVuaW9uKHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcywgW2lkXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlZEZhY2V0SXRlbXMgPSBfLndpdGhvdXQodGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zLCBpZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGVGYWNldEl0ZW1zKCRuYXZMaXN0KSB7XG4gICAgICAgIGNvbnN0IGlkID0gJG5hdkxpc3QuYXR0cignaWQnKTtcblxuICAgICAgICAvLyBUb2dnbGUgZGVwZW5kaW5nIG9uIGBjb2xsYXBzZWRgIGZsYWdcbiAgICAgICAgaWYgKHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcy5pbmNsdWRlcyhpZCkpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0TW9yZUZhY2V0UmVzdWx0cygkbmF2TGlzdCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb2xsYXBzZUZhY2V0SXRlbXMoJG5hdkxpc3QpO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXRNb3JlRmFjZXRSZXN1bHRzKCRuYXZMaXN0KSB7XG4gICAgICAgIGNvbnN0IGZhY2V0ID0gJG5hdkxpc3QuZGF0YSgnZmFjZXQnKTtcbiAgICAgICAgY29uc3QgZmFjZXRVcmwgPSB1cmxVdGlscy5nZXRVcmwoKTtcblxuICAgICAgICBpZiAodGhpcy5yZXF1ZXN0T3B0aW9ucy5zaG93TW9yZSkge1xuICAgICAgICAgICAgYXBpLmdldFBhZ2UoZmFjZXRVcmwsIHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogdGhpcy5yZXF1ZXN0T3B0aW9ucy5zaG93TW9yZSxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdF9hbGw6IGZhY2V0LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLm1vZGFsLm9wZW4oKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMubW9kYWxPcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMubW9kYWwudXBkYXRlQ29udGVudChyZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29sbGFwc2VGYWNldEl0ZW1zKCRuYXZMaXN0KTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZmlsdGVyRmFjZXRJdGVtcyhldmVudCkge1xuICAgICAgICBjb25zdCAkaXRlbXMgPSAkKCcubmF2TGlzdC1pdGVtJyk7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICRpdGVtcy5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGV4dCA9ICQoZWxlbWVudCkudGV4dCgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAodGV4dC5pbmRleE9mKHF1ZXJ5KSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGV4cGFuZEZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpIHtcbiAgICAgICAgY29uc3QgY29sbGFwc2libGUgPSAkYWNjb3JkaW9uVG9nZ2xlLmRhdGEoJ2NvbGxhcHNpYmxlSW5zdGFuY2UnKTtcblxuICAgICAgICBjb2xsYXBzaWJsZS5vcGVuKCk7XG4gICAgfVxuXG4gICAgY29sbGFwc2VGYWNldCgkYWNjb3JkaW9uVG9nZ2xlKSB7XG4gICAgICAgIGNvbnN0IGNvbGxhcHNpYmxlID0gJGFjY29yZGlvblRvZ2dsZS5kYXRhKCdjb2xsYXBzaWJsZUluc3RhbmNlJyk7XG5cbiAgICAgICAgY29sbGFwc2libGUuY2xvc2UoKTtcbiAgICB9XG5cbiAgICBjb2xsYXBzZUFsbEZhY2V0cygpIHtcbiAgICAgICAgY29uc3QgJGFjY29yZGlvblRvZ2dsZXMgPSAkKHRoaXMub3B0aW9ucy5hY2NvcmRpb25Ub2dnbGVTZWxlY3Rvcik7XG5cbiAgICAgICAgJGFjY29yZGlvblRvZ2dsZXMuZWFjaCgoaW5kZXgsIGFjY29yZGlvblRvZ2dsZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGFjY29yZGlvblRvZ2dsZSA9ICQoYWNjb3JkaW9uVG9nZ2xlKTtcblxuICAgICAgICAgICAgdGhpcy5jb2xsYXBzZUZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBleHBhbmRBbGxGYWNldHMoKSB7XG4gICAgICAgIGNvbnN0ICRhY2NvcmRpb25Ub2dnbGVzID0gJCh0aGlzLm9wdGlvbnMuYWNjb3JkaW9uVG9nZ2xlU2VsZWN0b3IpO1xuXG4gICAgICAgICRhY2NvcmRpb25Ub2dnbGVzLmVhY2goKGluZGV4LCBhY2NvcmRpb25Ub2dnbGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRhY2NvcmRpb25Ub2dnbGUgPSAkKGFjY29yZGlvblRvZ2dsZSk7XG5cbiAgICAgICAgICAgIHRoaXMuZXhwYW5kRmFjZXQoJGFjY29yZGlvblRvZ2dsZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFByaXZhdGUgbWV0aG9kc1xuICAgIGluaXRQcmljZVZhbGlkYXRvcigpIHtcbiAgICAgICAgaWYgKCQodGhpcy5vcHRpb25zLnByaWNlUmFuZ2VGb3JtU2VsZWN0b3IpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFsaWRhdG9yID0gbm9kKCk7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9ycyA9IHtcbiAgICAgICAgICAgIGVycm9yU2VsZWN0b3I6IHRoaXMub3B0aW9ucy5wcmljZVJhbmdlRXJyb3JTZWxlY3RvcixcbiAgICAgICAgICAgIGZpZWxkc2V0U2VsZWN0b3I6IHRoaXMub3B0aW9ucy5wcmljZVJhbmdlRmllbGRzZXRTZWxlY3RvcixcbiAgICAgICAgICAgIGZvcm1TZWxlY3RvcjogdGhpcy5vcHRpb25zLnByaWNlUmFuZ2VGb3JtU2VsZWN0b3IsXG4gICAgICAgICAgICBtYXhQcmljZVNlbGVjdG9yOiB0aGlzLm9wdGlvbnMucHJpY2VSYW5nZU1heFByaWNlU2VsZWN0b3IsXG4gICAgICAgICAgICBtaW5QcmljZVNlbGVjdG9yOiB0aGlzLm9wdGlvbnMucHJpY2VSYW5nZU1pblByaWNlU2VsZWN0b3IsXG4gICAgICAgIH07XG5cbiAgICAgICAgVmFsaWRhdG9ycy5zZXRNaW5NYXhQcmljZVZhbGlkYXRpb24odmFsaWRhdG9yLCBzZWxlY3RvcnMsIHRoaXMub3B0aW9ucy52YWxpZGF0aW9uRXJyb3JNZXNzYWdlcyk7XG5cbiAgICAgICAgdGhpcy5wcmljZVJhbmdlVmFsaWRhdG9yID0gdmFsaWRhdG9yO1xuICAgIH1cblxuICAgIHJlc3RvcmVDb2xsYXBzZWRGYWNldEl0ZW1zKCkge1xuICAgICAgICBjb25zdCAkbmF2TGlzdHMgPSAkKHRoaXMub3B0aW9ucy5mYWNldE5hdkxpc3RTZWxlY3Rvcik7XG5cbiAgICAgICAgLy8gUmVzdG9yZSBjb2xsYXBzZWQgc3RhdGUgZm9yIGVhY2ggZmFjZXRcbiAgICAgICAgJG5hdkxpc3RzLmVhY2goKGluZGV4LCBuYXZMaXN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkbmF2TGlzdCA9ICQobmF2TGlzdCk7XG4gICAgICAgICAgICBjb25zdCBpZCA9ICRuYXZMaXN0LmF0dHIoJ2lkJyk7XG4gICAgICAgICAgICBjb25zdCBzaG91bGRDb2xsYXBzZSA9IHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcy5pbmNsdWRlcyhpZCk7XG5cbiAgICAgICAgICAgIGlmIChzaG91bGRDb2xsYXBzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sbGFwc2VGYWNldEl0ZW1zKCRuYXZMaXN0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHBhbmRGYWNldEl0ZW1zKCRuYXZMaXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVzdG9yZUNvbGxhcHNlZEZhY2V0cygpIHtcbiAgICAgICAgY29uc3QgJGFjY29yZGlvblRvZ2dsZXMgPSAkKHRoaXMub3B0aW9ucy5hY2NvcmRpb25Ub2dnbGVTZWxlY3Rvcik7XG5cbiAgICAgICAgJGFjY29yZGlvblRvZ2dsZXMuZWFjaCgoaW5kZXgsIGFjY29yZGlvblRvZ2dsZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGFjY29yZGlvblRvZ2dsZSA9ICQoYWNjb3JkaW9uVG9nZ2xlKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbGxhcHNpYmxlID0gJGFjY29yZGlvblRvZ2dsZS5kYXRhKCdjb2xsYXBzaWJsZUluc3RhbmNlJyk7XG4gICAgICAgICAgICBjb25zdCBpZCA9IGNvbGxhcHNpYmxlLnRhcmdldElkO1xuICAgICAgICAgICAgY29uc3Qgc2hvdWxkQ29sbGFwc2UgPSB0aGlzLmNvbGxhcHNlZEZhY2V0cy5pbmNsdWRlcyhpZCk7XG5cbiAgICAgICAgICAgIGlmIChzaG91bGRDb2xsYXBzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sbGFwc2VGYWNldCgkYWNjb3JkaW9uVG9nZ2xlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHBhbmRGYWNldCgkYWNjb3JkaW9uVG9nZ2xlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgLy8gQ2xlYW4tdXBcbiAgICAgICAgdGhpcy51bmJpbmRFdmVudHMoKTtcblxuICAgICAgICAvLyBET00gZXZlbnRzXG4gICAgICAgICQod2luZG93KS5vbignc3RhdGVjaGFuZ2UnLCB0aGlzLm9uU3RhdGVDaGFuZ2UpO1xuICAgICAgICAkKHdpbmRvdykub24oJ3BvcHN0YXRlJywgdGhpcy5vblBvcFN0YXRlKTtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgdGhpcy5vcHRpb25zLnNob3dNb3JlVG9nZ2xlU2VsZWN0b3IsIHRoaXMub25Ub2dnbGVDbGljayk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCd0b2dnbGUuY29sbGFwc2libGUnLCB0aGlzLm9wdGlvbnMuYWNjb3JkaW9uVG9nZ2xlU2VsZWN0b3IsIHRoaXMub25BY2NvcmRpb25Ub2dnbGUpO1xuICAgICAgICAkKGRvY3VtZW50KS5vbigna2V5dXAnLCB0aGlzLm9wdGlvbnMuZmFjZXRlZFNlYXJjaEZpbHRlckl0ZW1zLCB0aGlzLmZpbHRlckZhY2V0SXRlbXMpO1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5jbGVhckZhY2V0U2VsZWN0b3IpLm9uKCdjbGljaycsIHRoaXMub25DbGVhckZhY2V0KTtcblxuICAgICAgICAvLyBIb29rc1xuICAgICAgICBob29rcy5vbignZmFjZXRlZFNlYXJjaC1mYWNldC1jbGlja2VkJywgdGhpcy5vbkZhY2V0Q2xpY2spO1xuICAgICAgICBob29rcy5vbignZmFjZXRlZFNlYXJjaC1yYW5nZS1zdWJtaXR0ZWQnLCB0aGlzLm9uUmFuZ2VTdWJtaXQpO1xuICAgICAgICBob29rcy5vbignc29ydEJ5LXN1Ym1pdHRlZCcsIHRoaXMub25Tb3J0QnlTdWJtaXQpO1xuICAgIH1cblxuICAgIHVuYmluZEV2ZW50cygpIHtcbiAgICAgICAgLy8gRE9NIGV2ZW50c1xuICAgICAgICAkKHdpbmRvdykub2ZmKCdzdGF0ZWNoYW5nZScsIHRoaXMub25TdGF0ZUNoYW5nZSk7XG4gICAgICAgICQod2luZG93KS5vZmYoJ3BvcHN0YXRlJywgdGhpcy5vblBvcFN0YXRlKTtcbiAgICAgICAgJChkb2N1bWVudCkub2ZmKCdjbGljaycsIHRoaXMub3B0aW9ucy5zaG93TW9yZVRvZ2dsZVNlbGVjdG9yLCB0aGlzLm9uVG9nZ2xlQ2xpY2spO1xuICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ3RvZ2dsZS5jb2xsYXBzaWJsZScsIHRoaXMub3B0aW9ucy5hY2NvcmRpb25Ub2dnbGVTZWxlY3RvciwgdGhpcy5vbkFjY29yZGlvblRvZ2dsZSk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9mZigna2V5dXAnLCB0aGlzLm9wdGlvbnMuZmFjZXRlZFNlYXJjaEZpbHRlckl0ZW1zLCB0aGlzLmZpbHRlckZhY2V0SXRlbXMpO1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5jbGVhckZhY2V0U2VsZWN0b3IpLm9mZignY2xpY2snLCB0aGlzLm9uQ2xlYXJGYWNldCk7XG5cbiAgICAgICAgLy8gSG9va3NcbiAgICAgICAgaG9va3Mub2ZmKCdmYWNldGVkU2VhcmNoLWZhY2V0LWNsaWNrZWQnLCB0aGlzLm9uRmFjZXRDbGljayk7XG4gICAgICAgIGhvb2tzLm9mZignZmFjZXRlZFNlYXJjaC1yYW5nZS1zdWJtaXR0ZWQnLCB0aGlzLm9uUmFuZ2VTdWJtaXQpO1xuICAgICAgICBob29rcy5vZmYoJ3NvcnRCeS1zdWJtaXR0ZWQnLCB0aGlzLm9uU29ydEJ5U3VibWl0KTtcbiAgICB9XG5cbiAgICBvbkNsZWFyRmFjZXQoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgJGxpbmsgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICBjb25zdCB1cmwgPSAkbGluay5hdHRyKCdocmVmJyk7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgLy8gVXBkYXRlIFVSTFxuICAgICAgICB1cmxVdGlscy5nb1RvVXJsKHVybCk7XG4gICAgfVxuXG4gICAgb25Ub2dnbGVDbGljayhldmVudCkge1xuICAgICAgICBjb25zdCAkdG9nZ2xlID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgY29uc3QgJG5hdkxpc3QgPSAkKCR0b2dnbGUuYXR0cignaHJlZicpKTtcblxuICAgICAgICAvLyBQcmV2ZW50IGRlZmF1bHRcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvLyBUb2dnbGUgdmlzaWJsZSBpdGVtc1xuICAgICAgICB0aGlzLnRvZ2dsZUZhY2V0SXRlbXMoJG5hdkxpc3QpO1xuICAgIH1cblxuICAgIG9uRmFjZXRDbGljayhldmVudCwgY3VycmVudFRhcmdldCkge1xuICAgICAgICBjb25zdCAkbGluayA9ICQoY3VycmVudFRhcmdldCk7XG4gICAgICAgIGNvbnN0IHVybCA9ICRsaW5rLmF0dHIoJ2hyZWYnKTtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICRsaW5rLnRvZ2dsZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xuXG4gICAgICAgIC8vIFVwZGF0ZSBVUkxcbiAgICAgICAgdXJsVXRpbHMuZ29Ub1VybCh1cmwpO1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMubW9kYWxPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMubW9kYWwuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU29ydEJ5U3VibWl0KGV2ZW50LCBjdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IHVybCA9IFVybC5wYXJzZSh3aW5kb3cubG9jYXRpb24uaHJlZiwgdHJ1ZSk7XG4gICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gJChjdXJyZW50VGFyZ2V0KS5zZXJpYWxpemUoKS5zcGxpdCgnPScpO1xuXG4gICAgICAgIHVybC5xdWVyeVtxdWVyeVBhcmFtc1swXV0gPSBxdWVyeVBhcmFtc1sxXTtcbiAgICAgICAgZGVsZXRlIHVybC5xdWVyeS5wYWdlO1xuXG4gICAgICAgIC8vIFVybCBvYmplY3QgYHF1ZXJ5YCBpcyBub3QgYSB0cmFkaXRpb25hbCBKYXZhU2NyaXB0IE9iamVjdCBvbiBhbGwgc3lzdGVtcywgY2xvbmUgaXQgaW5zdGVhZFxuICAgICAgICBjb25zdCB1cmxRdWVyeVBhcmFtcyA9IHt9O1xuICAgICAgICBPYmplY3QuYXNzaWduKHVybFF1ZXJ5UGFyYW1zLCB1cmwucXVlcnkpO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdXJsVXRpbHMuZ29Ub1VybChVcmwuZm9ybWF0KHsgcGF0aG5hbWU6IHVybC5wYXRobmFtZSwgc2VhcmNoOiB1cmxVdGlscy5idWlsZFF1ZXJ5U3RyaW5nKHVybFF1ZXJ5UGFyYW1zKSB9KSk7XG4gICAgfVxuXG4gICAgb25SYW5nZVN1Ym1pdChldmVudCwgY3VycmVudFRhcmdldCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmICghdGhpcy5wcmljZVJhbmdlVmFsaWRhdG9yLmFyZUFsbChub2QuY29uc3RhbnRzLlZBTElEKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdXJsID0gVXJsLnBhcnNlKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCB0cnVlKTtcbiAgICAgICAgbGV0IHF1ZXJ5UGFyYW1zID0gZGVjb2RlVVJJKCQoY3VycmVudFRhcmdldCkuc2VyaWFsaXplKCkpLnNwbGl0KCcmJyk7XG4gICAgICAgIHF1ZXJ5UGFyYW1zID0gdXJsVXRpbHMucGFyc2VRdWVyeVBhcmFtcyhxdWVyeVBhcmFtcyk7XG5cbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gcXVlcnlQYXJhbXMpIHtcbiAgICAgICAgICAgIGlmIChxdWVyeVBhcmFtcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgdXJsLnF1ZXJ5W2tleV0gPSBxdWVyeVBhcmFtc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gVXJsIG9iamVjdCBgcXVlcnlgIGlzIG5vdCBhIHRyYWRpdGlvbmFsIEphdmFTY3JpcHQgT2JqZWN0IG9uIGFsbCBzeXN0ZW1zLCBjbG9uZSBpdCBpbnN0ZWFkXG4gICAgICAgIGNvbnN0IHVybFF1ZXJ5UGFyYW1zID0ge307XG4gICAgICAgIE9iamVjdC5hc3NpZ24odXJsUXVlcnlQYXJhbXMsIHVybC5xdWVyeSk7XG5cbiAgICAgICAgdXJsVXRpbHMuZ29Ub1VybChVcmwuZm9ybWF0KHsgcGF0aG5hbWU6IHVybC5wYXRobmFtZSwgc2VhcmNoOiB1cmxVdGlscy5idWlsZFF1ZXJ5U3RyaW5nKHVybFF1ZXJ5UGFyYW1zKSB9KSk7XG4gICAgfVxuXG4gICAgb25TdGF0ZUNoYW5nZSgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XG4gICAgfVxuXG4gICAgb25BY2NvcmRpb25Ub2dnbGUoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgJGFjY29yZGlvblRvZ2dsZSA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgICAgIGNvbnN0IGNvbGxhcHNpYmxlID0gJGFjY29yZGlvblRvZ2dsZS5kYXRhKCdjb2xsYXBzaWJsZUluc3RhbmNlJyk7XG4gICAgICAgIGNvbnN0IGlkID0gY29sbGFwc2libGUudGFyZ2V0SWQ7XG5cbiAgICAgICAgaWYgKGNvbGxhcHNpYmxlLmlzQ29sbGFwc2VkKSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlZEZhY2V0cyA9IF8udW5pb24odGhpcy5jb2xsYXBzZWRGYWNldHMsIFtpZF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb2xsYXBzZWRGYWNldHMgPSBfLndpdGhvdXQodGhpcy5jb2xsYXBzZWRGYWNldHMsIGlkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUG9wU3RhdGUoKSB7XG4gICAgICAgIGlmIChkb2N1bWVudC5sb2NhdGlvbi5oYXNoICE9PSAnJykgcmV0dXJuO1xuXG4gICAgICAgICQod2luZG93KS50cmlnZ2VyKCdzdGF0ZWNoYW5nZScpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRmFjZXRlZFNlYXJjaDtcbiIsImltcG9ydCBVcmwgZnJvbSAndXJsJztcblxuY29uc3QgdXJsVXRpbHMgPSB7XG4gICAgZ2V0VXJsOiAoKSA9PiBgJHt3aW5kb3cubG9jYXRpb24ucGF0aG5hbWV9JHt3aW5kb3cubG9jYXRpb24uc2VhcmNofWAsXG5cbiAgICBnb1RvVXJsOiAodXJsKSA9PiB7XG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7fSwgZG9jdW1lbnQudGl0bGUsIHVybCk7XG4gICAgICAgICQod2luZG93KS50cmlnZ2VyKCdzdGF0ZWNoYW5nZScpO1xuICAgIH0sXG5cbiAgICByZXBsYWNlUGFyYW1zOiAodXJsLCBwYXJhbXMpID0+IHtcbiAgICAgICAgY29uc3QgcGFyc2VkID0gVXJsLnBhcnNlKHVybCwgdHJ1ZSk7XG4gICAgICAgIGxldCBwYXJhbTtcblxuICAgICAgICAvLyBMZXQgdGhlIGZvcm1hdHRlciB1c2UgdGhlIHF1ZXJ5IG9iamVjdCB0byBidWlsZCB0aGUgbmV3IHVybFxuICAgICAgICBwYXJzZWQuc2VhcmNoID0gbnVsbDtcblxuICAgICAgICBmb3IgKHBhcmFtIGluIHBhcmFtcykge1xuICAgICAgICAgICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShwYXJhbSkpIHtcbiAgICAgICAgICAgICAgICBwYXJzZWQucXVlcnlbcGFyYW1dID0gcGFyYW1zW3BhcmFtXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBVcmwuZm9ybWF0KHBhcnNlZCk7XG4gICAgfSxcblxuICAgIGJ1aWxkUXVlcnlTdHJpbmc6IChxdWVyeURhdGEpID0+IHtcbiAgICAgICAgbGV0IG91dCA9ICcnO1xuICAgICAgICBsZXQga2V5O1xuICAgICAgICBmb3IgKGtleSBpbiBxdWVyeURhdGEpIHtcbiAgICAgICAgICAgIGlmIChxdWVyeURhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHF1ZXJ5RGF0YVtrZXldKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmR4O1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAobmR4IGluIHF1ZXJ5RGF0YVtrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVlcnlEYXRhW2tleV0uaGFzT3duUHJvcGVydHkobmR4KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dCArPSBgJiR7a2V5fT0ke3F1ZXJ5RGF0YVtrZXldW25keF19YDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG91dCArPSBgJiR7a2V5fT0ke3F1ZXJ5RGF0YVtrZXldfWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG91dC5zdWJzdHJpbmcoMSk7XG4gICAgfSxcblxuICAgIHBhcnNlUXVlcnlQYXJhbXM6IChxdWVyeURhdGEpID0+IHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0ge307XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWVyeURhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHRlbXAgPSBxdWVyeURhdGFbaV0uc3BsaXQoJz0nKTtcblxuICAgICAgICAgICAgaWYgKHRlbXBbMF0gaW4gcGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGFyYW1zW3RlbXBbMF1dKSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXNbdGVtcFswXV0ucHVzaCh0ZW1wWzFdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXNbdGVtcFswXV0gPSBbcGFyYW1zW3RlbXBbMF1dLCB0ZW1wWzFdXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcmFtc1t0ZW1wWzBdXSA9IHRlbXBbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCB1cmxVdGlscztcbiIsImltcG9ydCB7IHNob3dBbGVydE1vZGFsIH0gZnJvbSAnLi9tb2RhbCc7XG5cbmZ1bmN0aW9uIGRlY3JlbWVudENvdW50ZXIoY291bnRlciwgaXRlbSkge1xuICAgIGNvbnN0IGluZGV4ID0gY291bnRlci5pbmRleE9mKGl0ZW0pO1xuXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgY291bnRlci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaW5jcmVtZW50Q291bnRlcihjb3VudGVyLCBpdGVtKSB7XG4gICAgY291bnRlci5wdXNoKGl0ZW0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVDb3VudGVyTmF2KGNvdW50ZXIsICRsaW5rLCB1cmxzKSB7XG4gICAgaWYgKGNvdW50ZXIubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIGlmICghJGxpbmsuaXMoJ3Zpc2libGUnKSkge1xuICAgICAgICAgICAgJGxpbmsuYWRkQ2xhc3MoJ3Nob3cnKTtcbiAgICAgICAgfVxuICAgICAgICAkbGluay5hdHRyKCdocmVmJywgYCR7dXJscy5jb21wYXJlfS8ke2NvdW50ZXIuam9pbignLycpfWApO1xuICAgICAgICAkbGluay5maW5kKCdzcGFuLmNvdW50UGlsbCcpLmh0bWwoY291bnRlci5sZW5ndGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRsaW5rLnJlbW92ZUNsYXNzKCdzaG93Jyk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoeyBub0NvbXBhcmVNZXNzYWdlLCB1cmxzIH0pIHtcbiAgICBsZXQgY29tcGFyZUNvdW50ZXIgPSBbXTtcblxuICAgIGNvbnN0ICRjb21wYXJlTGluayA9ICQoJ2FbZGF0YS1jb21wYXJlLW5hdl0nKTtcblxuICAgICQoJ2JvZHknKS5vbignY29tcGFyZVJlc2V0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCAkY2hlY2tlZCA9ICQoJ2JvZHknKS5maW5kKCdpbnB1dFtuYW1lPVwicHJvZHVjdHNcXFtcXF1cIl06Y2hlY2tlZCcpO1xuXG4gICAgICAgIGNvbXBhcmVDb3VudGVyID0gJGNoZWNrZWQubGVuZ3RoID8gJGNoZWNrZWQubWFwKChpbmRleCwgZWxlbWVudCkgPT4gZWxlbWVudC52YWx1ZSkuZ2V0KCkgOiBbXTtcbiAgICAgICAgdXBkYXRlQ291bnRlck5hdihjb21wYXJlQ291bnRlciwgJGNvbXBhcmVMaW5rLCB1cmxzKTtcbiAgICB9KTtcblxuICAgICQoJ2JvZHknKS50cmlnZ2VySGFuZGxlcignY29tcGFyZVJlc2V0Jyk7XG5cbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJ1tkYXRhLWNvbXBhcmUtaWRdJywgZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCBwcm9kdWN0ID0gZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZTtcbiAgICAgICAgY29uc3QgJGNsaWNrZWRDb21wYXJlTGluayA9ICQoJ2FbZGF0YS1jb21wYXJlLW5hdl0nKTtcblxuICAgICAgICBpZiAoZXZlbnQuY3VycmVudFRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgICBpbmNyZW1lbnRDb3VudGVyKGNvbXBhcmVDb3VudGVyLCBwcm9kdWN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlY3JlbWVudENvdW50ZXIoY29tcGFyZUNvdW50ZXIsIHByb2R1Y3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlQ291bnRlck5hdihjb21wYXJlQ291bnRlciwgJGNsaWNrZWRDb21wYXJlTGluaywgdXJscyk7XG4gICAgfSk7XG5cbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJ2FbZGF0YS1jb21wYXJlLW5hdl0nLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0ICRjbGlja2VkQ2hlY2tlZElucHV0ID0gJCgnYm9keScpLmZpbmQoJ2lucHV0W25hbWU9XCJwcm9kdWN0c1xcW1xcXVwiXTpjaGVja2VkJyk7XG5cbiAgICAgICAgaWYgKCRjbGlja2VkQ2hlY2tlZElucHV0Lmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICBzaG93QWxlcnRNb2RhbChub0NvbXBhcmVNZXNzYWdlKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiLyogKGlnbm9yZWQpICovIl0sIm5hbWVzIjpbIlBhZ2VNYW5hZ2VyIiwidXJsVXRpbHMiLCJVcmwiLCJDYXRhbG9nUGFnZSIsIl9QYWdlTWFuYWdlciIsImNvbnRleHQiLCJfdGhpcyIsImNhbGwiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZG9jdW1lbnQiLCJhY3RpdmVFbGVtZW50IiwiaWQiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiX2luaGVyaXRzTG9vc2UiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJhcnJhbmdlRm9jdXNPblNvcnRCeSIsIiRzb3J0QnlTZWxlY3RvciIsIiQiLCJnZXRJdGVtIiwidHJpZ2dlciIsInJlbW92ZUl0ZW0iLCJvblNvcnRCeVN1Ym1pdCIsImV2ZW50IiwiY3VycmVudFRhcmdldCIsInVybCIsInBhcnNlIiwibG9jYXRpb24iLCJocmVmIiwicXVlcnlQYXJhbXMiLCJzZXJpYWxpemUiLCJzcGxpdCIsInF1ZXJ5IiwicGFnZSIsInByZXZlbnREZWZhdWx0IiwiZm9ybWF0IiwicGF0aG5hbWUiLCJzZWFyY2giLCJidWlsZFF1ZXJ5U3RyaW5nIiwiZGVmYXVsdCIsImhvb2tzIiwiYXBpIiwibW9kYWxGYWN0b3J5IiwiY29sbGFwc2libGVGYWN0b3J5IiwiVmFsaWRhdG9ycyIsIm5vZCIsImRlZmF1bHRPcHRpb25zIiwiYWNjb3JkaW9uVG9nZ2xlU2VsZWN0b3IiLCJibG9ja2VyU2VsZWN0b3IiLCJjbGVhckZhY2V0U2VsZWN0b3IiLCJjb21wb25lbnRTZWxlY3RvciIsImZhY2V0TmF2TGlzdFNlbGVjdG9yIiwicHJpY2VSYW5nZUVycm9yU2VsZWN0b3IiLCJwcmljZVJhbmdlRmllbGRzZXRTZWxlY3RvciIsInByaWNlUmFuZ2VGb3JtU2VsZWN0b3IiLCJwcmljZVJhbmdlTWF4UHJpY2VTZWxlY3RvciIsImxlbmd0aCIsInByaWNlUmFuZ2VNaW5QcmljZVNlbGVjdG9yIiwic2hvd01vcmVUb2dnbGVTZWxlY3RvciIsImZhY2V0ZWRTZWFyY2hGaWx0ZXJJdGVtcyIsIm1vZGFsIiwibW9kYWxPcGVuIiwiRmFjZXRlZFNlYXJjaCIsInJlcXVlc3RPcHRpb25zIiwiY2FsbGJhY2siLCJvcHRpb25zIiwiX2V4dGVuZCIsImNvbGxhcHNlZEZhY2V0cyIsImNvbGxhcHNlZEZhY2V0SXRlbXMiLCJpbml0UHJpY2VWYWxpZGF0b3IiLCJlYWNoIiwiaW5kZXgiLCJuYXZMaXN0IiwiY29sbGFwc2VGYWNldEl0ZW1zIiwiYWNjb3JkaW9uVG9nZ2xlIiwiJGFjY29yZGlvblRvZ2dsZSIsImNvbGxhcHNpYmxlIiwiZGF0YSIsImlzQ29sbGFwc2VkIiwicHVzaCIsInRhcmdldElkIiwic2V0VGltZW91dCIsImlzIiwiY29sbGFwc2VBbGxGYWNldHMiLCJvblN0YXRlQ2hhbmdlIiwiYmluZCIsIm9uVG9nZ2xlQ2xpY2siLCJvbkFjY29yZGlvblRvZ2dsZSIsIm9uQ2xlYXJGYWNldCIsIm9uRmFjZXRDbGljayIsIm9uUmFuZ2VTdWJtaXQiLCJmaWx0ZXJGYWNldEl0ZW1zIiwiYmluZEV2ZW50cyIsInJlZnJlc2hWaWV3IiwiY29udGVudCIsInJlc3RvcmVDb2xsYXBzZWRGYWNldHMiLCJyZXN0b3JlQ29sbGFwc2VkRmFjZXRJdGVtcyIsInVwZGF0ZVZpZXciLCJfdGhpczIiLCJzaG93IiwiZ2V0UGFnZSIsImdldFVybCIsImVyciIsImhpZGUiLCJFcnJvciIsInVybFBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsImhhcyIsImF0dHIiLCJnZXQiLCJleHBhbmRGYWNldEl0ZW1zIiwiJG5hdkxpc3QiLCJfd2l0aG91dCIsImhhc01vcmVSZXN1bHRzIiwiX3VuaW9uIiwidG9nZ2xlRmFjZXRJdGVtcyIsImluY2x1ZGVzIiwiZ2V0TW9yZUZhY2V0UmVzdWx0cyIsIl90aGlzMyIsImZhY2V0IiwiZmFjZXRVcmwiLCJzaG93TW9yZSIsInRlbXBsYXRlIiwicGFyYW1zIiwibGlzdF9hbGwiLCJyZXNwb25zZSIsIm9wZW4iLCJ1cGRhdGVDb250ZW50IiwiJGl0ZW1zIiwidmFsIiwidG9Mb3dlckNhc2UiLCJlbGVtZW50IiwidGV4dCIsImluZGV4T2YiLCJleHBhbmRGYWNldCIsImNvbGxhcHNlRmFjZXQiLCJjbG9zZSIsIl90aGlzNCIsIiRhY2NvcmRpb25Ub2dnbGVzIiwiZXhwYW5kQWxsRmFjZXRzIiwiX3RoaXM1IiwidmFsaWRhdG9yIiwic2VsZWN0b3JzIiwiZXJyb3JTZWxlY3RvciIsImZpZWxkc2V0U2VsZWN0b3IiLCJmb3JtU2VsZWN0b3IiLCJtYXhQcmljZVNlbGVjdG9yIiwibWluUHJpY2VTZWxlY3RvciIsInNldE1pbk1heFByaWNlVmFsaWRhdGlvbiIsInZhbGlkYXRpb25FcnJvck1lc3NhZ2VzIiwicHJpY2VSYW5nZVZhbGlkYXRvciIsIl90aGlzNiIsIiRuYXZMaXN0cyIsInNob3VsZENvbGxhcHNlIiwiX3RoaXM3IiwidW5iaW5kRXZlbnRzIiwib24iLCJvblBvcFN0YXRlIiwib2ZmIiwiJGxpbmsiLCJzdG9wUHJvcGFnYXRpb24iLCJnb1RvVXJsIiwiJHRvZ2dsZSIsInRvZ2dsZUNsYXNzIiwidXJsUXVlcnlQYXJhbXMiLCJPYmplY3QiLCJhc3NpZ24iLCJhcmVBbGwiLCJjb25zdGFudHMiLCJWQUxJRCIsImRlY29kZVVSSSIsInBhcnNlUXVlcnlQYXJhbXMiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsImhhc2giLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwidGl0bGUiLCJyZXBsYWNlUGFyYW1zIiwicGFyc2VkIiwicGFyYW0iLCJxdWVyeURhdGEiLCJvdXQiLCJBcnJheSIsImlzQXJyYXkiLCJuZHgiLCJzdWJzdHJpbmciLCJpIiwidGVtcCIsInNob3dBbGVydE1vZGFsIiwiZGVjcmVtZW50Q291bnRlciIsImNvdW50ZXIiLCJpdGVtIiwic3BsaWNlIiwiaW5jcmVtZW50Q291bnRlciIsInVwZGF0ZUNvdW50ZXJOYXYiLCJ1cmxzIiwiYWRkQ2xhc3MiLCJjb21wYXJlIiwiam9pbiIsImZpbmQiLCJodG1sIiwicmVtb3ZlQ2xhc3MiLCJfcmVmIiwibm9Db21wYXJlTWVzc2FnZSIsImNvbXBhcmVDb3VudGVyIiwiJGNvbXBhcmVMaW5rIiwiJGNoZWNrZWQiLCJtYXAiLCJ2YWx1ZSIsInRyaWdnZXJIYW5kbGVyIiwicHJvZHVjdCIsIiRjbGlja2VkQ29tcGFyZUxpbmsiLCJjaGVja2VkIiwiJGNsaWNrZWRDaGVja2VkSW5wdXQiXSwic291cmNlUm9vdCI6IiJ9