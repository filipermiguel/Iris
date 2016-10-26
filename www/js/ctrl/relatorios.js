Iris.controller('RelatoriosCtrl', function($scope, $state, $ionicLoading) {

    $scope.reportsByStudent = function() {
        $ionicLoading.show({hideOnStateChange: true});
		$state.go('escolha-aluno-relatorio');
    }

    $scope.reportsByTest = function() {
        $ionicLoading.show({hideOnStateChange: true});
		$state.go('escolha-teste-relatorio');
    }

    $scope.studentHistoricByTest = function() {
        $ionicLoading.show({hideOnStateChange: true});
		$state.go('escolha-historico-aluno-relatorio');
    }

    $scope.voltar = function() {
        $ionicLoading.show({hideOnStateChange: true});
        $state.go('menu');
    }

});