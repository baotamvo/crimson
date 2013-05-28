define([
	// Standard Libs
	'Console'		// lib/console/console
	, 'Underscore'	// lib/underscore/underscore

    // Application Controller
	, 'controllers/AppController' // Main Application Controller - contains routing logic
    , 'controllers/HomeController'
    , 'controllers/DataController'
    , 'controllers/NavigationController'

], function (Console, _,
             app,home,data, navigation){
	"use strict";
	Console.group("Entering controllers module.");
	Console.info("AppController", app);

    var controllers = {
        home: home,
        data: data,
        navigation: navigation
    };


	return {
        initialize: function(angModule) {
            angModule.controller('AppController',app);
            _.each(controllers,function(controller,name){
                angModule.controller(name,controller);
            })
            Console.info("Registered Controllers: ", controllers);
            Console.groupEnd();
        }
    };
});