Iris.controller('EscolhaAlunoCtrl', function($scope, $state, $ionicLoading, $ionicPopup, AlunoService, Testes) {

	$scope.searchAluno = {};
	$scope.searchTeste = {};

	AlunoService.getAlunos($scope.alunos).then(function(alunos) {
		$scope.alunos = alunos;
	});

	Testes.getTestes().then(function(testes) {
        $scope.testes = testes;
    });

	$scope.executeTest = function() {
        var isExecuteTest = true;
        Testes.studentHasResultToday($scope.searchTeste.selected, $scope.searchAluno.selected.rg).success(function(hasResult) {
            if(!hasResult) {
                $ionicLoading.show({hideOnStateChange: true});
                $state.go('realiza-teste', { rg: $scope.searchAluno.selected.rg, id: $scope.searchTeste.selected.id });
            } else {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Falha ao começar teste.',
                    template: 'Aluno já executou este teste hoje!'
                });
            }
        });
    }

   	$scope.isBeginTestDisabled = function() {
        if($scope.searchAluno.selected && $scope.searchTeste.selected){
        	return false;
        }
        return true;
    }

    $scope.voltar = function() {
        $ionicLoading.show({hideOnStateChange: true});
        $state.go('menu');
    }
})