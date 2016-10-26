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

	this.login = function(nome, senha) {
        return $http.post(serverAddress + "/user/login", { "nome": nome, "senha": senha });
	};
    
    this.logoff = function() {
        $window.localStorage["user"] = null;
    }
	
	this.criarUsuario = function(nome, senha) {
		return $http.post(serverAddress + "/user/create", { "nome": nome, "senha": senha });
	};
    
    this.getUsuario = function(nome) {
        return $http.get(serverAddress + "/user/nome/" + nome);
    };

    this.getUsuarios = function() {
        return $http.get(urlBase);
    };

    this.removerUsuario = function(id) {
        return $http.delete(urlBase + id);
    };

    this.alterarSenha = function(id, senha) {
        return $http.post(urlBase + "id/" + id + "/alterarSenha/" + senha);
    };

}]);