define(['text!templates/app/navigation.html'],function(template){
    return ['$scope',function(sc){
        sc.template = template;
        sc.loginFormShowed = true;
        sc.signOutButtonShowed = false;
        sc.hideLoginForm = function(){
            sc.loginFormShowed = false;
            sc.signOutButtonShowed = true;
        };
        sc.showLoginForm = function(){
            sc.loginFormShowed = true;
            sc.signOutButtonShowed = false;
        };
        sc.$on('crLogin:successful',function(){
            sc.hideLoginForm();
        });
        sc.$on('crLogout',function(){
            sc.showLoginForm();
        });
    }]
})