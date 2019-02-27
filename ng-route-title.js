"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var angular_1 = __importDefault(require("angular"));
var _ = __importStar(require("lodash"));
var TitleService = /** @class */ (function () {
    function TitleService($rootScope, $compile) {
        this.$rootScope = $rootScope;
        this.$compile = $compile;
        this.$scope = this.$rootScope.$new();
        this.$scope.appName = this.config.appName;
        document.title = this.config.template;
        $compile(document.querySelector('title'))(this.$scope);
    }
    TitleService.prototype.set = function (title) {
        this.$rootScope.$title = title;
        this.$scope.title = title;
    };
    return TitleService;
}());
var TitleProvider = /** @class */ (function () {
    function TitleProvider() {
        this.config = {
            template: "{{$root.progress ? 'Loading...' : title}} | {{appName}}",
            appName: "Angular App"
        };
        this.$get = ['$rootScope',
            '$compile',
            function ($rootScope, $compile) {
                return new TitleService($rootScope, $compile);
            }
        ];
    }
    TitleProvider.prototype.setTemplate = function (template) {
        this.config.template = template;
    };
    TitleProvider.prototype.setAppName = function (name) {
        this.config.appName = name;
    };
    return TitleProvider;
}());
var routeTitleModule = angular_1.default.module('ngRouteTitle', [])
    .provider('$title', TitleProvider)
    .run([
    '$title',
    '$rootScope',
    '$injector',
    function ($title, $rootScope, $injector) {
        var $route;
        var $transitions;
        var $stateParams;
        if ($injector.has("$route")) {
            $route = $injector.get("$route");
        }
        else if ($injector.has("$transitions")) {
            $transitions = $injector.get("$transitions");
            $stateParams = $injector.get("$stateParams");
        }
        if ($transitions) {
            $transitions.onSuccess({}, function (transition) {
                $rootScope.progress = false;
                var to = transition.to();
                if (to) {
                    var title = to.title || _.get(to, "data.title");
                    if (title === undefined) {
                        $title.set("Untitled");
                    }
                    else if (title !== false) {
                        $title.set(title);
                    }
                }
                else {
                    $title.set("404: Not Found");
                }
            });
        }
        else if ($route) {
            $rootScope.$on('$routeChangeStart', function () {
                $title.set("Loading...");
            });
            $rootScope.$on('$routeChangeError', function (e, current) {
                $title.set("Oops! An Error Occured");
            });
            $rootScope.$on('$routeChangeSuccess', function (e, current) {
                $rootScope.progress = false;
                if (current && current.$$route) {
                    if (angular_1.default.isString(current.$$route.title)) {
                        $title.set(current.$$route.title);
                    }
                    else if (current.$$route.title === undefined) {
                        $title.set("Untitled");
                    }
                }
                else {
                    $title.set("404: Not Found");
                }
            });
        }
    }
]);
exports.default = routeTitleModule;
