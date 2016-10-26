Iris.controller('ChooseResultReportCtrl', function($scope, $state, $ionicLoading, TestService) {

	$scope.test = $state.params.test;
	$scope.efficiency = $state.params.efficiency;
	$scope.period = $state.params.period;

	TestService.getResults($scope.test, $scope.efficiency, $scope.period).success(function(results) {
        $scope.results = results;
    });

	$scope.viewStudentResult = function(result){
		$ionicLoading.show({hideOnStateChange: true});
        $state.go('student-report', { result: result, origin: "TEST" });
	}		

	$scope.back = function(){
		$ionicLoading.show({hideOnStateChange: true});
        $state.go('choose-test-report');
	}
})