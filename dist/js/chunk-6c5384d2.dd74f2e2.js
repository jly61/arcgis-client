(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6c5384d2"],{"43b2":function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{staticStyle:{width:"100%",height:"400px"},attrs:{id:"chart"}}),e("div",{staticStyle:{width:"100%",height:"400px"},attrs:{id:"rain-chart"}}),e("div",{staticClass:"station_sel"},[e("date-picker",{staticClass:"date-picker",on:{listenChild:t.showChild}}),e("select",{directives:[{name:"model",rawName:"v-model",value:t.staSelected,expression:"staSelected"}],on:{click:function(a){return t.getValue(a)},change:function(a){var e=Array.prototype.filter.call(a.target.options,function(t){return t.selected}).map(function(t){var a="_value"in t?t._value:t.value;return a});t.staSelected=a.target.multiple?e:e[0]}}},[e("option",{attrs:{value:"0"}},[t._v("请选择站点名")]),t._l(t.stationList,function(a,i){return e("option",{domProps:{value:a}},[t._v(t._s(a))])})],2),e("button",{on:{click:t.queryWea}},[t._v("查询")])],1)])},n=[],s=e("bc3a"),o=e.n(s),r=(e("c48d"),e("e94a")),c=e("313e"),l=e.n(c),p={name:"StationQuery",data:function(){return{month:(new Date).getMonth()+1,day:(new Date).getDate(),staSelected:0,stationList:[],tempList:[],tempMaxList:[],tempMinList:[],rainList:[]}},components:{DatePicker:r["a"]},mounted:function(){var t=this;this.$nextTick(function(){t.getStation()})},methods:{showChild:function(t){console.log(t),this.month=t.month,this.day=t.day},getStation:function(){var t=this;o()("http://localhost:3000/stations").then(function(a){var e=a.data.result;e.forEach(function(a){t.stationList.push(a.Station_name)})})},getValue:function(t){this.staSelected=event.target.value},queryWea:function(){var t=this;this.tempList=[],this.tempMaxList=[],this.tempMinList=[],this.rainList=[];var a={stationName:this.staSelected,month:this.month,day:this.day};o.a.get("http://localhost:3000/stations/hourWea",{params:a}).then(function(a){var e=a.data.result;console.log(e),e.forEach(function(a){t.tempList.push(a.TEM),t.rainList.push(a.PRE_1h),t.tempMaxList.push(a.TEM_Max),t.tempMinList.push(a.TEM_Min),console.log(t.tempMaxList),console.log(t.tempMinList)}),t.initChart()})},initChart:function(){var t=document.getElementById("chart"),a=l.a.init(t);a.setOption({title:{text:"石渠县气温",subtext:"24小时"},tooltip:{trigger:"axis"},legend:{data:["每小时最高气温","每小时平均气温","每小时最低气温"]},toolbox:{show:!0,feature:{dataZoom:{yAxisIndex:"none"},dataView:{readOnly:!1},magicType:{type:["line","bar"]},restore:{},saveAsImage:{}}},xAxis:{type:"category",boundaryGap:!1,data:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]},yAxis:{type:"value",axisLabel:{formatter:"{value} °C"}},series:[{name:"每小时最高气温",type:"line",data:this.tempMaxList,markPoint:{data:[{type:"max",name:"最大值"},{type:"min",name:"最小值"}]},markLine:{data:[{type:"average",name:"平均值"}]}},{name:"每小时平均气温",type:"line",data:this.tempList,markPoint:{data:[{type:"max",name:"最大值"},{type:"min",name:"最小值"}]},markLine:{data:[{type:"average",name:"平均值"}]}},{name:"每小时最低气温",type:"line",data:this.tempMinList,markPoint:{data:[{name:"周最低",value:-2,xAxis:1,yAxis:-1.5}]},markLine:{data:[{type:"average",name:"平均值"},[{symbol:"none",x:"90%",yAxis:"max"},{symbol:"circle",label:{normal:{position:"start",formatter:"最大值"}},type:"max",name:"最高点"}]]}}]});var e=document.getElementById("rain-chart"),i=l.a.init(e);i.setOption({title:{text:"石渠县降雨量",subtext:"24小时"},tooltip:{trigger:"axis"},legend:{data:["最高气温","最低气温"]},toolbox:{show:!0,feature:{dataZoom:{yAxisIndex:"none"},dataView:{readOnly:!1},magicType:{type:["line","bar"]},restore:{},saveAsImage:{}}},xAxis:{type:"category",boundaryGap:!1,data:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]},yAxis:{type:"value",axisLabel:{formatter:"{value} mm"}},series:[{name:"降雨量",type:"line",data:this.rainList,markPoint:{data:[{type:"max",name:"最大值"},{type:"min",name:"最小值"}]},markLine:{data:[{type:"average",name:"平均值"}]}}]})}}},u=p,d=e("2877"),m=Object(d["a"])(u,i,n,!1,null,"6757bfb2",null);a["default"]=m.exports},c48d:function(t,a,e){},e94a:function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"date-picker"},[t.popupFlag?e("div",{staticClass:"date-popup",attrs:{id:"date-popup"}},[e("div",{staticClass:"calendar-head"},[e("div",[e("a",{attrs:{href:"javascript:"}},[t._v("<<")]),e("a",{attrs:{href:"javascript:"},on:{click:t.cutMonth}},[t._v("<")])]),e("div",[e("a",{attrs:{href:"javascript:"}},[t._v("2019年")]),e("a",{attrs:{href:"javascript:"}},[t._v(t._s(t.month)+"月")])]),e("div",[e("a",{attrs:{href:"javascript:"},on:{click:t.addMonth}},[t._v(">")]),e("a",{attrs:{href:"javascript:"}},[t._v(">>")])])]),e("div",{staticClass:"calendar-body"},t._l(t.dayList,function(a,i){return e("a",{class:{"day-selected":a===t.day},attrs:{href:"javascript:"},on:{click:function(e){return t.popToggle(a)}}},[t._v(t._s(a))])}),0)]):t._e(),e("div",{staticClass:"now-date"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.inputValue,expression:"inputValue"}],attrs:{id:"toggle",type:"text",readonly:""},domProps:{value:t.inputValue},on:{click:function(a){t.popupFlag=!t.popupFlag},input:function(a){a.target.composing||(t.inputValue=a.target.value)}}})])])},n=[],s=(e("ee63"),{name:"DatePicker",data:function(){return{popupFlag:!1,month:(new Date).getMonth()+1,dayList:[],day:(new Date).getDate()}},mounted:function(){var t=this;this.$nextTick(function(){t.initDay()})},computed:{inputValue:function(){return"2019-".concat(this.month,"-").concat(this.day)}},methods:{initDay:function(){for(var t=1;t<=31;t++)this.dayList.push(t)},addMonth:function(){this.month<12&&this.month++},cutMonth:function(){this.month>1&&this.month--},popToggle:function(t){this.day=t,this.popupFlag=!1;var a=this.month,e={month:a,day:t};this.$emit("listenChild",e)}}}),o=s,r=e("2877"),c=Object(r["a"])(o,i,n,!1,null,"4ec041c2",null);a["a"]=c.exports},ee63:function(t,a,e){}}]);
//# sourceMappingURL=chunk-6c5384d2.dd74f2e2.js.map