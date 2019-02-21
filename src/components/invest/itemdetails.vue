<template>
	<div class="m-content">
			<div class="tabTop">
				<span @click="showNav(index)" v-for="(item,index) in navText" :class="showNum==index?'tabbod':''">{{item}}</span>
			</div>
<!--项目详情start-->
			<div class="projectDetail" v-if="showNum==0" style="display: block;">
			<div class="safetyShow" >
					<div class="moneySafety"><span class="fontTitle">用户信息</span></div>
					<div class="tb-div" v-html="borrow_details.borrower_info">
					</div>					
				</div>
				
				<div class="safetyShow">
					<div class="moneySafety"><span class="fontTitle">项目抵押信息</span></div>
					<div class="tb-div" v-html="borrow_details.measure">
						
					</div>					
				</div>
				
				<div class="safetyShow">
					<div class="moneySafety"><span class="fontTitle">借款描述</span></div>
					<div class="tb-div" style="text-indent:2em; padding:10px;">
						<p>
							<span style="font-family:simsun;">
								<span style="" v-text="borrow_details.borrow_info">
								</span>
							</span>
						</p>
					</div>
				</div>
				<div class="safetyShow">
					<div class="moneySafety"><span class="fontTitle">风控措施</span></div>
					<div class="tb-div" style="text-indent:2em; padding:10px;">
						<p>
							<span style="font-family:simsun;">
								<span style="" v-text="borrow_details.risk_advice">
								</span>
							</span>
						</p>
					</div>
				</div>

				<div class="safetyShow">
					<div class="moneySafety"><span class="fontTitle">相关资料</span></div>
					<div class="msgShow">
						<div class="previewBox">
							<div class="previewImg">
								<div class="preimgbox">
									<img src="http://ctjrproduct.79jr.com/UF/Uploads/Product/1317/20180321160219250.png" data-preview-src="" data-preview-group="1">
									<p>企业照片</p>
								</div>
								<div class="preimgbox">
									<img src="http://ctjrproduct.79jr.com/UF/Uploads/Product/1317/20180321160222408.png" data-preview-src="" data-preview-group="1">
									<p>企业照片</p>
								</div>
								<div class="preimgbox">
									<img src="http://ctjrproduct.79jr.com/UF/Uploads/Product/1317/20180321160224815.png" data-preview-src="" data-preview-group="1">
									<p>营业执照</p>
								</div>
								<div class="preimgbox">
									<img src="http://ctjrproduct.79jr.com/UF/Uploads/Product/1317/20180321160225364.png" data-preview-src="" data-preview-group="1">
									<p>工商网查询</p>
								</div>
								<div class="preimgbox">
									<img src="http://ctjrproduct.79jr.com/UF/Uploads/Product/1317/201803211602265.png" data-preview-src="" data-preview-group="1">
									<p>执行网查询</p>
								</div>
								<div class="preimgbox">
									<img src="http://ctjrproduct.79jr.com/UF/Uploads/Product/1317/20180321160227617.png" data-preview-src="" data-preview-group="1">
									<p>法定代表人</p>
								</div>
								<div class="preimgbox">
									<img src="http://ctjrproduct.79jr.com/UF/Uploads/Product/1317/20180321160228277.png" data-preview-src="" data-preview-group="1">
									<p>土地使用证</p>
								</div>
								<div class="preimgbox">
									<img src="http://ctjrproduct.79jr.com/UF/Uploads/Product/1317/2018032116022923.png" data-preview-src="" data-preview-group="1">
									<p>土地平面图</p>
								</div>
								<div class="preimgbox">
									<img src="http://ctjrproduct.79jr.com/UF/Uploads/Product/1317/20180321160230334.png" data-preview-src="" data-preview-group="1">
									<p>回购承诺函</p>
								</div>
								<div class="preimgbox">
									<img src="http://ctjrproduct.79jr.com/UF/Uploads/Product/1317/20180321160231684.png" data-preview-src="" data-preview-group="1">
									<p>回购企业证照</p>
								</div>
								<div class="preimgbox">
									<img src="http://ctjrproduct.79jr.com/UF/Uploads/Product/1317/20180321160232267.png" data-preview-src="" data-preview-group="1">
									<p>执行网查询</p>
								</div>
								<div class="preimgbox">
									<img src="http://ctjrproduct.79jr.com/UF/Uploads/Product/1317/20180321160234177.png" data-preview-src="" data-preview-group="1">
									<p>回购企业法人</p>
								</div>
								<div class="preimgbox">
									<img src="http://ctjrproduct.79jr.com/UF/Uploads/Product/1317/20180321160235645.png" data-preview-src="" data-preview-group="1">
									<p>借款居间协议</p>
								</div>
								<div class="preimgbox">
									<img src="http://ctjrproduct.79jr.com/UF/Uploads/Product/1317/20180321160236267.png" data-preview-src="" data-preview-group="1">
									<p>借款居间协议</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
