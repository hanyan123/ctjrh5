<template>
	<div>
		<div class="personTop">
		    <div class="personContentt">
		        <router-link :to="{path:'/bill'}" class="billBox">
		            <img src="https://image.79jr.com/Public/v3/M/img/person/geren_zd.png">
		            <span>账单</span></router-link>
		        <a href="" class="newsBox">
		            <img src="https://image.79jr.com/Public/v3/M/img/person/geren_ld.png">
		            <!-- <img src="https://image.79jr.com/Public/v3/M/img/person/bg_image.png"> --></a>
		        <div class="headImage">
		            <a href="">
		            <img src="https://image.79jr.com/Public/v3/M/img/person/9.png"></a>
		        </div>
		        <div class="informationPart">
		            <div class="phoneNumber">{{ datas.user_name | toJiami }}</div>
		            <p>总资产(元)</p>
		            <p>{{ datas.money_total }}</p>
		        </div>
		    </div>
		    <div class="collectionMoney">
		        <span>
		            <p>总收益(元)</p>
		            <p>{{ datas.profit_total }}</p>
		        </span>
		        <span>
		            <p>可用余额(元)</p>
		            <p>{{ datas.balance_use }}</p>
		        </span>
		        <span>
		            <p>冻结资产(元)</p>
		            <p>{{ datas.money_freeze }}</p>
		        </span>
		        <em></em>
		    </div>
		</div>
		<div class="collectBox">
			<span><b>待收本金(元)：</b>{{datas.capital_collection}}</span>
			<span><b>待收利息(元)：</b>{{datas.interest_collection}}</span>
			<em></em>
		</div>
		<div class="moneyButton">
			<a @click="tix">提现</a>
			<a @click="charge">充值</a>
		</div>
		<div class="mainFunction">
			<router-link :to="{path:'/myinvest'}">
				<img src="https://image.79jr.com/Public/v3/M/img/person/geren_tz.png">
				<p>我的出借</p>
			</router-link>
			<router-link :to="{path:'/welfare'}">
				<img src="https://image.79jr.com/Public/v3/M/img/person/geren_f.png">
				<span>10</span>			
				<p>我的福利</p>
			</router-link>
			<a href="">
				<img src="https://image.79jr.com/Public/v3/M/img/person/geren_tg.png">
				<p>我的推广</p>
			</a>
		</div>
		<div class="functionKeyOne">
			<router-link :to="{path:'/tyj'}" >
				<span class="keyFont">我的体验金</span>
				<span class="numValue"></span>
			</router-link>
			<a href="/m/tool/calendar">
	            <span class="keyFont">回款日历</span>
	        </a>
	        <a href="">
				<span class="keyFont">平台公告</span>
				<!-- <span class="newsNum">87</span> -->
			</a>
		</div>
		<div class="functionKeyTwo">
		    <router-link :to="{path:'/shezhi'}">
				<span class="keyFont">账户设置</span>
						</router-link>
			<a href="http://srtest.79jr.com/m/index/quest.html">
				<span class="keyFont">帮助中心</span>
			</a>
			<a href="javascript:void(0);">
				<span class="keyFont">客服热线</span>
				<span class="numValue">400 079 0080</span>
			</a>
			<a href="http://srtest.79jr.com/m/appdown/down">
				<span class="keyFont">APP下载</span>
			</a>
		</div>
		<div class="outButton">
	    	<a href="javascript:;" @click="logOut()">退出</a>
	        <div class="servicePhone"><a href="tel:4000790080">客服热线：400-079-0080</a></div>
	      	<div class="editionNum">版本V{{ version }}</div>
	    </div>
	</div>
</template>

