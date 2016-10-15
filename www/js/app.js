//var serverAddress = "http://irisserver-iris.rhcloud.com";
var serverAddress = "http://192.168.0.12:8081/iris-server";

Iris = angular.module('Iris', ['ionic', 'ngCordova', 'ui.select', 'rzModule'])

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
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    })
    .state('testes', {
        cache: false,
        url: '/testes',
        templateUrl: 'templates/testes.html',
        controller: 'TestesCtrl'
    })
    .state('cadastro-teste', {
        url: '/cadastro-teste/:testeId',
        templateUrl: 'templates/cadastro-teste.html',
        controller: 'CadastroTesteCtrl'
    })
    .state('escolha-teste', {
        url: '/escolha-teste/:testeId',
        templateUrl: 'templates/escolha-teste.html',
        controller: 'EscolhaTesteCtrl',
        cache: false,
        params: {
            rg: null
        }
    })
    .state('realiza-teste', {
        url: '/realiza-teste/:testeId',
        templateUrl: 'templates/realiza-teste.html',
        controller: 'RealizaTesteCtrl',
        cache: false,
        params: {
            rg: null,
            id: null
        }
    })
    .state('perfil', {
        cache: false,
        url: '/perfil',
        templateUrl: 'templates/perfil.html',
        controller: 'PerfilCtrl'
    })
    .state('cadastro-aluno', {
        url: '/cadastro-aluno',
        templateUrl: 'templates/cadastro-aluno.html',
        controller: 'CadastroAlunoCtrl'
    })    
    .state('escolha-aluno', {
        url: '/escolha-aluno',
        templateUrl: 'templates/escolha-aluno.html',
        controller: 'EscolhaAlunoCtrl'
    })
    .state('relatorios', {
        url: '/relatorios',
        templateUrl: 'templates/relatorios.html',
        controller: 'RelatoriosCtrl'
    })
    .state('escolha-aluno-relatorio', {
        cache: false,
        url: '/escolha-aluno-relatorio',
        templateUrl: 'templates/escolha-aluno-relatorio.html',
        controller: 'EscolhaAlunoRelatorioCtrl'
    })
    .state('relatorio-aluno', {
        cache: false,
        url: '/relatorio-aluno',
        templateUrl: 'templates/relatorio-aluno.html',
        controller: 'RelatorioAlunoCtrl',
        params: {
            aluno: null,
            teste: null,
            resultado: null
        }
    })
    .state('escolha-teste-relatorio', {
        cache: false,
        url: '/escolha-teste-relatorio',
        templateUrl: 'templates/escolha-teste-relatorio.html',
        controller: 'EscolhaTesteRelatorioCtrl'
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

});
