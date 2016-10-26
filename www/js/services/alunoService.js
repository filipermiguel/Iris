Iris.service('AlunoService', ['$http', '$q', 'CacheFactory', function ($http, $q, CacheFactory) {

	var urlBase = serverAddress + '/aluno/';

    CacheFactory('alunos', {
        maxAge: 15 * 60 * 1000, // Items added to this cache expire after 15 minutes
        cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour
        deleteOnExpire: 'aggressive' // Items will be deleted from this cache when they expire
    });

    this.getAlunos = function() {
        var deferred = $q.defer();
        var cacheAlunos = CacheFactory.get('alunos');

        if (cacheAlunos.values().length > 0) {
            deferred.resolve(cacheAlunos.values());
        } else {
            $http.get(urlBase).success(function (data) {
                for(i = 0; i < data.length; i++){
                    cacheAlunos.put(data[i].rg.toString(), data[i]);
                }
                deferred.resolve(data);
            });
        }
        return deferred.promise;
        //return $http.get(urlBase);
    };

    this.criarAluno = function(aluno) {
        var deferred = $q.defer();
        var cacheAlunos = CacheFactory.get('alunos');

        $http.post(urlBase + "create", aluno).success(function () {
            cacheAlunos.put(aluno.rg.toString(), aluno);
            deferred.resolve(aluno);
        });

        return deferred.promise;
        //return $http.post(urlBase + "create", aluno);
    };

    this.getAlunoByRg = function(rg) {
        var deferred = $q.defer();
        var cacheAlunos = CacheFactory.get('alunos');

        if (cacheAlunos.get(rg)) {
            deferred.resolve(cacheAlunos.get(rg));
        } else {
            $http.get(urlBase + "rg/" + rg).success(function (data) {
                cacheAlunos.put(data.rg.toString(), data);
                deferred.resolve(data);
            });
        }
        return deferred.promise;
        //return $http.get(urlBase + "rg/" + rg);
    };

    this.getStudentTestsDone = function(rg) {
        return $http.get(urlBase + "rg/" + rg + "/test");
    };

    this.getStudentTestDoneListDates = function(rg, testeId) {
        return $http.get(urlBase + "rg/" + rg + "/test/" + testeId);
    };

}]);