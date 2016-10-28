Iris.service('StudentService', ['$http', '$q', 'CacheFactory', function ($http, $q, CacheFactory) {

	var urlBase = serverAddress + '/student/';

    CacheFactory('studentCache', {
        maxAge: 15 * 60 * 1000, // Items added to this cache expire after 15 minutes
        cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour
        deleteOnExpire: 'aggressive' // Items will be deleted from this cache when they expire
    });

    this.getStudents = function() {
        var deferred = $q.defer();
        var studentCache = CacheFactory.get('studentCache');

        if (studentCache.values().length > 0) {
            deferred.resolve(studentCache.values());
        } else {
            $http.get(urlBase).success(function (data) {
                for(i = 0; i < data.length; i++){
                    studentCache.put(data[i].rg.toString(), data[i]);
                }
                deferred.resolve(data);
            });
        }
        return deferred.promise;
    };

    this.createStudent = function(student) {
        var deferred = $q.defer();
        var studentCache = CacheFactory.get('studentCache');

        $http.post(urlBase + "create", student).success(function () {
            studentCache.put(student.rg.toString(), student);
            deferred.resolve(student);
        }).error(function() {
            deferred.resolve(null);
        });

        return deferred.promise;
    };

    this.getStudentByRg = function(rg) {
        var deferred = $q.defer();
        var studentCache = CacheFactory.get('studentCache');

        if (studentCache.get(rg)) {
            deferred.resolve(studentCache.get(rg));
        } else {
            $http.get(urlBase + "rg/" + rg).success(function (data) {
                studentCache.put(data.rg.toString(), data);
                deferred.resolve(data);
            });
        }
        return deferred.promise;
    };

    this.getStudentTestsDone = function(rg) {
        return $http.get(urlBase + "rg/" + rg + "/test");
    };

    this.getStudentTestDoneListDates = function(rg, testId) {
        return $http.get(urlBase + "rg/" + rg + "/test/" + testId);
    };

}]);