(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["HappyZodiac"],{"28f2":function(t,e,a){},"504c":function(t,e,a){var s=a("9e1e"),n=a("0d58"),i=a("6821"),l=a("52a7").f;t.exports=function(t){return function(e){var a,o=i(e),c=n(o),r=c.length,u=0,v=[];while(r>u)a=c[u++],s&&!l.call(o,a)||v.push(t?[a,o[a]]:o[a]);return v}}},"584d":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ChildLayout",{staticClass:"HappyZodiac",attrs:{title:"欢乐生肖",customScroll:""}},[a("HappyHeader",{attrs:{slot:"header"},slot:"header"}),a("header",{staticClass:"f-box bcfff p16 h50"},[a("div",{staticClass:"wb50"},[t._v("\n      倒计时间\n      "),a("countdown",{staticClass:"red",attrs:{endDate:t.endTime}})],1),a("div",{staticClass:"wb50"},[t._v("第20190920-009期")])]),a("AvaTabs",{staticClass:"ava-tabs",attrs:{titles:t.titles,animated:"",swipeable:""},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[t._l(t.list,function(e,s){return a("section",{key:s,staticClass:"bcfff m10",attrs:{slot:"slot1"},slot:"slot1"},[a("div",{staticClass:"fb-between bb p8"},[a("span",[t._v(t._s(e.areaName))]),a("div",[a("van-button",{attrs:{round:"",size:"mini"}},[t._v("大")]),a("van-button",{attrs:{round:"",size:"mini"}},[t._v("小")]),a("van-button",{attrs:{round:"",size:"mini"}},[t._v("全")]),a("van-button",{attrs:{round:"",size:"mini"}},[t._v("奇")]),a("van-button",{attrs:{round:"",size:"mini"}},[t._v("偶")]),a("van-button",{attrs:{round:"",size:"mini"}},[t._v("清")])],1)]),a("div",{staticClass:"mt8 p8"},t._l(t.numbs.split(""),function(e,n){return a("van-button",{key:n,attrs:{round:"",plain:"",hairline:"",size:"mini",type:"info"},on:{click:function(a){return t.onNumb(s,e)}}},[t._v(t._s(e))])}),1)])}),a("section",{staticClass:"h400 bcfff",attrs:{slot:"slot2"},slot:"slot2"},[a("div",[t._v("走势2222222222222222")])])],2),t.active?t._e():a("KindFooter",{staticClass:"mlr10 mb10",attrs:{slot:"footer",selectedNum:t.selectedNum},slot:"footer"})],1)},n=[],i=(a("a481"),a("6762"),a("2fdb"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("header",[a("van-nav-bar",{attrs:{title:t.title,"left-arrow":""},on:{"click-left":function(e){return t.avarouter.goBack()},"click-right":function(e){t.show=!t.show}}},[a("div",{attrs:{slot:"title"},slot:"title"},[a("van-dropdown-menu",{attrs:{"active-color":"#256ef6"}},[a("van-dropdown-item",{ref:"item",attrs:{title:t.ruleTitle},model:{value:t.value1,callback:function(e){t.value1=e},expression:"value1"}},[a("AvaTabs",{staticClass:"ava-tabs",attrs:{titles:t.titles,animated:"",swipeable:""},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[a("section",{attrs:{slot:"slot1"},slot:"slot1"})])],1)],1)],1),a("van-icon",{attrs:{slot:"right",name:"wap-nav"},slot:"right"})],1),a("van-overlay",{attrs:{"class-name":"overlay",show:t.show},on:{click:function(e){t.show=!1}}}),a("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"menu fwb w100 inline-block bcfff absolute"},[a("p",{staticClass:"h40 lh40 bb",on:{click:function(e){return t.avarouter.go("TrendChart")}}},[t._v("走势图")]),a("p",{staticClass:"h40 lh40",on:{click:function(e){return t.avarouter.go("HappyZodiacRule")}}},[t._v("玩法说明")])])],1)}),l=[],o=(a("c5f6"),{name:"HappyHeader",props:{value:[String,Number]},data:function(){return{title:"欢乐生肖",show:!1,value1:0,ruleTitle:"一星定位",active:"一星定位",titles:[{title:"大小单双",value:0},{title:"龙虎和",value:1},{title:"一星定位",value:2},{title:"一星不定位",value:3},{title:"二星不定位",value:4},{title:"三星不定位",value:5},{title:"四星不定位",value:6},{title:"五星不定位",value:7}]}},methods:{}}),c=o,r=(a("ba42"),a("2877")),u=Object(r["a"])(c,i,l,!1,null,"21ae2c18",null),v=u.exports,d=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("footer",{staticClass:"fb-between bcfff h50 plr16"},[a("div",[a("span",[t._v("已选0注，0.00元")]),a("div",[t._v(t._s(t.selectedValues))])]),a("div",[a("van-button",{attrs:{color:"linear-gradient(to right, #4bb0ff, #6149f6)"},on:{click:t.onBuy}},[t._v("购买")])],1)])},f=[],m=(a("28a5"),a("ac6a"),a("8615"),{name:"KindFooter",props:{selectedNum:{type:Object,default:function(){return{}}}},data:function(){return{selectedValues:"",areaName:["wan","qian","bai","shi","ge"]}},watch:{selectedNum:{handler:function(t){this.selectedValues=Object.values(t).join(",")},deep:!0,immediate:!0}},methods:{onBuy:function(){var t={wan:this.selectedNum[0].split("").join(","),qian:this.selectedNum[1].split("").join(","),bai:this.selectedNum[2].split("").join(","),shi:this.selectedNum[3].split("").join(","),ge:this.selectedNum[4].split("").join(","),bet:"1",lotteryId:1};this.http.post(this.api.bet,t).then(function(t){console.log(t)}).catch(function(t){console.log(t)})}}}),b=m,p=Object(r["a"])(b,d,f,!1,null,null,null),h=p.exports,w={name:"HappyZodiac",components:{HappyHeader:v,KindFooter:h},data:function(){return{active:0,titles:["彩票","走势"],endTime:Date.now()+1e5,tabName:"kind",list:[{areaName:"万"},{areaName:"千"},{areaName:"百"},{areaName:"十"},{areaName:"个"}],numbs:"0123456789",selectedNum:{0:"",1:"",2:"",3:"",4:""}}},methods:{onNumb:function(t,e){var a=this.selectedNum[t];this.selectedNum[t]=a?a.includes(e)?a.replace(e,""):a+e:e}}},_=w,N=(a("9829"),Object(r["a"])(_,s,n,!1,null,"938d0a60",null));e["default"]=N.exports},8615:function(t,e,a){var s=a("5ca1"),n=a("504c")(!1);s(s.S,"Object",{values:function(t){return n(t)}})},9829:function(t,e,a){"use strict";var s=a("28f2"),n=a.n(s);n.a},a941:function(t,e,a){},ba42:function(t,e,a){"use strict";var s=a("a941"),n=a.n(s);n.a}}]);