Iris.controller('EscolhaAlunoCtrl', function($scope, $stateParams, $rootScope, $http, $state, $ionicLoading, AlunoService, Testes) {

	$scope.searchAluno = {};
	$scope.searchTeste = {};

	AlunoService.getAlunos($scope.alunos).success(function(alunos) {
		$scope.alunos = alunos;
	});

	Testes.getTestes().success(function(testes) {
        $scope.testes = testes;
    });

	$scope.executeTest = function(teste) {
        $ionicLoading.show({hideOnStateChange: true});
		$state.go('realiza-teste', { rg: $scope.searchAluno.selected.rg, id: $scope.searchTeste.selected.id });
    }

   	$scope.isBeginTestDisabled = function() {
        if($scope.searchAluno.selected && $scope.searchTeste.selected){
        	return false;
        }
        return true;
    }
})