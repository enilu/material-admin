var flashMap = {
    map: null,
    innerData:{},
    /**
     * 标注点点击事件
     * @param mark
     */
    clickMark: function (mark) {
        console.log(mark);
        var lat = mark.jsonObj.lat;
        var lng = mark.jsonObj.lng;
        alert("lat:"+lat + ",lng:" + lng );
    },
    /**
     * 鼠标移动到标注点 回调方法
     * @param mark
     */
    mouseOverEvent: function (mark) {
        var name = mark.jsonObj.name;
        mark.bindPopup( name).openPopup();
    },
    /**
     * 地图初始化
     * @param domId
     */
    init: function (domId) {
        var map = L.map(domId, {
            zoominfoControl: true,
            zoomControl: false,
            zoom: 4,
            maxZoom: 11,
            minZoom:4,
            center: [34.346299,106.757186],
            attributionControl: true
        });
        L.tileLayer('http://duanzi:8080/gismap/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; GoogleMap,Support by <a href="http://www.enilu.cn">enilu.cn</a>'
        }).addTo(map);
        this.map = map;
    },
    /**
     * 添加坐标点
     * @param data
     */
    addMark: function (data) {
        var marker = L.marker([data.lat, data.lng]).addTo(this.map);
        //设置自定义属性
        marker.jsonObj = data;
        var me = this;
        marker.on("click", function () {
            me.clickMark(this);
        });
        marker.on("mouseover", function () {
            me.mouseOverEvent(this);
        });
        if (data.name) {
            marker.bindPopup(data.name);
        }
    },
    /**
     * 添加多个坐标点
     * @param positionList
     */
    addMarks: function (positionList) {
        for (var i = 0; i < positionList.length; i++) {
            this.addMark(positionList[i]);
        }
    },
    /**
     * 定位
     * @param lat
     * @param lng
     */
    pointTo:function(lat,lng){
        this.addMark({lat:31.235958,lng:121.480545,name:'上海'});
        this.map.panTo(L.latLng(lat, lng));

    },
    /**
     * 画圆
     * @param data
     */
    drawCircle:function(data){
        var me = this;
        var barLayer = new BarLayer({
            data : data,
            map : me.map
        });
        barLayer.addLayer();
        this.innerData.barLayer = barLayer;
    },
    /**
     * 画弧线
     * @param data
     */
    drawArc:function(data){
        var me = this;
        var arcLayer = new ArcLayer({
            data : data,
            map : me.map
        });
        arcLayer.addLayer();
        this.innerData.arcLayer = arcLayer;
    }
}


$(document).ready(function () {
    flashMap.init("map");
    $('#btnInit').hide();
    $('#btnAddMark').click(function () {
        flashMap.addMark({lat: 40.13254611, lng: 116.5056088, name: "北京"});
    })
    $("#btnAddMarks").click(function () {
        flashMap.addMarks([
            {lat: 37.94, lng: 112.64, name: '太原'},
            {lat: 40.82149932, lng: 111.6842769, name: '呼和浩特市'}]);
    })
    $('#btnPointTo').click(function(){
        flashMap.pointTo(31.235958,121.480545,8);
    })
    var  drawCircle = true
    $('#btnDrawCircle').click(function(){
        if(drawCircle) {
            flashMap.drawCircle(cirlData);
            $(this).text('删除圆圈');
            drawCircle=false;
        }else{
            flashMap.innerData.barLayer.removeLayer();
            flashMap.innerData.barLayer = null;
            $(this).text('画圆圈').show();
            drawCircle = true;
        }

    });
    var drawArc = true;
    $('#btnDrawArc').click(function(){
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
        if(drawArc){
            flashMap.drawArc(arcData);
            $(this).text('删除弧线');
            drawArc=false;
        }else{
            flashMap.innerData.arcLayer.removeLayer();
            flashMap.innerData.arcLayer = null;
            $(this).text('画弧线');
            drawArc=true;
        }

    })


})



