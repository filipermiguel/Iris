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

	this.retornarResultados = function(teste, aproveitamento, periodo) {
		var query = "";
		if(aproveitamento){
			query = "aproveitamentoMinimo=" + aproveitamento.minimo + "&aproveitamentoMaximo=" + aproveitamento.maximo;
		}
		if(periodo){
			if(aproveitamento){
				query = query + "&";
			}
			query = query + "inicio=" + periodo.inicio.getFullYear() + "-" + (periodo.inicio.getMonth() + 1)  + "-" + periodo.inicio.getDate() + //
			"&fim=" + periodo.fim.getFullYear() + "-" + (periodo.fim.getMonth() + 1) + "-" + periodo.fim.getDate();
		}


		return $http.get(urlBase + teste.id + "/resultados" + (query ? "?" + query : ""));
	};

	this.studentHasResultToday = function(teste, rg) {
		var today = new Date();
		var query = "rg=" + rg + "&data=" + today.getFullYear() + "-" + (today.getMonth() + 1)  + "-" + today.getDate();

		return $http.get(urlBase + teste.id + "/resultado?" + query);
	};

}]);