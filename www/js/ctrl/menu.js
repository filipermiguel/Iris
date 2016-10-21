Iris.controller('MenuCtrl', function($scope, $stateParams, $rootScope, $state, $ionicLoading, $ionicPopup, Testes) {
	
    $scope.tests = function() {
        $ionicLoading.show({hideOnStateChange: true});
        $state.go('testes');
    }

    $scope.register = function() {
        $ionicLoading.show({hideOnStateChange: true});
		$state.go('cadastro-teste');
    }

    $scope.removerTeste = function(teste, index) {
        Testes.removerTeste(teste.id).success(function() {
            $scope.testes.splice(index, 1);
        }).error(function(data) {
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: 'Falha na remoção.',
                template: 'Já existem resultados para este teste.'
            });
        });
    }

    $scope.execute = function() {
        $ionicLoading.show({hideOnStateChange: true});
		$state.go('escolha-aluno');
    }

    $scope.registerStudent = function() {
        $ionicLoading.show({hideOnStateChange: true});
		$state.go('cadastro-aluno');
    }

    $scope.reports = function() {
        $ionicLoading.show({hideOnStateChange: true});
        $state.go('relatorios');
    }

    $scope.cadastrarUsuario = function() {
        $ionicLoading.show({hideOnStateChange: true});
        $state.go('cadastro-usuario');
    }

    $scope.logOff = function() {
        $ionicLoading.show({hideOnStateChange: true});
        $state.go('login');
    }

});