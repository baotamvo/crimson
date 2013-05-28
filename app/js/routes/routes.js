define([
    'Console',
    'Underscore',
    'text!templates/Home.html',
    'text!templates/Data.html'
],function(Console,_,homeTemplate,dataTemplate){
    var home   = {
        title: 'Home'
        , id: 'home'
        , route: '/home'
        , controller: 'home'
        , template: homeTemplate
    }
    var routes = [
        home,
        {
            title: 'Data List'
            , id: 'creation'
            , route: '/data'
            , controller: 'data'
            , template: dataTemplate
        }
    ]
    return {
        routes: routes,
        initialize:function(angModule) {

            // hook up routing
            Console.group( 'Initializing navigation and routing.' );
            angModule.config(['$routeProvider',function($routeProvider){
                _.each(routes, function(route) {
                    Console.debug("Adding ", route.id, ":", route);
                    $routeProvider.when(
                        route.route
                        , {
                            template: route.template
                            , controller: route.controller
                            , title: route.title
                        }
                    );
                });
                $routeProvider.otherwise({ redirectTo: home.route });
            }]);
            angModule.run(['$rootScope','app',function($rootScope,app){
                app.navigation = routes;
                $rootScope.$on('$routeChangeSuccess',function (e,current,last) {
                    Console.debug("Navigating from ", last);
                    Console.debug("Navigating to   ", current);
                });
            }]);
            Console.groupEnd();
        }
    };
})