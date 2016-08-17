Iris.controller('TestesCtrl', function($scope, $rootScope, $http, $state, $ionicLoading, UserService) {
	
    $scope.register = function() {
        $ionicLoading.show({hideOnStateChange: true});
		$state.go('blank');
    }
});