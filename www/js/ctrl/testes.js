Iris.controller('TestesCtrl', function($scope, $state, $ionicLoading, $ionicPopup, Testes) {

	Testes.getTestes().then(function(testes) {
        $scope.testes = testes;
    });

	$scope.removerTeste = function(teste, index) {
        Testes.removerTeste(teste.id).then(function(isRemoved) {
            if(isRemoved){
                $scope.testes.splice(index, 1);
            } else {
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Falha na remoção.',
                    template: 'Já existem resultados para este teste.'
                });
            }
        });
    }

	$scope.voltar = function() {
        $ionicLoading.show({hideOnStateChange: true});
        $state.go('menu');
    }

});