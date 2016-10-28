Iris.controller('ChangePasswordCtrl', function($scope, $state, $ionicLoading, $ionicPopup, UserService) {

    $scope.user = UserService.getCurrentUser();
    $scope.userInfo = {
        oldPassword: "",
        password: "",
        confirmPassword: ""
    };
    $scope.isOldPasswordCorrect = false;

    $scope.onFillOldPassword = function() {
        if($scope.userInfo.oldPassword != "" && $scope.userInfo.oldPassword != $scope.user.password) {
            $scope.isOldPasswordCorrect = false;
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: 'Falha na alteração!',
                template: 'Senha antiga não está correta.'
            });
        } else {
            $scope.isOldPasswordCorrect = true;
        }
    };

    $scope.changePassword = function() {
        $ionicLoading.show({
            hideOnStateChange: true
        });

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
    };

    $scope.isChangePasswordValid = function(isValid){
        if(isValid && $scope.isOldPasswordCorrect) {
            return true;
        }
        return false;
    }

    $scope.cancel = function(){
        $state.go('users');
    };

});