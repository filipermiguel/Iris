Iris.controller('EscolhaHistoricoAlunoRelatorioCtrl', function($scope, $state, $ionicPopup, $ionicLoading, AlunoService) {

	$scope.slider = {};
	var datas = [];

	$scope.searchAluno = {
		selected: null
	};

	$scope.searchTeste = {
		selected: null
	};

	AlunoService.getAlunos($scope.alunos).then(function(alunos) {
		$scope.alunos = alunos;
	});

	$scope.showReport = function() {
		var resultados = $scope.testResults.filter(function(obj) {
			return obj.data >= datas[$scope.slider.minValue] && obj.data <= datas[$scope.slider.maxValue];
		});
		$ionicLoading.show({hideOnStateChange: true});
		$state.go('historico-aluno-relatorio', { historicoResultados: resultados });
	}

	$scope.onSelectStudent = function() {
		AlunoService.getStudentTestsDone($scope.searchAluno.selected.rg).success(function(studentTests) {
			$scope.searchTeste.selected = null;
			if(studentTests.length > 0){
				$scope.testes = studentTests;
			} else {
				$scope.testes = [];
				$ionicLoading.hide();
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
				for(i = 0; i < testResults.length; i++){
					datas.push(testResults[i].data);
				}
				$scope.slider = {
					minValue: 0,
					maxValue: datas.length - 1,
					step: 1,
					options: {
						floor: 0,
						ceil: datas.length - 1,
						translate: function (index) {
							if(index >= 0 && index < datas.length){
								var data = new Date(datas[index]);
								return data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();
							}
    						return '';
    					}
    				}
    			};
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