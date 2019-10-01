<!--日降水量 有错误待定-->
<template>
    <div style="background: transparent;!important;">
        <div id="viewDiv"></div>
        <!--时间轴-->
        <date-picker class="date-picker" v-on:listenChild="showChild"></date-picker>
    </div>
</template>
<script>
    import esriLoader from "esri-loader";
    import axios from 'axios';
    import '../assets/css/hour.css';
    import DatePicker from '../components/DatePicker';

    export default {
        name: "DayRain",
        data() {
            return {
                month: new Date().getMonth() + 1,
                day: new Date().getDate(),
            };
        },
        mounted() {
            this.getWeather();
            this.$nextTick(() => {
                // 初始化获取天气
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
                this.getWeather();
            },
            getWeather() {
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
                    "esri/layers/support/LabelClass",
                    "esri/widgets/Legend"
                ], options)
                    .then(([
                               Map, SceneView, FeatureLayer, Point, Polygon, LabelClass,  Legend
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
                                name: "totalPre",  //可以用来渲染符号大小
                                alias: "totalPre",
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
                                    field: "totalPre",
                                    stops: [{value: 0, color: "gray"},
                                        {value: 0.5, color: "green"}]
                                }, {
                                    type: "size",
                                    field: "totalPre",
                                    stops: [
                                        {value: 0, size: 20000},  // 40km in height
                                        {value: 100, size: 100000}  // 1,000km in height
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

                        let graphics = [];
                        let param = {
                            month: this.month,
                            day: this.day,
                        };
                        console.log(this.month, this.day);
                        let _this = this;

                        //获取日平均气象数据以及对应的区域
                        // function getWeather(jsonUrl) {
                        //     axios.get('http://localhost:3000/weathers/dayWea', {params: param}).then(function (weaRes) {
                        //         let weatherData = weaRes.data.result;  //rest接口获取的天气json结果
                        //         axios.get(jsonUrl).then((abaRes) => {
                        //             weatherData.forEach((weaItem, index) => {
                        //                 console.log(typeof weaItem.totalTemp);
                        //                 let aba = abaRes.data.features;   //geoJson静态资源获取的县级json结果
                        //                 console.log(abaRes.features);
                        //                 aba.forEach((abaItem, abaIndex) => {
                        //                     let ring = abaItem.geometry.coordinates[0][0];  //geoJson每个县的边界坐标
                        //                     if (parseInt(weaItem._id) === abaRes.data.features[abaIndex].properties.Station_Id_C) {
                        //                         // console.log(weaItem.Station_Id_C, weaItem.TEM);
                        //                         graphics.push({
                        //                             geometry: new Polygon({
                        //                                 rings: ring
                        //                             }),
                        //                             attributes: {
                        //                                 ObjectID: 'ObjectId',
                        //                                 title: abaItem.properties.name,
                        //                                 totalPre: parseFloat(weaItem.totalPre.toFixed(2))
                        //                             }
                        //                         });
                        //                     }
                        //                 })
                        //             });
                        //         });
                        //     });
                        // }
                        //
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

                        axios.get('http://localhost:3000/weathers/dayRain', {params: param}).then((tempRes) => {
                            let hourTempArr = tempRes.data.result;
                            hourTempArr.forEach((tempItem) => {
                                let ring = tempItem.coordinates;
                                let name = tempItem._id;
                                let totalPre = tempItem.totalPre;
                                // console.log(ring)
                                graphics.push({
                                    geometry: new Polygon({
                                        rings: ring
                                    }),
                                    attributes: {
                                        ObjectID: 'ObjectId',
                                        title: name,
                                        totalPre: parseFloat(totalPre.toFixed(2))
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
                                                    fieldName: "totalPre"
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

                            //图例部件
                            // var legend = new Legend({
                            //     view: view
                            // });
                            // view.ui.add(legend, "bottom-left");
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
                        //                             fieldName: "totalPre"
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
                        //
                        //     //图例部件
                        //     // var legend = new Legend({
                        //     //     view: view
                        //     // });
                        //     // view.ui.add(legend, "bottom-left");
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
