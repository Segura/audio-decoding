'use strict';

angular.
    module('core.page').
    controller('PageController', ['$scope', 'Page', function($scope, Page) {
        $scope.Page = Page;
    }]);
