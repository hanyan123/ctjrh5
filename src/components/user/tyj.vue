<template>
	<div>
		<div class="detailTop">
			<div class="detailHeader">
        		<div id="containerOne">
				  	<progress-bar class="heart" ref="customHeart" type="path" path-id="heart-path" :options="options">
			            <svg slot="svg" version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="5.0933rem" height="3.76rem" viewBox="0 0 245.25 179.171" enable-background="new 0 0 245.25 179.171" xml:space="preserve">
							<path fill="none" stroke="#fff" stroke-width="2" stroke-miterlimit="10" d="M229.908,179.171c8.803-16.804,13.789-35.921,13.789-56.206c0-66.992-54.309-121.301-121.301-121.301S1.096,55.973,1.096,122.965c0,20.285,4.986,39.402,13.789,56.206"/>
							<path id="heart-path" fill="none" stroke="#f18a3e" stroke-width="1.5" stroke-miterlimit="10" d="M229.908,179.171c8.803-16.804,13.789-35.921,13.789-56.206c0-66.992-54.309-121.301-121.301-121.301S1.096,55.973,1.096,122.965c0,20.285,4.986,39.402,13.789,56.206"/>
						</svg>
			        </progress-bar>
				</div>
				<div class="detailRate"><b>{{dataList.interest_rate}}</b>%</div>
        		<div class="probabilityMark">借款约定年化利率</div>
            </div>
            <div class="partShow">
            	<span>
            		<p>出借期限：</p>
            		<p>{{dataList.duration}}天</p>
            	</span>
            	<span>
            		<p>还款方式：</p>
            		<p>一次性还清</p>
            	</span>
            </div>
	    </div>
		<div class="loginAfterBox" style="padding-top:0.25rem;">
			<div class="welfaretit">
			    <p class="welf">
					<span class="yue">余额:</span>
					<span class="geren"><img src="https://image.79jr.com/Public/v3/M/img/wode/geren_b.png"></span><br>
					<span class="num">{{dataList.tyj}}<span>元</span></span>
				</p>
				<p class="welfs">
					<span>累计收益:{{ dataList.tyj_statis.interest }}元</span><br>
					<span>待收:{{ dataList.tyj_statis.collect }}元</span>
					<button id="touzi" @click="goBroow()">立即出借</button>
				</p>
			</div>
		</div>
		<div class="projectBox protit">
			<a class="clickNext nextOne touzied" href="javascript:void(0);">
			    出借记录
			    <b class="numPeople">累计出借金额：0元</b>
			    <span class="rights"></span>
			</a>
			<div>
				<ul>
					<li class="li1">金额</li>
					<li class="li2">利率</li>
					<li class="li3">期限</li>
					<li class="li4">收益</li>
					<li class="li5">出借时间</li>
				</ul>
				<div id="morelist">
					<ul v-for="item in dataList.tender_list">
						<li class="li1">{{item.capital}}元</li>
						<li class="li2">{{item.rate}}%</li>
						<li class="li3">{{item.days}}天</li>
						<li class="li4">{{item.interest}}元</li>
						<li class="li5">{{item.date}}</li>
					</ul>
				</div>
			</div>
		    <div id="more" class="more"><a href="javascript:;">点击查看更多&gt;</a></div>
		</div>
	</div>
</template>

