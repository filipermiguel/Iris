Iris.controller('EscolhaHistoricoAlunoRelatorioCtrl', function($scope, $stateParams, $rootScope, $http, $state, $ionicPopup, $ionicLoading, $ionicScrollDelegate, AlunoService) {

	$scope.formData = {};
	$scope.aluno = {};
	$scope.studentTest = {};
	$scope.selectedDate = { date : null};
	$scope.slider = {};
	var datas = [];

	$scope.data = {
		selected: null
	};

	$scope.data2 = {
		selected: null
	};

	AlunoService.getAlunos($scope.alunos).success(function(alunos) {
		$scope.alunos = alunos;
	});

	$scope.showReport = function() {
		var resultados = $scope.testResults.filter(function(obj) {
			return obj.data >= datas[$scope.slider.minValue] && obj.data <= datas[$scope.slider.maxValue];
		});

		$ionicLoading.show({hideOnStateChange: true});
		$state.go('historico-aluno-relatorio', { historicoResultados: resultados });
	}

	$scope.clickAluno = function(aluno) {
		$scope.aluno = aluno;	

		AlunoService.getStudentTestsDone($scope.aluno.rg).success(function(studentTests) {

			if(studentTests.length > 0){
				$scope.studentTests = studentTests;
			} else {
				$scope.studentTests = [];
				$scope.studentTest = {};
				$scope.selectedDate = {};
				$ionicLoading.hide();
				$ionicPopup.alert({
					template: 'Aluno não possui testes'
				});
			}
		});
	}

	$scope.clickTeste = function(studentTest) {
		$scope.studentTest = studentTest;	

		AlunoService.getStudentTestDoneListDates($scope.aluno.rg, $scope.studentTest.id).success(function(testResults) {

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
    						return ''; //error case
    					}
    				}
    			};

    		} else {
    			$scope.testResults = {};
    		}
    	});
	}
})