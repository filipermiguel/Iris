Iris.service('UserService', function ($http, $window) {

	var urlBase = serverAddress + '/user/';
    var user = null;

	this.getUser = function() {
        var localUser = null;
        if ($window.localStorage["user"]) {
            localUser = JSON.parse($window.localStorage["user"]) 
        }
        return user || localUser;
    };
    
    this.saveUser = function(_user) {
        user = _user;
        $window.localStorage["user"] = JSON.stringify(user);
    };

	this.login = function(nome, senha) {
		return $http.post(serverAddress + "/user/login", { "nome": nome, "senha": senha });
	};
    
    this.logout = function() {
        $window.localStorage["user"] = null;
    }
	
	this.criarUsuario = function(nome, senha) {
		return $http.post(serverAddress + "/user/create", { "nome": nome, "senha": senha });
	};
    
    this.getUsuario = function(nome) {
        return $http.get(serverAddress + "/user/nome/" + nome);
    };

});