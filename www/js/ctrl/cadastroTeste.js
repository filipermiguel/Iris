Iris.controller('CadastroTesteCtrl', function($scope, $cordovaCamera, $cordovaFile, $state, $stateParams, $ionicPopup, $ionicLoading, $ionicModal, Testes) {

    $scope.teste = {
        nome: null,
        perguntas: []
    };

    var ESTADO_PERGUNTA = null;

    $scope.viewTitle = "Criar teste";
    $scope.novaPergunta = {
        nome: "",
        alternativas: [],
        alternativaCorreta: 0,
        imagem: null
    };
    $scope.novaAlternativa = {};
    $scope.perguntaSelecionada = null;
    $scope.alternativaSelecionada = {
        index: null
    };

    $ionicModal.fromTemplateUrl('add-pergunta-teste.html', {
        scope: $scope
    }).then(function(modal) {
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
        $ionicLoading.show({
            hideOnStateChange: true
        });

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
        ESTADO_PERGUNTA = "INSERT";
        $scope.perguntaSelecionada = $scope.novaPergunta;
        $scope.perguntaModal.show();
    };

    $scope.perguntaClicked = function(pergunta) {
        ESTADO_PERGUNTA = "UPDATE";
        $scope.perguntaSelecionada = pergunta;
        $scope.alternativaSelecionada.index = $scope.perguntaSelecionada.alternativaCorreta;
        $scope.perguntaModal.show();
    };

    $scope.addAlternativa = function() {
        if ($scope.novaAlternativa.nome) {
            $scope.perguntaSelecionada.alternativas.push($scope.novaAlternativa);
            $scope.novaAlternativa = {};
        }
    };

    $scope.okPergunta = function(pergunta) {
        if (ESTADO_PERGUNTA == "INSERT") {
            $scope.teste.perguntas.push({
                nome: $scope.novaPergunta.nome,
                alternativas: $scope.novaPergunta.alternativas,
                alternativaCorreta: $scope.alternativaSelecionada.index,
                imagem: $scope.novaPergunta.imagem
            });
        } else {
            pergunta.alternativaCorreta = $scope.alternativaSelecionada.index;
        }

        $scope.alternativaSelecionada = {
            index: null
        };
        $scope.novaAlternativa = {};
        $scope.novaPergunta = {
            nome: "",
            alternativas: [],
            alternativaCorreta: 0,
            imagem: null
        };
        $scope.perguntaSelecionada = null;
        $scope.perguntaModal.hide();
        ESTADO_PERGUNTA = null;
    };

    $scope.cancelarPergunta = function(pergunta) {
        $scope.alternativaSelecionada = {
            index: null
        };
        $scope.novaAlternativa = {};
        $scope.novaPergunta = {
            nome: "",
            alternativas: [],
            alternativaCorreta: 0,
            imagem: null
        };
        $scope.perguntaSelecionada = null;
        $scope.perguntaModal.hide();
        ESTADO_PERGUNTA = null;
    };

    $scope.addImage = function() {

        var options = {
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {

            onImageSuccess(imageData);

            function onImageSuccess(fileURI) {
                $scope.perguntaSelecionada.imagem = fileURI;
            }

        }, function(err) {
            console.log(err);
        });
    }

    $scope.isSaveTestDisabled = function(isValid) {
        if (isValid && $scope.teste.perguntas.length > 0) {
            return false;
        }
        return true;
    }

    $scope.isAddQuestionDisabled = function(isValid, pergunta) {
        if (isValid && pergunta.alternativas.length >= 2 && pergunta.alternativas.length <= 5 && $scope.alternativaSelecionada.index != null) {
            return false;
        }
        return true;
    }

    $scope.cancelar = function(){
        $state.go('testes');
    }

    $scope.removerQuestao = function(index) {
        $scope.teste.perguntas.splice(index, 1);
    }

    $scope.removeAlternativa = function(index) {
        $scope.alternativaSelecionada.index = null;
        $scope.perguntaSelecionada.alternativas.splice(index, 1);
    }

});