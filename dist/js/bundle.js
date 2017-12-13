/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	const AnchorScroller = __webpack_require__(1);
	// import AAnchorScroller from './anchor-scroller';

	const scroller = new AnchorScroller(150, 75, 737)

	scroller.init();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	/* eslint-disable */

	var AnchorScroller = function (desktopOffset = 0, mobileOffset = 0, breakpoint = 0) {
	  function jump(target, options) {
	    var start = window.pageYOffset,
	      opt = {
	        duration: options.duration,
	        offset: options.offset || 0,
	        callback: options.callback,
	        easing: options.easing || easeInOutQuad
	      },
	      distance = typeof target === 'string' ?
	        document.querySelector(target).getBoundingClientRect().top - opt.offset :
	        target,
	      duration = typeof opt.duration === 'function' ?
	        opt.duration(distance) :
	        opt.duration,
	      timeStart, timeElapsed;

	    requestAnimationFrame(function (time) {
	      timeStart = time;
	      loop(time);
	    });

	    function loop(time) {
	      timeElapsed = time - timeStart;
	      window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));
	      if (timeElapsed < duration) {
	        requestAnimationFrame(loop)
	      } else {
	        end();
	      }
	    }

	    function end() {
	      window.scrollTo(0, start + distance);

	      if (typeof opt.callback === 'function') {
	        opt.callback();
	      }
	    }

	    function easeInOutQuad(t, b, c, d) {
	      t /= d / 2;
	      if (t < 1) return c / 2 * t * t + b;
	      t--;
	      return -c / 2 * (t * (t - 2) - 1) + b;
	    }
	  }

	  return {
	    'init': function () {
	      var that = this;
	      var offset = (window.innerWidth >= breakpoint) ? desktopOffset : mobileOffset;

	      // check if the url has a hash and if there's a value after it and scroll to it Ex: "#some-anchor"
	      if (this.urlHasHash(document.location.href) && this.getHash(document.location.href) !== '') {
	        this.appendId(document.location.hash.substring(1));
	        setTimeout(function () {
	          that.removeId();
	          jump('#' + that.getHash(document.location.href), {duration: 400, offset: offset});
	        }, 200);
	      }

	      document.addEventListener('DOMContentLoaded', function () {
	        var anchors = document.querySelectorAll('a[href*="#"]:not([href="#"])');

	        for (var i = 0; i < anchors.length; i++) {
	          anchors[i].addEventListener('click', function (e) {
	            e.preventDefault();

	            if (that.urlHasHash(e.currentTarget.href) && that.urlOnPage(e.currentTarget.href)) {
	             jump('#' + that.getHash(e.currentTarget.href), {duration: 400, offset: offset});
	            } else {
	              window.location = e.currentTarget.href;
	            }
	          });
	        }
	      });
	      window.addEventListener('resize', function () {
	          offset = (window.innerWidth >= breakpoint) ? desktopOffset : mobileOffset
	      });
	    },
	    'urlOnPage': function (url) {
	      return this.stripHash(document.location.href) === this.stripHash(url);
	    },
	    'appendId': function (id) {
	      document.documentElement.id = id;
	    },
	    'removeId': function () {
	      document.documentElement.removeAttribute('id');
	    },
	    'urlHasHash': function (url) {
	      if (url.lastIndexOf('#') === -1) {
	        return false;
	      }
	      return true;
	    },
	    'getHash': function (url) {
	      return url.substring(url.lastIndexOf('#') + 1);
	    },
	    'stripHash': function (url) {
	      return (this.urlHasHash(url)) ? url.substring(0, url.lastIndexOf('#')) : url;
	    }
	  };
	};
	module.exports = AnchorScroller;
	// export default AnchorScroller;

/***/ })
/******/ ]);