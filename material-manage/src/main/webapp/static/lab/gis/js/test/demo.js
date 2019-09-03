//加载地图
function onloadMap(){
	var mapServerUrl = "http://172.16.247.100:8888/map";//地图服务地址
	initMap(mapServerUrl);//初始化地图
	minRoad();
}


//地图标点
function addMarkers(){
	L.Draw.customData = L.layerGroup().addTo(map);//创建标点图层，删除标点时用
	var poinListJson = [{id: 1,x: 37.94,y: 112.64,name:'太原'},{id: 2,x: 40.82149932,y: 111.6842769,name:'呼和浩特市'},{id: 3,x: 40.13254611,y: 116.5056088,name:'北京'}];//测试数据
	
	//标注点样式
	var myIcon = L.icon({
		iconUrl: "images/markers/blue.png",
		iconSize: [36, 36],
		popupAnchor: [0, -18]
		});
	
	for(var i=0;i<poinListJson.length;i++){
		var marker = L.marker(L.latLng(poinListJson[i].x,poinListJson[i].y));
			marker.setIcon(myIcon);
			marker.jsonObj = poinListJson[i];
//			marker.bindPopup("泡泡提示信息。");
			marker.on("click",function() {clickMark(this);});
			marker.on("mouseover",function() {mouseOverEvent(this);});
			marker.addTo(L.Draw.customData);
	}
	keyList.push('point');
	layerList.push(L.Draw.customData);
}

//标注点点击事件
function clickMark(mark){
	var lat = mark.jsonObj.x;
	var lng = mark.jsonObj.y;
	var id = mark.jsonObj.id;
	alert(lat+"=="+lng+"==="+id);
}

//鼠标移动到标注点 回调方法
function mouseOverEvent(mark){
	var name1 = mark.jsonObj.name;
	mark.bindPopup('名称：'+name1).openPopup();
}



//叠加点数量多 用 叠加点图层方式
function fillPointTile(){
   var table = 'tb_gis_company';
   var where = '1=1';
   drawPointTile(table,where);
}


//移除叠加的瓦片图层
function removeTile(layName){
	removeTiles(layName);//参数同叠加点图层定义的一致
}

//地图添加点击事件
function addClickToMap(){
	addMapClickEvent();
}
//点击事件回调函数 获得当前点的坐标
function clickMap(lng,lat){
	alert(lng+"-"+lat);
}

//地图移除点击事件
function remClickToMap(){
	remMapClickEvent();
}

//工具条查询回调函数
function mapAreaSearchInfo(lonlats,type,layerGroup){
	$.ajax({
		url : "wms/getMapSearch",
		type : 'post',
		data : {
			lonlat:lonlats,
			type:type,
			param:'none'
    	},
    	dataType : 'text',
    	success : function(d){
    		var count  = d.split(";")[0];
    		var sql = d.split(';')[1];
    		$("#sqlDiv").val(sql);
    		initPage(count);//总结果集数量
    		mapAreaSearchByPage(layerGroup);
    	}
	}); 
}

//分页查询统一调用此方法
function mapAreaSearchByPage(layerGroup){
	removeMarkers();
	var sql = $("#sqlDiv").val();
	$.ajax({
		url : "wms/getMapSearchByPage",
		type : 'post',
		data : {
			sql:sql,
			nowNum:nowPageNumb,
			sort:'pripid',
			pageSize:pageDataNumb
    	},
    	dataType : 'json',
    	success : function(d){
    		fillTableContent(d);
    		addMarker_s(d,layerGroup,0);
    	}
	});
}

/**
 * 结果集 地图标注
 * poinListJson 结果集
 * layerGroup 叠加的图层名 标注点清除时用
 * 
 */
