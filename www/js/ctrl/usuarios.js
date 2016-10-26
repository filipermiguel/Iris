Iris.controller('UsuariosCtrl', function($scope, $state, $ionicLoading, UserService) {

    $scope.showAdminMenu = function(){
        var currentUser = UserService.getCurrentUser();
        return currentUser && currentUser.nome == "admin" ? true : false;
    }

    $scope.createUser = function() {
        $ionicLoading.show({hideOnStateChange: true});
		$state.go('cadastro-usuario');
    }

    $scope.deleteUser = function() {
        $ionicLoading.show({hideOnStateChange: true});
		$state.go('remover-usuario');
    }

    $scope.changePassword = function() {
        $ionicLoading.show({hideOnStateChange: true});
		$state.go('alterar-senha');
    }

    $scope.voltar = function() {
        $ionicLoading.show({hideOnStateChange: true});
        $state.go('menu');
    }

});