<script>
	import { Indicator,Toast,MessageBox } from 'mint-ui';
	import { baseConfig,showMessage } from '../../../static/config.js';
	import { getToken,removeToken } from '../../../static/common.js'
	var qs = require('qs');
	export default {
		data (){
			return {
				datas:{},
				version:baseConfig.version
			}
		},
		methods:{
			getUserInfo:function (){
				Indicator.open();
				console.log(getToken().p_token);
				var self = this;
				var param = {
					p_token:getToken().p_token,
					version:baseConfig.version
				}
				var url = baseConfig.api+'user/index/version/'+baseConfig.version
				self.axios.post(url, qs.stringify(param),{emulateJSON : true  //这行最关键。题外话：我们是选项体，也就是文档里的[options]
}).then(function (response) {
					Indicator.close();
					var res = response.data
					console.log(response.data);
					if(res.status==200){
						self.datas =res.data; 
					}
				}).catch(function (error) {
					Indicator.close();
				　　alert(error);
				});
			},
			logOut:function (){
				removeToken();
				this.$router.push({path:'/index'})
			},
			charge:function (){
				Indicator.open();
				console.log(getToken().p_token);
				var self = this;
				var param = {
					p_token:getToken().p_token,
					version:baseConfig.version
				}
				var url = baseConfig.api+'gbank/bankinfo/version'+baseConfig.version
				self.axios.post(url, qs.stringify(param),{emulateJSON : true  //这行最关键。题外话：我们是选项体，也就是文档里的[options]
}).then(function (response) {
					Indicator.close();
					var res = response.data
					console.log(response.data);
					if(res.data.bankInfo.isBindCard == 1){
						self.$router.push({path:'/charge'})
					} else {
						showMessage('您还未绑定银行卡','温馨提示',"绑卡",self.bindCard)
					}
				}).catch(function (error) {
					Indicator.close();
				　　alert(error);
				});
			},
			tix:function (){
				Indicator.open();
				console.log(getToken().p_token);
				var self = this;
				var param = {
					p_token:getToken().p_token,
					version:baseConfig.version
				}
				var url = baseConfig.api+'gbank/bankinfo/version'+baseConfig.version
				self.axios.post(url, qs.stringify(param),{emulateJSON : true  //这行最关键。题外话：我们是选项体，也就是文档里的[options]
}).then(function (response) {
					Indicator.close();
					var res = response.data
					console.log(response.data);
					if(res.data.bankInfo.isBindCard == 1){
						self.$router.push({path:'/cash'})
					} else {
						showMessage('您还未绑定银行卡','温馨提示',"绑卡",self.bindCard)
					}
				}).catch(function (error) {
					Indicator.close();
				　　alert(error);
				});
			},
			bindCard:function(){
		   		Indicator.open();
	   			var self = this;
	   			var url = baseConfig.api+'gbank/bindcard';
		   		var p_token
		   		if(getToken()==null){
		   			p_token="";
		   		} else {
		   			p_token = getToken().p_token;
		   		}
		   		var params = {
		   			p_token:p_token,
		   			version:baseConfig.version
		   		}
		   		this.axios.post(url, qs.stringify(params),{emulateJSON : true  //这行最关键。题外话：我们是选项体，也就是文档里的[options]
}).then(function (response) {
					Indicator.close();
					window.location.href=response.data.data.url
				}).catch(function (error) {
					Indicator.close();
				});
		   	}
		},
		created:function (){
			this.getUserInfo();
			console.log(this.$route)
		},
		filters:{
	        toJiami(value){
	            return value.substring(0,3)+"****"+value.substring(7);
	        }
	    }
	}
</script>

<style scoped="scoped">
	.mainFunction>a>span{
			position: absolute;
		    top: 0.3rem;
		    left: 2.0rem;
		    width: 0.42rem;
		    height: 0.42rem;
		    line-height: 0.47rem;
		    background: red;
		    color: #fff;
		    border-radius: 0.5rem;
		    font-size: 0.3rem;
		}
		.layui-m-layercont {
		    line-height: 1.6;
		    text-align: left;
		}
	*{ box-sizing: border-box;}
	a{text-decoration: none!important;}
