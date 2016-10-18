Iris.controller('TestesCtrl', function($scope, $stateParams, $rootScope, $state, $ionicLoading, Testes) {
	
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

    $scope.removerTeste = function(teste, index) {
        $scope.testes.splice(index, 1);
        Testes.removerTeste(teste.id);
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

    $scope.cadastrarUsuario = function() {
        $ionicLoading.show({hideOnStateChange: true});
        $state.go('cadastro-usuario');
    }

});