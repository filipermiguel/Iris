Iris.controller('RelatoriosCtrl', function($scope, $stateParams, $rootScope, $http, $state, $ionicLoading) {

    $scope.reportsByStudent = function() {
        $ionicLoading.show({hideOnStateChange: true});
		$state.go('escolha-aluno-relatorio');
    }

    $scope.reportsByTest = function() {
        $ionicLoading.show({hideOnStateChange: true});
		$state.go('escolha-teste-relatorio');
    }

});