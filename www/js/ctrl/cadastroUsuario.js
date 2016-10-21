Iris.controller('CadastroUsuarioCtrl', function($scope, $state, $stateParams, $ionicLoading, $ionicModal, UserService) {

    $scope.usuario = {};

    $scope.salvar = function() {
        UserService.criarUsuario($scope.usuario.nome, $scope.usuario.senha).success(function(user) {
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

    $scope.cancelar = function(){
        $state.go('menu');
    }

});