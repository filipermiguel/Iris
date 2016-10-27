Iris.controller('StudentHistoricReportCtrl', function($scope, $state) {

	$scope.results = $state.params.historicResults;
	$scope.dates = [];
	$scope.labels = [];
	$scope.data = [];
	$scope.series = ['Results'];

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

        	this.datesets.forEach(function (dateset) {
            	dateset.points.forEach(function (points) {
                	ctx.fillText(points.value + "%", points.x, points.y - 10);
            	});
        	})
        },
		scaleLabel: function (label) {
    		return label.value + '%';
		}
	};

	var values = [];

	for(i = 0; i < $scope.results.length; i++){
		var date = new Date($scope.results[i].date);
		$scope.dates.push(date);
		$scope.labels.push(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());

		var resultInfo = JSON.parse($scope.results[i].result);
		var score = 0;

		for(j = 0; j < resultInfo.length; j++){
			if(resultInfo[j].isCorrect){
				score++;
			}
		}

		var efficiency = (score / $scope.results[i].test.questions.length) * 100;

		values.push(parseFloat(Math.round(efficiency * 100) / 100).toFixed(2)); 
	}

	$scope.data.push(values);

	$scope.onValueClick = function (points, evt) {
		var studentResult = $scope.results.filter(function(obj) {
			var date = new Date(obj.date);
			var dateToString = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

			return dateToString == points[0].label;
		});
		if(studentResult[0]){
			$state.go('student-report', { result: studentResult[0], origin: "HISTORICO", historicResults: $scope.results });
		}
  	};

	$scope.back = function(){
		$state.go('choose-student-historic-report');
	}
})