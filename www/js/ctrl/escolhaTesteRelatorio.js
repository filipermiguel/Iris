Iris.controller('EscolhaTesteRelatorioCtrl', function($scope, $stateParams, $rootScope, $http, $state, $ionicLoading, Testes) {

	var today = new Date();
	var todayz = new Date();
	todayz.setFullYear(todayz.getFullYear() - 1);
	var oneYearAgo = todayz;

    $scope.data = {
        selected: null
    };

    $scope.slider = {
        minValue: 20,
        maxValue: 80,
        options: {
            floor: 0,
            ceil: 100,
            step: 1,
            translate: function (value) {
                return value + '%';
            }
        }
    };

    $scope.periodo = {
    	inicio: oneYearAgo,
    	fim: today
    };

    Testes.getTestes().success(function(testes) {
        $scope.testes = testes;
    });

    $scope.showReport = function(){
        $ionicLoading.show({hideOnStateChange: true});
        $state.go('escolha-resultado-relatorio', { teste: $scope.data.selected, aproveitamento: { minimo: $scope.slider.minValue, maximo: $scope.slider.maxValue }, periodo: $scope.periodo });
    }
})