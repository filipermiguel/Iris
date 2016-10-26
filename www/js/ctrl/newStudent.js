Iris.controller('NewStudentCtrl', function($scope, $state, StudentService) {

    $scope.student = {
        rg: null,
        name: "",
        birthDate: ""
    };

	$scope.save = function() {
        var successFunction = function() {
            $state.go('menu');
        };

		StudentService.createStudent($scope.student).then(successFunction);
	}

    $scope.cancel = function(){
        $state.go('menu');
    }
    
});