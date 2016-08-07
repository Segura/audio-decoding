'use strict';

angular.
    module('clipDecode').
    directive('clipDecode', [function() {
        return {
            restrict: 'E',
            templateUrl: 'clip-decode/clip-decode.template.html',
            controller: ['Page', '$element', '$routeParams', 'Clip', '$interval', 'config',
                function ClipDecodeController(Page, $element, $routeParams, Clip, $interval, config) {
                    var self = this;

                    self.quote = {};
                    self.quotes = [];
                    self.persons = [];              

                    self.clip = Clip.get({clipId: $routeParams.clipId}, function() {
                        Page.setTitle(self.clip.title);
                        self.loadLocal();
                    });

                    self.addQuite = function() {
                        self.quote.time = self.audioPosition;
                        self.quote.clipId = self.clip.id;
                        self.quotes.push(self.quote);
                        if(self.persons.indexOf(self.quote.person) < 0) {
                            self.persons.push(self.quote.person);
                        }
                        self.quote = {};

                        self.saveLocal();
                    }

                    self.saveLocal = function() {
                        var localSaveData = {
                            "persons": self.persons, "quotes": self.quotes
                        }
                        localStorage.setItem(self.localStorageKey(), angular.toJson(localSaveData));
                    }

                    self.loadLocal = function() {
                        var jsonSaveData = localStorage.getItem(self.localStorageKey());
                        if(jsonSaveData !== null) {
                            var localSaveData = angular.fromJson(jsonSaveData);
                            self.persons = localSaveData.persons;
                            self.quotes = localSaveData.quotes;
                        }
                    }

                    self.save = function() {
                        console.log('Save quotes to BD');
                    }

                    self.localStorageKey = function() {
                        return "clip-"+self.clip.id;
                    }

                    self.saveTimer = $interval(self.save, config.saveRate);

                    $element.on('$destroy', function() {
                        $interval.cancel(self.saveTimer);
                    });
                }
            ],
            controllerAs: '$ctrl'
        }
    }]);