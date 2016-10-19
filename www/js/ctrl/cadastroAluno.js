Iris.controller('CadastroAlunoCtrl', function($scope, $state, $stateParams, $ionicLoading, $ionicModal, AlunoService) {

    $scope.aluno = {
        rg: null,
        nome: "",
        dataNascimento: ""
    };

	$scope.salvar = function() {
        var successFunction = function() {
            $state.go('testes');
        };

		AlunoService.criarAluno($scope.aluno).success(successFunction);
	}

    $scope.cancelar = function(){
        $state.go('testes');
    }
    
});