var ArcLayer = function(opt) {

	this.arcStyle = {
		color : '#fe6f16',
		thickness : 4,
		speed : 10
	};

	this.data = opt.data;
	this.map = opt.map;
	L.Draw.customData = new L.LayerGroup();
	L.Draw.customData.addTo(this.map);

	this.addLayer = function() {
		var context = this;
		var _map = this.map;
		var centerLatLng = this.data.centerLatLng;
		if (this.data.latLng) {
			var arrowOffset = 0;
			var arrowArray = [];
			for ( var j = 0; j < this.data.latLng.length; j++) {
				var iJson = this.data.latLng[j];
				var polyline;
				var p0 = L.latLng(centerLatLng.lat, centerLatLng.lng);
				var p1 = L.latLng(iJson.lat, iJson.lng);
				if (this.data.isOut == '1') {
					polyline = LMapLib.CurveLine([ p0, p1 ]);
				} else {
					polyline = LMapLib.CurveLine([ p1, p0 ]);
				}

				var arrowHead = L.polylineDecorator(polyline);
                var _line = L.polyline(polyline.getLatLngs, {
                    lineCap : 'butt'
                })
				L.Draw.customData.addLayer(polyline);
				L.Draw.customData.addLayer(arrowHead);
				arrowArray.push(arrowHead);
			}
			// L.symbol.arrowHeader({
            //     pixelSize : 10,
            //     polygon : true,
            //     pathOptions : {
            //     	stroke : true
            //     }
            // })
			var anim = window.setInterval(function() {
				for ( var i = 0; i < arrowArray.length; i++) {
					arrowArray[i].setPatterns([ {
						offset : arrowOffset + '%',
						repeat : 0,
						symbol : L.Symbol.marker({
                        rotate: false, markerOptions: {
                                icon: L.icon({
                                    iconUrl: '../static/lab/gis/images/cz.png',
                                    iconAnchor: [8, 8]
                                })
                            }
						})
					} ]);
					arrowOffset += 0.5;
					if (arrowOffset > 100)
						arrowOffset = 0;
				}

			}, 100);
		}

	};

	this.removeLayer = function() {
		L.Draw.customData.clearLayers();
	};
};
