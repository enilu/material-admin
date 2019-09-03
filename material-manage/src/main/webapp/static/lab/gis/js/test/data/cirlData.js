var cirlData = [//测试数据
    {
        title : 'beijing',
        radius : 40,//圆半径
        style : {//圆样式
            fillColor : 'red'
        },
        latlng : [41.802542590364354, 123.431396484375],//圆中心点
        click : function(){
            console.log("click bj");
        },
        popupContent : "气泡内容====",//气泡提示内容
        childBbox : [[42.36666166373274, 118.10852050781251],[38.57823196583313, 125.71105957031249 ]],//点击转曲，时设置转曲后的地图范围
        child : [
            {
                title : 'beijing',
                radius : 30,
                latlng : [41.802542590364354, 123.431396484375],
                click : function(){
                    alert(this.radius);
                },
                popupContent : "旗袍内容1"
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
        popupContent : "气泡内容"
    },{
        title : 'beijing',
        latlng : [30.183121842195515, 120.1904296875],
        radius : 25,
        click : function(){
            console.log("click xa");
        },
        popupContent : "气泡内容"
    },{
        title : 'beijing',
        latlng : [23.200960808078566, 113.5546875],
        radius : 40,
        click : function(){
            console.log("click xa");
        },
        popupContent : "气泡内容"
    },{
        title : 'beijing',
        latlng : [29.611670115197377, 106.5234375],
        radius : 34,
        click : function(){
            console.log("click xa");
        },
        popupContent : "气泡内容"
    },{
        title : 'beijing',
        latlng : [35.746512259918504, 96.6796875],
        radius : 21,
        click : function(){
            console.log("click xa");
        },
        popupContent : "气泡内容"
    },{
        title : 'beijing',
        latlng : [42.81152174509788, 113.466796875],
        radius : 29,
        click : function(){
            console.log("click xa");
        },
        popupContent : "气泡内容"
    },{
        title : 'beijing',
        latlng : [45.767522962149904, 126.474609375],
        radius : 36,
        click : function(){
            console.log("click xa");
        },
        popupContent : "气泡内容"
    },{
        title : 'beijing',
        latlng : [40.27952566881291, 86.0009765625],
        radius : 40,
        click : function(){
            console.log("click xa");
        },
        popupContent : "气泡内容"
    },{
        title : 'beijing',
        latlng : [30.93992433102347, 89.033203125],
        radius : 30,
        click : function(){
            console.log("click xa");
        },
        popupContent : "气泡内容"
    }

];
