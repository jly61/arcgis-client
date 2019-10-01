<!--通过站点查询气象信息-->
<template>
    <div>
        <!--Echart图表-->
        <div id="chart" style="width: 100%;height: 400px;"></div>
        <div id="rain-chart" style="width: 100%;height: 400px;"></div>
        <!--查询站点-->
        <div class="station_sel">
        <!--日历-->
        <date-picker class="date-picker" v-on:listenChild="showChild"></date-picker>
        <select v-model="staSelected" @click="getValue($event)">
            <option value="0">请选择站点名</option>
            <option v-for="(station, index) in stationList" :value="station">{{station}}</option>
        </select>
            <button @click="queryWea">查询</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import '../assets/css/station-query.css';
    import DatePicker from '../components/DatePicker';      //引入日历组件
    import echarts from 'echarts';
    export default {
        name: "StationQuery",
        data() {
            return {
                month: new Date().getMonth() + 1,
                day: new Date().getDate(),
                staSelected: 0,
                stationList: [],
                tempList: [],
                tempMaxList: [],  //每小时最高温度
                tempMinList: [],  //每小时最低温度
                rainList: []
            }
        },
        components: {
            DatePicker
        },
        mounted() {
            this.$nextTick(() => {
                this.getStation();
            })
        },
        methods: {
            showChild(data) {
                console.log(data);
                this.month = data.month;
                this.day = data.day;
            },
            //获取站点信息
            getStation() {
                axios('http://localhost:3000/stations').then((res) => {
                    // let resList = res.data.result;   //原代码
                    let resList = res.data.result;
                    resList.forEach((item) => {
                        this.stationList.push(item.Station_name);
                    })
                })
            },
            // 获取选中站点值
            getValue($event) {
                this.staSelected = event.target.value;
            },
            //获取站点天气
            queryWea() {
                this.tempList = [];
                this.tempMaxList = [];
                this.tempMinList = [];
                this.rainList = [];

                let param = {
                    'stationName': this.staSelected,
                    'month': this.month,
                    'day': this.day
                };
                axios.get('http://localhost:3000/stations/hourWea', {params: param}).then(res=> {
                    // let arr = res.data.result;
                    let arr = res.data.result;
                    console.log(arr);
                    arr.forEach((item) => {
                        this.tempList.push(item.TEM);
                        this.rainList.push(item.PRE_1h);
                        this.tempMaxList.push(item.TEM_Max);
                        this.tempMinList.push(item.TEM_Min);
                        console.log(this.tempMaxList);
                        console.log(this.tempMinList);
                    });
                    this.initChart();
                })
            },
            //初始化图表
            initChart() {
                ////获取站点每小时气温，图表
                let tempChart = document.getElementById("chart");
                let myTempChart = echarts.init(tempChart);
                // myTempChart.clear();
                myTempChart.setOption({
                    title: {
                        text: '石渠县气温',
                        subtext: '24小时'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['每小时最高气温','每小时平均气温','每小时最低气温']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        data: [0, 1 ,2, 3 ,4 ,5 ,6 ,7 ,8, 9 ,10 ,11 ,12 ,13 ,14, 15, 16, 17 ,18,19 ,20, 21,22,23]
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} °C'
                        }
                    },
                    series: [
                        {
                            name:'每小时最高气温',
                            type:'line',
                            data: this.tempMaxList,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:'每小时平均气温',
                            type:'line',
                            data: this.tempList,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:'每小时最低气温',
                            type:'line',
                            data:this.tempMinList,
                            markPoint: {
                                data: [
                                    {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'},
                                    [{
                                        symbol: 'none',
                                        x: '90%',
                                        yAxis: 'max'
                                    }, {
                                        symbol: 'circle',
                                        label: {
                                            normal: {
                                                position: 'start',
                                                formatter: '最大值'
                                            }
                                        },
                                        type: 'max',
                                        name: '最高点'
                                    }]
                                ]
                            }
                        }
                    ]
                });

                //获取站点每小时降雨量，图表
                let rainChart = document.getElementById("rain-chart");
                var myRainChart = echarts.init(rainChart);
                // myRainChart.clear();
                myRainChart.setOption({
                    title: {
                        text: '石渠县降雨量',
                        subtext: '24小时'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['最高气温','最低气温']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        data: [0, 1 ,2, 3 ,4 ,5 ,6 ,7 ,8, 9 ,10 ,11 ,12 ,13 ,14, 15, 16, 17 ,18,19 ,20, 21,22,23]
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} mm'
                        }
                    },
                    series: [
                        {
                            name:'降雨量',
                            type:'line',
                            data: this.rainList,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        }
                    ]
                });
            }
        }
    }
</script>

<style scoped>

</style>