<!--项目详情end-->
<!--安全保障start-->
			<div class="safetyBox" v-if="showNum==1" style="">
				<div class="safetyShow">
					<div class="moneySafety"><span class="fontTitle">资金安全保障</span></div>
					<div class="safetyFine">
						<span><img src="https://image.79jr.com/Public/v3/M/img/invest/aqbzicon1.png"><p>真实项</p><p>目背景</p></span>
						<span><img src="https://image.79jr.com/Public/v3/M/img/invest/aqbzicon2.png"><p>严格甄</p><p>选流程</p></span>
						<span><img src="https://image.79jr.com/Public/v3/M/img/invest/aqbzicon4.png"><p>完善的风</p><p>控体系</p></span>
						<span><img src="https://image.79jr.com/Public/v3/M/img/invest/aqbzicon5.png"><p>银行资</p><p>金存管</p></span>
					</div>
				</div>
				<div class="safetyShow">
					<div class="moneySafety"><span class="fontTitle">严格的风控流程</span></div>
					<div class="safetyFine fineH">
						<p class="pssFont">春天金融细化贷前调查、贷中审查、贷后管理、逾期处理等四个风控流程，把风险控制渗入每一个环节中。通过详尽的贷前审查、审慎的贷中核查、完善的贷后管理以及妥当的逾期处理，把风险控制在合理的范围内，坚持追求所有标的均真实、有效，可追溯、可审查。</p>
					</div>
				</div>
			</div>
<!--安全保障end-->
<!--出借记录start-->
			<div class="investNum" v-if="showNum==2" style="" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="50">
				<div class="tabSecond"><span>账户</span><span>出借时间</span><span>出借金额</span></div>
				<ul class="peopleNum" id="morelist">
				    <li v-for="item in borrow_record">
				    	<span>{{item.user_name}}</span>
				    	<span>
				    		<p>{{item.add_time}}</p>
				    	</span>
				    	<span>{{item.investor_capital}}</span>
				    </li>
				</ul>
			</div>
<!--出借记录end-->
		</div>
</template>