var markerArray = new Array();
function addMarker_s(poinListJson,layerGroup) {
	var pointCount = poinListJson.length;
	var lng = "";
	var lat = "";
	for (var i = 0; i < pointCount; i++) {
		 lng = poinListJson[i].GOOGLE_LNG;
		 lat = poinListJson[i].GOOGLE_LAT;
		 entName = poinListJson[i].ENT_NAME;
		 var marker = L.marker(L.latLng(lat, lng));
		 var myIcon = L.icon({
				iconUrl: "images/gis_"+(i+1)+".png",
				iconSize: [25, 34],
				popupAnchor: [0, -18]
				});
		marker.setIcon(myIcon);
		marker.productId = poinListJson[i].PRIPID;
		
		if(null == layerGroup || "" == layerGroup){
			marker.addTo(map);
		}else{
			layerGroup.addLayer(marker);
		}
		markerArray.push(marker);
	}
}

//3.定位北京
function serachPoint(){
	var  lat=39.918;
	var lng= 116.38;
	var zoom = 5;
	dingwei(lat,lng,zoom);
}

//-------------------------------------------地图绘制圆开始-------------
var barLayer = null;
var data = [//测试数据 
    {
        title : 'beijing',
        radius : 40,//圆半径
        style : {//圆样式
            fillColor : 'green'
        },
        latlng : [41.802542590364354, 123.431396484375],//圆中心点
        click : function(){
            console.log("click bj");
        },
        popupContent : "2013年11月，重点煤矿调出煤炭总计1241.25万吨。",//气泡提示内容
        childBbox : [[42.36666166373274, 118.10852050781251],[38.57823196583313, 125.71105957031249 ]],//点击转曲，时设置转曲后的地图范围
        child : [
            {
                title : 'beijing',
                radius : 30,
                latlng : [41.802542590364354, 123.431396484375],
                click : function(){
                    alert(this.radius);
                },
                popupContent : "2013年11月，重点煤矿调出煤炭总计1241.25万吨。"
            },
            {
                title : 'beijing',
                latlng : [41.57436130598913, 120.421142578125],
                radius : 40,
                click : function(){
                    alert(this.radius);
                },
                popupContent : "这里是气泡内容！1"
            },
            {
                title : 'beijing',
                latlng : [42.02481360781777, 121.70654296874999],
                radius : 35,
                click : function(){
                    alert(this.radius);
                },
                popupContent : "这里是气泡内容！2"
            },
            {
                title : 'beijing',
                latlng : [41.054501963290505, 121.11328124999999],
                radius : 24,
                click : function(){
                    alert(this.radius);
                },
                popupContent : "这里是气泡内容！3"
            },
            {
                title : 'beijing',
                latlng : [40.6723059714534, 120.838623046875],
                radius : 30,
                click : function(){
                    alert(this.radius);
                },
                popupContent : "这里是气泡内容！4"
            },  
            {
                title : 'beijing',
                latlng : [41.09591205639546, 122.05810546875],
                radius : 24,
                click : function(){
                    alert(this.radius);
                }
            },
            {
                title : 'beijing',
                latlng : [38.90920161982435, 121.61590576171876],
                radius : 60,
                click : function(){
                    alert(this.radius);
                }
            },
            {
                title : 'beijing',
                latlng : [41.04621681452063, 123.035888671875],
                radius : 36,
                click : function(){
                    alert(this.radius);
                },
                popupContent : "这里是气泡内容！3"
            },
            {
                title : 'beijing',
                latlng : [41.97780646738183, 123.77197265625],
                radius : 50,
                click : function(){
                    alert(this.radius);
                },
                popupContent : "这里是气泡内容！4"
            },                                                                      
        ]
    },{
        title : 'beijing',
        latlng : [34.252676117101515, 108.896484375],
        radius : 30,
        click : function(){
            console.log("click xa");
        },
        popupContent : "2013年11月，重点煤矿调出煤炭总计1241.25万吨。"
    },{
        title : 'beijing',
        latlng : [30.183121842195515, 120.1904296875],
        radius : 25,
        click : function(){
            console.log("click xa");
        },
        popupContent : "2013年11月，重点煤矿调出煤炭总计1241.25万吨。"
    },{
        title : 'beijing',
        latlng : [23.200960808078566, 113.5546875],
        radius : 40,
        click : function(){
            console.log("click xa");
        },
        popupContent : "2013年11月，重点煤矿调出煤炭总计1241.25万吨。"
    },{
        title : 'beijing',
        latlng : [29.611670115197377, 106.5234375],
        radius : 34,
        click : function(){
            console.log("click xa");
        },
        popupContent : "2013年11月，重点煤矿调出煤炭总计1241.25万吨。"
    },{
        title : 'beijing',
        latlng : [35.746512259918504, 96.6796875],
        radius : 21,
        click : function(){
            console.log("click xa");
        },
        popupContent : "2013年11月，重点煤矿调出煤炭总计1241.25万吨。"
    },{
        title : 'beijing',
        latlng : [42.81152174509788, 113.466796875],
        radius : 29,
        click : function(){
            console.log("click xa");
        },
        popupContent : "2013年11月，重点煤矿调出煤炭总计1241.25万吨。"
    },{
        title : 'beijing',
        latlng : [45.767522962149904, 126.474609375],
        radius : 36,
        click : function(){
            console.log("click xa");
        },
        popupContent : "2013年11月，重点煤矿调出煤炭总计1241.25万吨。"
    },{
        title : 'beijing',
        latlng : [40.27952566881291, 86.0009765625],
        radius : 40,
        click : function(){
            console.log("click xa");
        },
        popupContent : "2013年11月，重点煤矿调出煤炭总计1241.25万吨。"
    },{
        title : 'beijing',
        latlng : [30.93992433102347, 89.033203125],
        radius : 30,
        click : function(){
            console.log("click xa");
        },
        popupContent : "2013年11月，重点煤矿调出煤炭总计1241.25万吨。"
    }

];
var barLayer ;
function drawCir(){
	barLayer = new BarLayer({
        data : data,
        map : map
    });
	barLayer.addLayer();
}

