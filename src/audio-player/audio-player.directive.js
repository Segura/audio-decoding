'use strict';

angular.
    module('audioPlayer').
    directive('audioPlayer', [function() {
        return {
            restrict: 'E',
            templateUrl: 'audio-player/audio-player.template.html',
            scope: {
                audio: '=',
                currentPosition: '='
            },
            controller: ['$scope', '$element', '$interval', 'config',
                function AudioPlayerController($scope, $element, $interval, config) {
                    var self = this;

                    self.canvas = $element[0].querySelector('#waveform-canvas');
                    self.canvas.width = self.canvas.parentElement.offsetWidth;
                    self.canvas.height = config.canvasHeight;
                    self.context = self.canvas.getContext('2d');
                    self.context.fillStyle = config.waveformColor;

                    self.audio = $element[0].querySelector('#audio');
                    self.isPlaying = false;
                    $scope.speed = 1;

                    self.onLoad = function() {
                        $scope.duration = self.audio.seekable.end(0);
                        self.chunksInSecond = $scope.audio.waveform.length / self.audio.seekable.end(0);
                        self.updateTimer = $interval(self.update, config.waveformRefrestRate);
                    }                       

                    self.onEnd = function() {
                        self.isPlaying = false;
                    }   

                    self.audio.addEventListener('canplaythrough', self.onLoad, false);
                    self.audio.addEventListener('ended', self.onEnd, false);

                    self.play = function() {
                        self.isPlaying = true;
                        self.audio.play();
                    };                    

                    self.pause = function() {
                        self.isPlaying = false;
                        self.audio.pause();
                    };                    

                    self.slower = function() {
                        self.audio.playbackRate = Math.max(self.audio.playbackRate - config.playBackStep, config.playBackMin);
                        $scope.speed = self.audio.playbackRate
                    };                    

                    self.faster = function() {
                        self.audio.playbackRate = Math.min(self.audio.playbackRate + config.playBackStep, config.playBackMax);
                        $scope.speed = self.audio.playbackRate
                    };

                    self.mouseMove = function(event) {
                        self.pointer = event.clientX - self.canvas.getBoundingClientRect().left;
                    }                    

                    self.mouseLeave = function() {
                        self.pointer = undefined;
                    }

                    self.rewind = function(event) {
                        self.audio.currentTime = self.rewindPosition;
                    };

                    self.update = function() {
                        $scope.currentPosition = self.audio.currentTime;
                        var start = self.startPosition();
                        var end = self.endPosition(start);
                        self.rewindPosition = (end + self.pointer - self.canvas.width) / self.chunksInSecond;
                        self.draw(start, end);
                    }

                    self.draw = function(start, end, pointer) {
                        self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);

                        for(var i = start; i < end; i++) {
                            var level = $scope.audio.waveform[i];
                            if(self.isPast(i)) {
                                self.context.globalAlpha = 0.5;
                            } else {
                                self.context.globalAlpha = 1;
                            }
                            self.context.fillRect(i - start, self.canvas.height - level, 1, level);
                        }

                        if(self.pointer !== undefined) {
                            self.context.fillStyle = config.waveformPointerColor;
                            self.context.fillRect(self.pointer - 3, 0, 2, 150);
                            self.context.fillStyle = config.waveformColor;
                        }
                    }

                    self.startPosition = function() {
                        return Math.min(
                            Math.max(
                                Math.floor(self.currentTimeInChunks() - config.waveformOffset), 
                                0
                            ),
                            $scope.audio.waveform.length - self.canvas.width
                        );
                    }                    

                    self.endPosition = function(start) {
                        return Math.min(self.canvas.width + start, $scope.audio.waveform.length);;
                    }

                    self.isPast = function(chunkIndex) {
                        return chunkIndex < self.currentTimeInChunks();
                    }

                    self.currentTimeInChunks = function() {
                        return self.audio.currentTime * self.chunksInSecond;
                    }

                    $element.on('$destroy', function() {
                        $interval.cancel(self.updateTimer);
                        self.audio.removeEventListener('canplaythrough', self.onLoad); 
                        self.audio.removeEventListener('ended', self.onEnd); 
                    });
                }
            ],
            controllerAs: '$ctrl',
        }
    }]);