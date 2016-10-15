Iris.controller('RealizaTesteCtrl', function($scope, $cordovaCamera, $state, $stateParams, $ionicLoading, $ionicModal, Testes, AlunoService) {   

    $scope.teste = {
        nome: "",
        perguntas: []
    };

    $scope.aluno = {};

    $scope.resultadoTeste = {
        teste: 0,
        rg: 0,
        data: null,
        qtdAcertos: 0,
        resultado: ""
    };

    $scope.resultadoJSON = [];

    $scope.perguntas = [];
    $scope.perguntaAtual;
    $scope.alternativaSelecionada = { index : null}; 
    $scope.infoTeste = { perguntaIndex: 0, respostasCorretas: 0};
    $scope.fimModal;
    $scope.imagemPergunta;

    $ionicModal.fromTemplateUrl('fim-teste.html', { scope: $scope }).then(function(modal) {
        $scope.fimModal = modal;
    });
    
    
	if($state.params.id) {
		Testes.getTeste($state.params.id).success(function(teste) {
			$scope.teste = teste;
            $scope.viewTitle = $scope.teste.nome;
            console.log($scope.teste);
		});

        AlunoService.getAlunoByRg($state.params.rg).success(function(aluno) {
            $scope.aluno = aluno;
            console.log($scope.aluno);
        });

        Testes.getPerguntas($state.params.id).success(function(perguntas) {
            $scope.perguntas = perguntas;
        });


        Testes.getPrimeiraPergunta($state.params.id).success(function(primeiraPergunta) {
            $scope.perguntaAtual = primeiraPergunta;
            $scope.infoTeste.perguntaIndex = 1;
        });

        Testes.getPrimeiraImagem($state.params.id).success(function(imagem) {
            $scope.imagemPergunta = imagem;
        });
	}
	
    $scope.proximaPergunta = function () {
        if($scope.alternativaSelecionada.index == $scope.perguntaAtual.alternativaCorreta){
            $scope.infoTeste.respostasCorretas++;

            var resultado = {
                pergunta: $scope.perguntaAtual.id,
                resposta: $scope.perguntaAtual.alternativas[$scope.alternativaSelecionada.index].id,
                isCorreta: true
            };

            $scope.resultadoJSON.push(resultado);
        } else {

            var resultado = {
                pergunta: $scope.perguntaAtual.id,
                resposta: $scope.perguntaAtual.alternativas[$scope.alternativaSelecionada.index].id,
                isCorreta: false
            };

            $scope.resultadoJSON.push(resultado);
        }

        $scope.alternativaSelecionada.index = null;

        if($scope.infoTeste.perguntaIndex > 0 && $scope.infoTeste.perguntaIndex < $scope.perguntas.length){
            $scope.perguntaAtual = $scope.perguntas[$scope.infoTeste.perguntaIndex];

            Testes.getImagemPergunta($state.params.id, $scope.perguntaAtual.id).success(function(imagem) {
                $scope.imagemPergunta = imagem;
            });

            $scope.infoTeste.perguntaIndex++;
            $scope.alternativaSelecionada.index = null;
        } else {
            $scope.fimModal.show();
        }
    };

    $scope.finalizarTeste = function () {
        $ionicLoading.show({hideOnStateChange: true});

        var hoje = new Date();
        hoje.setHours(0,0,0,0);

        $scope.resultadoTeste = {
            teste: $scope.teste,
            aluno: $scope.aluno,
            data: hoje,
            qtdAcertos: $scope.infoTeste.respostasCorretas,
            resultado: JSON.stringify($scope.resultadoJSON) 
        }

        $scope.fimModal.hide();
        $scope.infoTeste.respostasCorretas = 0;
        
        var successFunction = function() {
            $state.go('testes');
        };
        
        Testes.salvarResultado($scope.resultadoTeste).success(successFunction);
    }
    
});