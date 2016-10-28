Iris.controller('DeleteUserCtrl', function($scope, $state, $ionicLoading, $ionicPopup, UserService) {

    $scope.searchUser = {};

    $ionicLoading.show();
    UserService.getUsers().success(function(users) {
        $scope.users = users;
        $ionicLoading.hide();
    });

    $scope.deleteUser = function() {
        if ($scope.searchUser.selected.name == "admin") {
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: 'Falha na remoção.',
                template: 'Não é possível remover usuário administrador.'
            });
        } else {

            var confirmPopup = $ionicPopup.confirm({
                title: 'Remover',
                template: 'Deseja realmente remover este usuário?'
            });

            confirmPopup.then(function(res) {
                if (res) {
                    UserService.deleteUser($scope.searchUser.selected.id);
                    $state.go('users');
                }
            });
        }
    };

    $scope.isDeleteUserDisabled = function() {
        if ($scope.searchUser.selected) {
            return false;
        }
        return true;
    }

    $scope.back = function() {
        $ionicLoading.show({
            hideOnStateChange: true
        });
        $state.go('users');
    }
})