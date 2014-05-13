function calPercentageString(precup) {
	var percentageflux = "";
	if(precup > 100) {
		percentageflux = "~"+ Math.round(precup - 100) + " Up " + "\u21D1"; 
	}else{
		percentageflux = "~"+ Math.round(100 - precup)  + " Down " + "\u21D3";
	}
	return percentageflux;
}
// Line chart
function getRowContent(data) {
	var alpha = 0;
	var beta = 0;
	var precup = 0;
	var rowContent = "[";
	for ( var i in data) {
		var datee = new Date(i.replace(" ","T"));
		rowContent += "['" + datee.toDateString().substring(0,10) + "',"
				+ data[i] + "],";
		alpha = data[i];
		precup = alpha / beta * 100;
		beta = data[i];
	}
	rowContent += "]";
	return [rowContent, precup];
}

function formLineChart(input, divTag, title, precup, timetaken) {
	createDiv(divTag);
	var map = {
			"string" : "Date",
			"number" : title
	};
	var additionalData = (timetaken!=0?" | Time Taken: " +  " [" + timetaken +"] ms":"") + (precup!=0?" | %age Change [" + calPercentageString(precup) +"]":""); 
	var data = new google.visualization.DataTable();
	for (key in map) {
		if (map.hasOwnProperty(key)) {
			data.addColumn(key, map[key]);
		}
	}
	data.addRows(eval(input));
	var options = {
		'title' : title + additionalData,
		'pointSize' : 5
	};
	var chart = new google.visualization.LineChart(document
			.getElementById(divTag));
	chart.draw(data, options);
}

function formPieChart(input, map, divTag, title) {
	createDiv(divTag);
	var data = new google.visualization.DataTable();
	for (key in map) {
		if (map.hasOwnProperty(key)) {
			data.addColumn(key, map[key]);
		}
	}
	data.addRows(eval(input));
	var options = {
		'title' : title
	};
	var chart = new google.visualization.PieChart(document
			.getElementById(divTag));
	chart.draw(data, options);
}

function formColumnChart(input, map, divTag, title) {
	createDiv(divTag);
	var data = new google.visualization.DataTable();
	for (key in map) {
		if (map.hasOwnProperty(key)) {
			data.addColumn(key.indexOf("number") !=-1? "number" : key, map[key]);
		}
	}
	data.addRows(eval(input));
	var options = {
		'title' : title
		 /*hAxis : {
			title : title,
			titleTextStyle : {
				color : 'red'
			}
		}*/

	};
	var chart = new google.visualization.ColumnChart(document
			.getElementById(divTag));
	chart.draw(data, options);
}

function formMultiLineChart(input, map, divTag, title) {
	createDiv(divTag);
	var data = new google.visualization.DataTable();
	for (key in map) {
		if (map.hasOwnProperty(key)) {
			data.addColumn(key.indexOf("number") !=-1? "number" : key, map[key]);
		}
	}
	data.addRows(eval(input));
	var options = {
		'title' : title
		 /*hAxis : {
			title : title,
			titleTextStyle : {
				color : 'red'
			}
		}*/

	};
	 var chart = new google.visualization.LineChart(document.getElementById(divTag));
        chart.draw(data, options);
}



function formTableChart(input, map, divTag, title) {
	//createDiv(divTag);
	var data = new google.visualization.DataTable();
	for (key in map) {
		if (map.hasOwnProperty(key)) {
			data.addColumn(key.indexOf("string") !=-1? "string" : key, map[key]);
		}
	}
	data.addRows(eval(input));
	var divTitle = document.createElement("div");
	divTitle.id = divTag.id+"_title";
	divTitle.innerHTML = title;
	document.getElementById(divTag)
			.appendChild(divTitle);
	var chart = new google.visualization.Table(document
			.getElementById(divTag));
	var options = {
			'title' : title,
			showRowNumber: true
		};
	chart.draw(data, options);
}

function createDiv(divName){
	var divTag = document.createElement("div");
	divTag.id = divName;
	document.getElementById("chart_div")
			.appendChild(divTag);
	divTag.setAttribute("style","width: 700px; height: 250px;");
}

function forQueuecharts(rowContent,map,div,quename,data){
	 var result = getRowContent(data);
	// formLineChartOld(rowContent,map,div,quename);
	 formLineChart(rowContent,div,quename,0,0);
}

