Iris.controller('ChooseStudentReportCtrl', function($scope, $state, $ionicPopup, $ionicLoading, StudentService) {

	$scope.tests = [];

	$scope.searchStudent = {
		selected: null
	};

	$scope.searchTest = {
		selected: null
	};

	$scope.searchResult = {
		selected: null
	};

	StudentService.getStudents($scope.students).then(function(students) {
		$scope.students = students;
	});

	$scope.showReport = function() {
		$ionicLoading.show({hideOnStateChange: true});
		$state.go('student-report', { result: $scope.searchResult.selected, origin: "STUDENT" });
	}

	$scope.onSelectStudent = function() {
		StudentService.getStudentTestsDone($scope.searchStudent.selected.rg).success(function(studentTests) {
			$scope.searchTest.selected = null;
			$scope.searchResult.selected = null;
			if(studentTests.length > 0){
				$scope.tests = studentTests;
			} else {
				$scope.tests = [];
				$ionicPopup.alert({
					template: 'Aluno não possui testes'
				});
			}
		});
	}

	$scope.onSelectTest = function() {
		StudentService.getStudentTestDoneListDates($scope.searchStudent.selected.rg, $scope.searchTest.selected.id).success(function(testResults) {
			if(testResults.length > 0){
				$scope.testResults = testResults;
			} else {
				$scope.testResults = {};
			}
		});
	}

	$scope.back = function() {
        $ionicLoading.show({hideOnStateChange: true});
        $state.go('reports');
    }
})