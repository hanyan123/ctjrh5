<template>
	<div>
		<div class="content">
			<div class="nav_box">
				<div class="recharge_nav">
					<div :class="[classa,index===0?'active':'']" @click="selectWays(0)" tapmode><span>转账充值<img :src="imgUrl[0].img"></span></div>
					<div :class="[classa,index===1?'active':'']" @click="selectWays(1)" tapmode><span>快捷充值</span></div>
					<p class="line"></p>
				</div>
			</div>
			<div cla1ss="recharge_ways">
				<div class="marqueeshow" style="display:none">
					<div class="newshow" onclick="checkbank()" style="display:block">
						<span class="noticHorn"><img :src="imgUrl[1].img"></span>
						<a href="javascript:void(0);"><span class="noticeContent"><marquee behavior=scroll id="marqueetext"></marquee></span></a>
						<a href="javascript:void(0);" class="moreNotice" ></a>
					</div>
				</div>
				<div class="recharge_way recharge_way1" v-if="index===0">
					<div class="charges">
					    <a href="javascript:;" onclick="goFxhd()"><img :src="imgUrl[2].img"></a>
					</div>
					<div class="electronic_account">
						<p class="tip_line">
							您可以使用您【绑定的银行卡】向春天金融上饶银行专户转账，实现账户充值。建议转账方式包括：银行柜台转账、网银转账、手机银行转账。转账时所需填写信息如下：
						</p>
						<div class="electronic_num">
							<div class="bank_num" 
								v-clipboard:copy="idnum"
      							v-clipboard:success="onCopy"
      							v-clipboard:error="onError" 
      							idnum="207803020000015067" id="bank_num">
								2078 0302 0000 0150 67
								<div class="getNum">
									<span>复制</span>
								</div>
							</div>
							<div class="bank_owner">
								<div class="owner_name">
									<h3>账户名:<span>深圳前海阳睿互联网金融服务有限公司</span></h3>
									<h3>开户行:<span>上饶银行股份有限公司滨江支行</span></h3>
								</div>

							</div>
						</div>
						<div class="warm_tip">
							 <h3>充值说明：</h3>
							 <p>①用户转账充值只能使用存管账户绑定的银行账户进行充值；</p>
							 <p>②转账充值：转账充值务必转入“春天金融上饶银行存管专户”,存管专户将自动把转账金额分账至您的存管账户，资金一般实时到帐，最迟2小时内到账；
</p>
							 <p style="margin-bottom:1rem;">③附：<span style="text-decoration: underline;">银行资金存管专户证明函</span>。</p>
						</div>
					</div>
				</div>
				<div class="recharge_way recharge_way2" v-if="index===1">
					<div class="bind_card">
						<span class="bankicon">
							<img :src="bankInfo.bankLogo" id="bank_logo">
						</span>
						<div class="bank_info">
							<p class="card_num" id="cust_idnum">{{ bankInfo.bankName }} 尾号{{ bankInfo.cardId | toSubstring }}</p>
							<p class="bank_quota limit_money">快捷充值单笔限额<span style="color:#ff7319;">{{ moneyLimit.single }}万元</span>，单日限额<span style="color:#ff7319;">{{ moneyLimit.daily }}万元</span></p>
						</div>
					</div>
					<div class="money_input">
						<span class="unit"></span>
						<div class="input_num">
							<input type="tel" v-model="money" placeholder="请输入充值金额≥100元" onkeyup="value=value.replace(/[^\d]/g,'')" ng-pattern="/[^a-zA-Z]/" id="money"/>
						</div>
						<span class="check_quota">
							限额查询
						</span>
					</div>
					<!-- <p class="recharge_tip">充值正常2小时内到账，资金明细记录24小时内更新</p> -->
					<div class="recg_btn">
						<button @click="chongzhi()">确定</button>
					</div>
					<div class="recg_ques">
						<h3>温馨提示</h3>
						<dl class="ques_box">
							<dt>1.开通银行资金存管账户充值更安全、更快捷；</dt>
							<dd>2.为确保资金安全，请在充值之前先开通银行资金存管账户，并设置交易密码；</dd>
							<dd>3.充值手续费由春天金融为您全额支付，充值限额以各银行网上支付限额为准；</dd>
						</dl>
						<dl class="ques_box">
							<dt>4.快捷充值：由您绑定的银行卡充值到存管账户，实时到账；</dt>
							<dd>5.禁止洗钱、信用卡套现、虚假交易等行为，一经发现并确认，将终止该账户的使用；</dd>
						</dl>
						<dl class="ques_box">
							<dt>6.充值过程遇到问题时，请致电客服热线400-079-0080（周一到周日9:00-18:00）。</dt>
						</dl>
					</div>
				</div>

			</div>
		</div>
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
				cust_show:false,
				classa:"navlist",
				index:0,
				imgUrl:[
					{
						img:require('../../../static/images/wode/fanxian.png')
					},
					{
						img:require('../../../static/images/wode/bar.png')
					},
					{
						img:require('../../../static/images/wode/fanxianbanner.png')
					},
				],
				bankInfo:{},
				moneyLimit:{},
				idnum:"207803020000015067",
				money:"",
			}
		},
		components:{
			opencust
		},
		methods:{
			selectWays:function (index){
				this.index=index;
			},
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
					console.log(JSON.stringify(response.data));
					self.bankInfo = response.data.data.bankInfo;
					self.moneyLimit= response.data.data.moneyLimit;
				}).catch(function (error) {
					Indicator.close();
				});
	   		},
	   		onCopy:function (){
	   			Toast({
				  	message: "复制成功",
				  	//position: 'bottom',
				  	duration: 3000
				})
	   		},
	   		onError:function (){
	   			Toast({
				  	message: "复制失败",
				  	//position: 'bottom',
				  	duration: 3000
				})
	   		},
	   		//充值
	   		chongzhi:function(){
		   		Indicator.open();
	   			var self = this;
	   			var url = baseConfig.api+'gbank/userrechargequick';
		   		var p_token
		   		if(getToken()==null){
		   			p_token="";
		   		} else {
		   			 p_token = getToken().p_token;
		   		}
		   		var params = {
		   			p_token:p_token,
		   			version:baseConfig.version,
		   			money:this.money
		   		}
		   		this.axios.post(url, qs.stringify(params),{emulateJSON : true  //这行最关键。题外话：我们是选项体，也就是文档里的[options]
}).then(function (response) {
					Indicator.close();
					var res = response.data;
					if(res.status==500){
						Toast({
						  	message: res.data,
						  	position: 'bottom',
						  	duration: 3000,
						});
					} else if(res.status==502){
						showMessage(res.data,'温馨提示','设置',this.goChangeCardPwd)
					} else if(res.status==200){
						window.location.href = res.data.url
					}
				}).catch(function (error) {
					Indicator.close();
				});
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
				}).catch(function (error) {
					Indicator.close();
				});
		   },
		   updateMe (){
		   		this.cust_show=false;
		   }
		},
		created:function (){
			this.getData();
		},
		filters:{
	        toSubstring (value){
	        	return value.substring(value.length-4)
	        }
	    }
	}
