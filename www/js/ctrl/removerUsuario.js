Iris.controller('RemoverUsuarioCtrl', function($scope, $state, $ionicLoading, $ionicPopup, UserService) {

    $scope.searchUsuario = {};

    $scope.removerUsuario = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Remover',
            template: 'Deseja realmente remover este usuário?'
        });

        confirmPopup.then(function(res) {
            if (res) {
                UserService.removerUsuario($scope.searchUsuario.selected.id);
                $state.go('usuarios');
            } 
        });
    };

    UserService.getUsuarios().success(function(usuarios) {
        $scope.usuarios = usuarios;
    });

    $scope.isDeleteUserDisabled = function() {
        if ($scope.searchUsuario.selected) {
            return false;
        }
        return true;
    }

    $scope.voltar = function() {
        $ionicLoading.show({
            hideOnStateChange: true
        });
        $state.go('usuarios');
    }
})