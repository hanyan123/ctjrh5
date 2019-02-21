<template>
	<div class='m-content' id="jump_bank" v-cloak>
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
				<div class="detailRate"><b id="borrow_interest_rate" v-cloak>{{binfo.borrow_interest_rate}}</b>%</div>
        		<div class="probabilityMark">借款约定利率</div>
				<div class="jxBox" style="" id="reward_num" v-if="parseFloat(binfo.reward_num)>0" v-cloak>{{binfo.reward_num}}</div>
    		</div>
            <div class="partShow">
            	<span>
            		<p>项目总额</p>
            		<p id="borrow_money" v-html="binfo.borrow_money">--</p>
            	</span>
            	<span>
            		<p>项目期限</p>
            		<p id="duration" v-html="binfo.borrow_duration">--</p>
            	</span>
            	<span>
            		<p>还款方式</p>
            		<p id="repayment_type" v-cloak v-html="binfo.repayment_type">--</p>
            	</span>
            </div>
		</div>
		
		<div class="loginAfterBox" v-if="binfo.borrow_status==2">
			<div class="moneyTime">
				<span>剩余额度：<b id="money_rest" v-cloak>{{leftMoney}}.00元</b></span>
				<span>剩余时间：<b id="lefttime_date" v-cloak>{{binfo.lefttime_date}}</b></span>
			</div>

			<p class="redbags" tapmode onclick="myWelfare();">
				<span class="redbags-ge">可用红包:<b id="red_bags_count" v-if="red_bags_count!=''||red_bags_count!=undefined">{{red_bags_count}}个</b><b id="red_bags_count" v-else>--个</b></span>
				<span class="redbags-money">红包总额:<b id="red_bags_sum" v-if="red_bags_sum!=''||red_bags_sum!=undefined">{{red_bags_sum}}元</b><b id="red_bags_sum" v-else>--元</b></span>
			</p>

			<div class="inputBox">
				<input type="tel" v-model="money" onkeyup="value=value.replace(/[^\d]/g,'')" ng-pattern="/[^a-zA-Z]/" name="" id="invest_money" :placeholder="borrow_min+'元起投'" class="inputSelector"/>
				<span class="rmb" @click="allMoney()">全额</span>
				<span class="claearnum" v-if="closeShow" @click="clearNum()"></span>
			</div>

			<div class="moneyTimes">
				<span>账户余额：<b id="user_money" v-if="parseInt(user_money)!=''||user_money!=undefined">{{user_money}}元</b><b id="user_money" v-else>--元</b></span>
				<span>预期收益：<b id="shouyi">--</b></span>
			</div>
		</div>
		<div class="processBox" v-if="binfo.borrow_status==4">
			<p><b>{{ binfo.first_verify_time | formatDate }}</b>发布标的<em class=""></em></p>
			<p class="purchasemoeny" v-for="item in my_invest"><b>{{ item.i_date }}</b>成功买入{{ item.i_capital }}元<em class=""></em></p>
			<p class="interJx "><b>{{ binfo.full_time | formatDate }}</b>满标</p>
		</div>
		<div class="biddingProcess" v-if="binfo.borrow_status==6 || binfo.borrow_status==7">
			<div class="processBox">
				<p><b>{{ binfo.first_verify_time | formatDate }}</b>发布标的<em class=""></em></p>
				<p class="purchasemoeny" v-for="item in my_invest"><b>{{ item.i_date }}</b>成功买入{{ item.i_capital }}元<em class=""></em></p>
				<p class="interJx "><b>{{ binfo.second_verify_time | formatDate }}</b>满标计息<em class=""></em></p>
				<p :class="[principal,binfo.borrow_status==6?grayIcon:'']"><b>{{ bdata.repay_next_date }}</b>{{ bdata.repay_next_info }}</p>
			</div>
		</div>
		<div class="projectBox">
			<router-link class="clickNext nextOne" :to="{path:'/itemdetails/0/'+bid}">项目详情<b class="numPeople" id="borrow_count"></b></router-link>
			<router-link class="clickNext nextTwo" :to="{path:'/itemdetails/1/'+bid}">安全保障</router-link>
			<router-link class="clickNext nextThree":to="{path:'/itemdetails/2/'+bid}">出借记录<b class="numPeople" id="borrow_count" v-if="bdata.borrow_count>0">已出借{{bdata.borrow_count}}笔</b></router-link>
			<router-link :to="{path:'/safetip'}" class="clickNext nextFour nexts" href="javascript:void(0);" >风险提示</router-link>
		</div>
		<div class="functBottom" id="dibu">
			<a href="javascript:void(0);"  onclick="openCalculator()" id="jisuanqi" tapmode><img src="https://image.79jr.com/Public/v3/M/img/invest/jisuanqi.png"></a>
			<a href="javascript:void(0);" id="touzi" @click="goBorrow()">立即出借</a>
		</div>

		<input type="hidden" id="borrow_id"  value="">
		<opencust :isShow="cust_show" @closeMe="updateMe()"></opencust>
	</div>
