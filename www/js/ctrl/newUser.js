Iris.controller('NewUserCtrl', function($scope, $state, $ionicLoading, $ionicPopup, UserService) {

    $scope.user = {
        name: "",
        password: "",
        confirmPassword: ""
    };

    $scope.save = function() {
        $ionicLoading.show({
            hideOnStateChange: true
        });

        if($scope.user.password == $scope.user.confirmPassword){
            UserService.createUser($scope.user.name, $scope.user.confirmPassword).success(function(user) {
                $state.go("users");
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

    $scope.cancel = function(){
        $state.go('users');
    }

});