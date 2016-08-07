'use strict';

angular.
    module('core.clip').
    factory('Clip', ['$resource',
        function($resource) {
            return $resource('api/clips/:clipId.json', {}, {
                query: {
                    method: 'GET',
                    params: {clipId: 'list'},
                    isArray: true
                }
            });
        }
    ]);