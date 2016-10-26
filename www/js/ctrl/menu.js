Iris.controller('MenuCtrl', function($scope, $state, $ionicLoading, Testes, AlunoService, UserService) {
	
    //cache tests
    Testes.getTestes();
    //cache students
    AlunoService.getAlunos($scope.alunos);

    $scope.showAdminMenu = function(){
        var currentUser = UserService.getCurrentUser();
        return currentUser && currentUser.nome == "admin" ? true : false;
    }

    $scope.tests = function() {
        $ionicLoading.show({hideOnStateChange: true});
        $state.go('testes');
    };

    $scope.register = function() {
        $ionicLoading.show({hideOnStateChange: true});
		$state.go('cadastro-teste');
    };

    $scope.execute = function() {
        $ionicLoading.show({hideOnStateChange: true});
		$state.go('escolha-aluno');
    };

    $scope.registerStudent = function() {
        $ionicLoading.show({hideOnStateChange: true});
		$state.go('cadastro-aluno');
    };

    $scope.reports = function() {
        $ionicLoading.show({hideOnStateChange: true});
        $state.go('relatorios');
    };

    $scope.usuarios = function() {
        $ionicLoading.show({hideOnStateChange: true});
        $state.go('usuarios');
    };

    $scope.logOff = function() {
        UserService.logoff();
        $ionicLoading.show({hideOnStateChange: true});
        $state.go('login');
    };

});