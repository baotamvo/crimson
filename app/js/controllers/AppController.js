define([
	// Standard Libs
	'Console'		// lib/console/console
], function (Console) {
	"use strict";

	var appController = ['$scope','app','crLogin','$timeout',function (sc,app,login) {
		Console.group("AppController entered");
        sc.app = app;
        sc.loginParams = {};
        sc.$on('$routeChangeSuccess',function(e,next){
            sc.app.title = next.$$route.title;
        })
        sc.$on('crLogin:successful',function(){
            sc.loginParams = {};
        })
        sc.runLogin = function() {
            login.run({login:sc.loginParams.email,password:sc.loginParams.password});
        }
        sc.runLogout = function() {
            login.logout();
        }
        sc.isAuthenticated = function() {
            return app.isAuthenticated();
        }
		Console.groupEnd();// .controller
	}];

	Console.groupEnd();
	return appController;
});