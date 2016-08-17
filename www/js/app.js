//var serverAddress = "http://irisserver-iris.rhcloud.com";
var serverAddress = "http://localhost:8081/iris-server";

Iris = angular.module('Iris', ['ionic'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })
    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    })
    .state('tab.testes', {
        cache: false,
        url: '/testes',
        views: {
            'tab-testes': {
                templateUrl: 'templates/tab-testes.html',
                controller: 'TestesCtrl'
            }
        }
    })
    .state('blank', {
        url: '/blank',
        templateUrl: 'templates/blank.html'
    })
    .state('tab.perfil', {
        cache: false,
        url: '/perfil',
        views: {
            'tab-perfil': {
                templateUrl: 'templates/tab-perfil.html',
                controller: 'PerfilCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

});
