define([
	// Standard Libs
	'Console'		// lib/console/console
	, 'Underscore'	// lib/underscore/underscore

	// Custom Services
	, 'services/DataService'
], function(Console, _, ds){
	"use strict";

	var services = {
        app: ['crWebUser',function(webUser){
            return {
                name: 'Encrite',
                isAuthenticated:function(){
                    return webUser.isAuthenticated();
                }
            }
        }],
		DataService: ds,
        crLogin: ['$rootScope','crGetAccessPass','crWebUser',function(rootScope,getAccessPass,webUser){
            return {
                run:function(params){
                    params = params || {};
                    if(params.login=='admin' && params.password=='admin') {
                        webUser.login(getAccessPass());
                        rootScope.$broadcast('crLogin:successful');
                    } else {
                        rootScope.$broadcast('crLogin:failed');
                    }
                    rootScope.$broadcast('crLogin:done');
                },
                logout:function(){
                    webUser.logout();
                    rootScope.$broadcast('crLogout');
                }
            }
        }],
        crGetAccessPass:function(){
            return function(){
                return {
                    scope:'admin'
                }
            }
        },
        crWebUser: [function(){
            return {
                name:null,
                username:null,
                isAuthenticated:function(){
                    return !!this.accessPass;
                },
                logout: function() {
                    this.accessPass = null;
                },
                isAdmin:function(){
                    return this.isAuthenticated() && this.accessPass.scope == 'admin'
                },
                login:function(accessPass) {
                    this.accessPass = accessPass;
                },
                accessPass:null
            }
        }]
	};


	return {
		initialize: function (angModule) {
            Console.info("Registered services: ", services);
            _.each(services,function(service,name){
                angModule.factory(name,service);
            })
            Console.debug("Custom services initialized.");
            Console.groupEnd();

        }
	};
});