<script>
	var qs = require('qs');
	import opencust from '../comm/opencust';
	import { Indicator,Toast,MessageBox } from 'mint-ui';
	import { getToken } from '../../../static/common.js'
	import { baseConfig,showMessage } from '../../../static/config.js';
	export default {
		data (){
			return {
				options: {
				  	easing: 'easeInOut',
				  	duration: 1400,
				},
				dataList:{
					"tyj": 0,
					"duration":3,
					"interest_rate": 10,
					"tender_list": [{
						"id": "0",
						"uid": "0",
						"date": "0",
						"paid": "0",
						"days": "0",
						"rate": "0",
						"capital": "0",
						"interest": "0",
						"create_at": "0"
					}],
					"tyj_statis": {
						"collect": "0.00",
						"capital": "3000.00",
						"interest": 0
					}
				},
			}
		},
		mounted: function () {
			this.$refs.customHeart.set(1);
			this.$refs.customHeart.animate(1-0.45);
	   	},
	   	methods:{
	   		getTyb:function (){
	   			Indicator.open();
	   			var self = this;
	   			var url = baseConfig.api+'invest/tyb/version/'+baseConfig.version;
		   		var p_token
		   		if(getToken()==null){
		   			p_token="";
		   		} else {
		   			p_token = getToken().p_token;
		   		}
		   		console.log(p_token)
		   		var params = {
		   			p_token:p_token,
		   			//version:baseConfig.version
		   		}
		   		this.axios.post(url, qs.stringify(params),{emulateJSON : true  //这行最关键。题外话：我们是选项体，也就是文档里的[options]
}).then(function (response) {
					Indicator.close();
					console.log(JSON.stringify(response.data.data));
					var res = response.data;
					if(res.status==200){
						self.dataList = res.data
					}
					//self.binfo = response.data.data.borrow_info;
					//self.$refs.customHeart.animate(parseFloat(1-response.data.data.borrow_info.progress/100));
				}).catch(function (error) {
					Indicator.close();
				});
	   		},
	   		goBroow:function (){
	   			Indicator.open();
	   			var self = this;
	   			var url = baseConfig.api+'invest/tybTender/version/'+baseConfig.version;
		   		var p_token
		   		if(getToken()==null){
		   			p_token="";
		   		} else {
		   			p_token = getToken().p_token;
		   		}
		   		console.log(p_token)
		   		var params = {
		   			p_token:p_token,
		   			//version:baseConfig.version
		   		}
		   		this.axios.post(url, qs.stringify(params),{emulateJSON : true  //这行最关键。题外话：我们是选项体，也就是文档里的[options]
}).then(function (response) {
					Indicator.close();
					console.log(JSON.stringify(response.data));
					var res = response.data;
					if(res.status==200){
						Toast(res.data)
					} else {
						Toast(res.data)
					}
				}).catch(function (error) {
					Indicator.close();
				});
	   		}
	   	},
	   	created:function (){
	   		this.getTyb();
	   	}
	   	
	}
</script>

