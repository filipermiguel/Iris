Iris.controller('NewStudentCtrl', function($scope, $state, $ionicLoading, $ionicPopup, StudentService) {

    $scope.student = {
        rg: null,
        name: "",
        birthDate: ""
    };

	$scope.save = function() {
        $ionicLoading.show({
            hideOnStateChange: true
        });

		StudentService.createStudent($scope.student).then(function(data) {
            if (data) {
                $state.go('menu');
            } else {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Falha no cadastro.',
                    template: 'RG já cadastrado.'
                });
            }
        });
	}

    $scope.cancel = function(){
        $state.go('menu');
    }
    
});