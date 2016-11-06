Iris.controller('TestsCtrl', function($scope, $state, $ionicLoading, $ionicPopup, TestService, UserService) {

    $ionicLoading.show();

	TestService.getTests().then(function(tests) {
        $scope.tests = tests;
        $ionicLoading.hide();
    });

	$scope.deleteTest = function(test, index) {
        TestService.deleteTest(test.id).then(function(isRemoved) {
            if(isRemoved){
                $scope.tests.splice(index, 1);
            } else {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Falha na remoção.',
                    template: 'Já existem resultados para este teste.'
                });
            }
        });
    };

    $scope.isAdmin = function(){
        var currentUser = UserService.getCurrentUser();
        return currentUser && currentUser.name == "admin" ? true : false;
    };

	$scope.back = function() {
        $ionicLoading.show({hideOnStateChange: true});
        $state.go('menu');
    };

});