</template>

<script>
	var qs = require('qs');
	import opencust from '../comm/opencust';
	import { Indicator,Toast,MessageBox } from 'mint-ui';
	import { getToken } from '../../../static/common.js'
	import { baseConfig,showMessage } from '../../../static/config.js';
	export default{
		data (){
			return {
				principal:'principal',
				grayIcon:'grayIcon',
				options: {
				  	easing: 'easeInOut',
				  	duration: 1400,
				},
				borrowrate:"12.6",
				progress:0,
				binfo:{},
				bdata:{},
				user_money:"0.00",
				red_bags_count:"0",
				red_bags_sum:"0.00",
				leftMoney:"0.00",
				borrow_min:"100",
				bid:"",
				money:"",
				cust_show:false,
				my_invest:[],
				closeShow:false,
			}
		},
		components:{
			opencust
		},
		mounted: function () {
			this.$refs.customHeart.set(1);
	   	},
	   	created:function (){
	   		this.bid = this.$route.params.bid;
	   		var p_token = getToken();
	   		if(p_token){
	   			this.getBinfo1();
	   		} else {
	   			this.getBinfo();
	   		}
	   },
	   methods:{
	   		goBack:function (){
	   			this.$router.go(-1);
	   		},
	   		getBinfo:function (){
	   			Indicator.open();
	   			var self = this;
	   			var url = baseConfig.api+'invest/binfo/version/'+baseConfig.version;
		   		var p_token
		   		if(getToken()==null){
		   			p_token="";
		   		} else {
		   			 p_token = getToken().p_token;
		   		}
		   		var params = {
		   			bid:this.$route.params.bid,
		   			p_token:p_token
		   		}
		   		this.axios.post(url, qs.stringify(params),{emulateJSON : true  //这行最关键。题外话：我们是选项体，也就是文档里的[options]
}).then(function (response) {
					Indicator.close();
					console.log(JSON.stringify(response.data));
					self.binfo = response.data.data.borrow_info;
					self.$refs.customHeart.animate(parseFloat(1-response.data.data.borrow_info.progress/100));
				}).catch(function (error) {
					Indicator.close();
				});
	   		},
	   		getBinfo1:function (){
	   			Indicator.open();
	   			var self = this;
	   			var url = baseConfig.api+'invest/invest/version/2.2.0';
		   		var p_token
		   		if(getToken()==null){
		   			p_token="";
		   		} else {
		   			 p_token = getToken().p_token;
		   		}
		   		var params = {
		   			bid:this.$route.params.bid,
		   			p_token:p_token
		   		}
		   		this.axios.post(url, qs.stringify(params),{emulateJSON : true  //这行最关键。题外话：我们是选项体，也就是文档里的[options]
}).then(function (response) {
					Indicator.close();
					console.log(JSON.stringify(response.data));
					self.bdata = response.data.data;
					self.binfo = response.data.data.borrow_info;
					self.user_money=response.data.data.user_money;
					self.red_bags_count=response.data.data.red_bags_count;
					self.red_bags_sum=response.data.data.red_bags_sum;
					self.leftMoney = parseInt(response.data.data.borrow_info.borrow_money)-parseInt(response.data.data.borrow_info.has_borrow);
					self.$refs.customHeart.animate(parseFloat(1-response.data.data.borrow_info.progress/100));
					self.my_invest = response.data.data.my_invest.borrow_investor
				}).catch(function (error) {
					Indicator.close();
				});
	   		},
	   		goBorrow:function (){
	   			var self = this;
	   			var url = baseConfig.api+'gbank/tenderinvest';
		   		var p_token
		   		if(getToken()==null){
		   			showMessage("请先登录",'温馨提示',"登录",this.goLogin);
		   			return false;
		   		} else {
		   			p_token = getToken().p_token;
		   		}
		   		Indicator.open();
		   		var params = {
		   			bid:this.$route.params.bid,
		   			p_token:p_token,
		   			version:baseConfig.version,
		   			money:this.money
		   		}
		   		this.axios.post(url, qs.stringify(params),{emulateJSON : true  //这行最关键。题外话：我们是选项体，也就是文档里的[options]
}).then(function (response) {
					Indicator.close();
					var res = response.data
					if(res.status==500){
						Toast({
						  	message: res.data,
						  	position: 'bottom',
						  	duration: 5000
						});
					} else if(res.status==501){
						self.cust_show = true;
//						MessageBox.confirm('您还没有开户','温馨提示').then(action => {
//							console.log(action)
//						});
					} else if(res.status==200){
						window.location.href = res.data.url
					}else if(res.status == 504){
		              	showMessage(res.data,'温馨提示',"绑卡",this.bindCard)
		            } else if(res.status == 505){
		                showMessage(res.data,'温馨提示','设置',this.goChangeCardPwd)
		            } else if(res.status == 506){
		               	showMessage(res.data,'温馨提示','充值')
		            } else if(res.status == 507){
		               	showMessage(res.data,'温馨提示','确定')
		            }
				}).catch(function (error) {
					Indicator.close();
				});
		   	},
		   	updateMe:function (){
		   		this.cust_show = false;
		   	},
		   	goLogin:function (){
		   		this.$router.push({path:'/login'})
		   	},
		   	//绑卡
		   	bindCard:function(){
		   		Indicator.open();
	   			var self = this;
	   			var url = baseConfig.api+'/gbank/bindcard';
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
				}).catch(function (error) {
					Indicator.close();
				});
		   	},
		   	//设置交易密码
		   	goChangeCardPwd:function(){
		   		Indicator.open();
	   			var self = this;
	   			var url = baseConfig.api+'/gbank/passwdchange';
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
					console.log(response.data);
				}).catch(function (error) {
					Indicator.close();
				});
		    },
		    clearNum:function (){
		   		this.money="";
		  	},
		  	allMoney:function (){
		  		//console.log(this.leftMoney)
		  		if(this.leftMoney>this.user_money){
		  			console.log(1111)
		  			this.money=this.user_money
		  		} else {
		  			this.money=this.leftMoney
		  		}
		  	}
	    },
	    filters:{
	        formatDate (value){
	            var day = new Date(parseInt(value)*1000);
	            console.log(value);
			　　var year = day.getFullYear();
			　　var month = day.getMonth() + 1;
				if(month<9){
					month = "0"+month;
				}
			　　var date = day.getDate();
				if(date<9){
					date = "0"+date
				}
			　　return year + "-" + month + "-" + date
			}
	    },
	    watch:{
	    	money (curval,oldval) {
	    		if(curval!=""){
	    			this.closeShow=true;
	    		} else {
	    			this.closeShow=false;
	    		}
	    	}
	    }
	}
