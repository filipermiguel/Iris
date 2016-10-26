Iris.controller('RealizaTesteCtrl', function($scope, $state, $ionicLoading, $ionicModal, Testes, AlunoService) {   

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

    $scope.perguntaAtual;
    $scope.alternativaSelecionada = { index : null }; 
    $scope.infoTeste = { perguntaIndex: 0, respostasCorretas: 0};
    $scope.fimModal;
    $scope.imagemPergunta;

    $ionicModal.fromTemplateUrl('fim-teste.html', { scope: $scope }).then(function(modal) {
        $scope.fimModal = modal;
    });
    
    
	if($state.params.id) {
		Testes.getTeste($state.params.id).then(function(teste) {
			$scope.teste = teste;

            $scope.perguntaAtual = $scope.teste.perguntas[0];
            $scope.infoTeste.perguntaIndex = 1;

            Testes.getImagemPergunta($state.params.id, $scope.perguntaAtual.id).then(function(imagem) {
                $scope.imagemPergunta = imagem;
            });
		});

        AlunoService.getAlunoByRg($state.params.rg).then(function(aluno) {
            $scope.aluno = aluno;
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

        if($scope.infoTeste.perguntaIndex > 0 && $scope.infoTeste.perguntaIndex < $scope.teste.perguntas.length){
            $scope.perguntaAtual = $scope.teste.perguntas[$scope.infoTeste.perguntaIndex];

            Testes.getImagemPergunta($state.params.id, $scope.perguntaAtual.id).then(function(imagem) {
                $scope.imagemPergunta = imagem;
            });

            $scope.infoTeste.perguntaIndex++;
            $scope.alternativaSelecionada.index = null;
        } else {
            var aproveitamento = ($scope.infoTeste.respostasCorretas / $scope.infoTeste.perguntaIndex) * 100; 
            $scope.infoTeste.aproveitamento = parseFloat(Math.round(aproveitamento * 100) / 100).toFixed(2);  
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
        $scope.infoTeste.aproveitamento = 0;
        
        var successFunction = function() {
            $state.go('escolha-aluno');
        };
        
        Testes.salvarResultado($scope.resultadoTeste).success(successFunction);
    }
    
    $scope.isNextQuestionDisabled = function(){
        if($scope.alternativaSelecionada.index == null){
            return false;
        }
        return true;
    }

    $scope.voltar = function(){
        $state.go('escolha-aluno');
    }
});