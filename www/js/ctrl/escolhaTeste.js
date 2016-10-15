Iris.controller('EscolhaTesteCtrl', function($scope, $stateParams, $rootScope, $http, $state, $ionicLoading, Testes) {
	
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

	$scope.executeTest = function(teste) {
        $ionicLoading.show({hideOnStateChange: true});
		$state.go('realiza-teste', { rg: $state.params.rg, id: teste.id });
    }

});