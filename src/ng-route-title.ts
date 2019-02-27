import angular, {ICompileService} from "angular";
import * as _ from "lodash";

class TitleService {

    $scope: any = this.$rootScope.$new()

    constructor(
        private $rootScope: any,
        private $compile: ICompileService,
        private config: {
            template: string,
            appName: string
        }
    ) {
        this.$scope.appName = this.config.appName;
        document.title = this.config.template;
        $compile(document.querySelector('title'))(this.$scope)
    }

    set(title: string) {
        this.$rootScope.$title = title;
        this.$scope.title = title;
    }
}


class TitleProvider {

    config = {
        template: "{{$root.progress ? 'Loading...' : title}} | {{appName}}",
        appName: "Angular App"
    }

    setTemplate(template) {
        this.config.template = template;
    }

    setAppName(name) {
        this.config.appName = name;
    }

    $get = ['$rootScope',
        '$compile',
        ($rootScope, $compile: ICompileService) => {
            const service = new TitleService($rootScope, $compile, this.config);
            return service
        }
    ]
}

const routeTitleModule = angular.module('ngRouteTitle', [])

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
            } else if ($injector.has("$transitions")) {
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
                        } else if (title !== false) {
                            $title.set(title);
                        }
                    } else {
                        $title.set("404: Not Found");
                    }
                });

            } else if ($route) {

                $rootScope.$on('$routeChangeStart', function () {
                    $title.set("Loading...")
                })

                $rootScope.$on('$routeChangeError', function (e, current) {
                    $title.set("Oops! An Error Occured")
                })

                $rootScope.$on('$routeChangeSuccess', function (e, current) {
                    $rootScope.progress = false;
                    if (current && current.$$route) {
                        if (angular.isString(current.$$route.title)) {
                            $title.set(current.$$route.title);
                        } else if (current.$$route.title === undefined) {
                            $title.set("Untitled");
                        }
                    } else {
                        $title.set("404: Not Found");
                    }
                })
            }
        }
    ])

export default routeTitleModule;