//移除绘制的圆
function removeCir(){
	 barLayer.removeLayer();
     barLayer = null;
}
var arcData={
	style:{color:'red',thickness:4,speed:10},
	isOut:'1',
	centerLatLng:{lat:31.1,lng:116.1},
	latLng:[{lat:41.802542590364354,lng:123.431396484375},
	                {lat:34.252676117101515,lng:108.896484375},
	                {lat:29.611670115197377,lng:106.5234375},
	                {lat:42.81152174509788,lng:113.466796875},
	                {lat:40.27952566881291,lng:86.0009765625}]
};
var arcLayer;
//绘制弧线图
function drawArc(){
	arcLayer = new ArcLayer({
        data : arcData,
        map : map
    });
	arcLayer.addLayer();
}
//删除弧线图
function removeArc(){
	arcLayer.removeLayer();
	arcLayer = null;
}
//绘制线路图
function drawRoadLine(){
	var p1 = L.latLng(41.802542590364354, 123.431396484375);
    var p2 = L.latLng(34.252676117101515, 108.896484375);
    var p3 = L.latLng(29.611670115197377, 106.5234375);
    var p4 = L.latLng(42.81152174509788, 113.466796875);
    var p5 = L.latLng(40.27952566881291, 86.0009765625);
                
    var polyline1 = LMapLib.CurveLine([p2, p1]);
    var polyline2 = LMapLib.CurveLine([p3, p1]);
    var polyline3 = LMapLib.CurveLine([p4, p1]);
    var polyline4 = LMapLib.CurveLine([p5, p1]);

    map.addLayer(polyline1);
    map.addLayer(polyline2);
    map.addLayer(polyline3);
    map.addLayer(polyline4);

    var arrowHead1 = L.polylineDecorator(polyline1).addTo(map);
    var arrowHead2 = L.polylineDecorator(polyline2).addTo(map);
    var arrowHead3 = L.polylineDecorator(polyline3).addTo(map);
    var arrowHead4 = L.polylineDecorator(polyline4).addTo(map);

    var arrowOffset = 0;
    var anim = window.setInterval(function() {
        arrowHead1.setPatterns([
            {offset: arrowOffset+'%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 20, polygon: false, pathOptions: {stroke: true}})}
        ]);

        arrowHead2.setPatterns([
            {offset: arrowOffset+'%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 20, polygon: false, pathOptions: {stroke: true}})}
        ]);

        arrowHead3.setPatterns([
            {offset: arrowOffset+'%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 20, polygon: false, pathOptions: {stroke: true}})}
        ]);

        arrowHead4.setPatterns([
            {offset: arrowOffset+'%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 20, polygon: false, pathOptions: {stroke: true}})}
        ]);                                                            

        arrowOffset += 0.5;
        if(arrowOffset > 100)
            arrowOffset = 0;
    }, 100);
}

function getBox(){
	var s = map.getBounds();
	alert(s.getWest());
	//alert(s.getWest());
}

//显示柱状图
function drawBarGraph() {
	
		var colors = Highcharts.getOptions().colors;

		var data = [ {

			latlng : [ 41.78769700539063, 123.4423828125 ],
			labelColor : 'red',
			label : [ '棉花', '小麦', '大豆' ],
			width : 150,
			height : 150,
			clickFun : function(data) {
				alert(data.y);
			},
			data : [ {
				y : 55.11,
				color : colors[0]
			}, {
				y : 21.63,
				color : colors[1]
			}, {
				y : 11.94,
				color : colors[2]
			} ]
		}, {
			latlng : [ 39.436192999314095, 88.06640625 ],
			label : [ '棉花', '小麦', '大豆' ],
			labelColor : 'blue',
			width : 150,
			height : 150,
			clickFun : function(data) {
				alert(data.y + "   " + data.category);
			},
			data : [ {
				y : 55.11,
				color : colors[0]
			}, {
				y : 60,
				color : colors[1]
			}, {
				y : 11.94,
				color : colors[2]
			} ]
		}, {
			latlng : [ 25.958044673317843, 112.587890625 ],
			label : [ '棉花', '小麦', '大豆' ],
			labelColor : 'green',
			width : 150,
			height : 150,
			clickFun : function(data) {
				alert(data.y);
			},
			data : [ {
				y : 40,
				color : colors[0]
			}, {
				y : 21.63,
				color : colors[1]
			}, {
				y : 30,
				color : colors[2]
			} ]
		} ];

		$("#map").mapColumn({
			map : map
		});

		$("#map").mapColumn("addCharts", data);

}
//删除柱状图
function cleanBarGraph(){
	$("#map").mapColumn("clearCharts");
}

//最短路径分析

var startMarker = null;
var endMarker = null;
var flag = ""; //用于描述当前取的点是起点还是终点
function minRoad(){
	
	$("#setStartPointBtn").click(function(){
		flag = "s";	
	});
	
	$("#setEndPointBtn").click(function(){
		flag = "e";	
	});
	
	map.on('click', function(e){
		if(flag == "s"){
			$("#startPoint").val(e.latlng.lng + " " + e.latlng.lat);
			if(startMarker){
				map.removeLayer(startMarker);
			}		
			startMarker = L.marker(e.latlng).addTo(map);
		}else if(flag == "e"){
			$("#endPoint").val(e.latlng.lng + " " + e.latlng.lat);
			if(endMarker){
				map.removeLayer(endMarker);
			}				
			endMarker = L.marker(e.latlng).addTo(map);
		}
		console.log(e.latlng.lng + "  " + e.latlng.lat);
	});
	
	$("#getRouting").click(function(){
		$.ajax({
			url : "routing",
			type : "post",
			dataType : 'json',
			data : {
				startPoint : $("#startPoint").val(),
				endPoint : $("#endPoint").val()
			},
			success : function(data){
				if(data.msg){
					alert(data.msg);
					return false;
				}
				if(routeLayer){
					routeLayer.clearLayers();
				}
				for(var i = 0; i < data.length;i++){
					var layer = routeLayer.addLayer(L.geoJson(eval('(' + data[i] + ')')).bindPopup("这里是线路信息"));

				}
			},
			error : function(e){
				alert("内部错误！");
			}
		});
	});
	
}