</script>

<style scoped>
	[v-cloak] {
	  display: none !important;
	}
	body,html{height: 100%}
	a{ color: #000}
	.projectBox>a:active{ color: #333333}
.detailTop{
	width: 10rem;
	height:6rem;
	margin: 0 auto;
	background: #ff7319;
	overflow: hidden;
}
.detailHeader{
	width: 5.0933rem;
	height: 3.76rem;
	margin: 0 auto;
	margin-top: 0.2rem;
	position: relative;
	background-image: url(../../../static/images/invest/scaledetail.png);
	background-size: 4.8133rem 3.56rem;
	background-repeat: no-repeat;
	background-position: 0.1333rem 0.1333rem;
}
.read{
	text-align: center;
	height: 1.2rem;
	line-height: 1.2rem;
	color: #999;
	background: #efeff4;
	font-size: 0.34rem;
}
.read input{
	position: relative;
	top: 0.06rem;
}
.detailRate{
	width:2.8rem;
	height: 1.1333rem;
	font-size: 14px;
	color: #fff;
	text-align: center;
	position: absolute;
	top:1.5rem;
	left: 0.96rem;
}
.detailRate>b{
	font-size: 0.8rem;
	color: #fff;
	text-align: center;
	font-weight: normal;
}
.probabilityMark{
	width: 2.8rem;
	height: 0.4rem;
	font-size: 0.36rem;
	color: #fff;
	text-align: center;
	position: absolute;
	top: 2.6933rem;
	left: 1.2rem;
}
.partShow{
	width: 10rem;
	height: 1.3333rem;
	margin-top:0.5rem;
	position: relative;
}
.partShow>span{
	width:3.3333rem;
	height: 0.96rem;
	display: block;
	text-align: center;
}
.partShow>span:nth-of-type(1){
	position: absolute;
	top: 0.1866rem;
	left: 0;
}
.partShow>span:nth-of-type(2){
	position: absolute;
	top: 0.1866rem;
	left:3.3333rem;
	border-right: 0.0133rem solid rgba(204,204,204,0.5);
	border-left: 0.0133rem solid rgba(204,204,204,0.5);
}
.partShow>span:nth-of-type(3){
	position: absolute;
	top: 0.1866rem;
	left:6.6666rem;
}
.partShow>span>p:nth-of-type(1){
	color: #ffe0d2;
	font-size: 0.34rem;
	margin-bottom: 0;
}
.partShow>span>p:nth-of-type(2){
	color: #fff;
	font-size: 0.34rem;
	margin-bottom: 0;
}
.moneyTime{
	width: 9.3333rem;
	height: 0.9066rem;
	margin: 0 auto;
	font-size: 0.34rem;
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
}
.moneyTime>span:nth-of-type(2)>b{
	padding-left: 0.32rem;
    background-image: url(../../../static/images/invest/locktime.png);
    background-size: 0.32rem 0.32rem;
    background-repeat: no-repeat;
    background-position-y:center;
}
.moneyTime>span>b{
	font-weight: normal;
	color: #ff7319;
}
.moneyTimes{
	width: 9.3333rem;
	height: 0.9066rem;
	margin: 0 auto;
	font-size: 0.34rem;
	position: relative;
}
.moneyTimes>span:nth-of-type(1){
	display: inline-block;
	width: auto;
	text-align: left;
	line-height: 0.9066rem;
	color: #666666;
	position: absolute;
	left: 0.24rem;
}
.moneyTimes>span:nth-of-type(2){
	display: inline-block;
	width: auto;
	text-align: right;
	line-height: 0.9066rem;
	color: #666666;
	position: absolute;
	right: 0.24rem;
}
.moneyTimes>span>b{
	font-weight: normal;
	color: #ff7319;
}
.welfareRed{
    /* width: 9.3333rem; */
	margin:0 0.3333rem !important;
    /* height: 1.25rem; */
    background-color: #ffffff;
    border-radius: 0.1333rem;
    margin: 0 auto;
    background-image: url(../../../static/images/invest/walf.png);
    background-repeat: no-repeat;
    background-size: 0.6rem 0.6rem;
    background-position: 0.2rem 0.32rem;
}
.welfareVoucher{
	width: 9.3333rem;
	height: 1.0666rem;
	background-color: #ffffff;
	border-radius: 0.1333rem;
	margin: 0 auto;
	margin-top: 0.4rem;
	background-image: url(../../../static/images/invest/jiaxi.png);
	background-repeat: no-repeat;
	background-size: 0.6rem 0.6rem;
	background-position: 0.2rem 0.2933rem;
}
.inputBox{
	/* width: 9.3333rem; */
    height: 1.25rem;
    background-color: #ffffff;
    border-radius: 0.1333rem;
    margin: 0 0.3333rem;
    margin-top: 0.4rem;
    /*border: 1px solid #d2d2d2;*/
    background-image: url(../../../static/images/invest/moneylist.png);
    background-repeat: no-repeat;
    background-size: 0.6rem 0.6rem;
    background-position: 0.2rem 0.32rem;
	position: relative;
}
.choiceBox{
	width: 100%;
	height: 100%;
	display: block;
	text-decoration: none !important;
}
.redType{
	display: inline-block;
    line-height: 1.25rem;
    color: #777;
    font-size: 0.4rem;
    margin-left: 1.0rem;
}
.redType2{
	float: right;
    padding-right: 0.5rem;
}
.redPocket{
	background-image: url(../../../static/images/home/moreicon.png);
    background-repeat: no-repeat;
    background-size: 0.2rem 0.3rem;
    background-position: 8.8rem 0.45rem;
}
.redType>b{
	font-weight: normal;
	color: #ff7319;
	padding: 0 0.2rem;
}
.rightShow{
	display: inline-block;
	line-height: 1.1466rem;
	color: #444444;
	font-size: 15px;
	float: right;
	margin-right: 0.24rem;
}
.inputSelector{
	width: 79%!important;
    height: 1.2rem!important;
    display: block;
    border: none!important;
    border-radius: 0.1333rem!important;
    margin: 0.025rem auto;
    font-size: 0.39rem;
    color: #999999;
    padding: 0!important;
    /* border: none; */
    outline: none;
    box-sizing: border-box;
}
.rmb{
	display: inline-block;
    line-height: 1.28rem;
    color: #444444;
    font-size: 0.39rem;
    float: right;
    margin-right: 0.24rem;
    margin-top:0rem;
	position: absolute;
	right: 0.24rem;
	top: 0;
	color: #999999;
}

.claearnum{
	display: block;
	height: 1rem;
	width:1rem;
	background: url(../../../static/images/home/close.png) no-repeat center center;
	background-size: 40% 40%;
	float: right;
	position: absolute;
	top: 0.125rem;
	right: 1.4rem;
}
.biddingProcess{
	width:10rem;
	height:auto;
	background-color: #fff;
	overflow: hidden;
	margin: 0 auto;
	margin-top: 0.2666rem;

}
.processBox{
	width: auto;
    height: auto;
    display: table;
	margin: 0.77rem auto;
	padding-bottom: 0.2666rem;
	font-size: 12px;
	overflow: hidden;
	position: relative;
}
.processBox>p>b{
	font-weight: normal;
	color: #999999;
	margin-right:0.16rem;
}
.processBox>p{
	position: relative;
	width: 100%;
	height: 0.56rem;
	line-height: 0.56rem;
	text-indent:0.8rem;
	font-size: 0.35rem;
}
.processBox>p:not(:first-child){
	margin-top: 0.4266rem;
}
.processBox>p>em{
	display: block;
	width: 0.0266rem;
	height: 0.4133rem;
	background-image: url(../../../static/images/invest/lineh.png);
	background-repeat: no-repeat;
	background-size: 100% 100%;
	position: absolute;
	left:0.2666rem;
	top: 0.56rem;
}
.lineGray{
	background-image: url(../../../static/images/invest/lineg.png)!important;
}
.processBox>p:nth-of-type(1){
	background-image: url(../../../static/images/invest/release.png);
	background-repeat: no-repeat;
	background-size: 0.56rem 0.56rem;
	background-position:0 0;
}
.purchasemoeny{
	background-image: url(../../../static/images/invest/purchase.png);
	background-repeat: no-repeat;
	background-size: 0.56rem 0.56rem;
	background-position:0 0;
}
.interJx{
	background-image: url(../../../static/images/invest/interjx.png);
	background-repeat: no-repeat;
	background-size: 0.56rem 0.56rem;
	background-position:0 0;
}
.interJx.grayIcon{
	background-image: url(../../../static/images/invest/interjxgray.png);
	background-repeat: no-repeat;
	background-size: 0.56rem 0.56rem;
	background-position:0 0;
}
.principal{
	background-image: url(../../../static/images/invest/principal.png);
	background-repeat: no-repeat;
	background-size: 0.56rem 0.56rem;
	background-position:0 0;
}
.principal.grayIcon{
	background-image: url(../../../static/images/invest/principalgray.png);
	background-repeat: no-repeat;
	background-size: 0.56rem 0.56rem;
	background-position:0 0;
}
.fullMark{
	width: 0.64rem;
	height: 0.64rem;
	background-image: url(../../../static/images/invest/grayproject2.png);
	background-repeat: no-repeat;
	background-size: 100% 100%;
	position: absolute;
	top:0.88rem;
	left: 0;
}
.bearInterest{
	width: 0.62rem;
	height: 0.62rem;
	background-image: url(../../../static/images/invest/grayproject1.png);
	background-repeat: no-repeat;
	background-size: 100% 100%;
	position: absolute;
	top:1.8766rem;
	left: 0;
}
.showNone{display: none;}
.functBottom{
	width: 100%;
	/*height: 1.28rem;*/
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 99;
}
.functBottom>a{
	font-size: 0.43rem;
	height: 1.28rem;
	display:block;
	line-height: 1.28rem;
	text-align: center;
	text-decoration: none!important;
	float: left;
	width: 1.667rem
}
.functBottom>a:nth-of-type(1){
	background-color: #fff;
	color: #ff7319;
	border-top: 1px solid #e5e5e5;
	/*position: absolute;
	left: 0;
	top: 0;*/
}

.functBottom>a:nth-of-type(1) img{ width:0.64rem; height: 0.64rem; display: block; margin: 0 auto; margin-top: 0.32rem;}
.functBottom>a:nth-of-type(2){
	background-color: #ff7319;
	color: #fff;
	width: 8.333rem
	/*position: absolute;
	right: 0;
	top: 0;*/
}
.projectBox{
	width: 10rem;
    height: auto;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 0.2666rem;
    margin-bottom: 1.5rem;
}
.boxes{
    height: 6.2rem;
    margin-bottom: 0;
}
.projectBox>a{
	display: block;
}
.clickNext{
	width: 9.0666rem;
	height: 1.4rem;
	line-height: 1.4rem;
	display: block;
	text-decoration: none!important;
	border-bottom: 0.0133rem solid #e5e5e5;
	margin: 0 auto;
	color: #333333;

	font-size: 0.38rem;
}
.numPeople{
	font-size: 0.35rem;
	font-weight: normal;
	color: #999999;
	margin-left: 0.16rem;
}
.nextOne{
	background-image: url(../../../static/images/invest/projectdetail2.png),url(../../../static/images/home/moreicon.png);
    background-repeat: no-repeat;
		background-size: 0.65rem 0.65rem,0.2rem 0.3rem;
		background-position: 0 0.375rem,8.8rem 0.55rem;
		text-indent: 0.9rem;
}
.nextTwo{
	background-image: url(../../../static/images/invest/projectdetail1.png),url(../../../static/images/home/moreicon.png);
    background-repeat: no-repeat;
		background-size: 0.65rem 0.65rem,0.2rem 0.3rem;
		background-position: 0 0.375rem,8.8rem 0.55rem;
		text-indent: 0.9rem;
}
.nextThree{
	background-image: url(../../../static/images/invest/projectdetail3.png),url(../../../static/images/home/moreicon.png);
    background-repeat: no-repeat;
		background-size: 0.65rem 0.65rem,0.2rem 0.3rem;
		background-position: 0 0.375rem,8.8rem 0.55rem;
		text-indent: 0.9rem;
}

.nextFour{
	background-image: url(../../../static/images/invest/projectdetail4.png),url(../../../static/images/home/moreicon.png);
    background-repeat: no-repeat;
		background-size: 0.65rem 0.65rem,0.2rem 0.3rem;
		background-position: 0 0.375rem,8.8rem 0.55rem;
		text-indent: 0.9rem;
}
.nexts{
	border:0;
}
.packetsPop{
	width: 10rem;
	min-height:100%;
	background-color: #f4f4f4;
	position: absolute;
	top:0;
	left: 0;
	bottom: 0;
	right: 0;
	display: none;
}
.jiaxiCont{
	width: 10rem;
	min-height:100%;
	background-color: #f4f4f4;
	position: absolute;
	top:0;
	left: 0;
	bottom: 0;
	right: 0;
	display: none;
}
/*红包样式*/
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
	background-image: url(../../../static/images/invest/availablered.png);
	background-repeat: no-repeat;
	background-size: 100% 100%;
	margin-top: 0.2666rem;
	position: relative;
}
.notavailablered{
	width: 9.4666rem;
	height:2.5066rem;
	margin: 0 auto;
	background-image: url(../../../static/images/invest/notavailablered.png);
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
.redAmount>p>b{font-size: 36px;margin-left: 0.16rem;font-weight: normal;}
.canUse{
	font-size: 12px;
	color: #fff;
	width: 100%;
	height: 0.5333rem;
	text-indent: 0.3733rem;
	display: block;
	background-image: url(../../../static/images/invest/canuse.png);
	background-repeat: no-repeat;
	background-size: 0.32rem 0.32rem;
	background-position: 1.7066rem 0.0266rem;
}
.redMessage>p:nth-of-type(1){
	font-size: 15px;
	color: #fe492b;
	margin-bottom: 0.08rem;
	margin-left: 0.2666rem;
	padding-top: 0.1333rem;
}
.redMessage>p:nth-of-type(2){
	font-size: 9px;
	color: #888888;
	margin-left: 0.2666rem;
}
.numberTime{
	font-size: 12px;
	color: #888888;
	border-top: 1px solid #e5e5e5;
	width: 6.1333rem;
	margin: 0 auto;
	padding-top: 0.15rem;
	height:0.8rem;
	position: relative;
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
	background-image: url(../../../static/images/invest/cannotuse.png);
	background-repeat: no-repeat;
	background-size: 0.32rem 0.32rem;
	background-position: 1.7066rem 0.0266rem;
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
.jxBox{
	width: 1.28rem;
	height: 0.5866rem;
	text-align: center;
	line-height: 0.48rem;
	background-image:url(../../../static/images/invest/jiaxibox.png );
	background-size: 1.28rem 0.586rem;
	background-repeat: no-repeat;
	font-size: 0.3rem;
	color: #ff7319;
	position: absolute;
	top: 1.5rem;
    left: 3.2rem;
}
.m-content{
	position:relative;
	top: 0;
	bottom: 1.28rem;
    overflow: auto;
}

.redbags{
	background-image: url(../../../static/images/invest/walf.png), url(../../../static/images/home/moreicon.png);
	background-repeat: no-repeat;
	background-size: 0.6rem 0.6rem,0.2rem 0.3rem;
	background-position:0.2rem center, 8.8rem center;
	height: 1.25rem;
	line-height: 1.25rem;
	margin:0 0.3333rem;
	background-color: #fff;
	border-radius: 0.1333rem;
	font-size: 0.4rem;
}
.redbags-ge{
	display: inline-block;
	float: left;
	margin-left: 1.0rem;
}
.redbags-money{
	display: inline-block;
	float: right;
	margin-right: 0.5rem;
}
.redbags b{
	font-weight: normal;
	color: #ff7319;
	padding: 0 0.2rem;
}

</style>