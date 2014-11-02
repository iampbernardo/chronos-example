/**
 * Chronos example
 * @file: main.js
 * @description: Example based on AngularJS
 */

'use strict';

angular.module('chronos-example', [])
.controller('ChronosCtrl', ['$scope', function($scope){

    // Check if it is working and pause or not and start
    $scope.startOrPause = function(){
        console.info('Starting or pausing chronos');
    };

    // Catch current time
    $scope.catchTime = function(){
        console.info('Catching current time');
    };

    // Stop chrono
    $scope.stop = function(){
        console.info('Stoping chrono');
    };
}]);
