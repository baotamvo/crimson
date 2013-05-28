define([
	// Standard Libs
	'Console'		// lib/console/console
	, 'jQuery'		// lib/jquery/jquery
	, 'Underscore'	// lib/underscore/underscore
	, 'Angular'		// lib/angular/angular

	// Application Widgets

], function(Console, $, _){
	"use strict";

	var directives = {
        crTemplate: ['$compile',function ($compile) {
            return {
                scope: true,
                link: function (scope, element, attrs) {
                    scope.$watch(attrs.crTemplate,function(val){
                        var el = $compile(val)(scope);
                        element.html(el);
                    })
                }
            };
        }],
        crShowFade: [function(){
            return function (scope, element, attrs) {
                scope.$watch(attrs.crShowFade,function(val){
                    if(val)
                        element.fadeIn();
                    else
                        element.fadeOut();
                })
            }
        }]
    };

	return {
		initialize: function (angModule) {
            Console.info("Registered directives: ", directives);
            _.each(directives,function(filter,name){
                angModule.directive(name,filter);
            })
            Console.debug("Custom widgets initialized.");
            Console.groupEnd();
        }

    };
});