body,html{background-color: #f5f5f5;overflow-x: hidden;}
.personTop{
	width: 10rem;
	height: 5.8666rem;
	background:linear-gradient(#fc6e1b,#f45a26);
    background: -webkit-linear-gradient(#fc6e1b,#f45a26);
	background: -o-linear-gradient(#fc6e1b,#f45a26);
	background: -moz-linear-gradient(#fc6e1b,#f45a26);
	margin: 0 auto;
}
.personContentt{
	width:10rem;
	height: 4.5333rem;
	position: relative;
	overflow: hidden;
}
.billBox{
	width: 1.66rem;
	height: 0.6133rem;
	display: block;
	position: absolute;
	top:0.4rem;
	left:0.4rem;
}
.billBox>img{
	width: 0.5333rem;
	height: 0.6133rem;
	display: inline-block;
}
.billBox>span{
	color: #fff;
	font-size: 15px;
	height: 0.6133rem;
	line-height: 0.6133rem;
	display: inline-block;
	position: absolute;
	top:0.0533rem;
	left:0.72rem;
}
[data-dpr="2"] .billBox>span{
    font-size: 0.36rem;
}
[data-dpr="3"] .billBox>span{
    font-size: 0.36rem;
}
.newsBox{
	width: 0.56rem;
	height: 0.6133rem;
	position: absolute;
	display: block;
	top: 0.4rem;
	right: 0.4rem;
}
.newsBox>img:nth-of-type(1){
	width: 100%;
	height: 100%;
}
.newsBox>img:nth-of-type(2){
	width:0.16rem;
	height:0.16rem;
	position: absolute;
	top: 0.0533rem;
	right: 0.4rem;
}
.headImage{
	width: 1.6rem;
	height: 1.6rem;
	position: absolute;
	left: 50%;
	margin-left:-0.8rem;
	top: 0.4rem;
}
.headImage>a>img{
	width:100%;
	height: 100%;
}
.informationPart{
	width: 10rem;
	height: 2rem;
	text-align: center;
	margin-top: 2.2666rem;
}
.phoneNumber{
	width:3.4666rem;
	height: 0.4rem;
	margin: 0 auto;
	font-size: 11px;
	color: #fff;
	line-height: 0.4rem;
	/*background-image: url(http://image.79jr.com/Public/v3/M/img/person/membershiplevel.png);
	background-size: 0.4rem 0.4rem;
	background-repeat: no-repeat;
	background-position:0.16rem 0;*/
}
[data-dpr="2"] .phoneNumber{
    font-size: 0.36rem;
}
[data-dpr="3"] .phoneNumber{
    font-size: 0.36rem;
}
.informationPart>p:nth-of-type(1){
	font-size: 10px;
	color: #fcc8b2;
	margin-top: 0.24rem;
}
[data-dpr="2"] .informationPart>p:nth-of-type(1){
    font-size: 0.25rem;
}
[data-dpr="3"] .informationPart>p:nth-of-type(1){
    font-size: 0.25rem;
}
.informationPart>p:nth-of-type(2){
	font-size: 24px;
	color: #fff;
	margin-top: 0.1333rem;
}
[data-dpr="2"] .informationPart>p:nth-of-type(2){
    font-size: 0.58rem;
}
[data-dpr="3"] .informationPart>p:nth-of-type(2){
    font-size: 0.58rem;
}
.collectionMoney{
	width: 10rem;
	height: 1.3333rem;
	position: relative;
	background: #f8662a;
}
.collectionMoney>span{
	width: 3.3333rem;
	height:0.9333rem;
	display: block;
	text-align: center;
}
.collectionMoney>span:nth-of-type(1){
	position: absolute;
	top: 0.2rem;
	left:0;
}
.collectionMoney>span:nth-of-type(2){
	position: absolute;
	top: 0.2rem;
	left:3.3333rem;
}
.collectionMoney>span:nth-of-type(3){
	position: absolute;
	top: 0.2rem;
	left:6.6666rem;
}
.collectionMoney>span>p:nth-of-type(1){
	font-size: 11px;
	color: #fcc8b2;
}
[data-dpr="2"] .collectionMoney>span>p:nth-of-type(1){
    font-size: 0.27rem;
}
[data-dpr="3"] .collectionMoney>span>p:nth-of-type(1){
    font-size: 0.27rem;
}
.collectionMoney>span>p:nth-of-type(2){
	color: #fff;
	margin-top: 0.08rem;
	font-size: 13px;
}
[data-dpr="2"] .collectionMoney>span>p:nth-of-type(2){
    font-size: 0.32rem;
}
[data-dpr="3"] .collectionMoney>span>p:nth-of-type(2){
    font-size: 0.32rem;
}
.collectionMoney>em:nth-of-type(1){
	width: 0.0133rem;
	height: 0.8rem;
	display: block;
	background-color:rgba(238,238,238,0.7);
	position: absolute;
	top: 0.2666rem;
	left: 3.3333rem;
}
.collectionMoney>em:nth-of-type(2){
	width: 0.0133rem;
	height: 0.8rem;
	display: block;
	background-color:rgba(238,238,238,0.7);
	position: absolute;
	top: 0.2666rem;
	left:6.6666rem;
}
.collectBox{
	width: 10rem;
	height: 0.8rem;
	background-color: #fff;
	margin: 0 auto;
	position: relative;
	border-bottom: 1px solid #e5e5e5;
}
.collectBox>span{
	width: 5rem;
	height: 0.8rem;
	line-height: 0.8rem;
	display: inline-block;
	text-align: center;
	color: #333333;
	font-size: 12px;
}
.collectBox>span>b{
	color: #888888;
	font-weight: normal;
}
[data-dpr="2"] .collectBox>span{
    font-size: 0.3rem;
}
[data-dpr="3"] .collectBox>span{
    font-size: 0.3rem;
}
.collectBox>span:nth-of-type(1){
	position: absolute;
	top: 0;
	left: 0;
}
.collectBox>span:nth-of-type(2){
	position: absolute;
	top: 0;
	left:5rem;
}
.collectBox>em{
	display: block;
	width: 0.0133rem;
	height: 0.4rem;
	position: absolute;
	top: 0.2rem;
	left: 5rem;
	background-color: #e5e5e5;
}
.moneyButton{
	width:10rem;
	height: 1.7333rem;
	margin: 0 auto;
	position:relative;
	background: #FFFFFF;
	margin-bottom: 0.266rem;
}
.moneyButton>a{
	font-size: 18px;
}
[data-dpr="2"] .moneyButton>a{
    font-size: 0.43rem;
}
[data-dpr="3"] .moneyButton>a{
    font-size: 0.43rem;
}
.moneyButton>a:nth-of-type(1){
	width: 3.76rem;
	height: 1.1466rem;
	display: block;
	text-align: center;
	line-height: 1.1466rem;
	border-radius: 0.1333rem;
	color:#888888;
	background-color:#FFFFFF;
	position: absolute;
	top: 0.2933rem;
	left:0.9333rem;
	border:1px solid #FF7319;
	
}
.moneyButton>a:nth-of-type(2){
	width: 3.76rem;
	height: 1.1466rem;
	display: block;
	text-align: center;
	line-height: 1.1466rem;
	border-radius: 0.1333rem;
	color:#fff;
	background-color:#ff7319;
	position: absolute;
	top: 0.2933rem;
	right:0.9333rem;
}
.mainFunction{
	width: 10rem;
	height: 2.1333rem;
	background-color: #fff;
	margin: 0 auto;
	border: 0.0133rem solid #e5e5e5;
	position: relative;
	font-size: 13px;
}
[data-dpr="2"] .mainFunction{
    font-size: 0.32rem;
}
[data-dpr="3"] .mainFunction{
    font-size: 0.32rem;
}
.mainFunction>a{
	width: 33.33%;
	height: 2.1333rem;
	display: block;
	position: absolute;
	text-align: center;
	color: #555555;
}
.mainFunction>a>img{
	width: 0.8533rem;
	height: 0.8533rem;
	display: block;
	margin: 0 auto;
	margin-top:0.3466rem;
}
.mainFunction>a>p{
	margin-top: 0.1333rem;
}
.mainFunction>a:nth-of-type(1){
	top: 0;
	left: 0;
	border-right: 0.0133rem solid #e5e5e5;
}
.mainFunction>a:nth-of-type(2){
	top: 0;
	left:3.3333rem;
	border-right: 0.0133rem solid #e5e5e5;
}
.mainFunction>a:nth-of-type(3){
	top: 0;
	left:6.6666rem;
}
.functionKeyOne{
	width: 10rem;
	height:auto;
	margin:0.2666rem auto;
	background-color: #fff;
	font-size: 13px;
}
[data-dpr="2"] .functionKeyOne{
    font-size: 0.33rem;
}
[data-dpr="3"] .functionKeyOne{
    font-size: 0.33rem;
}
.functionKeyOne>a{
	display: block;
	width:9.2rem;
	height: 1.3333rem;
	margin: 0 auto;
	position: relative;
}
.functionKeyOne>a:not(:last-child){
	border-bottom: 0.0133rem solid #e5e5e5;
}
.functionKeyOne>a:nth-of-type(1){
	background-image: url(http://image.79jr.com/Public/v3/M/img/person/geren_t.png),url(http://image.79jr.com/Public/v3/M/img/person/geren_ck.png);
	background-size: 0.6rem 0.6rem,0.2533rem 0.4266rem;
    background-position: 0 0.3666rem,8.8rem 0.4533rem;
	background-repeat: no-repeat;
}
.functionKeyOne>a:nth-of-type(2){
	background-image: url(http://image.79jr.com/Public/v3/M/img/person/calendar.png),url(http://image.79jr.com/Public/v3/M/img/person/geren_ck.png);
	background-size: 0.6rem 0.6rem,0.2533rem 0.4266rem;
    background-position: 0 0.3666rem,8.8rem 0.4533rem;
	background-repeat: no-repeat;
}
.functionKeyOne>a:nth-of-type(3){
	background-image: url(http://image.79jr.com/Public/v3/M/img/person/geren_p.png),url(http://image.79jr.com/Public/v3/M/img/person/geren_ck.png);
	background-size: 0.6rem 0.6rem,0.2533rem 0.4266rem;
    background-position: 0 0.3666rem,8.8rem 0.4533rem;
	background-repeat: no-repeat;
}
.keyFont{
	width: auto;
	height:1.3333rem;
	text-align: center;
	line-height: 1.3333rem;
	color: #555555;
	margin-left:0.9333rem;
}
.numValue{
	position: absolute;
	top: 0.4533rem;
	right:0.8rem;
	color: #555555;
}
.newsNum{
	width: auto;
	height: 0.4rem;
	border-radius: 0.1333rem;
	border: 0.0266rem solid #fd461c;
	display: inline-block;
	color: #fd461c;
	padding: 0.0666rem;
	position: absolute;
	top:0.2666rem;
	left:2.6666rem;
}
.functionKeyTwo{
	width: 10rem;
	height:auto;
	margin:0.2666rem auto;
	background-color: #fff;
	font-size: 13px;
}
[data-dpr="2"] .functionKeyTwo{
    font-size: 0.33rem;
}
[data-dpr="3"] .functionKeyTwo{
    font-size: 0.33rem;
}
.functionKeyTwo>a{
	display: block;
	width:9.2rem;
	height: 1.3333rem;
	margin: 0 auto;
	position: relative;
}
.functionKeyTwo>a:not(:last-child){
	border-bottom: 0.0133rem solid #e5e5e5;
}
.functionKeyTwo>a:nth-of-type(1){
	background-image: url(http://image.79jr.com/Public/v3/M/img/person/geren_aq.png),url(http://image.79jr.com/Public/v3/M/img/person/geren_ck.png);
	background-size: 0.6rem 0.6rem,0.2533rem 0.4266rem;
    background-position: 0 0.3666rem,8.8rem 0.4533rem;
	background-repeat: no-repeat;
}
.functionKeyTwo>a:nth-of-type(2){
	background-image: url(http://image.79jr.com/Public/v3/M/img/person/geren_b.png),url(http://image.79jr.com/Public/v3/M/img/person/geren_ck.png);
	background-size: 0.6rem 0.6rem,0.2533rem 0.4266rem;
    background-position: 0 0.3666rem,8.8rem 0.4533rem;
	background-repeat: no-repeat;
}
.functionKeyTwo>a:nth-of-type(3){
	background-image: url(http://image.79jr.com/Public/v3/M/img/person/geren_qq.png),url(http://image.79jr.com/Public/v3/M/img/person/geren_ck.png);
	background-size: 0.6rem 0.6rem,0.2533rem 0.4266rem;
    background-position: 0 0.3666rem,8.8rem 0.4533rem;
	background-repeat: no-repeat;
}
.functionKeyTwo>a:nth-of-type(4){
	background-image: url(http://image.79jr.com/Public/v3/M/img/person/download.png),url(http://image.79jr.com/Public/v3/M/img/person/geren_ck.png);
	background-size: 0.6rem 0.6rem,0.2533rem 0.4266rem;
    background-position: 0 0.3666rem,8.8rem 0.4533rem;
	background-repeat: no-repeat;
}
.outButton{
	width: 10rem;
	height: 3.0133rem;
	margin: 0 auto;
	overflow: hidden;
	text-align: center;
	margin-bottom: 1.36rem;
}
.outButton>a{
	width: 9.3333rem;
	height: 1.1466rem;
	border-radius: 0.1333rem;
	background-color: #e5e5e5;
	margin: 0 auto;
	text-align: center;
	line-height: 1.1466rem;
	display: block;
	color: #555555;
	font-size: 18px;
	margin-top:0.4rem;
}
[data-dpr="2"] .outButton>a{
    font-size: 0.43rem;
}
[data-dpr="3"] .outButton>a{
    font-size: 0.43rem;
}
.servicePhone{
	margin-top: 0.2666rem;
}
.servicePhone>a{
	color: #888888;
	font-size: 9px;
}
[data-dpr="2"] .servicePhone>a{
    font-size: 0.28rem;
}
[data-dpr="3"] .servicePhone>a{
    font-size: 0.28rem;
}
.editionNum{
	color: #888888;
	font-size: 9px;
	margin-top:0.08rem;
}
[data-dpr="2"] .editionNum{
    font-size: 0.28rem;
}
[data-dpr="3"] .editionNum{
    font-size: 0.28rem;
}
/*遮挡层样式*/
.shieldLayer{
	width:10rem;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 9999999;
	background-image: url(https://image.79jr.com/list/fancybox_overlay.png);
}
.signInBox{
	background-color: #eeeeee;
	width:10rem;
	height:3.4666rem;
	position: absolute;
	bottom: 0;
	overflow: hidden;
}
.signInButton{
	width:9.3333rem;
	height: 1.1466rem;
	margin: 0 auto;
	background-color: #ff7319;
	border-radius:0.08rem;
	text-align: center;
	color: #fff;
	line-height:1.1466rem;
	font-size: 14px;
	margin-top:1.12rem;
}
[data-dpr="2"] .signInButton{
    font-size: 28px;
}
[data-dpr="3"] .signInButton{
    font-size: 42px;
}
.versionNumber{
	display: block;
	color: #666666;
	font-size: 12px;
	text-align: center;
	margin-top:0.4rem;
}
[data-dpr="2"] .versionNumber{
    font-size: 24px;
}
[data-dpr="3"] .versionNumber{
    font-size:36px;
}
</style>