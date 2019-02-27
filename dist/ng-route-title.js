/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/ng-route-title.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ng-route-title.ts":
/*!*******************************!*\
  !*** ./src/ng-route-title.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nvar __importStar = (this && this.__importStar) || function (mod) {\r\n    if (mod && mod.__esModule) return mod;\r\n    var result = {};\r\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\r\n    result[\"default\"] = mod;\r\n    return result;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar angular_1 = __importDefault(__webpack_require__(/*! angular */ \"angular\"));\r\nvar _ = __importStar(__webpack_require__(/*! lodash */ \"lodash\"));\r\nvar TitleService = /** @class */ (function () {\r\n    function TitleService($rootScope, $compile, config) {\r\n        this.$rootScope = $rootScope;\r\n        this.$compile = $compile;\r\n        this.config = config;\r\n        this.$scope = this.$rootScope.$new();\r\n        this.$scope.appName = this.config.appName;\r\n        document.title = this.config.template;\r\n        $compile(document.querySelector('title'))(this.$scope);\r\n    }\r\n    TitleService.prototype.set = function (title) {\r\n        this.$rootScope.$title = title;\r\n        this.$scope.title = title;\r\n    };\r\n    return TitleService;\r\n}());\r\nvar TitleProvider = /** @class */ (function () {\r\n    function TitleProvider() {\r\n        var _this = this;\r\n        this.config = {\r\n            template: \"{{$root.progress ? 'Loading...' : title}} | {{appName}}\",\r\n            appName: \"Angular App\"\r\n        };\r\n        this.$get = ['$rootScope',\r\n            '$compile',\r\n            function ($rootScope, $compile) {\r\n                var service = new TitleService($rootScope, $compile, _this.config);\r\n                return service;\r\n            }\r\n        ];\r\n    }\r\n    TitleProvider.prototype.setTemplate = function (template) {\r\n        this.config.template = template;\r\n    };\r\n    TitleProvider.prototype.setAppName = function (name) {\r\n        this.config.appName = name;\r\n    };\r\n    return TitleProvider;\r\n}());\r\nvar routeTitleModule = angular_1.default.module('ngRouteTitle', [])\r\n    .provider('$title', TitleProvider)\r\n    .run([\r\n    '$title',\r\n    '$rootScope',\r\n    '$injector',\r\n    function ($title, $rootScope, $injector) {\r\n        var $route;\r\n        var $transitions;\r\n        var $stateParams;\r\n        if ($injector.has(\"$route\")) {\r\n            $route = $injector.get(\"$route\");\r\n        }\r\n        else if ($injector.has(\"$transitions\")) {\r\n            $transitions = $injector.get(\"$transitions\");\r\n            $stateParams = $injector.get(\"$stateParams\");\r\n        }\r\n        if ($transitions) {\r\n            $transitions.onSuccess({}, function (transition) {\r\n                $rootScope.progress = false;\r\n                var to = transition.to();\r\n                if (to) {\r\n                    var title = to.title || _.get(to, \"data.title\");\r\n                    if (title === undefined) {\r\n                        $title.set(\"Untitled\");\r\n                    }\r\n                    else if (title !== false) {\r\n                        $title.set(title);\r\n                    }\r\n                }\r\n                else {\r\n                    $title.set(\"404: Not Found\");\r\n                }\r\n            });\r\n        }\r\n        else if ($route) {\r\n            $rootScope.$on('$routeChangeStart', function () {\r\n                $title.set(\"Loading...\");\r\n            });\r\n            $rootScope.$on('$routeChangeError', function (e, current) {\r\n                $title.set(\"Oops! An Error Occured\");\r\n            });\r\n            $rootScope.$on('$routeChangeSuccess', function (e, current) {\r\n                $rootScope.progress = false;\r\n                if (current && current.$$route) {\r\n                    if (angular_1.default.isString(current.$$route.title)) {\r\n                        $title.set(current.$$route.title);\r\n                    }\r\n                    else if (current.$$route.title === undefined) {\r\n                        $title.set(\"Untitled\");\r\n                    }\r\n                }\r\n                else {\r\n                    $title.set(\"404: Not Found\");\r\n                }\r\n            });\r\n        }\r\n    }\r\n]);\r\nexports.default = routeTitleModule;\r\n\n\n//# sourceURL=webpack:///./src/ng-route-title.ts?");

/***/ }),

/***/ "angular":
/*!**************************!*\
  !*** external "angular" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = angular;\n\n//# sourceURL=webpack:///external_%22angular%22?");

/***/ }),

/***/ "lodash":
/*!********************!*\
  !*** external "_" ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = _;\n\n//# sourceURL=webpack:///external_%22_%22?");

/***/ })

/******/ });