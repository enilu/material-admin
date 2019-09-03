L.Draw.Rectangle.Query = L.Draw.Rectangle
		.extend({
			statics : {
				TYPE : 'rectangleQuery'
			},

			options : {
				shapeOptions : {
					stroke : true,
					color : '#f06eaa',
					weight : 4,
					opacity : 0.5,
					fill : true,
					fillColor : null, // same as color by default
					fillOpacity : 0.2,
					clickable : true
				}
			},

			initialize : function(map, options) {
				this._map = map;
				// Save the type so super can fire, need to do this as cannot do
				// this.TYPE :(
				this.type = L.Draw.Rectangle.Query.TYPE;

				this._initialLabelText = L.drawLocal.draw.handlers.rectangle.tooltip.start;

				// 自定义的
				this._RectangleLayerGroup = new L.FeatureGroup();
				this._map.addLayer(this._RectangleLayerGroup);

				L.Draw.SimpleShape.prototype.initialize
						.call(this, map, options);
			},
			_onMouseUp : function(e) {

				var obj = new Array();
				obj[0] = this._shape.getBounds()._northEast;
				obj[2] = this._shape.getBounds()._southWest;
				obj[1] = L.latLng(this._shape.getBounds()._southWest.lat,
						this._shape.getBounds()._northEast.lng);
				obj[3] = L.latLng(this._shape.getBounds()._northEast.lat,
						this._shape.getBounds()._southWest.lng);
				var latLngs = obj[0].lat + ',' + obj[0].lng + ';' + obj[1].lat
						+ ',' + obj[1].lng + ';' + obj[2].lat + ','
						+ obj[2].lng + ';' + obj[3].lat + ',' + obj[3].lng;
				mapAreaSearchInfo(latLngs, "rect", this._RectangleLayerGroup);

				if (this._shape) {
					this._fireCreatedEvent();
				}

				this.disable();
				if (this.options.repeatMode) {
					this.enable();
				}
			}
		});

L.Draw.Circle.Query = L.Draw.Circle
		.extend({
			statics : {
				TYPE : 'circleQuery'
			},

			options : {
				shapeOptions : {
					stroke : true,
					color : '#f06eaa',
					weight : 4,
					opacity : 0.5,
					fill : true,
					fillColor : null, // same as color by default
					fillOpacity : 0.2,
					clickable : true
				},
				showRadius : true,
				metric : true
			// Whether to use the metric meaurement system or imperial
			},

			initialize : function(map, options) {
				this._map = map;
				// Save the type so super can fire, need to do this as cannot do
				// this.TYPE :(
				this.type = L.Draw.Circle.Query.TYPE;

				this._initialLabelText = L.drawLocal.draw.handlers.circle.tooltip.start;
				// 自定义的
				this._CircleLayerGroup = new L.FeatureGroup();
				this._map.addLayer(this._CircleLayerGroup);

				L.Draw.SimpleShape.prototype.initialize
						.call(this, map, options);
			},

			_onMouseUp : function(e) {
				var latLngs = this._startLatLng.lat.toString() + ','
						+ this._startLatLng.lng.toString();
				var radius = this._shape.getRadius().toFixed(1);
				mapAreaSearchInfo(latLngs + ";" + radius, "circle",
						this._CircleLayerGroup);
				if (this._shape) {
					this._fireCreatedEvent();
				}

				this.disable();
				if (this.options.repeatMode) {
					this.enable();
				}
			}
		});

