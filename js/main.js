/**
 * Chronos example
 * @file: main.js
 * @description: Example based on AngularJS
 */


angular.module('chronos-example', [])
.factory('Chronos', ['$interval',function($interval){
    // Our Chronos service
    'use strict';

    var self = this,
        _currentSeconds = 0,
        _isWorking = false,
        _isPaused = false,
        _getWorkingStatus,
        _increment,
        _incrementSeconds,
        _start,
        _pause,
        _stop,
        _updateValues,
        displayHours = '00',
        displayMinutes = '00',
        displaySeconds = '00';

    /**
     * Update public string values of Hours, Minutes and Seconds
     */
    _updateValues = function(){
        
        displayHours = Math.floor(_currentSeconds / 3600);

        if(displayHours < 10){
            displayHours = '0' + displayHours.toString();
        }else{
            displayHours = displayHours.toString();
        }
        
        displayMinutes = Math.floor((_currentSeconds - (parseInt(displayHours) * 3600)) / 60);

        if(displayMinutes < 10){
            displayMinutes = '0' + displayMinutes.toString();
        }else{
            displayMinutes = displayMinutes.toString();

        }
        console.info('Now minutes is '  + displayMinutes);


        displaySeconds = _currentSeconds % 60;
        if(displaySeconds < 10){
            displaySeconds = '0' + displaySeconds.toString();
        }else{
            displaySeconds = displaySeconds.toString();
        }

        console.info('Now displaySeconds is: ' + displaySeconds);

    };
    

    /**
     * Put _isWorking to true and increment seconds
     * @return void
     */
    _start = function(){
        console.info('Starting chrono');
        _isWorking = true;
        _isPaused = false;

        _increment = $interval(function(){
           if(_isWorking){
               _currentSeconds+=1;
           };
           console.info('Current seconds : ' + _currentSeconds);
           _updateValues();

        }, 1000);

    };

    /**
     * Stops and sets values to Zero
     * @return void
     */
    _stop = function(){
        _isWorking = false;
        _isPaused = false;
        $interval.cancel(_increment);
        _currentSeconds = 0;
        _updateValues();
    };

    /**
     * If is working, stop increment
     * @return voi
     */
    _pause = function(){
        _isWorking = false;
        _isPaused = true;
        $interval.cancel(_increment);
    };


    _getWorkingStatus = function(){
        return _isWorking;
    };

    /* Public API */
    return {
        start: _start,
        pause: _pause,
        stop: _stop,
        isWorking: _getWorkingStatus,
        getDisplayHours : function(){
            return displayHours;
        },
        getDisplayMinutes: function(){
            return displayMinutes;
        },
        getDisplaySeconds: function(){
            return displaySeconds;
        },
        getPausedStatus : function(){
            return _isPaused;
        }
    };

}])
.controller('ChronosCtrl', ['$scope','Chronos', function($scope, Chronos){
    'use strict';


    $scope.Hours = Chronos.getDisplayHours();
    $scope.Minutes = Chronos.getDisplayMinutes();
    $scope.Seconds = Chronos.getDisplaySeconds();

    $scope.isPaused = function(){
        return Chronos.getPausedStatus();
    };

    // Check if it is working and pause or not and start
    $scope.startOrPause = function(){

        if(!Chronos.isWorking()){
            console.info('Starting Chronos from controller');
            Chronos.start();
        }else{
            console.info('Pausing Chronos from controller');
            Chronos.pause();
        }
    };

    // Catch current time
    $scope.catchTime = function(){
        console.info('Catching current time');
    };

    // Stop chrono
    $scope.stop = function(){
        Chronos.stop();

    };
    
    /*
     * Watch and update Chronos values
     */
    $scope.$watch(function(){
        $scope.Hours = Chronos.getDisplayHours();
        $scope.Minutes = Chronos.getDisplayMinutes();
        $scope.Seconds = Chronos.getDisplaySeconds();
    });

}]);