<script>
	var qs = require('qs');
	import { Indicator } from 'mint-ui';
	import { InfiniteScroll } from 'mint-ui';
	import { baseConfig } from '../../../static/config.js';
	import { getToken } from '../../../static/common.js'
	export default{
		data (){
			return {
				showNum:0,
				navText:[
					'项目详情','安全保障','出借记录'
				],
				bid:"",
				p:1,
				borrow_details:{},
				borrow_refund:{},
				borrow_record:[],
				loading:false
			}
		},
		methods:{
			showNav:function(index){
				this.showNum=index
				//this.$route.params.showNum=index
			},
			getDetails:function (){
				Indicator.open();
				var self = this;
				var param = {
					p_token:getToken().p_token,
					version:baseConfig.version,
					bid:this.bid
				}
				var url = baseConfig.api+'/invest/borrowDetails'
				self.axios.post(url, qs.stringify(param),{emulateJSON : true}).then(function (response) {
					Indicator.close();
					var res = response.data;
					if(res.status==200){
						self.borrow_details = res.data
					}
				}).catch(function (error) {
					Indicator.close();
				　　 alert(error);
				});
			},
			getSafe:function (){
				Indicator.open();
				//console.log(getToken().p_token);
				var self = this;
				var param = {
					p_token:getToken().p_token,
					version:baseConfig.version,
					bid:this.bid
				}
				var url = baseConfig.api+'/invest/refund'
				self.axios.post(url, qs.stringify(param),{emulateJSON : true}).then(function (response) {
					Indicator.close();
					var res = response.data;
					//console.log(res)
					if(res.status==200){
						self.borrow_refund = res.data
						//self.datas =res.data; 
					}
				}).catch(function (error) {
					Indicator.close();
				　　 alert(error);
				});
			},
			getRecord:function (){
				Indicator.open();
				//console.log(getToken().p_token);
				var self = this;
				console.log(self.p)
				var param = {
					p_token:getToken().p_token,
					version:baseConfig.version,
					bid:this.bid
				}
				var url = baseConfig.api+'invest/getrecord/id/'+self.bid+'/p/'+self.p+'/version/'+baseConfig.version;
				self.axios.get(url).then(function (response) {
					Indicator.close();
					var res = response.data;
					if(res.status==200){
						self.loading = false;
						self.p+=1;
						self.borrow_record = self.borrow_record.concat(res.data);
					}
				}).catch(function (error) {
					Indicator.close();
				　　 alert(error);
				});
			},
			loadMore() {
				this.loading = true;
			  	this.getRecord();
			}
		},
		created:function (){
			console.log(this.$route.params.showNum)
			this.showNum = this.$route.params.showNum;
			this.bid = this.$route.params.bid;
			this.getDetails();
			this.getSafe();
			//this.getRecord();
		}
	}
</script>