L.Draw.Polygon.Query = L.Draw.Polyline.extend({

	statics : {
		TYPE : 'polygonQuery'
	},

	Poly : L.Polygon,

	options : {
		showArea : true,
		shapeOptions : {
			stroke : true,
			color : '#f06eaa',
			weight : 4,
			opacity : 0.5,
			fill : true,
			fillColor : null, // same as color by default
			fillOpacity : 0.2,
			clickable : true
		}
	},

	initialize : function(map, options) {
		this._map = map;

		L.Draw.Polyline.prototype.initialize.call(this, map, options);

		// Save the type so super can fire, need to do this as cannot do
		// this.TYPE :(
		this.type = L.Draw.Polygon.Query.TYPE;
	},

	_finishShape : function() {
		var latLngsArray = this._poly.getLatLngs();
		var latLngs = '';
		for ( var i = 0; i < latLngsArray.length; i++) {
			latLngs += latLngsArray[i].lat.toString() + ','
					+ latLngsArray[i].lng.toString() + ';';
		}
		latLngs = latLngs.toString().substring(0, (latLngs.length - 1)) + '';
		mapAreaSearchInfo(latLngs, "polygon", this._drawnItems);
		var intersects = this._poly.newLatLngIntersects(
				this._poly.getLatLngs()[0], true);

		if ((!this.options.allowIntersection && intersects)
				|| !this._shapeIsValid()) {
			this._showErrorTooltip();
			return;
		}

		this._fireCreatedEvent();
		this.disable();
		if (this.options.repeatMode) {
			this.enable();
		}

	}
});

L.Draw.Reset = L.Draw.SimpleShape.extend({
	statics : {
		TYPE : 'reset'
	},

	options : {
		shapeOptions : {
			stroke : true,
			color : '#f06eaa',
			weight : 4,
			opacity : 0.5,
			fill : true,
			fillColor : null, // same as color by default
			fillOpacity : 0.2,
			text : 'aaa',
			clickable : true
		}
	// Whether to use the metric meaurement system or imperial
	},

	initialize : function(map, options) {
		this._map = map;
		// Save the type so super can fire, need to do this as cannot do
		// this.TYPE :(
		this.type = L.Draw.Reset.TYPE;
		L.Draw.SimpleShape.prototype.initialize.call(this, map, options);
	},
	addHooks : function() {
		// 清空数据
		if (L.Draw.tempData) {
			// tipMarkerGroup : this._tipMarkerGroup,
			// layer : this._drawnItems
			this._map.removeLayer(L.Draw.tempData.tipMarkerGroup);
			L.Draw.tempData.layer.clearLayers();
		}
		// 清空标点数据
		if (L.Draw.tempData1) {
			// tipMarkerGroup : this._tipMarkerGroup,
			// layer : this._drawnItems
			this._map.removeLayer(L.Draw.tempData1.tipMarkerGroup);
			L.Draw.tempData1.layer.clearLayers();
		}
		this.disable();
		if (this.options.repeatMode) {
			this.enable();
		}
	},
	removeHooks : function() {
		if (this._map) {
			L.DomUtil.enableTextSelection();
			this._tooltip = null;
			L.DomEvent.removeListener(this._container, 'keyup',
					this._cancelDrawing);
		}
	}
});

