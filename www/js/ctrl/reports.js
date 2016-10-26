Iris.controller('ReportsCtrl', function($scope, $state, $ionicLoading) {

    $scope.reportsByStudent = function() {
        $ionicLoading.show({hideOnStateChange: true});
		$state.go('choose-student-report');
    }

    $scope.reportsByTest = function() {
        $ionicLoading.show({hideOnStateChange: true});
		$state.go('choose-test-report');
    }

    $scope.studentHistoricByTest = function() {
        $ionicLoading.show({hideOnStateChange: true});
		$state.go('choose-student-historic-report');
    }

    $scope.back = function() {
        $ionicLoading.show({hideOnStateChange: true});
        $state.go('menu');
    }

});