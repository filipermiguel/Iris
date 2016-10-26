Iris.controller('DeleteUserCtrl', function($scope, $state, $ionicLoading, $ionicPopup, UserService) {

    $scope.searchUser = {};

    $scope.deleteUser = function() {
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
    };

    UserService.getUsers().success(function(users) {
        $scope.users = users;
    });

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