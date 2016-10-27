Iris.service('TestService', ['$http', '$q', '$cordovaFile', 'CacheFactory', function($http, $q, $cordovaFile, CacheFactory) {

    var urlBase = serverAddress + '/test/';

    CacheFactory('testCache', {
        maxAge: 15 * 60 * 1000, // Items added to this cache expire after 15 minutes
        cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour
        deleteOnExpire: 'aggressive' // Items will be deleted from this cache when they expire
    });

    CacheFactory('imageCache', {
        maxAge: 15 * 60 * 1000, // Items added to this cache expire after 15 minutes
        cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour
        deleteOnExpire: 'aggressive' // Items will be deleted from this cache when they expire
    });

    this.getTest = function(testId) {
        var deferred = $q.defer();
        var testCache = CacheFactory.get('testCache');

        if (testCache.get(testId)) {
            deferred.resolve(testCache.get(testId));
        } else {
            $http.get(urlBase + testId).success(function(test) {
                for(i = 0; i < test.questions.length; j++) {
                    test.questions[i].image = null;
                }
                testCache.put(test.id.toString(), test);
                deferred.resolve(test);
            });
        }
        return deferred.promise;    
    };

    this.getTests = function() {
        var deferred = $q.defer();
        var testCache = CacheFactory.get('testCache');

        if (testCache.values().length > 0) {
            deferred.resolve(testCache.values());
        } else {
            $http.get(urlBase).success(function(tests) {
                for (i = 0; i < tests.length; i++) {
                    for(j = 0; j < tests[i].questions.length; j++) {
                        tests[i].questions[j].image = null;
                    }
                    testCache.put(tests[i].id.toString(), tests[i]);
                }
                deferred.resolve(tests);
            });
        }
        return deferred.promise;
    };

    this.getQuestionImage = function(testId, questionId) {
        var deferred = $q.defer();
        //var filename = testId + '-' + questionId + ".jpg"
        //var urlfile = cordova.file.dataDirectory + filename;
        var imageCache = CacheFactory.get('imageCache');
        var imageId = testId + '-' +  questionId;

        if (imageCache.get(imageId)) {
            deferred.resolve(imageCache.get(imageId));
        } else {
            $http.get(urlBase + testId + "/questionImage/" + questionId).success(function(image) {
                imageCache.put(imageId, image);
                deferred.resolve(image);
            });
        }  

        /*$cordovaFile.checkFile(cordova.file.dataDirectory, filename).then(function(result){
        	deferred.resolve(urlfile);
        }, function(err){
        	$http.get(urlBase + testId + "/questionImage/" + questionId).success(function (data) {
				savebase64AsImageFile(cordova.file.dataDirectory, filename, data, "image/jpg");
          		deferred.resolve(urlfile);
          	});
        });*/

      	return deferred.promise;
    };

    this.createTest = function(test) {
        var deferred = $q.defer();
        var testCache = CacheFactory.get('testCache');

        $http.post(urlBase + "create", test).success(function(test) {
            for(i = 0; i < test.questions.length; i++) {
                test.questions[i].image = null;
            }
            testCache.put(test.id.toString(), test);
            deferred.resolve(test);
        });

        return deferred.promise;
    };

    this.deleteTest = function(testId) {
        var deferred = $q.defer();
        var testCache = CacheFactory.get('testCache');

        $http.delete(urlBase + testId).success(function() {
            testCache.remove(testId.toString());
            deferred.resolve(true);
        }).error(function(data) {
            deferred.resolve(false);
        });

        return deferred.promise;
    };

    this.saveResult = function(testResult) {
        return $http.post(urlBase + "saveResult", testResult);
    };

    this.getResults = function(test, efficiency, period) {
        var query = "";
        if (efficiency) {
            query = "minimumEfficiency=" + efficiency.minimum + "&maximumEfficiency=" + efficiency.maximum;
        }
        if (period) {
            if (efficiency) {
                query = query + "&";
            }
            query = query + "initialDate=" + period.initialDate.getFullYear() + "-" + (period.initialDate.getMonth() + 1) + "-" + period.initialDate.getDate() + //
                "&endDate=" + period.endDate.getFullYear() + "-" + (period.endDate.getMonth() + 1) + "-" + period.endDate.getDate();
        }


        return $http.get(urlBase + test.id + "/results" + (query ? "?" + query : ""));
    };

    this.studentHasResultToday = function(test, rg) {
        var today = new Date();
        var query = "rg=" + rg + "&date=" + today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

        return $http.get(urlBase + test.id + "/result?" + query);
    };

    /**
     * Convert a base64 string in a Blob according to the data and contentType.
     * 
     * @param b64Data {String} Pure base64 string without contentType
     * @param contentType {String} the content type of the file i.e (image/jpeg - image/png - text/plain)
     * @param sliceSize {Int} SliceSize to process the byteCharacters
     * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
     * @return Blob
     */
    function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, {
            type: contentType
        });
        return blob;
    }

    /**
     * Create a Image file according to its database64 content only.
     * 
     * @param folderpath {String} The folder where the file will be created
     * @param filename {String} The name of the file that will be created
     * @param content {Base64 String} Important : The content can't contain the following string (data:image/png[or any other format];base64,). Only the base64 string is expected.
     */
    function savebase64AsImageFile(folderpath, filename, content, contentType) {
        // Convert the base64 string in a Blob
        var DataBlob = b64toBlob(content, contentType);

        console.log("Starting to write the file :3");

        window.resolveLocalFileSystemURL(folderpath, function(dir) {
            console.log("Access to the directory granted succesfully");
            dir.getFile(filename, {
                create: true
            }, function(file) {
                console.log("File created succesfully.");
                file.createWriter(function(fileWriter) {
                    console.log("Writing content to file");
                    fileWriter.write(DataBlob);
                }, function() {
                    alert('Unable to save file in path ' + folderpath);
                });
            });
        });
    }

}]);