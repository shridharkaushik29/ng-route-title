angular.module('ngRouteTitle', [])

        .provider('$title', function () {
            var config = {template: "{{$root.progress ? 'Loading...' : title}} | {{appName}}",
                appName: "Angular App"
            };

            this.setTemplate = function (template) {
                config.template = template;
            }

            this.setAppName = function (name) {
                config.appName = name;
            }

            this.$get = ['$rootScope',
                '$compile',
                function ($rootScope, $compile) {
                    var service = {};
                    var scope = $rootScope.$new();

                    scope.appName = config.appName;

                    document.title = config.template;

                    $compile(document.querySelector('title'))(scope)

                    service.set = function (title) {
                        $rootScope.$title = title;
                        scope.title = title;
                    }

                    return service;
                }
            ]
        })

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
                            var title = to.title;
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