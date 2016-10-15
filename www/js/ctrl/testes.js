Iris.controller('TestesCtrl', function($scope, $stateParams, $rootScope, $http, $state, $ionicLoading, Testes) {
	
	Testes.getTestes().success(function(testes) {
        $scope.testes = testes;
    });

	if ($stateParams.testeId) {
		Testes.getTeste($stateParams.testeId).success(function(teste) {
			$scope.teste = teste;
			$scope.viewTitle = $scope.teste.nome;
            console.log($scope.teste);
		});
	}

    $scope.register = function() {
        $ionicLoading.show({hideOnStateChange: true});
		$state.go('cadastro-teste');
    }

    $scope.execute = function() {
        $ionicLoading.show({hideOnStateChange: true});
		$state.go('escolha-aluno');
    }

    $scope.registerStudent = function() {
        $ionicLoading.show({hideOnStateChange: true});
		$state.go('cadastro-aluno');
    }

    $scope.reports = function() {
        $ionicLoading.show({hideOnStateChange: true});
        $state.go('relatorios');
    }

});