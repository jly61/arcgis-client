<template>
    <div style="background: transparent;!important;">
        <div id="viewDiv"></div>
        <!--时间轴-->
        <date-picker class="date-picker" v-on:listenChild="showChild"></date-picker>
        <div class="time">
            <div class="hour">
                <a href="#" v-for="(item, index) in hourList" v-if="item < 10"
                   @click="getWeather(month,day,item)" :class="{'hour-selected': hourFlag===item}"> 0{{item}}:00 </a>
                <a href="#" v-else="item >= 10" @click="getWeather(month,day,item)"
                   :class="{'hour-selected': hourFlag===item}">{{item}}:00</a>
            </div>
        </div>
    </div>
</template>
<script>
    import esriLoader from "esri-loader";
    import axios from 'axios';
    import '../assets/css/hour.css';
    import DatePicker from '../components/DatePicker';

    export default {
        name: "Rainfall",
        data() {
            return {
                month: new Date().getMonth() + 1,   //月份从0开始
                day: new Date().getDate(),
                hourList: [],
                hourFlag: new Date().getHours(),
            };
        },
        mounted() {
            this.$nextTick(() => {
                for (let i = 0; i < 24; i++) {
                    this.hourList.push(i);
                }
                // 初始化获取天气
                this.getWeather(6, 27, this.hourFlag);
            })
        },
        components: {
            DatePicker
        },
        computed: {},

        methods: {
            showChild(data) {
                console.log(data);
                this.month = data.month;
                this.day = data.day;
                this.getWeather(this.month, this.day, new Date().getHours());
            },
            getWeather(month, day, hour) {
                const options = {
                    // 可以使用自定义资源加载,arcgis 官网加载太慢了,经常加载失败.后面会讲到自己本地如何配置资源
                    // url: 'https://js.arcgis.com/4.12/'
                    url: 'localhost:3000/package/arcgis_js_api/library/4.12/'
                };
                esriLoader.loadModules([
                    "esri/Map",
                    "esri/views/SceneView",
                    "esri/layers/FeatureLayer",
                    "esri/geometry/Point",
                    "esri/geometry/Polygon",
                    "esri/layers/support/LabelClass"
                ], options)
                    .then(([
                               Map, SceneView, FeatureLayer, Point, Polygon, LabelClass
                           ]) => {
                        var fields = [
                            {
                                name: "ObjectID",
                                alias: "ObjectID",
                                type: "oid"   //   每个要素必须的字段，字段值必须唯一，当做是整数类型。。。
                            },
                            {
                                name: "title",
                                alias: "title",
                                type: "string"  //字符串类型
                            }, {
                                name: "pre",  //可以用来渲染符号大小
                                alias: "pre",
                                type: "single"  //单精度类型
                            }
                        ];     //除了上面的三种类型，还有 double、date。。。

                        //三维渲染
                        var renderer = {
                            type: "simple", // 简单渲染器  new SimpleRenderer()
                            symbol: {
                                type: "polygon-3d",  // autocasts as new PolygonSymbol3D()
                                symbolLayers: [{
                                    type: "extrude",  // autocasts as new ExtrudeSymbol3DLayer()
                                    size: 100000  // 100,000 meters in height
                                    // material: { color: "red" }
                                }]
                            },
                            visualVariables: [
                                {
                                    type: "color",
                                    field: "pre",
                                    stops: [{value: 0, color: "gray"},
                                        {value: 0.5, color: "green"}]
                                }, {
                                    type: "size",
                                    field: "pre",
                                    stops: [
                                        {value: 0, size: 20000},  // 40km in height
                                        {value: 5, size: 80000}  // 1,000km in height
                                    ]
                                }
                            ]
                        };
                        //要素标记
                        const statesLabelClass = new LabelClass({
                            labelExpressionInfo: {expression: "$feature.title"},
                            symbol: {
                                type: "text",  // autocasts as new TextSymbol()
                                color: "black",
                                haloSize: 1,
                                haloColor: "white"
                            }
                        });
                        // let graphics = [];
                        // let abaUrl = 'http://localhost:3000/geojson/aba/aba.json';
                        // let bazUrl = 'http://localhost:3000/geojson/bazhong/bazhong.json';
                        // let chengdUrl = 'http://localhost:3000/geojson/chengdu/chengdu.json';
                        // let dazUrl = 'http://localhost:3000/geojson/dazhou/dazhou.json';
                        // let deyUrl = 'http://localhost:3000/geojson/deyang/deyang.json';
                        // let ganzUrl = 'http://localhost:3000/geojson/ganzi/ganzi.json';
                        // let guanganUrl = 'http://localhost:3000/geojson/guangan/guangan.json';
                        // let guangyUrl = 'http://localhost:3000/geojson/guangyuan/guangyuan.json';
                        // let lesUrl = 'http://localhost:3000/geojson/leshan/leshan.json';
                        // let liangsUrl = 'http://localhost:3000/geojson/liangshan/liangshan.json';
                        // let luzUrl = 'http://localhost:3000/geojson/luzhou/luzhou.json';
                        // let meisUrl = 'http://localhost:3000/geojson/meishan/meishan.json';
                        // let mianyUrl = 'http://localhost:3000/geojson/mianyang/mianyang.json';
                        // let nancUrl = 'http://localhost:3000/geojson/nanchong/nanchong.json';
                        // let neijUrl = 'http://localhost:3000/geojson/neijiang/neijiang.json';
                        // let pzhUrl = 'http://localhost:3000/geojson/panzhihua/panzhihua.json';
                        // let suinUrl = 'http://localhost:3000/geojson/suining/suining.json';
                        // let yaanUrl = 'http://localhost:3000/geojson/yaan/yaan.json';
                        // let yibUrl = 'http://localhost:3000/geojson/yibin/yibin.json';
                        // let zigUrl = 'http://localhost:3000/geojson/zigong/zigong.json';
                        // let ziyUrl = 'http://localhost:3000/geojson/ziyang/ziyang.json';

                        let param = {
                            month: month,
                            day: day,
                            hour: hour
                        };
                        let _this = this;
                        console.log(param);

                        //获取气象数据以及对应的区域
                        // function getWeather(jsonUrl) {
                        //     axios.get('http://localhost:3000/weathers', {params: param}).then(function (weaRes) {
                        //         _this.hourFlag = parseInt(weaRes.hour);
                        //         let weatherData = weaRes.data.result;  //rest接口获取的天气json结果
                        //         axios.get(jsonUrl).then((abaRes) => {
                        //             weatherData.forEach((weaItem, index) => {
                        //                 let aba = abaRes.data.features;   //geoJson静态资源获取的县级json结果
                        //                 aba.forEach((abaItem, abaIndex) => {
                        //                     let ring = abaItem.geometry.coordinates[0][0];  //geoJson每个县的边界坐标
                        //                     if (parseInt(weaItem.Station_Id_C) === abaRes.data.features[abaIndex].properties.Station_Id_C) {
                        //                         // console.log(weaItem.Station_Id_C, weaItem.TEM);
                        //                         graphics.push({
                        //                             geometry: new Polygon({
                        //                                 rings: ring
                        //                             }),
                        //                             attributes: {
                        //                                 ObjectID: 'ObjectId',
                        //                                 title: abaItem.properties.name,
                        //                                 pre: weaItem.PRE_1h
                        //                             },
                        //                         });
                        //                     }
                        //                 })
                        //             });
                        //         });
                        //     });
                        // }
                        // getWeather(abaUrl);
                        // getWeather(bazUrl);
                        // getWeather(chengdUrl);
                        // getWeather(dazUrl);
                        // getWeather(deyUrl);
                        // getWeather(ganzUrl);
                        // getWeather(guanganUrl);
                        // getWeather(guangyUrl);
                        // getWeather(lesUrl);
                        // getWeather(liangsUrl);
                        // getWeather(luzUrl);
                        // getWeather(meisUrl);
                        // getWeather(mianyUrl);
                        // getWeather(nancUrl);
                        // getWeather(neijUrl);
                        // getWeather(pzhUrl);
                        // getWeather(suinUrl);
                        // getWeather(yaanUrl);
                        // getWeather(yibUrl);
                        // getWeather(zigUrl);
                        // getWeather(ziyUrl);

                        let graphics = [];
                        axios.get('http://localhost:3000/weathers/hourPre', {params: param}).then((tempRes) => {
                            let hourTempArr = tempRes.data.result;
                            hourTempArr.forEach((tempItem) => {
                                let ring = tempItem.coordinates;
                                let name = tempItem.name;
                                let pre = tempItem.docs.PRE_1h;
                                // console.log(ring)
                                graphics.push({
                                    geometry: new Polygon({
                                        rings: ring
                                    }),
                                    attributes: {
                                        ObjectID: 'ObjectId',
                                        title: name,
                                        pre: pre
                                    },
                                });
                            });
                            console.log(graphics);
                            var featureLayer = new FeatureLayer({
                                source: graphics,
                                fields: fields,
                                renderer: renderer,
                                popupTemplate: {
                                    title: "{title}",
                                    content: [
                                        {
                                            type: "fields",
                                            fieldInfos: [
                                                {
                                                    fieldName: "ObjectID"
                                                },
                                                {
                                                    fieldName: "title"
                                                },
                                                {
                                                    fieldName: "pre"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            });
                            featureLayer.labelingInfo = [statesLabelClass];
                            var map = new Map({
                                basemap: "dark-gray",
                                ground: "world-elevation",
                                layers: [featureLayer]
                            });
                            var initCam = {
                                position: {
                                    x: 108,
                                    y: 30,
                                    z: 332780,
                                },
                                heading: 358.8,
                                tilt: 13.7
                            };
                            var view = new SceneView({
                                map: map,
                                container: "viewDiv",
                                camera: initCam
                            });
                        });

                        // setTimeout(function () {
                        //     console.log(graphics);
                        //     var featureLayer = new FeatureLayer({
                        //         source: graphics,
                        //         fields: fields,
                        //         renderer: renderer,
                        //         popupTemplate: {
                        //             title: "{title}",
                        //             content: [
                        //                 {
                        //                     type: "fields",
                        //                     fieldInfos: [
                        //                         {
                        //                             fieldName: "ObjectID"
                        //                         },
                        //                         {
                        //                             fieldName: "title"
                        //                         },
                        //                         {
                        //                             fieldName: "pre"
                        //                         }
                        //                     ]
                        //                 }
                        //             ]
                        //         }
                        //     });
                        //     featureLayer.labelingInfo = [statesLabelClass];
                        //     var map = new Map({
                        //         basemap: "dark-gray",
                        //         ground: "world-elevation",
                        //         layers: [featureLayer]
                        //     });
                        //     var initCam = {
                        //         position: {
                        //             x: 108,
                        //             y: 30,
                        //             z: 332780,
                        //         },
                        //         heading: 358.8,
                        //         tilt: 13.7
                        //     };
                        //     var view = new SceneView({
                        //         map: map,
                        //         container: "viewDiv",
                        //         camera: initCam
                        //     });
                        // }, 1000)
                    }, reason => {
                        console.log(reason);
                    })
            },
        }
    };
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
