Iris.service('UserService', [ '$http', '$q', '$window', function ($http, $q, $window) {

	var urlBase = serverAddress + '/user/';

	this.getCurrentUser = function() {
        var currentUser = null;
        if ($window.localStorage["user"]) {
            currentUser = JSON.parse($window.localStorage["user"]) 
        }
        return currentUser;
    };

    this.saveUser = function(user) {
        $window.localStorage["user"] = JSON.stringify(user);
    };

	this.login = function(name, password) {
        return $http.post(serverAddress + "/user/login", { "name": name, "password": password });
	};
    
    this.logoff = function() {
        $window.localStorage["user"] = null;
    }
	
	this.createUser = function(name, password) {
		return $http.post(serverAddress + "/user/create", { "name": name, "password": password });
	};
    
    this.getUser = function(name) {
        return $http.get(serverAddress + "/user/name/" + name);
    };

    this.getUsers = function() {
        return $http.get(urlBase);
    };

    this.deleteUser = function(id) {
        return $http.delete(urlBase + id);
    };

    this.changePassword = function(id, password) {
        return $http.post(urlBase + "id/" + id + "/changePassword/" + password);
    };

}]);