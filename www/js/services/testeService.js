Iris.service('Testes', ['$http', '$q', '$cordovaFile', 'CacheFactory', function($http, $q, $cordovaFile, CacheFactory) {

    var urlBase = serverAddress + '/testes/';

    CacheFactory('testes', {
        maxAge: 15 * 60 * 1000, // Items added to this cache expire after 15 minutes
        cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour
        deleteOnExpire: 'aggressive' // Items will be deleted from this cache when they expire
    });

    this.getTeste = function(testeId) {
        var deferred = $q.defer();
        var cacheTestes = CacheFactory.get('testes');

        if (cacheTestes.get(testeId)) {
            deferred.resolve(cacheTestes.get(testeId));
        } else {
            $http.get(urlBase + testeId).success(function(data) {
                cacheTestes.put(data.id.toString(), data);
                deferred.resolve(data);
            });
        }
        return deferred.promise;
    };

    this.getTestes = function() {
        var deferred = $q.defer();
        var cacheTestes = CacheFactory.get('testes');

        if (cacheTestes.values().length > 0) {
            deferred.resolve(cacheTestes.values());
        } else {
            $http.get(urlBase).success(function(data) {
                for (i = 0; i < data.length; i++) {
                    cacheTestes.put(data[i].id.toString(), data[i]);
                }
                deferred.resolve(data);
            });
        }
        return deferred.promise;
    };

    this.getImagemPergunta = function(testeId, perguntaId) {
        var deferred = $q.defer();
        var filename = testeId + '-' + perguntaId + ".jpg"
        var urlfile = cordova.file.dataDirectory + filename;

        $cordovaFile.checkFile(cordova.file.dataDirectory, filename).then(function(result){
        	deferred.resolve(urlfile);
        }, function(err){
        	$http.get(urlBase + testeId + "/imagemPergunta/" + perguntaId).success(function (data) {
				savebase64AsImageFile(cordova.file.dataDirectory, filename, data, "image/jpg");
          		deferred.resolve(urlfile);
          	});
        });

      	return deferred.promise;
        //return $http.get(urlBase + testeId + "/imagemPergunta/" + perguntaId);
    };

    this.criarTeste = function(teste) {
        var deferred = $q.defer();
        var cacheTestes = CacheFactory.get('testes');

        $http.post(urlBase + "create", teste).success(function(data) {
            cacheTestes.put(data.id.toString(), data);
            deferred.resolve(data);
        });

        return deferred.promise;
    };

    this.removerTeste = function(id) {
        var deferred = $q.defer();
        var cacheTestes = CacheFactory.get('testes');

        $http.delete(urlBase + id).success(function() {
            cacheTestes.remove(id.toString());
            deferred.resolve(true);
        }).error(function(data) {
            isRemoved = false;
            deferred.resolve(false);
        });

        return deferred.promise;
    };

    this.salvarResultado = function(resultadoTeste) {
        return $http.post(urlBase + "salvarResultado", resultadoTeste);
    };

    this.retornarResultados = function(teste, aproveitamento, periodo) {
        var query = "";
        if (aproveitamento) {
            query = "aproveitamentoMinimo=" + aproveitamento.minimo + "&aproveitamentoMaximo=" + aproveitamento.maximo;
        }
        if (periodo) {
            if (aproveitamento) {
                query = query + "&";
            }
            query = query + "inicio=" + periodo.inicio.getFullYear() + "-" + (periodo.inicio.getMonth() + 1) + "-" + periodo.inicio.getDate() + //
                "&fim=" + periodo.fim.getFullYear() + "-" + (periodo.fim.getMonth() + 1) + "-" + periodo.fim.getDate();
        }


        return $http.get(urlBase + teste.id + "/resultados" + (query ? "?" + query : ""));
    };

    this.studentHasResultToday = function(teste, rg) {
        var today = new Date();
        var query = "rg=" + rg + "&data=" + today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

        return $http.get(urlBase + teste.id + "/resultado?" + query);
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