</script>

<style scoped>
body,html{ margin: 0; padding: 0; width: 100%; height: 100%;background: #f5f5f5;}
h1,h2,h3{ margin: 0; padding: 0; list-style: none; font-style: normal; font-weight: normal;}
p{ margin: 0; padding: 0;}
input{ outline: none; margin: 0 ; padding: 0; border: none ; appearance: none; -webkit-appearance: none;}
dl,dt,dd{ margin: 0; padding: 0;}
.content{ width: 100%;padding-top: 1.2rem;}
.recharge_nav{ background: #FFFFFF; overflow: hidden; width: 100%;}
.recharge_nav .navlist{ display: block; width: 50%; float: left; text-align: center; font-size: 0.427rem; color:#666666; line-height: 1.133rem;}
.recharge_nav .navlist.active{ color: #FF7319;}
.recharge_nav .navlist span{ display: inline-block; box-sizing: border-box;line-height: 1.133rem;position: relative;}
.recharge_nav .navlist.active span{ border-bottom: 2px solid #ff7319;}
.nav_box{ position:fixed; top: 0; left: 0; width: 100%;}
.recharge_ways{ padding-top: 1.133rem;}
.recharge_way{ display: block;}
.recharge_way1{ display: block;}
.electronic_account{ padding: 0.3rem 0.4rem 0 0.4rem; }
.electronic_num{ width: 100%; height: 4.8rem; background: url(../../../static/images/wode/image/cardbg.png) no-repeat; background-size: 100% 100%;}
.bank_name{ overflow: hidden; padding: 0 0.32rem; padding-top: 0.32rem;}
.bank_who{ float: left ;}
.bank_logo{ float: left; width: 1.2rem; height: 1.2rem;}
.bank_logo img{ width:100% ; height: 100%;}
.name{ float: left; margin-left: 0.267rem;}
.name h3{ color: #FFFFFF; font-size: 0.48rem;}
.name p{ color: #fee2be; font-size: 0.32rem; margin-top: 0.12rem;}
.left_moeny{ float: right;color: #fee2be; font-size: 0.32rem; margin-top: 0.12rem;}
.bank_num{ color: #ffffff; font-size: 0.56rem; overflow: hidden; padding: 0 0.32rem;padding-top: 2rem;}
.bank_owner{ overflow: hidden; padding: 0 0.32rem; position: relative;}
.owner_name{ float: left; margin-top:0.56rem ;}
.owner_name h3{ font-size:0.32rem ; color: #fee2be;  margin-bottom: 0.2rem;}
.owner_name span{ color: #FFFFFF; }
.getNum{  float: right;}
.getNum span{ display: block;font-size: 0.32rem; background: #fbeedb; text-align: center; line-height:0.6rem ; width:1.4rem; border-radius: 0.1rem; color: #f08e49;}
.bank_tip{color: #999999; font-size: 0.32rem; margin-top: 0.2rem; margin-bottom: 0.2rem}
img{ display: block;}
.edu_steps{ width: 100%; margin-top: 0.667rem;}
.qes_title{padding: 0 0.4rem; background: #FFFFFF;}
.qes_title h3{ font-weight: normal; font-size:0.3733rem ; color: #666666; padding: 0 0.4rem 0 1.07rem; line-height: 1.4rem; border-bottom: 1px solid #dcdcdc;}
.qes_title1 h3{ background-image: url("../../../static/images/wode/image/zhi.png"),url("../../../static/images/wode/image/arrowown.png");    background-repeat: no-repeat;background-size: 0.7rem 0.7rem,0.2rem 0.14rem; background-position: 0.2rem center,8.8rem center;}
.qes_title2 h3{ background-image: url("../../../static/images/wode/image/phone.png"),url("../../../static/images/wode/image/arrowown.png");    background-repeat: no-repeat;background-size: 0.7rem 0.7rem,0.2rem 0.14rem; background-position: 0.2rem center,8.8rem center;}
.qes_title3 h3{ background-image: url("../../../static/images/wode/image/phone1.png"),url("../../../static/images/wode/image/arrowown.png");    background-repeat: no-repeat;background-size: 0.7rem 0.7rem,0.2rem 0.14rem; background-position: 0.2rem center,8.8rem center;}
.qes_content{ padding:0.32rem 1.47rem; color: #999999; font-size: 0.293rem; line-height: 0.48rem; display: none;}
.bind_card{ background:#FFFFFF; overflow: hidden; padding: 0.2rem 0.4rem; margin-top: 0.2rem;}
.bankicon{ float: left; display: block; width: 1rem; height: 1rem; margin-right: 0.26rem;}
.bankicon img{ width: 100%; height: 100%;}
.bank_info{ overflow: hidden;}
.card_num{ font-size: 0.4rem; color: #666666;}
.bank_quota{ color: #999999; font-size: 0.32rem; margin-top: 0.1rem;}
.money_input{ padding: 0 0.4rem; background: #FFFFFF; overflow: hidden; position: relative; height: 1.4rem;margin-top: 0.266rem;}
.unit{ display: block; width:0.4933rem ; height: 0.56rem; background: url(../../../static/images/wode/image/unit.png) no-repeat; background-size: 100% 100%; position: absolute; top: 0.42rem; left:0.58rem ;}
.input_num{ padding-left: 1.27rem; padding-right: 1.6rem; height: 1.4rem; line-height: 1.4rem;}
.input_num input{caret-color: red; display: block; height: 0.8rem; padding:0.3rem 0; font-size: 0.4rem; width: 100%;}
.input_num input.active{font-size: 0.66rem; color: #ff7319}
.check_quota{  color: #46cee7; font-size:0.347rem ; position: absolute; right: 0.4rem; top: 0.46rem; display: block; line-break: 0.48rem; }
.recharge_tip{ color: #999999; font-size: 0.347rem; margin-top: 0.48rem; padding-left: 0.4rem;}
.recg_btn{ width: 8.93rem; height:1.1333rem; margin: 0 auto; margin-top: 0.6rem;}
.recg_btn button{ display: block; height: 100%; width: 100%; border-radius:0.133rem ; border: none; outline: none; font-size: 0.48rem; color: #FFFFFF; background: #FF7319;}
.recg_btn button:disabled{
		background: #b2b2b2;
}
.recg_ques{ padding: 0 0.4rem;}
.recg_ques h3{ color: #333333; font-size: 0.347rem; margin-top: 0.6667rem; margin-bottom: 0.4rem;}
.ques_box dt,.ques_box dd{ font-size: 0.32rem; color: #999999; line-height:0.7rem ;}
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
.tip_line{
		color: #999999;
		font-size: 0.32rem;
		margin-top: 0.2rem;
		line-height: 0.7rem;
		margin-bottom: 0.4rem
}
.warm_tip{ margin-top: 0.6rem}
.warm_tip h3{ font-weight: normal; font-size: 0.4rem; color: #666666; margin-bottom: 0.2rem}
.warm_tip p{ font-size: 0.32rem;
margin-top: 0.2rem;
line-height: 0.7rem;
color: #999999
}

.recharge_nav .navlist span img {
    display: block;
    width: 0.72rem;
    height: 0.32rem;
    position: absolute;
    right: -0.8rem;
    top: 50%;
    margin-top: -0.16rem;
    z-index: 33233233323;
}
.charges {
    width: 94%;
    height: auto;
    margin-top: 0.2rem;
    margin-left: 3%;
}
.charges a img {
    width: 100%;
    height: 100%;
}

</style>