Iris.controller('LoginCtrl', function($scope, $rootScope, UserService, $ionicPopup, $ionicLoading, $state) {
	
    $scope.loginData = {};
	$scope.registerData = {};
	 
    
    //if (UserService.getUser()) {
    //    $state.go("testes");
    //};

    $scope.login = function() {
        UserService.login($scope.loginData.nome, $scope.loginData.senha).success(function(user) {
            UserService.saveUser(user);
            $state.go("testes");
        }).error(function(data) {
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: 'Falha no login!',
                template: 'Verifique usuário e senha e tente novamente!'
            });
        });
    }
    
    $scope.register = function() {
    	UserService.criarUsuario($scope.registerData.nome, $scope.registerData.senha).success(function(user) {
            UserService.saveUser(user);
            $state.go("testes");
        }).error(function(data) {
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: 'Falha no cadastro!',
                template: 'Ocorreu uma falha no cadastro!'
            });
        });
    }
})
