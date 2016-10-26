Iris.controller('CadastroUsuarioCtrl', function($scope, $state, $ionicLoading, $ionicPopup, UserService) {

    $scope.usuario = {
        nome: "",
        senha: "",
        confirmarSenha: ""
    };

    $scope.salvar = function() {
        if($scope.usuario.senha == $scope.usuario.confirmarSenha){
            UserService.criarUsuario($scope.usuario.nome, $scope.usuario.senha).success(function(user) {
                $state.go("usuarios");
            }).error(function(data) {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Falha no cadastro!',
                    template: 'Já existe um usuário com este nome'
                });
            });
        } else {
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: 'Falha no cadastro!',
                template: 'Senhas não conferem.'
            });
        }
    }

    $scope.cancelar = function(){
        $state.go('usuarios');
    }

});