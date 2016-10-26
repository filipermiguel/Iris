Iris.controller('ChangePasswordCtrl', function($scope, $state, $ionicLoading, $ionicPopup, UserService) {

    $scope.user = UserService.getCurrentUser();
    $scope.userInfo = {
        password: "",
        confirmPassword: ""
    };

    $scope.changePassword = function() {
        if($scope.userInfo.password == $scope.userInfo.confirmPassword){
            UserService.changePassword($scope.user.id, $scope.userInfo.password).success(function(user) {
                $state.go("users");
            });
        } else {
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: 'Falha na alteração!',
                template: 'Senhas não conferem.'
            });
        }
    }

    $scope.cancel = function(){
        $state.go('users');
    }

});