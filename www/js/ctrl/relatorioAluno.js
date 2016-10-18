Iris.controller('RelatorioAlunoCtrl', function($scope, $stateParams, $rootScope, $http, $state, $ionicModal, Testes) {

	$scope.resultado = $state.params.resultado;
	$scope.infoResultado = JSON.parse($scope.resultado.resultado);
	$scope.perguntaSelecionada = {};
	$scope.respostaAluno = {};

	if($scope.infoResultado){
		var qtdCorretas = 0;

		for (i = 0; i < $scope.infoResultado.length; i++) { 
			if($scope.infoResultado[i].isCorreta){
				qtdCorretas++;
			}
		}

		$scope.qtdCorretas = qtdCorretas;
		var aproveitamento = (qtdCorretas / $scope.infoResultado.length) * 100; 
		$scope.porcentagemCorretas = parseFloat(Math.round(aproveitamento * 100) / 100).toFixed(2); 
	}

	$ionicModal.fromTemplateUrl('visualizar-pergunta.html', { scope: $scope }).then(function(modal) {
        $scope.perguntaModal = modal;
    });

	$scope.isCorrect = function(pergunta) {
		var infoPergunta = $scope.infoResultado.filter(function(obj) {
			return obj.pergunta == pergunta.id;
		});

		if(infoPergunta[0].isCorreta){
			return { "background-color": "rgb(208,253,216)" };
		} else {
			return { "background-color": "rgb(255,206,207)" };
		}
	} 

	$scope.perguntaClicked = function(pergunta) {
		$scope.perguntaSelecionada = pergunta;

		var infoPergunta = $scope.infoResultado.filter(function(obj) {
			return obj.pergunta == pergunta.id;
		});

		var alternativa = $scope.perguntaSelecionada.alternativas.filter(function(obj) {
			return obj.id == infoPergunta[0].resposta;
		});

		$scope.respostaAluno = alternativa[0];

        Testes.getImagemPergunta($scope.resultado.teste.id, $scope.perguntaSelecionada.id).success(function(imagem) {
           $scope.imagemPergunta = imagem;
        });

		$scope.perguntaModal.show();
	}

	$scope.voltar = function(pergunta) {
		$scope.perguntaSelecionada = {};
		$scope.perguntaModal.hide();
	}

	$scope.voltarTestes = function(){
		$state.go('testes');
	}
})
