Iris.controller('CadastroAlunoCtrl', function($scope, $state, AlunoService) {

    $scope.aluno = {
        rg: null,
        nome: "",
        dataNascimento: ""
    };

	$scope.salvar = function() {
        var successFunction = function() {
            $state.go('menu');
        };

		AlunoService.criarAluno($scope.aluno).then(successFunction);
	}

    $scope.cancelar = function(){
        $state.go('menu');
    }
    
});