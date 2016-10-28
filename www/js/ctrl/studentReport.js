Iris.controller('StudentReportCtrl', function($scope, $state, $ionicModal, $ionicLoading, TestService) {

	$scope.result = $state.params.result;
	$scope.historicResults = $state.params.historicResults;
	$scope.origin = $state.params.origin;
	$scope.resultInfo = JSON.parse($scope.result.result);
	$scope.selectedQuestion = {};
	$scope.studentAnswer = {};

	if($scope.resultInfo){
		var score = 0;

		for (i = 0; i < $scope.resultInfo.length; i++) { 
			if($scope.resultInfo[i].isCorrect){
				score++;
			}
		}

		$scope.score = score;
		var efficiency = (score / $scope.resultInfo.length) * 100; 
		$scope.correctPercentage = parseFloat(Math.round(efficiency * 100) / 100).toFixed(2); 
	}

	$ionicModal.fromTemplateUrl('view-question.html', { scope: $scope }).then(function(modal) {
        $scope.questionModal = modal;
    });

	$scope.isCorrect = function(question) {
		var questionInfo = $scope.resultInfo.filter(function(obj) {
			return obj.question == question.id;
		});

		if(questionInfo[0].isCorrect){
			return { "background-color": "rgb(208,253,216)" };
		} else {
			return { "background-color": "rgb(255,206,207)" };
		}
	} 

	$scope.questionClicked = function(question) {
		$scope.selectedQuestion = question;

		var questionInfo = $scope.resultInfo.filter(function(obj) {
			return obj.question == question.id;
		});

		var alternative = $scope.selectedQuestion.alternatives.filter(function(obj) {
			return obj.id == questionInfo[0].answer;
		});

		$scope.studentAnswer = alternative[0];

		$ionicLoading.show();
        TestService.getQuestionImage($scope.result.test.id, $scope.selectedQuestion.id).then(function(image) {
           $scope.questionImage = image;
           $ionicLoading.hide();
        });

		$scope.questionModal.show();
	}

	$scope.back = function() {
		$scope.selectedQuestion = {};
		$scope.questionModal.hide();
	}

	$scope.backReports = function(){
		$ionicLoading.show({hideOnStateChange: true});
		if($scope.origin == "TEST"){
			$state.go('choose-test-report');
		} else if($scope.origin == "STUDENT"){
			$state.go('choose-student-report');
		} else if($scope.origin == "HISTORIC") {
			$state.go('student-historic-report', { historicResults: $scope.historicResults });
		} else {
			$state.go('reports');
		}
	}
})
