Iris.service('AlunoService', ['$http', function ($http) {

	var urlBase = serverAddress + '/aluno/';

    this.getAlunos = function() {
        return $http.get(urlBase);
    };

    this.criarAluno = function(aluno) {
      return $http.post(urlBase + "create", aluno);
    };

    this.atualizarAluno = function(aluno) {
        return $http.put(urlBase + "update", aluno);
    };

    this.getAlunoByNome = function(nome) {
        return $http.get(urlBase + "nome/" + nome);
    };

    this.getAlunoByRg = function(rg) {
        return $http.get(urlBase + "rg/" + rg);
    };

    this.getStudentTestsDone = function(rg) {
        return $http.get(urlBase + "rg/" + rg + "/test");
    };

    this.getStudentTestDoneListDates = function(rg, testeId) {
        return $http.get(urlBase + "rg/" + rg + "/test/" + testeId);
    };

}]);