<style scoped="scoped">
	.detailTop {
	width: 10rem;
	height: 6.2933rem;
	margin: 0 auto;
	background-image: url(../../../static/images/home/listdetailbg.png);
	background-repeat: no-repeat;
	background-size: 100% 100%;
	overflow: hidden;
}
.detailTop .tiyan{
	position: relative;
	color: #fff;
	font-size: 0.52rem;
	text-align: center;
	margin-top: 0.25rem;
}
.detailTop .tiyan .back{
	position: absolute;
	color: #fff;
	left: 0.3rem;
}
.detailTop .tiyan .move{
	position: absolute;
	display: inline-block;
	right: 0.35rem;
	padding-top: 0.03rem;
	width: 0.6rem;
	height: 0.6rem;
	background: #fff;
	border-radius: 100%;
	color: red;
}
.welfaretit{
	position: relative;
	width: 9.5rem;
	height: 3.7rem;
	margin: 0 auto;
	background-image: url(../../../static/images/home/titbg.png);
	background-repeat: no-repeat;
	background-size: 9.5rem 3.7rem;
}
.welfaretit .welf{
	position: absolute;
	left: 1.65rem;
	top: 0.78rem;
}
.welfaretit .welf .yue{
	color: #000;
	font-size: 0.45rem;
	font-weight: 500;
}
.welfaretit .welf .geren img{
	width: 0.4rem;
    height: 0.4rem;
    position: relative;
    top: -0.1rem;
}
.welfaretit .welf .num{
	margin-top: 0.5rem;
	color: red;
	font-size: 0.8rem;
	font-weight: bold;
	display: block;
	margin-top: 0.5rem;
}
.welfaretit .welf .num span{
	font-size: 0.4rem;
	font-weight: normal;
}
.welfaretit .welfs{
	position: absolute;
	right: 0.2rem;
	top: 0.78rem;
}
.welfaretit .welfs span{
	color: #666;
	font-size: 0.35rem;
	font-weight: 500;
}
.welfaretit .welfs button{
	color: #fff;
	font-size: 0.4rem;
	width: 2.9rem;
	display: block;
	border-radius: 0.8rem;
	margin-top: 0.28rem;
	background: #ec605d;
	line-height: 0.8rem;
}
.welfaretit .welfs .returning{
	color: #fff;
	font-size: 0.4rem;
	width: 2.9rem;
	display: block;
	border-radius: 19px;
	margin-top: 0.28rem;
	background: #888;
}
.touzied{
	position: relative;
	font-size: 0.4rem;
}
.touzied .numPeople{
	margin-left: 0.2rem;
}
.touzied .rights{
	position: absolute;
	right: 0;
}
.projectBox ul{
	padding: 0 0.4rem;
}
.projectBox ul li{
	list-style: none;
	float: left;
	font-size: 0.36rem;
	text-align: center;
	color: #888888;
}
.projectBox ul li.li1{
	width: 2rem;
}
.projectBox ul li.li2{
	width: 1.5rem;
}
.projectBox ul li.li3{
	width: 1.5rem;
}
.projectBox ul li.li4{
	width: 1.5rem;
}
.projectBox ul li.li5{
	width: 2.7rem;
}
.protit{
	height: 100%;
}
.more{
	text-align: center;
	padding: 0.8rem 0;
	position: relative;
	top: 0.36rem;
	width: 9.8rem;
}
.more a{
	color:#888;	
	font-size: 0.4rem;	
}
.mask{
	display: block;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background-color: #000;
	opacity: .7;
	display: none;
	z-index: 10;
}
.tanks{
	display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -3rem;
    margin-left: -4.7rem;
    width: 9.4rem;
    height: 6rem;
    background: #fff;
    z-index: 20;
}
.tanks .tit{
	text-align: center;
    font-size: 0.5rem;
    padding: 0.3rem 0 0 0;
    color: #ff6633;
}
.tanks .xianqing{
	padding: 0.1rem 0.4rem 0 0.4rem;
    font-size: 0.32rem;
    line-height: 0.65rem;
}
.tanks span img{
	position: absolute;
	right: 0.2rem;
	top: 0.2rem;
	width: 0.4rem;
}
.tanks input{
	background: #ff6633;
	width: 5rem;
	height: 1.1rem;
	border: 1px solid #ff6633;
	margin-left: 1.4rem;
	font-size: 0.46rem;
	margin-top: 0.2rem;
}
.tanked{
	display: none;
	position: fixed;
	top: 50%;
	left: 50%;
	margin-top: -2.7rem;
    margin-left: -3.8rem;
    width: 7.6rem;
    height: 4.6rem;
	background: #fff;
	z-index: 20;
	border-radius: 5px;
}
.tanked p{
	font-size: 0.6rem;
    color: #000;
    padding-top: 0.7rem;
    padding-left: 1.46rem;
}
.tanked p img{
	width: 0.8rem;
	height: 0.8rem;
	position: relative;
	top: 0.2rem;
	left: -0.2rem;
}
.tanked input{
	background: #ff6633;
	width: 5rem;
	height: 1.2rem;
	border: 1px solid #ff6633;
	margin-left: 1.4rem;
	margin-top: 0.78rem;
	font-size: 0.48rem;
	border-radius: 5px;
}
.moneyTime span img{
	width: 0.4rem;
	position: relative;
	top: 0.08rem;
	left: 0.08rem;
}
.moneyTime>span:nth-of-type(2) {
	background: none;
}   


