Iris.controller('EscolhaAlunoRelatorioCtrl', function($scope, $stateParams, $rootScope, $http, $state, $ionicPopup, $ionicLoading, $ionicScrollDelegate, AlunoService) {

	$scope.formData = {};
	$scope.aluno = {};
	$scope.studentTest = {};
	$scope.selectedDate = { date : null};

	$scope.data = {
		selected: null
	};

	$scope.data2 = {
		selected: null
	};

	$scope.data3 = {
		selected: null
	};

	AlunoService.getAlunos($scope.alunos).success(function(alunos) {
		$scope.alunos = alunos;
	});

	$scope.showReport = function() {
		$ionicLoading.show({hideOnStateChange: true});
		$state.go('relatorio-aluno', { aluno: $scope.aluno, teste: $scope.studentTest, resultado: $scope.data3.selected });
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
			} else {
				$scope.testResults = {};
			}
		});
	}

	$scope.clickDate = function(data) {
		$scope.selectedDate.date = data;	
	}
})