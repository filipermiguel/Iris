Iris.controller('ChooseStudentHistoricReportCtrl', function($scope, $state, $ionicPopup, $ionicLoading, StudentService) {

	$scope.slider = {};
	var dates = [];

	$scope.searchStudent = {
		selected: null
	};

	$scope.searchTest = {
		selected: null
	};

	StudentService.getStudents().then(function(students) {
		$scope.students = students;
	});

	$scope.showReport = function() {
		var results = $scope.testResults.filter(function(obj) {
			return obj.date >= dates[$scope.slider.minValue] && obj.date <= dates[$scope.slider.maxValue];
		});
		$ionicLoading.show({hideOnStateChange: true});
		$state.go('student-historic-report', { historicResults: results });
	}

	$scope.onSelectStudent = function() {
		$ionicLoading.show();
		StudentService.getStudentTestsDone($scope.searchStudent.selected.rg).success(function(studentTests) {
			$ionicLoading.hide();
			$scope.searchTest.selected = null;
			if(studentTests.length > 0){
				$scope.tests = studentTests;
			} else {
				$scope.tests = [];
				$ionicLoading.hide();
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
				for(i = 0; i < testResults.length; i++){
					dates.push(testResults[i].date);
				}
				$scope.slider = {
					minValue: 0,
					maxValue: dates.length - 1,
					step: 1,
					options: {
						floor: 0,
						ceil: dates.length - 1,
						translate: function (index) {
							if(index >= 0 && index < dates.length){
								var date = new Date(dates[index]);
								return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
							}
    						return '';
    					}
    				}
    			};
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