L.Draw.CleanAll = L.Draw.SimpleShape.extend({
	statics : {
		TYPE : 'cleanAll'
	},

	options : {
		shapeOptions : {
			stroke : true,
			color : '#f06eaa',
			weight : 4,
			opacity : 0.5,
			fill : true,
			fillColor : null, // same as color by default
			fillOpacity : 0.2,
			text : 'aaa',
			clickable : true
		}
	// Whether to use the metric meaurement system or imperial
	},

	initialize : function(map, options) {
		this._map = map;
		// Save the type so super can fire, need to do this as cannot do
		// this.TYPE :(
		this.type = L.Draw.CleanAll.TYPE;
		L.Draw.SimpleShape.prototype.initialize.call(this, map, options);
	},
	addHooks : function() {
		// 清空数据
		if (L.Draw.tempData) {
			// tipMarkerGroup : this._tipMarkerGroup,
			// layer : this._drawnItems
			this._map.removeLayer(L.Draw.tempData.tipMarkerGroup);
			L.Draw.tempData.layer.clearLayers();
		}
		// 清空标点数据
		if (L.Draw.tempData1) {
			// tipMarkerGroup : this._tipMarkerGroup,
			// layer : this._drawnItems
			this._map.removeLayer(L.Draw.tempData1.tipMarkerGroup);
			L.Draw.tempData1.layer.clearLayers();
		}
		// 清空非工具条生成的图层
		if (L.Draw.customData) {
			this._map.removeLayer(L.Draw.customData);
		}
		this.disable();
		if (this.options.repeatMode) {
			this.enable();
		}
	},
	removeHooks : function() {
		if (this._map) {
			L.DomUtil.enableTextSelection();
			this._tooltip = null;
			L.DomEvent.removeListener(this._container, 'keyup',
					this._cancelDrawing);
		}
	}
});
L.Draw.ZoomIn = L.Draw.SimpleShape.extend({
	statics : {
		TYPE : 'zoomIn'
	},

	options : {
		shapeOptions : {
			stroke : true,
			color : '#f06eaa',
			weight : 4,
			opacity : 0.5,
			fill : true,
			fillColor : null, // same as color by default
			fillOpacity : 0.2,
			text : 'aaa',
			clickable : true
		}
	// Whether to use the metric meaurement system or imperial
	},

	initialize : function(map, options) {
		this._map = map;
		this.type = L.Draw.ZoomIn.TYPE;
		L.Draw.SimpleShape.prototype.initialize.call(this, map, options);
	},

	addHooks : function() {

		this.zoom = this._map.getZoom();

		if (this.zoom < 16) {
			this._map.zoomIn();
			// this._map.setZoom(this.zoom+1);
		}
		this.disable();
		if (this.options.repeatMode) {
			this.enable();
		}
	},
	removeHooks : function() {
		if (this._map) {
			L.DomUtil.enableTextSelection();
			this._tooltip = null;
			L.DomEvent.removeListener(this._container, 'keyup',
					this._cancelDrawing);
		}
	}
});

L.Draw.ZoomOut = L.Draw.SimpleShape.extend({
	statics : {
		TYPE : 'zoomOut'
	},

	options : {
		shapeOptions : {
			stroke : true,
			color : '#f06eaa',
			weight : 4,
			opacity : 0.5,
			fill : true,
			fillColor : null, // same as color by default
			fillOpacity : 0.2,
			text : 'aaa',
			clickable : true
		}
	// Whether to use the metric meaurement system or imperial
	},

	initialize : function(map, options) {
		this._map = map;
		this.type = L.Draw.ZoomOut.TYPE;
		L.Draw.SimpleShape.prototype.initialize.call(this, map, options);
	},
	addHooks : function() {
		this.zoom = this._map.getZoom();

		if (this.zoom > 4) {
			this._map.zoomOut();
			// this._map.setZoom(this.zoom-1);
		}
		this.disable();
		if (this.options.repeatMode) {
			this.enable();
		}
	},
	removeHooks : function() {
		if (this._map) {
			L.DomUtil.enableTextSelection();
			this._tooltip = null;
			L.DomEvent.removeListener(this._container, 'keyup',
					this._cancelDrawing);
		}
	}
});

// 资源流向