<style>
ul li{list-style: none;}
*{margin: 0;padding: 0;}
.tabTop{
	width:10rem;
	height: 1.2rem;
	margin:0 auto;
	background-color: #fff;
	position: fixed;
	top: 0;
	z-index: 999;
	border: 0.0133rem solid #efeff4;
}
.tabTop>span{
	width: 3.3333rem;
	height: 1.2rem;
	text-align: center;
	line-height: 1.2rem;
	display: block;
	font-size: 0.38rem;
	color: #666666;
	position: absolute;
}
.tabTop>span:nth-of-type(1){
	top: 0;
	left: 0;
}
.tabTop>span:nth-of-type(2){
	top: 0;
	left: 3.3333rem;
}
.tabTop>span:nth-of-type(3){
	top: 0;
	left: 6.6666rem;
}
.tabbod{
	border-bottom: 0.0533rem solid #ff7319;
	color: #1a1a1a!important;
}
.projectDetail{
	margin-top: 1.4rem;
}
.safetyBox{
	width: 10rem;
	height: auto;
	margin: 0 auto;
	margin-top: 1.4rem;
}
.safetyShow{
	width: 10rem;
	height: auto;
	margin: 0 auto;
	margin-top:0.2666rem;
}
.moneySafety{
	width:10rem;
	height: 0.9333rem;
	margin:0 auto;
	border-bottom: 0.0133rem solid #e5e5e5;
	background-color: #fff;
}
.fontTitle{
	display: inline-block;
	height: 0.9333rem;
	line-height: 0.9333rem;
	color: #333333;
	font-size: 0.37rem;
	margin-left: 0.3333rem;
	position: relative;
	padding-left:0.1333rem;
}
.fontTitle:before{
	content: "";
	display: inline-block;
	width: 0.0533rem;
	height: 0.3466rem;
	background-color: #ff7319;
	margin-right:0.08rem;
	position: absolute;
	top:0.2666rem;
	left: 0;
}
.safetyFine{
	width: 100%;
	height:3.3333rem;
	margin: 0 auto;
	background-color: #fff;
	position: relative;
	overflow: hidden;
}
.safetyFine>span{
	width: 25%;
	height:2.9333rem;
	display: inline-block;
	text-align: center;
	position: absolute;
}
.safetyFine>span>img{width: 1.0133rem;height: 1.0133rem;}
.safetyFine>span:nth-of-type(1){
	top:0.4rem;
	left: 0;
}
.safetyFine>span:nth-of-type(2){
	top: 0.4rem;
	left:25%;
}
.safetyFine>span:nth-of-type(3){
	top: 0.4rem;
	left:50%;
}
.safetyFine>span:nth-of-type(4){
	top: 0.4rem;
	left: 75%;
}
/* .safetyFine>span:nth-of-type(5){
	top: 0.4rem;
	left:8rem;
} */
.safetyFine>span>p{
	font-size: 12px;
	color: #333333;
	margin-bottom: 0;
	font-size: 0.32rem;
}
.openShow{}
.investNum{
	width: 10rem;
	height: auto;
	background-color: #fff;
	margin: 0 auto;
	margin-top:1.4rem;
	padding-bottom: 0.4rem;
}
.tabSecond{
	width: 10rem;
	height: 0.9333rem;
	border-bottom: 0.0133rem solid #e5e5e5;
	position: relative;
}
.tabSecond>span{
	width: 3.3333rem;
	height: 0.9333rem;
	line-height: 0.9333rem;
	text-align: center;
	display: block;
	position: absolute;
	font-size:0.36rem;
	color: #999999;
}
.tabSecond>span:nth-of-type(1){
	top: 0;
	left: 0;
}
.tabSecond>span:nth-of-type(2){
	top: 0;
	left:3.3333rem;
}
.tabSecond>span:nth-of-type(3){
	top: 0;
	left:6.6666rem;
}
.peopleNum{
	width: 10rem;
	height: auto;
	display: block;
	margin: 0 auto;
}
.peopleNum>li{
	width:10rem;
	height: 1.6666rem;
	position: relative;
}
.peopleNum>li:not(:last-child){
	border-bottom: 0.0133rem solid #e5e5e5;
}
.peopleNum>li>span{
	width: 3.3333rem;
	height: 1.6666rem;
	display: block;
	text-align: center;
	line-height: 1.6666rem;
	position: absolute;
	font-size: 0.36rem;
}
.peopleNum>li>span:nth-of-type(1){
	top: 0;
	left: 0;
	color: #333333;
}
.peopleNum>li>span:nth-of-type(2){
	top: 0;
	left:3.3333rem;
	color: #999999;
	/*padding-top:0.4rem;*/
}
.peopleNum>li>span:nth-of-type(3){
	top: 0;
	left:6.6666rem;
	color: #1a1a1a;
}
.peopleNum>li>span:nth-of-type(2)>p{
	height:0.5066rem;
	margin-bottom: 0;
	line-height:0.5066rem;
	line-height: 1.666rem;
}
.msgShow{
	width: 10rem;
	height: auto;
	padding-bottom: 0.8rem;
	background-color: #fff;
	overflow: hidden;
}
.msgShow>p{
	width: 9.3333rem;
	margin-top: 0.4rem;
	margin-bottom: 0;
	color: #555555;
	font-size: 13px;
	padding-left: 0.6666rem;
}
.msgShow>span{
	display: block;
	width:9.3333rem;
	height: auto;
	margin: 0 auto;
	margin-top: 0.4rem;
	line-height: 1.5;
	color: #333333;
	font-size: 0.3rem;
}
/*照片预览的样式start*/
.mui-preview-image.mui-fullscreen {
	position: fixed;
	z-index: 999999;
	background-color: #000;
}
.mui-preview-header,
.mui-preview-footer {
	position: absolute;
	width: 100%;
	left: 0;
	z-index: 10;
}
.mui-preview-header {
	height: 44px;
	top: 0;
}
.mui-preview-footer {
	height: 50px;
	bottom: 0px;
}
.mui-preview-header .mui-preview-indicator {
	display: block;
	line-height: 25px;
	color: #fff;
	text-align: center;
	margin: 15px auto 4;
	width: 70px;
	background-color: rgba(0, 0, 0, 0.4);
	border-radius: 12px;
	font-size: 16px;
}
.mui-preview-image {
	display: none;
	-webkit-animation-duration: 0.5s;
	animation-duration: 0.5s;
	-webkit-animation-fill-mode: both;
	animation-fill-mode: both;
}
.mui-preview-image.mui-preview-in {
	-webkit-animation-name: fadeIn;
	animation-name: fadeIn;
}
.mui-preview-image.mui-preview-out {
	background: none;
	-webkit-animation-name: fadeOut;
	animation-name: fadeOut;
}
.mui-preview-image.mui-preview-out .mui-preview-header,
.mui-preview-image.mui-preview-out .mui-preview-footer {
	display: none;
}
.mui-zoom-scroller {
	position: absolute;
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	-webkit-box-align: center;
	-webkit-align-items: center;
	align-items: center;
	-webkit-box-pack: center;
	-webkit-justify-content: center;
	justify-content: center;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	width: 100%;
	height: 100%;
	margin: 0;
	-webkit-backface-visibility: hidden;
}
.mui-zoom {
	-webkit-transform-style: preserve-3d;
	transform-style: preserve-3d;
}
.mui-slider .mui-slider-group .mui-slider-item img {
	width: auto;
	height: auto;
	max-width: 100%;
	max-height: 100%;
}
.mui-android-4-1 .mui-slider .mui-slider-group .mui-slider-item img {
	width: 100%;
}
.mui-android-4-1 .mui-slider.mui-preview-image .mui-slider-group .mui-slider-item {
	display: inline-table;
}
.mui-android-4-1 .mui-slider.mui-preview-image .mui-zoom-scroller img {
	display: table-cell;
	vertical-align: middle;
}
.mui-preview-loading {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: none;
}
.mui-preview-loading.mui-active {
	display: block;
}
.mui-preview-loading .mui-spinner-white {
	position: absolute;
	top: 50%;
	left: 50%;
	margin-left: -25px;
	margin-top: -25px;
	height: 50px;
	width: 50px;
}
.mui-preview-image img.mui-transitioning {
	-webkit-transition: -webkit-transform 0.5s ease, opacity 0.5s ease;
	transition: transform 0.5s ease, opacity 0.5s ease;
}
@-webkit-keyframes fadeIn {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
@keyframes fadeIn {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
@-webkit-keyframes fadeOut {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}
@keyframes fadeOut {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}
.previewBox{
	width:9.4666rem;
	height: auto;
	margin: 0 auto;
	overflow: hidden;
	margin-top: 0.1333rem;
}
.preimgbox{
	width: 4.6133rem;
	display: inline-block;
	margin-top:0.14rem;
}
.preimgbox>p{
	text-align: center;
	font-size: 0.34rem;
	color: #515151;
	margin-bottom: 0;
}
.previewImg img{
	width: 4.6133rem;
	height: 4.6133rem;
}
.previewImg img:nth-of-type(even){margin-left:0.1066rem;}
/*照片预览的样式end*/
.loadMore{
	width: 3.4666rem;
	height: 0.8rem;
	margin: 0 auto;
	margin-top: 0.7333rem;
	font-size: 0.37rem;
	color: #333333;
	border: 0.0133rem solid #b5b5b5;
	border-radius: 0.08rem;
	cursor: pointer;
	line-height: 0.8rem;
	background-image: url(https://image.79jr.com/Public/v3/M/img/home/moreicon.png);
    background-size: 0.22rem 0.32rem;
    background-position: 7.35em 0.24rem;
    background-repeat: no-repeat;
    padding-left: 0.45rem;
}
.pssFont{
	width: 9.3333rem;
    height: auto;
    margin: 0 auto;
    margin-top: 0.4rem;
	font-size: 12px;
	color: #666666;
	text-align: justify;
	font-size: 0.32rem;
}
.dbName{
	width: 9.3333rem;
	 margin: 0 auto;
	 margin-top: 0.4533rem;
	font-size: 15px;
	color: #333333;
	font-weight: normal;
}
.dbContent{
	width: 9.3333rem;
    height: auto;
    margin: 0 auto;
    margin-top: 0.4rem;	
}
.dbContent>p{
    font-size: 12px;
	color: #666666;
	text-align: justify;
}
.fineH{
	height: auto;
	padding-bottom:0.2666rem;
}
.tb-div{
	background-color: #fff;
	padding-top: 0.2rem;
	padding-bottom:0.4rem;
}
.tb-div div{
	font-size: 0.32rem;
	color: #555555;
	margin-top: 0.2rem;
	padding-left: 0.6133rem;
}
</style>