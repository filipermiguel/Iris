Iris.controller('EscolhaResultadoRelatorioCtrl', function($scope, $stateParams, $rootScope, $http, $state, $ionicLoading, Testes) {

	$scope.teste = $state.params.teste;
	$scope.aproveitamento = $state.params.aproveitamento;
	$scope.periodo = $state.params.periodo;

	Testes.retornarResultados($scope.teste, $scope.aproveitamento, $scope.periodo).success(function(resultados) {
        $scope.resultados = resultados;
    });

	$scope.viewStudentResult = function(resultado){
		$ionicLoading.show({hideOnStateChange: true});
        $state.go('relatorio-aluno', { resultado: resultado, origem: "TESTE" });
	}		

	$scope.voltar = function(){
		$ionicLoading.show({hideOnStateChange: true});
        $state.go('escolha-teste-relatorio');
	}
})