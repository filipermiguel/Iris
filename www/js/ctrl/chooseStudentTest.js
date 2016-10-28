Iris.controller('ChooseStudentTestCtrl', function($scope, $state, $ionicLoading, $ionicPopup, StudentService, TestService) {

	$scope.searchStudent = {};
	$scope.searchTest = {};

    $ionicLoading.show();

	StudentService.getStudents().then(function(students) {
		$scope.students = students;
        if ($scope.tests) {
            $ionicLoading.hide();
        }
	});

	TestService.getTests().then(function(tests) {
        $scope.tests = tests;
        if ($scope.students) {
            $ionicLoading.hide();
        }
    });

	$scope.executeTest = function() {
        $ionicLoading.show({hideOnStateChange: true});
        var isExecuteTest = true;
        TestService.studentHasResultToday($scope.searchTest.selected, $scope.searchStudent.selected.rg).success(function(hasResult) {
            if(!hasResult) {
                $ionicLoading.show({hideOnStateChange: true});
                $state.go('execute-test', { rg: $scope.searchStudent.selected.rg, id: $scope.searchTest.selected.id });
            } else {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Falha ao começar teste.',
                    template: 'Aluno já executou este teste hoje!'
                });
            }
        });
    };

   	$scope.isBeginTestDisabled = function() {
        if($scope.searchStudent.selected && $scope.searchTest.selected){
        	return false;
        }
        return true;
    };

    $scope.back = function() {
        $ionicLoading.show({hideOnStateChange: true});
        $state.go('menu');
    };
})