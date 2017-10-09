angular.module('ngRouteTitle', ['ngRoute'])

        .provider('$title', function () {
            var appName = "Angular App";
            var template = "{{title ? title : 'Loading...'}} | {{appName}}";

            this.appName = function (value) {
                appName = value;
            }

            this.setTemplate = function (value) {
                template = value;
            }

            this.$get = ['$rootScope', function ($rootScope) {
                    return {
                        template: template,
                        appName: appName,
                        set: function (title) {
                            this.title = title;
                            $rootScope.$title = title;
                        },
                        get: function () {
                            return $rootScope.$title;
                        }
                    }
                }
            ]
        })

        .run(['$title', '$rootScope', function ($title, $rootScope) {
                $rootScope.$on('$routeChangeStart', function () {
                    $title.set("Loading...")
                })

                $rootScope.$on('$routeChangeError', function (e, current) {
                    $title.set("Oops! An Error Occured")
                })

                $rootScope.$on('$routeChangeSuccess', function (e, current) {
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
        ])

        .directive('title', ['$title', function ($title) {
                return {
                    scope: true,
                    restrict: 'E',
                    template: $title.template,
                    link: function ($scope) {
                        $scope.appName = $title.appName;
                        $scope.$watch(function () {
                            return $title.title;
                        }, function (value) {
                            $scope.title = value;
                        })
                    }
                }
            }
        ])