.detailRate{
	width:2.8rem;
	height: 1.1333rem;
	font-size: 14px;
	color: #fff;
	text-align: center;
	position: absolute;
	top:1.5rem;
	left: 1.1466rem;
	
}
.detailRate>b{
	font-size: 1rem;
	color: #fff;
	text-align: center;
}
.probabilityMark{
	width: 2.8rem;
	height: 0.4rem;
	font-size: 0.32rem;
	color: #fff;
	text-align: center;
	position: absolute;
	top: 2.6933rem;
	left: 1.2rem;
}
.partShow{
	width: 10rem;
	height: 1.3333rem;
	margin-top:0.8rem;
	position: relative;
}
.partShow>span{
	height: 0.96rem;
	display: block;
	text-align: center;
}
.partShow>span:nth-of-type(1){
	position: absolute;
	top: 0.1866rem;
	left: 0.8rem;
}
.partShow>span:nth-of-type(2){
	position: absolute;
	top: 0.1866rem;
	right:0.8rem;
}
.partShow>span:nth-of-type(3){
	position: absolute;
	top: 0.1866rem;
	left:6.6666rem;
}
.partShow>span>p:nth-of-type(1){
	display: inline-block;
	color: #ffe0d2;
	font-size: 0.29rem;
	margin-bottom: 0;
}
.partShow>span>p:nth-of-type(2){
	display: inline-block;
	color: #fff;
	font-size: 0.32rem;
	margin-bottom: 0;
}
.moneyTime{
	width: 9.3333rem;
	height: 0.9066rem;
	margin: 0 auto;
	font-size: 0.3rem;
}
.moneyTime>span:nth-of-type(1){
	display: inline-block;
	width: auto;
	text-align: left;
	line-height: 0.9066rem;
	color: #666666;
	margin-left: 0.24rem;
}
.moneyTime>span:nth-of-type(2){
	display: inline-block;
	width: auto;
	text-align: right;
	line-height: 0.9066rem;
	color: #666666;
	float: right;
	margin-right: 0.24rem;
	/*background-image: url(../../image/invest/locktime.png);*/
	background-size: 0.32rem 0.32rem;
	background-repeat: no-repeat;
	background-position:1.4133rem 0.28rem;
}
.moneyTime>span:nth-of-type(2)>b{
	margin-left: 0.32rem;
}
.moneyTime>span>b{
	font-weight: normal;
	color: #ff7319;
}
.moneyTimes{
	width: 9.3333rem;
	height: 0.9066rem;
	margin: 0 auto;
	font-size: 0.3rem;
}
.moneyTimes>span:nth-of-type(1){
	display: inline-block;
	width: auto;
	text-align: left;
	line-height: 0.9066rem;
	color: #666666;
	margin-left: 0.24rem;
}
.moneyTimes>span:nth-of-type(2){
	display: inline-block;
	width: auto;
	text-align: right;
	line-height: 0.9066rem;
	color: #666666;
	float: right;
	margin-right: 0.24rem;
}
.moneyTimes>span>b{
	font-weight: normal;
	color: #ff7319;
}
.welfareRed{
	width: 9.3333rem;
	height: 1.1466rem;
	background-color: #ffffff;
	border-radius: 0.1333rem;
	margin: 0 auto;
	border: 1px solid #d2d2d2;
	/*background-image: url(../../image/invest/redlist.png);*/
	background-repeat: no-repeat;
	background-size: 0.56rem 0.56rem;
	background-position: 0.2rem 0.2933rem;
}  
.detailHeader {
    width: 5.0933rem;
    height: 3.76rem;
    margin: 0 auto;
    margin-top: 0.5333rem;
    position: relative;
    /*background-image: url(../../img/invest/scaledetail.png);*/
    background-size: 4.8133rem 3.56rem;
    background-repeat: no-repeat;
    background-position: 0.1333rem 0.1333rem;
}
.projectBox{
	width: 10rem;
	height: 3.1rem;
	background-color: #fff;
	margin: 0 auto;
	margin-top: 0.2666rem;
	margin-bottom: 1.3333rem;
}
.projectBox>a{
	display: block;
}
.numPeople {
    font-size: 0.32rem;
    font-weight: normal;
    color: #999999;
    margin-left: 0.16rem;
}  

.nextOne {
    background-image: url(../../../static/images/invest/projectdetail2.png);
    background-repeat: no-repeat;
    background-size: 0.56rem 0.56rem;
    background-position: 0 0.2266rem;
    text-indent: 0.6933rem;
}
.clickNext {
    width: 9.0666rem;
    height: 1.0133rem;
    display: block;
    text-decoration: none!important;
    border-bottom: 0.0133rem solid #e5e5e5;
    margin: 0 auto;
    color: #333333;
    line-height: 1.0133rem;
    font-size: 0.36rem;
}                                                                                      
</style>