var L = require('leaflet');
var drawChart = require('./yearChart.js');
require('leaflet-providers');

function play(){
	document.querySelectorAll('.dot').forEach( dot =>{
		dot.classList.add('dot-hidden');
	})
}

function drawMap(container){
	console.log('drawing a map in ', container);

	// Map tiles URLs
	// const osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	// const osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	// const osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 14, attribution: osmAttrib});

	// This css class can serve as a flag for map sizes, if needed. 
	container.classList.add('go-map')

	// Make a new map
	let map =  L.map(container,
		{
			center: [41.886635, -87.637839],
			zoom: 11,
			scrollWheelZoom:false,
			maxZoom:16
			// maxBounds:L.latLngBounds(L.latLng(36.590379, -92.133247),L.latLng(42.478624, -87.015605))
		}
	);

	// This is using an npm plugin. Can be adjusted for many map types.
	L.tileLayer.provider('Hydda.Full').addTo(map);


	// Define the marker for each project
	
	function getProjectIcon(date){
		
		let dateYear = date.split(/[- :]/)[0];
		console.log(date, dateYear, typeof(dateYear));
		return L.divIcon({
			className:'project-marker',
			html:`<span data-year=${parseInt(dateYear)} class='dot dot--${parseInt(dateYear)}'></span>`
		});
	}

	// Dots on said map. This is the container.
	let projectMarkers = L.layerGroup({});
	
	// This is the array of elements from which the marker data will be plucked.
	const projectList = document.querySelectorAll('.project');

	projectList.forEach(project => {
		let lat = project.dataset.lat,
			lng = project.dataset.lng,
			id = project.getAttribute('id'),
			permitDate = project.dataset.permitDate;

		let projectMarker = L.marker(
			{
				lat:parseFloat(lat), 
				lng:parseFloat(lng)
			},
			{
				icon: getProjectIcon(permitDate)
			}
		)

		projectMarker.id = id;
		projectMarker.addTo(projectMarkers);
	});
	projectMarkers.addTo(map);
}

function fadeToYear(year){
	let yearDots = document.querySelectorAll(`.dot--${year}`); 

	// Labeling
	document.querySelector('.map__year').innerHTML = year;
	document.querySelector('.map__year').style.opacity = '1';

	// Bars
	document.querySelectorAll('.bar').forEach( bar =>{
		bar.classList.add('muted');
	});
	document.querySelector(`.bar[data-year="${year}"]`).classList.remove('muted');

	document.querySelectorAll('.dot').forEach( dot =>{
		dot.classList.add('dot--hidden')
	});

	yearDots.forEach( dot =>{
		dot.classList.remove('dot--hidden');
	});
}

function play(){
	// Start by clearing a previously-started iteration of the animation.
	window.clearInterval(playInterval);
	let year = 2006;
	let playInterval = window.setInterval(function(){
		fadeToYear(year);
		year++;
		if (year > 2016){
			window.clearInterval(playInterval);
		}
	}, 1000) ;
	
}


window.onload = function(){
	const mapContainers = document.querySelectorAll('.map__container');
	mapContainers.forEach( mapContainer => {
		drawMap(mapContainer);	
	});
	drawChart(document.getElementById('year-chart'), window.yearChartData);
	document.getElementById('play').addEventListener('click', play, false);
}