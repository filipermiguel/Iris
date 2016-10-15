Iris.service('Testes', ['$http', function ($http) {

	var urlBase = serverAddress + '/testes/';

	this.getTeste = function(testeId) {
		return $http.get(urlBase + testeId);
	};

	this.getTestes = function() {
		return $http.get(urlBase);
	};

	this.getPerguntas = function(testeId) {
		return $http.get(urlBase + testeId + "/perguntas");
	};

	this.getPrimeiraPergunta = function(testeId) {
		return $http.get(urlBase + testeId + "/primeiraPergunta");
	};

	this.getPrimeiraImagem = function(testeId) {
		return $http.get(urlBase + testeId + "/primeiraImagem");
	};

	this.getImagemPergunta = function(testeId, perguntaId) {
		return $http.get(urlBase + testeId + "/imagemPergunta/" + perguntaId);
	};

	this.criarTeste = function(teste) {
		return $http.post(urlBase + "create", teste);
	};

	this.atualizarTeste = function(teste) {
		return $http.put(urlBase + 'update', teste)
	};

	this.removerTeste = function(id) {
		return $http.delete(urlBase + id);
	};

	this.salvarResultado = function(resultadoTeste) {
		return $http.post(urlBase + "salvarResultado", resultadoTeste);
	};

}]);