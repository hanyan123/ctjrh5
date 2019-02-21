<template>
	<div>
	<div class="m-content">
		<div class="marqueeshow" style="display:none">
			<div class="newshow" onclick="checkbank()" style="">
				<span class="noticHorn"><img :src="imgurl[0].img"></span>
				<a href="javascript:void(0);"><span class="noticeContent"><marquee behavior=scroll id="marqueetext"></marquee></span></a>
				<a href="javascript:void(0);" class="moreNotice" ></a>
			</div>
		</div>
		<div class="drawalsHeader">
			<div class="moengNum">
				<p id="balance_use" class="fontSpecial">{{ userInfo.withdraw_use }}</p>
				<p>当前可提现金额</p>
			</div>
		</div>
		<div class="rechargeBox">
			<div class="zhuanBank"><span>提现方式：</span>
				<b class="bankIcon"><img :src="bankInfo.bankLogo" id="bank_logo"/></b>
				<i id="bank_card">{{ bankInfo.bankName }} 尾号{{ bankInfo.cardId | toSubstring }}</i><em></em>
			</div>

			<div class="inputNum"><span>提现金额：</span>
				<input type="number" v-model="money" placeholder="请输入提现金额≥100元" value="" id="tx_money"/>
			</div>
			<div class="bankSelectbox" v-if="bankshow==0 && moeny>withdraw_union">
				<li class="right-icon" id="showCityPicker">
					<span class="leftText">开户城市：</span>
					<span class="depoCustid"  tapmode="" onclick="" id="cityResult" provid="" areaid="">选择开户城市</span>
					<em class="line"></em>
				</li>
				<li class="right-icon" id="">
					<span class="leftText">开户支行：</span>
					<span class="depoCustid" tapmode="" onclick="openBankList()" id="bankInfo" bankid="">选择开户银行</span>
					<em class="line"></em>
				</li>
			</div>
		</div>

		<div class="zhuanruButton" id="zhuanruButton" v-if="submitbtn==0"><span style="display:block; width:100%; height:100%;background:#d2d2d2">确&nbsp;&nbsp;&nbsp;认</span></div>
		<div class="zhuanruButton" id="zhuanruButton" @click="tixianTip()" v-if="submitbtn==1"><span style="display:block; width:100%; height:100%;background:#ff7319">确&nbsp;&nbsp;&nbsp;认</span></div>
		<p class="fontRemind widthDrawTip" style="color:#ff7319;margin:0.4rem 0.4rem 0 0.4rem;"></p>
		<p class="fontRemind tishi">提现说明：</p>
		<p class="fontRemind">	1、出借项目到期后提现手续费为2元/笔；</p>
		<p class="fontRemind">	2、充值未出借部分提现每笔收取0.5%手续费（最低2元/笔，最高100元/笔）；</p>

		<p class="fontRemind">3. 提现时效及限额如下：</p>
		<p class="fontRemind">①工作日提现实时到账，最迟2小时内到账，17:00后仅限单笔提现金额≤5万元；</p>
		<p class="fontRemind">②周末、法定节假日提现2小时内到账，全天限单笔提现金额＜50万元；</p>
		<p class="fontRemind"></p>
		<p class="fontRemind tishi">温馨提示：</p>
		<p class="fontRemind">①以上实际到账时间以各银行为准；</p>
		<p class="fontRemind">②单笔提现金额大于5万元时，需按提示输入您绑定的银行卡开户行信息，精确到支行名称；</p>
		<p class="fontRemind" style="margin-bottom:1rem">③工作日17:00后提现金额＞5万元以及周末、法定节假日单笔提现金额≥50万元将会出现提现失败，资金被冻结，2个工作日左右解冻后需重新提交提现申请，建议采用多笔小额提现。</p>
		<input type="hidden" value="0" id="fee">
	</div>

	<div class="maskbox" v-if="feeShow">
		<div class="mask">
			<div class="openbox">
				<h3>请仔细阅读提现规则：</h3>
				<div class="roles">
					<p>①工作日提现实时到账，最迟2小时内到账，17:00后仅限单笔提现金额≤5万元；</p>
					<p>②周末、法定节假日提现2小时内到账，全天限单笔提现金额＜50万元；</p>
				</div>
				<div class="rolesbtns">
					<span class="cancel" @click="cancel()">取消提现</span>
					<span class="surego" onclick="">确定提现</span>
				</div>
			</div>
		</div>
		<input type="hidden" id="xiane" value="">
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
				imgurl:[
					{
						img:require('../../../static/images/wode/bar.png')
					}
				],
				bankInfo:{},
				moneyLimit:{},
				userInfo:{},
				money:"",
				submitbtn:0,
				binkid:"",
				bankshow:0,
				fee:0,
				feeShow:false,
				withdraw_union:0
			}
		},
		methods:{
			getData:function (){
	   			Indicator.open();
	   			var self = this;
	   			var url = baseConfig.api+'gbank/bankinfo';
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
					//console.log(JSON.stringify(response.data));
					self.bankInfo = response.data.data.bankInfo;
					self.bankshow = response.data.data.bankInfo.isBindUnion;
					self.moneyLimit= response.data.data.moneyLimit;
				}).catch(function (error) {
					Indicator.close();
				});
	   		},
	   		//获取用户信息
	   		getUserInfo:function (){
	   			Indicator.open();
	   			var self = this;
	   			var url = baseConfig.api+'user/index';
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
					if(response.data.status==200){
						console.log(JSON.stringify(response.data));
						self.userInfo = response.data.data;
						self.withdraw_union = response.data.data.withdraw_union
					}
					
				}).catch(function (error) {
					Indicator.close();
				});
	   		},
	   		//提现执行
	   		tixian:function (){
	   			Indicator.open();
	   			var self = this;
	   			var url = baseConfig.api+'gbank/userwithdraw';
		   		var p_token
		   		if(getToken()==null){
		   			p_token="";
		   		} else {
		   			 p_token = getToken().p_token;
		   		}
		   		var params = {
		   			p_token:p_token,
		   			version:baseConfig.version,
		   			money:self.money,
		   			union_num:self.binkid
		   		}
		   		this.axios.post(url, qs.stringify(params),{emulateJSON : true  //这行最关键。题外话：我们是选项体，也就是文档里的[options]
}).then(function (response) {
					Indicator.close();
					var res = response.data;
					console.log(JSON.stringify(response.data));
					if(res.status==200){
						window.location.href=res.data.url;
					} else if(ret.status==502){
			            showMessage(res.data,'温馨提示','设置',self.goChangeCardPwd)
			        } else  {
			          self.money="";
			          Toast(ret.data);
			        }
				}).catch(function (error) {
					Indicator.close();
				});
	   		},
	   		tixianTip:function (){
	   			Indicator.open();
	   			var self = this;
	   			var url = baseConfig.api+'user/getWithdrawFee';
		   		var p_token
		   		if(getToken()==null){
		   			p_token="";
		   		} else {
		   			 p_token = getToken().p_token;
		   		}
		   		var params = {
		   			p_token:p_token,
		   			version:baseConfig.version,
		   			money:self.money,
		   		}
		   		this.axios.post(url, qs.stringify(params),{emulateJSON : true  //这行最关键。题外话：我们是选项体，也就是文档里的[options]
}).then(function (response) {
					Indicator.close();
					var res = response.data;
					//console.log(JSON.stringify(response.data));
					
					if(res.status==200){
						self.fee = res.data.fee;
						if(res.data.is_popup==0){
							if(self.fee!=0){
								showMessage("本次提现手续费"+self.fee,'温馨提示','确定',self.tixian)
							} else {
								self.tixian();
							}
							self.feeShow=false
						} else {
							self.feeShow=true
						}
					}
				}).catch(function (error) {
					Indicator.close();
				});
	   		},
	   		cancel:function (){
	   			this.feeShow=false;
	   		},
	   		//设置交易密码
		   	goChangeCardPwd:function(){
		   		Indicator.open();
	   			var self = this;
	   			var url = baseConfig.api+'gbank/passwdchange';
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
					//console.log(response.data);
				}).catch(function (error) {
					Indicator.close();
				});
		   	}
		},
		created:function (){
			this.getData();
			this.getUserInfo();
		},
		filters:{
	        toSubstring (value){
	        	return value.substring(value.length-4)
	        }
	    },
	    watch:{
	    	money (curVal,oldVal){
	    		//console.log(curVal)
	    		//console.log(parseFloat(this.userInfo.withdraw_use))
	    		if(curVal>=parseFloat(this.userInfo.withdraw_use)){
	    			this.money = this.userInfo.withdraw_use;
	    		}
	    		if(curVal>=100){
	    			this.submitbtn=1
	    		} else {
	    			this.submitbtn=0
	    		}
	    	}
	    }
	   
	}
