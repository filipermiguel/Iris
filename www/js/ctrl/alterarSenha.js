Iris.controller('AlterarSenhaCtrl', function($scope, $state, $ionicLoading, $ionicPopup, UserService) {

    $scope.usuario = UserService.getCurrentUser();
    $scope.userInfo = {
        senha: "",
        confirmarSenha: ""
    };

    $scope.alterarSenha = function() {
        if($scope.userInfo.senha == $scope.userInfo.confirmarSenha){
            UserService.alterarSenha($scope.usuario.id, $scope.userInfo.senha).success(function(user) {
                $state.go("usuarios");
            });
        } else {
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: 'Falha na alteração!',
                template: 'Senhas não conferem.'
            });
        }
    }

    $scope.cancelar = function(){
        $state.go('usuarios');
    }

});