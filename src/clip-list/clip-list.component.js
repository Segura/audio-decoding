'use strict';

angular.
    module('clipList').
    component('clipList', {
        templateUrl: 'clip-list/clip-list.template.html',
        controller: ['Page', 'Clip', '$scope', '$location',
            function ClipListController(Page, Clip, $scope, $location) {
                Page.setTitle('Clips list');

                this.clips = Clip.query();
                this.orderBy = 'added';

                $scope.go = function(location) {
                    $location.path(location);
                }
            }
        ]
    });
