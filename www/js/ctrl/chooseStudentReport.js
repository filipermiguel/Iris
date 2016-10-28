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

    $ionicLoading.show();
	StudentService.getStudents($scope.students).then(function(students) {
		$scope.students = students;
		$ionicLoading.hide();
	});

  	$scope.hide = function(){
    	$ionicLoading.hide().then(function(){
       		console.log("The loading indicator is now hidden");
    	});
  	};

	$scope.showReport = function() {
		$ionicLoading.show({hideOnStateChange: true});
		$state.go('student-report', { result: $scope.searchResult.selected, origin: "STUDENT" });
	}

	$scope.onSelectStudent = function() {
		$ionicLoading.show();
		StudentService.getStudentTestsDone($scope.searchStudent.selected.rg).success(function(studentTests) {
			$scope.searchTest.selected = null;
			$scope.searchResult.selected = null;
			$ionicLoading.hide();
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
		$ionicLoading.show();
		StudentService.getStudentTestDoneListDates($scope.searchStudent.selected.rg, $scope.searchTest.selected.id).success(function(testResults) {
			$ionicLoading.hide();
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