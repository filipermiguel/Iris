Iris.controller('TestesCtrl', function($scope, $stateParams, $rootScope, $state, $ionicLoading, $ionicPopup, Testes) {
	
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

	$scope.voltar = function() {
        $ionicLoading.show({hideOnStateChange: true});
        $state.go('menu');
    }

});