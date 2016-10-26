Iris.controller('HistoricoAlunoRelatorioCtrl', function($scope, $state) {

	$scope.resultados = $state.params.historicoResultados;
	$scope.datas = [];
	$scope.labels = [];
	$scope.data = [];
	$scope.series = ['Resultados'];

	$scope.options = {
		showTooltips: false, 
		scale: 100, 
		scaleOverride: true, 
		scaleStartValue: 0, 
		scaleSteps: 10, 
		scaleStepWidth: 10,
		bezierCurve: false,
		pointDotRadius :10,
		responsive: true,
		onAnimationComplete: function () {
            var ctx = this.chart.ctx;
        	ctx.font = this.scale.font;
        	ctx.fillStyle = this.scale.textColor
        	ctx.textAlign = "center";
        	ctx.textBaseline = "bottom";

        	this.datasets.forEach(function (dataset) {
            	dataset.points.forEach(function (points) {
                	ctx.fillText(points.value + "%", points.x, points.y - 10);
            	});
        	})
        },
		scaleLabel: function (label) {
    		return label.value + '%';
		}
	};

	var valores = [];

	for(i = 0; i < $scope.resultados.length; i++){
		var data = new Date($scope.resultados[i].data);
		$scope.datas.push(data);
		$scope.labels.push(data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear());

		var infoResultado = JSON.parse($scope.resultados[i].resultado);
		var qtdCorretas = 0;

		for(j = 0; j < infoResultado.length; j++){
			if(infoResultado[j].isCorreta){
				qtdCorretas++;
			}
		}

		var aproveitamento = (qtdCorretas / $scope.resultados[i].teste.perguntas.length) * 100;

		valores.push(parseFloat(Math.round(aproveitamento * 100) / 100).toFixed(2)); 
	}

	$scope.data.push(valores);

	$scope.onValueClick = function (points, evt) {
		var resultadoAluno = $scope.resultados.filter(function(obj) {
			var data = new Date(obj.data);
			var dataToString = data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();

			return dataToString == points[0].label;
		});
		if(resultadoAluno[0]){
			$state.go('relatorio-aluno', { resultado: resultadoAluno[0], origem: "HISTORICO", historicoResultados: $scope.resultados });
		}
  	};

	$scope.voltar = function(){
		$state.go('escolha-historico-aluno-relatorio');
	}
})