function orderPolyline() {

	var arrow = L.polyline(
			[ [ 39.33429742980725, 106.72119140625 ],
					[ 39.8928799002948, 116.43310546875 ],
					[ 41.78769700539063, 123.46435546875 ] ], {}).addTo(map);
	createLine(arrow);

	var arrow1 = L.polyline(
			[ [ 41.78769700539063, 123.46435546875 ],
					[ 45.60635207711834, 122.82714843749999 ] ], {}).addTo(map);
	createLine(arrow1);

	var arrow2 = L.polyline(
			[ [ 41.78769700539063, 123.46435546875 ],
					[ 45.775186183521036, 126.57348632812499 ] ], {})
			.addTo(map);
	createLine(arrow2);

	var arrow3 = L.polyline(
			[ [ 41.78769700539063, 123.46435546875 ],
					[ 43.24520272203356, 128.34228515625 ] ], {}).addTo(map);
	createLine(arrow3);

	var arrow4 = L.polyline(
			[ [ 41.78769700539063, 123.46435546875 ],
					[ 44.35527821160296, 124.67285156250001 ] ], {}).addTo(map);
	createLine(arrow4);
	// 122.82714843749999 45.60635207711834
	var c1 = L.circle([ 45.60635207711834, 122.82714843749999 ], 20000).addTo(
			map);
	var c2 = L.circle([ 45.775186183521036, 126.57348632812499 ], 20000).addTo(
			map);
	var c3 = L.circle([ 43.24520272203356, 128.34228515625 ], 20000).addTo(map);
	var c4 = L.circle([ 44.35527821160296, 124.67285156250001 ], 20000).addTo(
			map);

	// 航线图
	var pathPattern = L.polylineDecorator(
			[ [ 26.51, 122.61 ], [ 32.36, 123.40 ], [ 35.21, 120.63 ],
					[ 37.51, 123.88 ], [ 38.89, 119.18 ] ], {
				patterns : [ {
					offset : 0,
					repeat : 10,
					symbol : L.Symbol.dash({
						pixelSize : 5,
						pathOptions : {
							color : '#000',
							weight : 1,
							opacity : 0.2
						}
					})
				}, {
					offset : '16%',
					repeat : '33%',
					symbol : L.Symbol.marker({
						rotate : true,
						markerOptions : {
							icon : L.icon({
								iconUrl : '../icon_plane.png',
								iconAnchor : [ 16, 16 ]
							})
						}
					})
				} ]
			}).addTo(map);

}

function createLine(arrow) {

	var arrowHead = L.polylineDecorator(arrow).addTo(map);

	var arrowOffset = 0;
	var anim = window.setInterval(function() {
		arrowHead.setPatterns([ {
			offset : arrowOffset + '%',
			repeat : 0,
			symbol : L.Symbol.arrowHead({
				pixelSize : 13,
				polygon : false,
				pathOptions : {
					stroke : true
				}
			})
		} ]);
		if (++arrowOffset > 100)
			arrowOffset = 0;
	}, 200);

}

function addHistogram(provinceMap) {
	if (removeHistogram) {
		this.histogramLayer = new L.FeatureGroup();
		var myIcon = L
				.divIcon({
					iconSize : L.point(1100, 200),
					iconAnchor : L.point(1150, 205),
					html : '<IFRAME NAME="content_frame" width=100% height=100% marginwidth=0 marginheight=0 SRC="a.html" ></IFRAME> '
				});
		var beiJingMarker = L.marker([ 39.92, 116.41 ], {
			icon : myIcon
		}).addTo(map);
		var myIcon1 = L.divIcon({
			iconSize : L.point(100, 20),
			iconAnchor : L.point(50, 25),
			html : '山西'
		});
		var shanxiMarker = L.marker([ 37.87, 112.54 ], {
			icon : myIcon1
		}).addTo(map);
		var myIcon2 = L.divIcon({
			iconSize : L.point(100, 20),
			iconAnchor : L.point(50, 25),
			html : '内蒙古'
		});
		var neimenggugMarker = L.marker([ 40.86, 111.75 ], {
			icon : myIcon2
		}).addTo(map);
		var myIcon3 = L.divIcon({
			iconSize : L.point(100, 20),
			iconAnchor : L.point(50, 25),
			html : '河北'
		});
		var hebeiMarker = L.marker([ 38.07, 114.50 ], {
			icon : myIcon3
		}).addTo(map);
		var myIcon4 = L.divIcon({
			iconSize : L.point(100, 20),
			iconAnchor : L.point(50, 25),
			html : '山东'
		});
		var shandongMarker = L.marker([ 36.72, 117.09 ], {
			icon : myIcon4
		}).addTo(map);
		histogramLayer.addLayer(beiJingMarker, shanxiMarker, neimenggugMarker,
				hebeiMarker, shandongMarker);
		map.addLayer(histogramLayer);
	}
}
function removeHistogram() {
	if (histogramLayer) {
		map.removeLayer(this.histogramLayer);
	}
}