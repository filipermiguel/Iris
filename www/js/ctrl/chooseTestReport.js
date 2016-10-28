Iris.controller('ChooseTestReportCtrl', function($scope, $state, $ionicLoading, TestService) {

	var today = new Date();
	var todayz = new Date();
	todayz.setFullYear(todayz.getFullYear() - 1);
	var oneYearAgo = todayz;

    $scope.searchTest = {
        selected: null
    };

    $scope.slider = {
        minValue: 20,
        maxValue: 80,
        options: {
            floor: 0,
            ceil: 100,
            step: 1,
            translate: function (value) {
                return value + '%';
            }
        }
    };

    $scope.period = {
    	initialDate: oneYearAgo,
    	endDate: today
    };

    $ionicLoading.show();
    TestService.getTests().then(function(tests) {
        $ionicLoading.hide();
        $scope.tests = tests;
    });

    $scope.showReport = function(){
        $ionicLoading.show({hideOnStateChange: true});
        $state.go('choose-result-report', { test: $scope.searchTest.selected, efficiency: { minimum: $scope.slider.minValue, maximum: $scope.slider.maxValue }, period: $scope.period });
    }

    $scope.back = function(){
        $ionicLoading.show({hideOnStateChange: true});
        $state.go('reports');
    }
})