</script>

<style scoped="scoped">
	
body,html{background-color: #f4f4f4;}
.marqueeshow{
	height: 1.147rem;
}
.newshow{
	width: 10rem;
	height: 1.147rem;
		margin: 0 auto;
		border-bottom: 1px solid #e5e5e5;
		position: relative;
		background-color: #fdfee9;
}
.noticeFont{
		width: 1.3333rem;
		height: 0.6666rem;
		display: block;
		font-size: 13px;
		color: #000;
		text-align: center;
		line-height: 0.6666rem;
		position: absolute;
		top: 0.1333rem;
		border-right: 0.0133rem solid #eeeeee;
		background-color: #fff;
		font-size: 0.34rem;
}
.noticHorn {
		display: block;
		width: 0.48rem;
		height: 0.48rem;
		position: absolute;
		top: 0.3335rem;
		left: 0.4rem;
}
.noticHorn>img {
		width: 100%;
		height: 100%;
}
.noticeContent {
		width: 75%;
		height: 0.6666rem;
		text-align: left;
		line-height: 0.6666rem;
		color: #ff844b;
		font-size: 0.34rem;
		position: absolute;
		top: 0.24rem;
		left: 1.2rem;
		font-size: 0.34rem;
}
.moreNotice {
		font-size: 0.34rem;
		display: block;
		color: #999999;
		width: 1.6rem;
		height: 0.6666rem;
		position: absolute;
		right: 0.4rem;
		top: 0.24rem;
		text-align: left;
		padding-left: 0.4rem;
		text-decoration: none!important;
		line-height: 0.6666rem;
		background: url(../../../static/images/wode/goinfo.png)  center right no-repeat;
		background-size: 0.16rem 0.227rem;
}
.drawalsHeader{
	width: 10rem;
	height: 3.8rem;
	margin: 0 auto;
	background: #ff7319;
	overflow: hidden;
}
.moengNum{
	width:auto;
	height:1.3333rem;
	text-align: center;
	margin-top: 1rem;
}
.moengNum>p:nth-of-type(1){
	font-size: 0.88rem;
	color: #fff;
	line-height: 1.2rem
}
.moengNum>p:nth-of-type(2){
	font-size: 0.3rem;
	color: #fdcbb1;
}
.rechargeBox{
	width: 10rem;
	height: auto;
	margin: 0 auto;
	background-color: #fff;
	margin-top: 0.2666rem;
	overflow: hidden;
}
.inputNum{
	width: 10rem;
	height: 1.3333rem;
	position: relative;
	border-top: 0.0133rem solid #e5e5e5;
	margin: 0 auto;
}
.inputNum>span{
	width:2.5333rem;
	height: 1.3333rem;
	display: inline-block;
	line-height: 1.3333rem;
	text-align: center;
	font-size: 0.37rem;
	color: #666666;
}
input::-webkit-input-placeholder {
	font-size: 0.37rem;
}
.inputNum input{
	height:1.0666rem;
	width:6.9333rem;
	display: block;
	/*line-height: 1.0666rem;*/
	border-style: none;
	font-size: 0.45rem;
	margin-left: 0.4rem;
	padding: 0.1rem 0 0 !important;
	margin-bottom: 0!important;
	caret-color:#ff7319;
	float: right;
}
.inputNum>input.active{
		color: #ff7319;
		font-size: 0.56rem;
}
.inputNum>span:nth-of-type(2){
	width: auto;
	height: 0.6666rem;
	line-height: 0.6666rem;
	color: #666666;
	font-size: 0.37rem;
	position: absolute;
	right: 0.5333rem;
	top: 0.3333rem;
	z-index:6666666
}
.inputNum>em{
	width: 1px;
	height: 0.8rem;
	background-color:#e5e5e5;
	display: block;
	position: absolute;
	top: 0.2666rem;
	left: 2.5333rem;
}
.zhuanBank{
	width: 10rem;
	height: 1.3333rem;
	border-top: 0.0133rem solid #e5e5e5;
	position:relative;
}
.zhuanBank>span{
	width: 2.5333rem;
	height: 1.3333rem;
	display: inline-block;
	line-height: 1.3333rem;
	text-align: center;
	font-size: 0.37rem;
	color: #666666;
}
.bankIcon{
	width:1.0666rem;
	height:1.0666rem;
	display:block;
	position: absolute;
	top: 0.1333rem;
	left:2.8rem;
}
.bankIcon>img{width: 100%;height: 100%;}
.zhuanBank>em{
	width: 1px;
	height: 0.8rem;
	background-color:#e5e5e5;
	display: block;
	position: absolute;
	top: 0.2666rem;
	left: 2.5333rem;
}
.zhuanBank>i{
	width: auto;
	height: 1.3333rem;
	line-height: 1.3333rem;
	font-style:normal;
	font-size: 0.37rem;
	display: inline-block;
	color: #666666;
	margin-left:1.5rem;
}
.zhuanruButton{
	width: 9.1733rem;
	height: 1.1466rem;
	text-align: center;
	line-height: 1.1466rem;
	color: #fff;
	background-color: #ff7319;
	border-radius: 0.1333rem;
	margin: 0 auto;
	margin-top: 0.8rem;
	font-size: 0.43rem;
	margin-bottom: 0.3rem;
}
.fontRemind{
	/*width: 9.3334rem;*/
	font-size: 0.26rem;
	color: #999999;
	padding-left:0.6666rem;
	padding-right:0.6666rem;
	text-align: justify;
	/* padding-top: 0.2666rem; */
	margin: 0 auto;
}
.dibu{
    margin-bottom: 1.5rem;
}
.tishi{
    font-weight: bold;
}
.colorPass{
	background-color:#fff;
	margin-top: 0.2666rem;
}
.moneyFont{
	border: 1px solid #ff7319;
	color: #ff7319!important;
	border-radius: 0.08rem;
	padding-left: 0.08rem;
	padding-right: 0.08rem;
}
.bankSelectbox{ display: none;}
		ul,li{ margin: 0;padding: 0; list-style: none;}
		.right-icon {
		    /* position: absolute; */
		    background-image: url(../../../static/images/wode/right.png);
		    background-repeat: no-repeat;
		    background-size: 0.65rem;
		    background-position: right center;
				height: 1.3333rem;
		    line-height: 1.3333rem;
		    border-top: 1px solid #eeeeee;
		    font-size: 0.37rem;
		    color: #666666;
		    position: relative;
		    overflow: hidden;
		}
		.depoCustid{
			float: right;
	    margin-right: 0.8rem;
	    font-size: 0.37rem;
	    color: #999999;
		}
	.leftText	{
		width: 2.5333rem;
    height: 1.3333rem;
    display: inline-block;
    line-height: 1.3333rem;
    text-align: center;
    font-size: 0.37rem;
    color: #666666;
		}
		.line{
			width: 1px;
    height: 0.8rem;
    background-color: #e5e5e5;
    display: block;
    position: absolute;
    top: 0.2666rem;
    left: 2.5333rem;
		}
.maskbox{ z-index: 6666666666;width: 100%; height: 100%; position: fixed; background: rgba(0,0,0,0.6); top: 0; left: 0}
.mask{ height:100%; width: 100%; position: relative;}
.openbox{ padding: 0.6rem 0;width: 70%; border-radius: 0.1rem; background: #ffffff; position: absolute; top: 50%; left: 50%; margin-left: -35%; transform: translateY(-50%); -webkit-transform: translateY(-50%)}
.openbox h3{ text-align: center; font-weight: normal; color: #333333; font-size: 0.44rem; margin-bottom: 0.4rem;}
.openbox p{ margin: 0; padding: 0; color: #666666; font-size: 0.32rem; line-height: 0.52rem; padding: 0 0.6rem;margin-bottom: 0.2rem;}
.openbox p span{ color: #ff7319;}
.rolesbtns{ width: 100%; overflow: hidden; margin-top: 0.8rem}
.rolesbtns span{ border-radius: 0.1rem;margin: 0 5%;display: block; float: left; width: 40%; height: 1rem; text-align: center; font-size: 0.32rem; line-height: 1rem; box-sizing: border-box;}
.cancel{ color: #ffffff; background: #ff7319;}
.surego{ color: #ff7319;border: 1px solid #ff7319;}
.fontSpecial{
	font-family: "special" !important;
}
</style>