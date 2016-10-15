Iris.controller('CadastroTesteCtrl', function($scope, $cordovaCamera, $cordovaFile, $state, $stateParams, $ionicLoading, $ionicModal, Testes) {

	$scope.teste = {
        perguntas: []
    };

	$scope.viewTitle = "Criar teste";
    $scope.novaPergunta = {
        nome: "",
        alternativas: [],
        alternativaCorreta: 0,
        imagem: null
    };
    $scope.novaAlternativa = {};
    $scope.perguntaSelecionada;
    $scope.alternativaSelecionada = { index: null };

    $ionicModal.fromTemplateUrl('add-pergunta-teste.html', { scope: $scope }).then(function(modal) {
        $scope.perguntaModal = modal;
    });
    
	if ($stateParams.testeId) {
        $scope.viewTitle = "Editar teste";
		Testes.getTeste($stateParams.testeId).success(function(teste) {
			$scope.teste = teste;
            console.log($scope.teste);
		});
	}

	
	$scope.salvar = function() {
        $ionicLoading.show({hideOnStateChange: true});
        
        var successFunction = function() {
            $state.go('testes');
        };
        
		if ($scope.teste.id) {
			Testes.atualizarTeste($scope.teste).success(successFunction);
		} else {
			Testes.criarTeste($scope.teste).success(successFunction);
		}
	}
    
    $scope.addPergunta = function() {
        $scope.perguntaSelecionada = $scope.novaPergunta;
        $scope.perguntaModal.show();
    };
    
    $scope.perguntaClicked = function(pergunta) {
        $scope.perguntaSelecionada = pergunta;
        $scope.perguntaModal.show();
    };
    
    $scope.addAlternativa = function() {
        if ($scope.novaAlternativa.nome) {
            $scope.perguntaSelecionada.alternativas.push($scope.novaAlternativa);
            $scope.novaAlternativa = {};
        }
    };

    $scope.okPergunta = function () {
        if ($scope.novaPergunta.nome) {
            $scope.teste.perguntas.push({
                nome: $scope.novaPergunta.nome,
                alternativas: $scope.novaPergunta.alternativas,
                alternativaCorreta: $scope.alternativaSelecionada.index,
                imagem : $scope.novaPergunta.imagem
            });
        }
        $scope.alternativaSelecionada = { index: null };
        $scope.novaAlternativa = {};
        $scope.novaPergunta = {
            nome: "",
            alternativas: [],
            alternativaCorreta: 0,
            imagem: null
        };
        $scope.perguntaSelecionada = {};
        $scope.perguntaModal.hide();
    };
    
    $scope.addImage = function() {
    // 2
    var options = {
        destinationType : Camera.DestinationType.DATA_URL,
        sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit : false,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
    };
    
    // 3
    $cordovaCamera.getPicture(options).then(function(imageData) {
 
        // 4
        onImageSuccess(imageData);
 
        function onImageSuccess(fileURI) {
            //createFileEntry(fileURI);
            $scope.perguntaSelecionada.imagem = fileURI;
        }
 
    }, function(err) {
        console.log(err);
    });
}

});