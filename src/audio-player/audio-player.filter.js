'use strict';

angular.
    module('audioPlayer').
    filter('time', ['$filter', function($filter) {
        return function(input) {
            return $filter('date')(input * 1000, 'mm:ss');
        };
    }]);