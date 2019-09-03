var BarLayer = function(opt){

	this.circleStyle = {
		stroke : false,
		fillColor : '#fe6f16',
		fillOpacity : 0.7
	};

	this.data = opt.data;
	this.map = opt.map;
	L.Draw.customData = new L.LayerGroup();
	L.Draw.customData.addTo(this.map);

	this.addLayer = function(data){

		if(!data){
			data = this.data;
		}

		var context = this;
		var _map = this.map;

		for(var i = 0; i < data.length; i++){

			var item = data[i];

			var style = {};

			for(var key in this.circleStyle){
				style[key] = this.circleStyle[key];
			}

			if(item.style){
				for(var key in item.style){
					style[key] = item.style[key];
				}
			}

			var layer = new L.CircleMarker(item.latlng, style);

				layer.setRadius(item.radius);

				layer.data = item;

				//添加点击事件
				if(item.click){
					layer.on("click", function(){

						//执行单击回调函数
						if(this.data.click){
							this.data.click();
						}

					});
				}

				//如果存在子元素则附加绑定单击事件 切换到资源富范围
				if(item.child){
					layer.on("click", function(){
					if(this.data.child){
							context.removeLayer();
							context.addLayer(this.data.child);

							//跳转到子元素范围
							if(this.data.childBbox){
								_map.fitBounds(this.data.childBbox);
							}
						}
					});
				}

				//绑定气泡
				if(item.popupContent){

					var popup = L.popup({
						offset : L.point(0, -(item.radius)),
						closeButton : false
					}).setLatLng(item.latlng).setContent(item.popupContent);

					layer.popup = popup;

					layer.on("mouseover", function(){
						_map.openPopup(this.popup);
					});

					layer.on("mouseout", function(){
						if(this.popup){
							_map.closePopup(this.popup);
						}
					});
				}

				//绑定鼠标选中的动画效果
				layer.on("mouseover", function(){
					this.setStyle({
						fillOpacity : parseFloat(this.options.fillOpacity) + 0.2
					});
				});

				layer.on("mouseout", function(){
					this.setStyle({
						fillOpacity : parseFloat(this.options.fillOpacity) - 0.2
					});
					this.redraw();
				});


			L.Draw.customData.addLayer(layer);
		}

	}

	this.removeLayer = function(){
		L.Draw.customData.clearLayers();
	}

}
