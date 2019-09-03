//叠加点数量多 用 叠加点图层方式
function drawPointTile(table,where){
	   var url = 'wms/drawTitles?x={x}&y={y}&z={z}&table='+table+"&where="+where;
	   var layName = 'pointTitle';
	   addTiles(url,layName);
}


//根据tileUrl 返回瓦片图
var keyList = new Array();//存储数节点的key值
var layerList = new Array();//存储对应key的layer

//titleUrl 请求地址，key 图层名称
function  addTiles(tileUrl, key){
	if(key=='404'){
		addHistogram();
       return;
	}
	var tilesLayer = L.tileLayer(tileUrl, {
		maxZoom : 18,
	    zIndex:20
	});
	var flag = false;
	for(var i=0; i<keyList.length; i++){
		if(keyList[i] == key){
			layerList[i] = tilesLayer;
			flag = true;
		}
	}
	if(!flag){
		keyList.push(key);
		layerList.push(tilesLayer);
	}
	map.addLayer(tilesLayer);
	return tilesLayer;
}

//移除叠加的瓦片图层
function removeTiles(key){
	if(key=='404'){
		removeHistogram();
       return;
	}
	for(var i=0; i<keyList.length; i++){
		if(keyList[i] == key){
			map.removeLayer(layerList[i]);
		}
	}
}
