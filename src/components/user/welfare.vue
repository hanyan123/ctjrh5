<template>
	<div style="background: #FFFFFF;">
		<div id="morelist" style="margin-bottom: 1.36rem;">
	    	<router-link :to="{path:'/invest'}" v-for="item in list">
				<div class="availablered">
				 	<div class="redMessage">
				 		<p>{{item.mark}}</p>
				 		<p>有效期：{{item.end_at}}</p>
				 		<div class="numberTime">
				 			<span class="investNum">出借金额：≥<b>{{item.use_condition}}</b></span>
				 			<span class="investime">出借期限：≥<b>{{item.duration}}天</b></span>
				 		</div>
				 	</div>
				 	<div class="redAmount">
				 		<p>¥<b>{{item.money}}</b></p>
				 		<span class="canUse">未使用</span>
				 	</div>
				 </div>
			 </router-link>		 
		</div>
	</div>
</template>

<script>
	var qs = require('qs');
	import { Indicator,Toast,MessageBox,InfiniteScroll } from 'mint-ui';
	import { getToken } from '../../../static/common.js'
	import { baseConfig,showMessage } from '../../../static/config.js'
	export default {
		data(){
			return {
				list:[],
			}
		},
		methods:{
			welfareData:function (){
	   			Indicator.open();
	   			var self = this;
	   			var url = baseConfig.api+'user/welfare';
		   		var p_token
		   		if(getToken()==null){
		   			p_token="";
		   		} else {
		   			 p_token = getToken().p_token;
		   		}
		   		var params = {
		   			p_token:p_token,
		   			version:baseConfig.version,
		   		}
		   		this.axios.post(url, qs.stringify(params),{emulateJSON : true  //这行最关键。题外话：我们是选项体，也就是文档里的[options]
}).then(function (response) {
					Indicator.close();
					console.log(response.data);
					var res = response.data;
					if(res.status==200){
						self.list = res.data.list
					}
				}).catch(function (error) {
					Indicator.close();
				});
	   		}
		},
		created:function (){
			this.welfareData();
		}
	}
</script>

<style scoped="scoped">
body{background-color:#FFFFFF;overflow: hidden;font-family: Arial,"Microsoft YaHei",Apple LiGothic Medium,Apple LiSung Light;}
*{margin: 0;padding: 0;}
.notHaveRed{
	width: 4rem;
	height: 3.2rem;
	margin: 0 auto;
}
.notHaveRed>img{
	width: 100%;
	height: 100%;
}
.availablered{
	width: 9.4666rem;
	height:2.5066rem;
	margin: 0 auto;
	background-image: url(../../../static/images/wode/availablered.png);
	background-repeat: no-repeat;
	background-size: 100% 100%;
	margin-top: 0.2666rem;
	position: relative;
}
.notavailablered{
	width: 9.4666rem;
	height:2.5066rem;
	margin: 0 auto;
	/*background-image: url(../../img/list/notavailablered.png);*/
	background-repeat: no-repeat;
	background-size: 100% 100%;
	margin-top: 0.2666rem;
	position: relative;
}
.redMessage{
	width:6.6666rem;
	height: 2.5066rem;
}
.redAmount{
	width: 2.6666rem;
	height: 2.5066rem;
	position: absolute;
	right: 0;
	top: 0;
}
.redAmount>p{
	font-size: 18px;
	color: #fff;
	text-align: center;
	margin-top:0.3rem;
}
[data-dpr="2"] .redAmount>p{
    font-size: 36px;
}
[data-dpr="3"] .redAmount>p{
    font-size: 54px;
}
.redAmount>p>b{font-size: 36px;margin-left: 0.16rem;font-weight: normal;}
[data-dpr="2"] .redAmount>p>b{
    font-size: 72px;
}
[data-dpr="3"] .redAmount>p>b{
    font-size: 108px;
}
.canUse{
	font-size: 12px;
	color: #fff;
	width: 100%;
	height: 0.5333rem;
	text-indent: 0.3733rem;
	display: block;
	background-repeat: no-repeat;
	background-size: 0.32rem 0.32rem;
	background-position: 1.7066rem 0.0266rem;
}
[data-dpr="2"] .canUse{
    font-size: 24px;
}
[data-dpr="3"] .canUse{
    font-size: 36px;
}
.redMessage>p:nth-of-type(1){
	font-size: 15px;
	color: #fe492b;
	margin-bottom: 0.08rem;
	margin-left: 0.2666rem;
	padding-top: 0.1333rem;
}
[data-dpr="2"] .redMessage>p:nth-of-type(1){
    font-size: 30px;
}
[data-dpr="3"] .redMessage>p:nth-of-type(1){
    font-size: 45px;
}
.redMessage>p:nth-of-type(2){
	font-size: 9px;
	color: #888888;
	margin-left: 0.2666rem;
}
[data-dpr="2"] .redMessage>p:nth-of-type(2){
    font-size: 18px;
}
[data-dpr="3"] .redMessage>p:nth-of-type(2){
    font-size: 27px;
}
.numberTime{
	font-size: 12px;
	color: #888888;
	border-top: 1px solid #e5e5e5;
	width: 6.1333rem;
	margin: 0 auto;
	padding-top: 0.5rem;
	height:0.8rem;
	position: relative;
}
[data-dpr="2"] .numberTime{
    font-size: 24px;
}
[data-dpr="3"] .numberTime{
    font-size: 36px;
}
.numberTime b{
	font-weight: normal;
	color: #333333;
}
.investime{
	text-align: right;
	width: 46%;
	height:0.5333rem;
	display: inline-block;
	position: absolute;
	right: 0.5333rem;
}
.investNum{
	float: left;
	text-align: left;
	width: 54%;
	height: 0.5333rem;
	display: inline-block;
}
.canNotUse{
	font-size: 12px;
	color: #fff;
	width: 100%;
	height: 0.5333rem;
	text-indent: 0.5333rem;
	display: block;
	background-repeat: no-repeat;
	background-size: 0.32rem 0.32rem;
	background-position: 1.7066rem 0.0266rem;
}
[data-dpr="2"] .canNotUse{
    font-size: 24px;
}
[data-dpr="3"] .canNotUse{
    font-size: 36px;
}
.noFont{
	color: #999999!important;
}
.bar.barGray {
    border-color: #f2f2f2;
    background-color: #f2f2f2;
}
.bar.barGray .title {
    color: #333333;
}
.barGray .button.button-clear {
    color: #333333;
}
.myHonbao{
	width: 10rem;
	height: 1.1466rem;
	margin: 0 auto;
	background-color: #fff;
}
.myHonbao>a{
	width: 5rem;
	height: 1.1466rem;
	line-height: 1.1466rem;
	display: inline-block;
	text-align: center;
	font-size: 15px;
	color: #6e6e6e;
	float: left;
}
[data-dpr="2"] .myHonbao>a{
    font-size: 0.36rem;
}
[data-dpr="3"] .myHonbao>a{
    font-size: 0.36rem;
}
.myHonbao>a>span{
	width: 2rem;
	height: 1.1466rem;
	display: inline-block;
	margin: 0 auto;
}
.selectLable{
	color: #ff7319!important;
	border-bottom: 3px solid #ff7319;
}

</style>