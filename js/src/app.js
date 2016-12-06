var L = require('leaflet');

function drawMap(container){
	console.log('drawing a map in ', container);

	// Map tiles URLs
	const osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	const osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	const osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 14, attribution: osmAttrib});

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
	map.addLayer(osm);

	// Define the marker for each project
	let projectIcon = L.divIcon({
		className:'project-marker',
		html:"<span class='ring'></span>"
	});


	// Dots on said map. This is the container.
	let projectMarkers = L.layerGroup({});
	
	// This is the array of elements from which the marker data will be plucked.
	const projectList = document.querySelectorAll('.project');

	projectList.forEach(project => {
		let lat = project.dataset.lat,
			lng = project.dataset.lng,
			id = project.getAttribute('id');

		let projectMarker = L.marker(
			{
				lat:parseFloat(lat), 
				lng:parseFloat(lng)
			},
			{
				icon: projectIcon
			}
		)
		// .on('click', function(e){
		// 	let popupContent = `
		// 		<p class='popup__name'><strong>${name}</strong></p>
		// 		<p class='popup__town'><em>${town}</em></p>
		// 		<a class='popup__button' href='#${id}'>Go there</a>`;
		// 	this.bindPopup(popupContent).openPopup();
		// 	// showTooltip(name, town);

		// });

		projectMarker.id = id;
		projectMarker.addTo(projectMarkers);
	});
	projectMarkers.addTo(map);
}



window.onload = function(){
	const mapContainers = document.querySelectorAll('.map__container');
	mapContainers.forEach( mapContainer => {
		drawMap(mapContainer);	
	});
}