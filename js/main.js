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
        _calculateHours,
        _calculateMinutes,
        _calculateSeconds,
        _updateValues,
        displayHours = '00',
        displayMinutes = '00',
        displaySeconds = '00';

    /**
     * Update public string values of Hours, Minutes and Seconds
     */
    _updateValues = function(){
        
        displayHours = _calculateHours();
        displayMinutes = _calculateMinutes();
        displaySeconds = _calculateSeconds();
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

    /**
     * Calcualte hours number based in current seconds
     */
    _calculateHours = function(){

        var _displayHours = Math.floor(_currentSeconds / 3600);

        if(displayHours < 10){
            _displayHours = '0' + _displayHours.toString();
        }else{
            _displayHours = _displayHours.toString();
        }

        return _displayHours;
    
    };

    /**
     * Calcualte minutes number based in current seconds
     */
    _calculateMinutes = function(){

        var _displayMinutes = Math.floor((_currentSeconds - (parseInt(displayHours) * 3600)) / 60);

        if(_displayMinutes < 10){
            _displayMinutes = '0' + _displayMinutes.toString();
        }else{
            _displayMinutes = _displayMinutes.toString();

        }

        return _displayMinutes;
    
    };


    /**
     * Calcualte seconds number based in current seconds
     */
    _calculateSeconds = function(){

        var _displaySeconds = _currentSeconds % 60;

        if(_displaySeconds < 10){
            _displaySeconds = '0' + _displaySeconds.toString();
        }else{
            _displaySeconds = _displaySeconds.toString();
        }

        return _displaySeconds;
    
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


    /**
     * Initialize values
     */
    $scope.Hours = Chronos.getDisplayHours();
    $scope.Minutes = Chronos.getDisplayMinutes();
    $scope.Seconds = Chronos.getDisplaySeconds();
    $scope.catchedTime = '';


    /*
     * Get current chronos status in order to make numbers blink
     */
    $scope.isPaused = function(){
        return Chronos.getPausedStatus();
    };
    
    /*
    * Check if it is working and pause or not and start
    */
    $scope.startOrPause = function(){

        if(!Chronos.isWorking()){
            console.info('Starting Chronos from controller');
            Chronos.start();
        }else{
            console.info('Pausing Chronos from controller');
            Chronos.pause();
        }
    };
    
    /*
     * Get the value and put it in current $scope
     */
    $scope.catchTime = function(){
        $scope.catchedTime = $scope.getCatchedTime();
    };



    /**
     * Get current time values and format as a String
     */
    $scope.getCatchedTime = function(){
        var catchedTime = $scope.Hours + ':' +
            $scope.Minutes + ':' +
            $scope.Seconds;
        
        return catchedTime;
    };


    /**
     * Stop chrono
     */
    $scope.stop = function(){
        Chronos.stop();
        $scope.catchedTime = '';
    };

    /**
     * Evaluate if we have a catched time
     */
    $scope.hasCatchedTime = function(){
        return $scope.catchedTime !== '';
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
