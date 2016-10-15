Iris.controller('EscolhaTesteRelatorioCtrl', function($scope, $stateParams, $rootScope, $http, $state, Testes) {

	var today = new Date();
	var todayz = new Date();
	todayz.setFullYear(todayz.getFullYear() - 1);
	var oneYearAgo = todayz;

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
    	dataInicial: oneYearAgo,
    	dataFinal: today
    };

	Testes.getTestes().success(function(testes) {
		$scope.testes = testes;
	});

	$scope.showReport = function(){
		$ionicLoading.show({hideOnStateChange: true});
		//$state.go('relatorio-aluno', { aluno: $scope.aluno, teste: $scope.studentTest, resultado: $scope.data3.selected });
	}
})