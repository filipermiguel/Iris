Iris.controller('MenuCtrl', function($scope, $state, $ionicLoading, TestService, UserService, StudentService) {
	
    //cache tests
    TestService.getTests();
    //cache students
    StudentService.getStudents($scope.students);

    $scope.showAdminMenu = function(){
        var currentUser = UserService.getCurrentUser();
        return currentUser && currentUser.name == "admin" ? true : false;
    }

    $scope.tests = function() {
        $ionicLoading.show({hideOnStateChange: true});
        $state.go('tests');
    };

    $scope.newTest = function() {
        $ionicLoading.show({hideOnStateChange: true});
		$state.go('new-test');
    };

    $scope.executeTest = function() {
        $ionicLoading.show({hideOnStateChange: true});
		$state.go('choose-student-test');
    };

    $scope.newStudent = function() {
        $ionicLoading.show({hideOnStateChange: true});
		$state.go('new-student');
    };

    $scope.reports = function() {
        $ionicLoading.show({hideOnStateChange: true});
        $state.go('reports');
    };

    $scope.users = function() {
        $ionicLoading.show({hideOnStateChange: true});
        $state.go('users');
    };

    $scope.logOff = function() {
        UserService.logoff();
        $ionicLoading.show({hideOnStateChange: true});
        $state.go('login');
    };

});