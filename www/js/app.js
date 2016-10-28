var serverAddress = "http://177.35.4.141:8080/iris-server";

Iris = angular.module('Iris', ['ionic', 'ngCordova', 'ui.select', 'rzModule', 'chart.js', 'ngMessages', 'monospaced.elastic', 'angular-cache' ])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });

    $ionicPlatform.registerBackButtonAction(function () {
        //Do nothing.
    }, 100);
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('login', {
        cache: false,
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    })
    .state('menu', {
        url: '/menu',
        templateUrl: 'templates/menu.html',
        controller: 'MenuCtrl'
    })
    .state('tests', {
        cache: false,
        url: '/tests',
        templateUrl: 'templates/tests.html',
        controller: 'TestsCtrl'
    })
    .state('new-test', {
        cache: false,
        url: '/new-test/:testId',
        templateUrl: 'templates/new-test.html',
        controller: 'NewTestCtrl'
    })
    .state('execute-test', {
        url: '/execute-test/:testId',
        templateUrl: 'templates/execute-test.html',
        controller: 'ExecuteTestCtrl',
        cache: false,
        params: {
            rg: null,
            id: null
        }
    })
    .state('new-student', {
        url: '/new-student',
        templateUrl: 'templates/new-student.html',
        controller: 'NewStudentCtrl'
    })    
    .state('choose-student-test', {
        cache: false,
        url: '/choose-student-test',
        templateUrl: 'templates/choose-student-test.html',
        controller: 'ChooseStudentTestCtrl'
    })
    .state('reports', {
        url: '/reports',
        templateUrl: 'templates/reports.html',
        controller: 'ReportsCtrl'
    })
    .state('choose-student-report', {
        cache: false,
        url: '/choose-student-report',
        templateUrl: 'templates/choose-student-report.html',
        controller: 'ChooseStudentReportCtrl'
    })
    .state('student-report', {
        url: '/student-report',
        templateUrl: 'templates/student-report.html',
        controller: 'StudentReportCtrl',
        params: {
            result: null,
            origin: null,
            historicResults: []
        }
    })
    .state('choose-test-report', {
        cache: false,
        url: '/choose-test-report',
        templateUrl: 'templates/choose-test-report.html',
        controller: 'ChooseTestReportCtrl'
    })    
    .state('choose-result-report', {
        cache: false,
        url: '/choose-result-report',
        templateUrl: 'templates/choose-result-report.html',
        controller: 'ChooseResultReportCtrl',
        params: {
            test: null,
            efficiency: { minimum: null, maximum: null},
            period: { initialDate: null, endDate: null}
        }
    })
    .state('choose-student-historic-report', {
        cache: false,
        url: '/choose-student-historic-report',
        templateUrl: 'templates/choose-student-historic-report.html',
        controller: 'ChooseStudentHistoricReportCtrl'
    })
    .state('student-historic-report', {
        cache: false,
        url: '/student-historic-report',
        templateUrl: 'templates/student-historic-report.html',
        controller: 'StudentHistoricReportCtrl',
        params: {
            historicResults: []
        }
    })    
    .state('new-user', {
        cache: false,
        url: '/new-user',
        templateUrl: 'templates/new-user.html',
        controller: 'NewUserCtrl'
    })
    .state('users', {
        url: '/users',
        templateUrl: 'templates/users.html',
        controller: 'UsersCtrl'
    })
    .state('delete-user', {
        cache: false,
        url: '/delete-user',
        templateUrl: 'templates/delete-user.html',
        controller: 'DeleteUserCtrl'
    })
    .state('change-password', {
        cache: false,
        url: '/change-password',
        templateUrl: 'templates/change-password.html',
        controller: 'ChangePasswordCtrl'
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

})

.config(function (CacheFactoryProvider) {
    angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });
});


