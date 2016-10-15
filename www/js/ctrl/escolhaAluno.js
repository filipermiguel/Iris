Iris.controller('EscolhaAlunoCtrl', function($scope, $stateParams, $rootScope, $http, $state, $ionicLoading, $ionicScrollDelegate, AlunoService) {

	$scope.formData = {};

	AlunoService.getAlunos($scope.alunos).success(function(alunos) {
		$scope.alunos = alunos;
	});

	$scope.clearSearch = function() {
		$scope.formData.search = "";
	};

	$scope.chooseTest = function(aluno) {
        $ionicLoading.show({hideOnStateChange: true});
		$state.go('escolha-teste', { rg: aluno.rg });
    }
})

Iris.filter('searchAlunos', function(){
	return function (alunos, query) {
		if(alunos){
			var filtered = [];
			var letterMatch = new RegExp(query, 'i');
			for (var i = 0; i < alunos.length; i++) {
				var aluno = alunos[i];
				if (query) {
					if (letterMatch.test(aluno.nome.substring(0, query.length))) {
						filtered.push(aluno);
					}
				} else {
					filtered.push(aluno);
				}
			}
		}
		return filtered;
	};
});