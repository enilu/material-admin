var map;
var zTree;
var markerArray = new Array();
var routeLayer = null;
function initMap(mapServerUrl) {
	var funcLayer = new L.TileLayer.Functional(function (view) {
	var url = "http://172.16.247.100/gis"+'/{z}/{y}/{x}.png'
		.replace('{z}', "L" +(parseInt(view.zoom)<10?("0"+view.zoom):view.zoom))
		.replace('{x}', (function(){
							var x = parseInt(view.tile.column, 10).toString(16)
							if(x.length < 8){
								var k = x.length;
								for(var i = 0; i < 8 - k;i++){
									x = "0" + x;
								}
							}
							x = "C" + x;
							//console.log(x + "  length :" + x.length);
							return x.toUpperCase();
						})())
		.replace('{y}', (function(){
							var y = parseInt(view.tile.row, 10).toString(16)
							if(y.length < 8){
								var k = y.length;
								for(var i = 0; i < 8 - k;i++){
									y = "0" + y;
								}
							}
							y = "R" + y;
							return y.toUpperCase();
						})())
		.replace('{s}', view.subdomain);
	return url;
}, {
	subdomains: '1234',opacity:1
});
	
map = L.map('map', {
    center: [39.918, 116.38],
    zoom: 5,
    zoomControl:false,
    layers: [funcLayer]	,
    maxZoom : 16,
    minZoom:4,
    maxBounds:[[85.03,-179.82],[-85,179.82]]
});

var baseLayers = {
    "Google量地图": funcLayer
};		
routeLayer = L.layerGroup().addTo(map);
L.control.layers(baseLayers).addTo(map);
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
	draw: {
		position: 'topleft',
		polygon: {
			title: '多边形!',
			allowIntersection: false,
			drawError: {
				color: '#b00b00',
				timeout: 1000
			},
			shapeOptions: {
				color: 'blue'
			},
			showArea: true
		},
		polyline: {
			metric: false
		},
		circle: {
			shapeOptions: {
				color: '#662d91'
			}
		}
	}
});
map.addControl(drawControl);

map.on('draw:created', function (e) {
	var type = e.layerType,
		layer = e.layer;

	drawnItems.addLayer(layer);
});

map.on("zoomstart", function(e){
});

map.on("zoomend", function(e){
		var zoom = e.target._zoom;
		var items = null;
		if(parseInt(zoom) <=5 ){//全国

		

		} else if(parseInt(zoom) >=5&&parseInt(zoom) <=7){//省级

		}else{//市级
		}

});
}

//增加地图点击事件
function addMapClickEvent(){
	map.on("click", function(e){
		clickMap(e.latlng.lat,e.latlng.lng);
	});
}
//移除地图点击事件
function remMapClickEvent(){
	map.off("click");
}


function dingwei(lat,lng,zoom){
	map.panTo(L.latLng(lat, lng));
	map.setZoom(zoom);
}

