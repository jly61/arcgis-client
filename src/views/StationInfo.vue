<template>
    <div style="background: transparent;!important;">
        <!--地图容器-->

        <button type="danger" size="mini" @click="fullScreen()">全屏</button>
        <div class="dashboard" id="content">
            <div id="viewDiv"></div>
        </div>
    </div>
</template>

<script>
    import esriLoader from "esri-loader";
    import axios from 'axios';

    export default {
        name: "StationInfo",
        data() {
            return {
                month: new Date().getMonth() + 1,
                day: new Date().getDate(),
                hourFlag: new Date().getHours(),
            };
        },
        mounted() {
            this.getWeather(6, 27, this.hourFlag);
        },
        components: {},
        computed: {},
        methods: {
            //full
            fullScreen () {
                var elem = document.getElementById('content')
                requestFullScreen(elem)

                function requestFullScreen (element) {
                    var requestMethod =
                        element.requestFullScreen ||
                        element.webkitRequestFullScreen ||
                        element.mozRequestFullScreen ||
                        element.msRequestFullScreen
                    if (requestMethod) {
                        requestMethod.call(element)
                    } else if (typeof window.ActiveXObject !== 'undefined') {
                        var wscript = new ActiveXObject('WScript.Shell')
                        if (wscript !== null) {
                            wscript.SendKeys('{F11}')
                        }
                    }
                }
            },
            getWeather(month, day, hour) {
                const options = {
                    // 可以使用自定义资源加载,arcgis 官网加载太慢了,经常加载失败.后面会讲到自己本地如何配置资源
                    url: 'https://js.arcgis.com/4.12/'
                };
                esriLoader.loadModules([
                    "esri/Map",
                    "esri/views/MapView",
                    "esri/layers/FeatureLayer",
                    "esri/geometry/Point",
                    "esri/layers/support/LabelClass",
                    "esri/widgets/Legend",
                    "esri/widgets/CoordinateConversion"
                ], options)
                    .then(([
                               Map, MapView, FeatureLayer, Point, LabelClass, Legend
                           ]) => {
                        let fields = [
                            {
                                name: "ObjectID",
                                alias: "ObjectID",
                                type: "oid"   //   每个要素必须的字段，字段值必须唯一，当做是整数类型。。。
                            },
                            {
                                name: "station_name",
                                alias: "站点名",
                                type: "string"  //字符串类型
                            }, {
                                name: "observe_alt",  //可以用来渲染符号大小
                                alias: "观测场海拔",
                                type: "single"  //单精度类型
                            }
                        ];

                        //二维渲染
                        let renderer = {
                            type: "simple", // 简单渲染器  new SimpleRenderer()
                            symbol: {
                                type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                                size: 10,
                                color: [226, 119, 40],
                                outline: {  // autocasts as new SimpleLineSymbol()
                                    width: 0.5,
                                    color: "white"
                                }
                            },
                        };
                        //要素标记
                        const statesLabelClass = new LabelClass({
                            labelExpressionInfo: {expression: "$feature.station_name"},
                            symbol: {
                                type: "text",  // autocasts as new TextSymbol()
                                color: "black",
                                haloSize: 1,
                                haloColor: "white"
                            }
                        });
                        let param = {
                            month: month,
                            day: day,
                            hour: hour
                        };
                        console.log(`param: ${param}`);

                        //获取气象站点坐标，生成graphic
                        let graphics = [];
                        axios.get('http://localhost:3000/stations').then((stationRes) => {
                            let stationInfo = stationRes.data.result;
                            stationInfo.forEach((infoItem) => {
                                let x = infoItem.lon;
                                let y = infoItem.lat;
                                graphics.push({
                                    geometry: new Point({
                                        x: x,
                                        y: y
                                    }),
                                    attributes: {
                                        ObjectID: 'ObjectId',
                                        station_name: infoItem.Station_name,
                                        observe_alt: infoItem.Observe_alt
                                    },
                                });
                            })
                        });

                        setTimeout(function () {
                            console.log(graphics);
                            let featureLayer = new FeatureLayer({
                                source: graphics,
                                fields: fields,
                                renderer: renderer,
                                popupTemplate: {
                                    title: "{station_name}",
                                    content: [
                                        {
                                            type: "fields",
                                            fieldInfos: [
                                                {
                                                    fieldName: "ObjectID"
                                                },
                                                {
                                                    fieldName: "station_name"
                                                },
                                                {
                                                    fieldName: "observe_alt"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            });
                            featureLayer.labelingInfo = [statesLabelClass];

                            let map = new Map({
                                basemap: "dark-gray-vector",
                                layers: [featureLayer]
                            });
                            let view = new MapView({
                                container: "viewDiv",
                                map: map,
                                center: [102.929, 28.127], // longitude, latitude
                                zoom: 7
                            });

                            //地图坐标信息
                            let coordsWidget = document.createElement("div");
                            coordsWidget.id = "coordsWidget";
                            coordsWidget.className = "esri-widget esri-component";
                            coordsWidget.style.padding = "7px 15px 5px";
                            view.ui.add(coordsWidget, "bottom-right");

                            function showCoordinates(pt) {
                                let coords = "Lat/Lon " + pt.latitude.toFixed(3) + " " + pt.longitude.toFixed(3) +
                                    " | Scale 1:" + Math.round(view.scale * 1) +
                                    " | Zoom " + view.zoom;
                                coordsWidget.innerHTML = coords;
                            }

                            view.watch("stationary", function (isStationary) {
                                showCoordinates(view.center);
                            });

                            view.on("pointer-move", function (evt) {
                                showCoordinates(view.toMap({x: evt.x, y: evt.y}));
                            });
                        }, 1000)
                    }, reason => {
                        console.log(reason);
                    })
            }
        }
    }
</script>

<style scoped>
    @import url('https://js.arcgis.com/4.12/esri/css/main.css');

    #viewDiv {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100vh;
    }
</style>
