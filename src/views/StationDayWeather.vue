<!--通过站点查询日气象信息-->
<template>
    <div>
        <!--Echart图表-->
        <div id="chart" style="width: 100%;height: 400px;"></div>
        <div id="rain-chart" style="width: 100%;height: 400px;"></div>
        <!--查询站点-->
        <div class="station_sel">
            <!--日历-->
            <date-picker class="date-picker" v-on:listenChild="startDate"></date-picker>
            <date-picker class="date-picker" v-on:listenChild="endDate" style="margin-bottom: -200px;"></date-picker>
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
        name: "StationDayWeather",
        data() {
            return {
                startMonth: 0,
                startDay: 0,
                endMonth: 0,
                endDay: 0,
                staSelected: 0,
                stationList: [],
                tempList: [],
                rainList: [],
                dateList: [],
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
            startDate(data) {
                this.startMonth = data.month;
                this.startDay = data.day;
            },

            endDate(data) {
                this.endMonth = data.month;
                this.endDay = data.day;
            },
            //获取站点信息
            getStation() {
                axios('http://localhost:3000/stations').then((res) => {
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
                let param = {
                    'stationName': this.staSelected,
                    'startMonth': this.startMonth,
                    'startDay': this.startDay,
                    'endMonth': this.endMonth,
                    'endDay': this.endDay
                };
                console.log(this.staSelected,this.startMonth,this.startDay,this.endMonth,this.endDay);
                axios.get('http://localhost:3000/stations/dayWea', {params: param}).then(res=> {
                    this.tempList = [];
                    this.rainList = [];
                    this.dateList = [];
                    let arr = res.data.result;
                    console.log(arr);
                    arr.forEach((item) => {
                        this.tempList.push(item.avgTemp.toFixed(2));
                        this.rainList.push(item.totalPre.toFixed(2));
                        this.dateList.push(item._id);
                    });
                    this.initChart();
                })
            },
            //初始化图表
            initChart() {
                ////获取站点每小时气温，图表
                let tempChart = document.getElementById("chart");
                var myTempChart = echarts.init(tempChart);
                myTempChart.setOption({
                    title: {
                        text: '石渠县气温',
                        subtext: '24小时'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['每小时最高气温','日平均气温','每小时最低气温']
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
                        data: this.dateList
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} °C'
                        }
                    },
                    series: [
                        {
                            name:'日平均气温',
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
                        }
                    ]
                });

                //获取站点每小时降雨量，图表
                let rainChart = document.getElementById("rain-chart");
                var myRainChart = echarts.init(rainChart);
                myRainChart.setOption({
                    title: {
                        text: '石渠县降雨量',
                        subtext: '24小时'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['日降雨量']
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
                        data: this.dateList
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} mm'
                        }
                    },
                    series: [
                        {
                            name:'日降雨量',
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
