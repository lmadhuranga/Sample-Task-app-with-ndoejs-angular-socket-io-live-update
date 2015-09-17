'use strict';

/* Services */
var SampleServices = angular.module('Sample.services', ['ngResource']);

// Demonstrate how to register services
// In this case it is a simple value service.
SampleServices.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) { 
      // console.log('emit fun')
      socket.emit(eventName, data, function () {
        // console.log('emit callback')
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});
