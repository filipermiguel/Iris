Iris.controller('UsersCtrl', function($scope, $state, $ionicLoading, UserService) {

    $scope.showAdminMenu = function(){
        var currentUser = UserService.getCurrentUser();
        return currentUser && currentUser.name == "admin" ? true : false;
    }

    $scope.createUser = function() {
        $ionicLoading.show({hideOnStateChange: true});
		$state.go('new-user');
    }

    $scope.deleteUser = function() {
        $ionicLoading.show({hideOnStateChange: true});
		$state.go('delete-user');
    }

    $scope.changePassword = function() {
        $ionicLoading.show({hideOnStateChange: true});
		$state.go('change-password');
    }

    $scope.back = function() {
        $ionicLoading.show({hideOnStateChange: true});
        $state.go('menu');
    }

});