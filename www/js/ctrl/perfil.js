Iris.controller('PerfilCtrl', function($scope, $rootScope, $http, $state, UserService) {
	
    $scope.user = UserService.getUser();
    
    $scope.logout = function() {
        UserService.logout();
        $state.go('login');
    };
    
});