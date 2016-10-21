Iris.controller('LoginCtrl', function($scope, $rootScope, UserService, $ionicPopup, $ionicLoading, $state) {
	
    $scope.loginData = {};
    
    //if (UserService.getUser()) {
    //    $state.go("testes");
    //};

    $scope.login = function() {
        UserService.login($scope.loginData.nome, $scope.loginData.senha).success(function(user) {
            UserService.saveUser(user);
            $state.go("menu");
        }).error(function(data) {
            var errorMessage;
            if(data){
                errorMessage =  "Verifique usuário e senha e tente novamente!";
            } else {
                errorMessage = "Servidor está offline";
            }

            $ionicLoading.hide();
            $ionicPopup.alert({
                title: 'Falha no login!',
                template: errorMessage
            });
        });
    }

})
