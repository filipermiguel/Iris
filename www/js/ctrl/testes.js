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

	$scope.removerTeste = function(teste, index) {
        Testes.removerTeste(teste.id).success(function() {
            $scope.testes.splice(index, 1);
        }).error(function(data) {
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: 'Falha na remoção.',
                template: 'Já existem resultados para este teste.'
            });
        });
    }

	$scope.voltar = function() {
        $ionicLoading.show({hideOnStateChange: true});
        $state.go('menu');
    }

});