Iris.controller('ExecuteTestCtrl', function($scope, $state, $ionicLoading, $ionicModal, TestService, StudentService) {   

    $scope.test = {
        name: "",
        questions: []
    };

    $scope.student = {};

    $scope.testResult = {
        test: 0,
        rg: 0,
        date: null,
        score: 0,
        result: ""
    };

    $scope.resultJSON = [];

    $scope.currentQuestion;
    $scope.selectedAlternative = { index : null }; 
    $scope.infoTest = { questionIndex: 0, correctAnswers: 0};
    $scope.endModal;
    $scope.questionImage;

    $ionicModal.fromTemplateUrl('end-test.html', { scope: $scope }).then(function(modal) {
        $scope.endModal = modal;
    });
    
    
	if($state.params.id) {
        $ionicLoading.show();
		TestService.getTest($state.params.id).then(function(test) {
            $ionicLoading.hide();
			$scope.test = test;

            $scope.currentQuestion = $scope.test.questions[0];
            $scope.infoTest.questionIndex = 1;

            TestService.getQuestionImage($state.params.id, $scope.currentQuestion.id).then(function(image) {
                if (image) {
                    $scope.questionImage = "data:image/jpg;base64," + image;
                }
            });
		});

        StudentService.getStudentByRg($state.params.rg).then(function(student) {
            $scope.student = student;
        });
	}
	
    $scope.nextQuestion = function () {
        if($scope.selectedAlternative.index == $scope.currentQuestion.correctAlternative){
            $scope.infoTest.correctAnswers++;

            var result = {
                question: $scope.currentQuestion.id,
                answer: $scope.currentQuestion.alternatives[$scope.selectedAlternative.index].id,
                isCorrect: true
            };

            $scope.resultJSON.push(result);
        } else {

            var result = {
                question: $scope.currentQuestion.id,
                answer: $scope.currentQuestion.alternatives[$scope.selectedAlternative.index].id,
                isCorrect: false
            };

            $scope.resultJSON.push(result);
        }

        $scope.selectedAlternative.index = null;
        $scope.questionImage = null;

        if($scope.infoTest.questionIndex > 0 && $scope.infoTest.questionIndex < $scope.test.questions.length){
            $scope.currentQuestion = $scope.test.questions[$scope.infoTest.questionIndex];

            $ionicLoading.show();
            TestService.getQuestionImage($state.params.id, $scope.currentQuestion.id).then(function(image) {
                $ionicLoading.hide();
                if (image) {
                    $scope.questionImage = "data:image/jpg;base64," + image;
                }
            });

            $scope.infoTest.questionIndex++;
            $scope.selectedAlternative.index = null;
        } else {
            var efficiency = ($scope.infoTest.correctAnswers / $scope.infoTest.questionIndex) * 100; 
            $scope.infoTest.efficiency = parseFloat(Math.round(efficiency * 100) / 100).toFixed(2);  
            $scope.endModal.show();
        }
    };

    $scope.testFinalize = function () {
        $ionicLoading.show({hideOnStateChange: true});

        var today = new Date();
        today.setHours(0,0,0,0);

        $scope.testResult = {
            test: $scope.test,
            student: $scope.student,
            date: today,
            score: $scope.infoTest.correctAnswers,
            result: JSON.stringify($scope.resultJSON) 
        }

        $scope.endModal.hide();
        $scope.infoTest.correctAnswers = 0;
        $scope.infoTest.efficiency = 0;
        
        var successFunction = function() {
            $state.go('choose-student-test');
        };
        
        TestService.saveResult($scope.testResult).success(successFunction);
    }
    
    $scope.isNextQuestionDisabled = function(){
        if($scope.selectedAlternative.index == null){
            return false;
        }
        return true;
    }

    $scope.back = function(){
        $state.go('choose-student-test');
    }
});