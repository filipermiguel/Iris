Iris.controller('EscolhaAlunoRelatorioCtrl', function($scope, $stateParams, $rootScope, $http, $state, $ionicPopup, $ionicLoading, $ionicScrollDelegate, AlunoService) {

	$scope.testes = [];

	$scope.searchAluno = {
		selected: null
	};

	$scope.searchTeste = {
		selected: null
	};

	$scope.searchResult = {
		selected: null
	};

	AlunoService.getAlunos($scope.alunos).success(function(alunos) {
		$scope.alunos = alunos;
	});

	$scope.showReport = function() {
		$ionicLoading.show({hideOnStateChange: true});
		$state.go('relatorio-aluno', { resultado: $scope.searchResult.selected, origem: "ALUNO" });
	}

	$scope.onSelectStudent = function() {
		AlunoService.getStudentTestsDone($scope.searchAluno.selected.rg).success(function(studentTests) {
			$scope.searchTeste.selected = null;
			$scope.searchResult.selected = null;
			if(studentTests.length > 0){
				$scope.testes = studentTests;
			} else {
				$scope.testes = [];
				$ionicPopup.alert({
					template: 'Aluno não possui testes'
				});
			}
		});
	}

	$scope.onSelectTest = function() {
		AlunoService.getStudentTestDoneListDates($scope.searchAluno.selected.rg, $scope.searchTeste.selected.id).success(function(testResults) {

			if(testResults.length > 0){
				$scope.testResults = testResults;
			} else {
				$scope.testResults = {};
			}
		});
	}

	$scope.voltar = function() {
        $ionicLoading.show({hideOnStateChange: true});
        $state.go('relatorios');
    }
})