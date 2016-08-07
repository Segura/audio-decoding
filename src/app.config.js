'use strict';

angular.
    module('audioDecodingApp').
    constant('config', {
        'canvasHeight': 150,
        'waveformOffset': 100,
        'waveformColor': '#3BA754',
        'waveformPointerColor': '#333333',
        'waveformRefrestRate': 40,
        'playBackStep': 0.25,
        'playBackMin': 0.25,
        'playBackMax': 3,
        'saveRate': 30000,
    }).
    config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider.
                when('/clips', {
                    template: '<clip-list></clip-list>'
                }).
                when('/clips/:clipId', {
                    template: '<clip-decode></clip-decode>'
                }).
                otherwise('/clips');
        }
    ]);
