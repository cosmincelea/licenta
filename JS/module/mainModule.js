var app=angular.module('mainModule' ,['ngRoute','ngMaterial']);


app.config( function($routeProvider) {

   
    
	
	$routeProvider

            
            .when('/', {
                templateUrl : '../Templates/user.html',
                controller  : 'mainController'
            })

            
            .when('/User', {
                templateUrl : '../Templates/user.html',
                controller  : 'userController'
              
            }).when('/settings', {
                templateUrl : '../Templates/settings.html',
                controller  : 'settingsController'
            })
            .when('/usersSearch', {
                templateUrl : '../Templates/userSearch.html',
                controller  : 'usersSearchController'
            }).when('/friendUser', {
                templateUrl : '../Templates/friendUser.html',
                controller  : 'friendUserSearchController'
            }).when('/mail', {
                templateUrl : '../Templates/mail.html',
                controller  : 'mailController'
            })
            .when('/projectCreate', {
                templateUrl : '../Templates/projectCreate.html',
                controller  : 'projectCreateController'
            }).
            when('/projectSearch', {
                templateUrl : '../Templates/projectSearch.html',
                controller  : 'projectSearchController'
            })
            .when('/viewProject', {
                templateUrl : '../Templates/viewProject.html',
                controller  : 'viewProjectController'
            }).
            when('/createTasks', {
                templateUrl : '../Templates/createTasks.html',
                controller  : 'createTasksController'
            }).
            when('/myTasks', {
                templateUrl : '../Templates/myTasks.html',
                controller  : 'myTasksController'
            }). when('/createUser', {
                templateUrl : '../Templates/createUser.html',
                controller  : 'createUserController'
            }).
             when('/myProjects', {
                templateUrl : '../Templates/myProjects.html',
                controller  : 'myProjectsController'
            }).
             when('/createNews', {
                templateUrl : '../Templates/createNews.html',
                controller  : 'createNewsController'
            }).
             when('/allNews', {
                templateUrl : '../Templates/allNews.html',
                controller  : 'allNewsController'
            });

} );
