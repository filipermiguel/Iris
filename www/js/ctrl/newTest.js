Iris.controller('NewTestCtrl', function($scope, $cordovaCamera, $cordovaFile, $state, $stateParams, $ionicLoading, $ionicModal, TestService) {

    var QUESTION_STATE = null;

    $scope.test = {
        questions: []
    };
    $scope.newQuestion = {
        name: "",
        alternatives: [],
        correctAlternative: 0,
        image: null
    };
    $scope.newAlternative = {};
    $scope.selectedQuestion = null;
    $scope.selectedAlternative = {
        index: null
    };
    $scope.isEditing = false;
    $scope.title = "Novo teste";
    $scope.currentImage;

    $ionicModal.fromTemplateUrl('add-question.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.questionModal = modal;
    });

    if ($stateParams.testId) {
        $scope.title = "Visualizar teste";
        $scope.isEditing = true;
        TestService.getTest($stateParams.testId).then(function(test) {
            $scope.test = test;
        });
    }


    $scope.save = function() {
        $ionicLoading.show({
            hideOnStateChange: true
        });

        var successFunction = function() {
            $state.go('menu');
        };

        TestService.createTest($scope.test).then(successFunction);
    }

    $scope.addQuestion = function() {
        QUESTION_STATE = "INSERT";
        $scope.questionTitle = "Nova questão";
        $scope.selectedQuestion = $scope.newQuestion;
        $scope.currentImage = null;
        $scope.questionModal.show();
    };

    $scope.questionClicked = function(question) {
        QUESTION_STATE = "UPDATE";
        $scope.questionTitle = "Visualizar questão";
        $scope.selectedQuestion = question;
        $scope.selectedAlternative.index = $scope.selectedQuestion.correctAlternative;
        if($scope.isEditing){
            TestService.getQuestionImage($scope.test.id, question.id).then(function(image) {
                if (image) {
                    $scope.currentImage = "data:image/jpg;base64," + image;
                }
                $scope.questionModal.show();
            });
        } else {
            if ($scope.selectedQuestion.image) {
                $scope.currentImage = "data:image/jpg;base64," + $scope.selectedQuestion.image;
            }
            $scope.questionModal.show();
        }
    };

    $scope.addAlternative = function() {
        if ($scope.newAlternative.name) {
            $scope.selectedQuestion.alternatives.push($scope.newAlternative);
            $scope.newAlternative = {};
        }
    };

    $scope.okQuestion = function(question) {
        if (QUESTION_STATE == "INSERT") {
            $scope.test.questions.push({
                name: $scope.newQuestion.name,
                alternatives: $scope.newQuestion.alternatives,
                correctAlternative: $scope.selectedAlternative.index,
                image: $scope.newQuestion.image
            });
        } else {
            question.correctAlternative = $scope.selectedAlternative.index;
        }

        $scope.selectedAlternative = {
            index: null
        };
        $scope.newAlternative = {};
        $scope.newQuestion = {
            name: "",
            alternatives: [],
            correctAlternative: 0,
            image: null
        };
        $scope.selectedQuestion = null;
        $scope.questionModal.hide();
        QUESTION_STATE = null;
        $scope.currentImage = null;
    };

    $scope.questionCancel = function(question) {
        $scope.selectedAlternative = {
            index: null
        };
        $scope.newAlternative = {};
        $scope.newQuestion = {
            name: "",
            alternatives: [],
            correctAlternative: 0,
            image: null
        };
        $scope.selectedQuestion = null;
        $scope.questionModal.hide();
        QUESTION_STATE = null;
        $scope.currentImage = null;
    };

    $scope.addImage = function() {

        var options = {
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {

            onImageSuccess(imageData);

            function onImageSuccess(dataURL) {
                $scope.selectedQuestion.image = dataURL;
                $scope.currentImage = "data:image/jpg;base64," + dataURL;
            }

        }, function(err) {
            console.log(err);
        });
    }

    $scope.isSaveTestDisabled = function(isValid) {
        if (isValid && $scope.test.questions.length > 0) {
            return false;
        }
        return true;
    }

    $scope.isAddQuestionDisabled = function(isValid, question) {
        if (isValid && question.alternatives && question.alternatives.length >= 2 && question.alternatives.length <= 5 && $scope.selectedAlternative.index != null) {
            return false;
        }
        return true;
    }
    
    $scope.cancel = function(){
        $state.go('tests');
    }

    $scope.deleteQuestion = function(index) {
        $scope.test.questions.splice(index, 1);
    }

    $scope.deleteAlternative = function(index) {
        $scope.selectedAlternative.index = null;
        $scope.selectedQuestion.alternatives.splice(index, 1);
    }
    
});