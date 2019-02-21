<template>
	<div>
		<div class="m-content">
			<div v-if="dataInfo.depoCustid==1">
				<div class="custName">
					<a href="javascript:void(0);">
						<span class="optionIcon"><img src="https://image.79jr.com/Public/v3/M/img/wode/depositorypeople.png"></span>
						<span class="optionFont">存管账户</span>
						<span class="messageShow">{{bankInfo.depoAcctno}}<!-- 尾号 2527 --></span>
						<span class="confirmRight"><img src="https://image.79jr.com/Public/v3/M/img/wode/rightjaio.png"></span>
					</a>
				</div>
				
				<div class="personInformate">
					<div class="informateBox btBorder">
						<span class="optionIcont"><img src="https://image.79jr.com/Public/v3/M/img/wode/safetysj.png"></span>
						<span class="optionFontt">手机号码</span>
						<span class="messageOther">{{userNanme}}</span>
					</div>
					<div class="informateBox btBorder">
						<span class="optionIcont"><img src="https://image.79jr.com/Public/v3/M/img/wode/namesafe.png"></span>
						<span class="optionFontt" v-if="dataInfo.isPerson==1">真实姓名</span>
						<span class="optionFontt" v-if="dataInfo.isPerson==0">企业名称</span>
						<span class="messageOther" v-if="dataInfo.isPerson==1">{{bankInfo.usrName}}</span>
						
					</div>
					<div class="informateBox btBorder">
						<span class="optionIcont"><img src="https://image.79jr.com/Public/v3/M/img/wode/depositoryshen.png"></span>
						<span class="optionFontt" v-if="dataInfo.isPerson==1">身份证号</span>
						<span class="optionFontt" v-if="dataInfo.isPerson==0">营业执照</span>
						<span class="messageOther">{{bankInfo.idNo}}</span>
					</div>
					<div class="informateBox">
						<span class="optionIcont"><img src="https://image.79jr.com/Public/v3/M/img/wode/depositorycard.png"></span>
						<span class="optionFontt">银行卡</span>
						<span class="messageOther bind_card_num" v-if="bankInfo.isBindCard==0">请先绑定银行卡</span>
						<span class="messageOther bind_card_num" v-if="bankInfo.isBindCard==1">{{bankInfo.bankName}} 尾号{{bankInfo.cardId.slice(-4)}}</span>
						<span class="unbind_card" v-if="bankInfo.isBindCard==0" @click="bindCard()">绑定</span>
						<span class="unbind_card" v-if="bankInfo.isBindCard==1" @click="ifcofirm()">解绑</span>
					</div>
				</div>
			</div>
			<div v-if="dataInfo.depoCustid==0">
				<div class="custName">
					<a href="javascript:void(0);">
						<span class="optionIcon"><img src="https://image.79jr.com/Public/v3/M/img/wode/depositorypeople.png"></span>
						<span class="optionFont">存管账户</span>
						<span class="messageShow" @click="kaihu()">开通存管<!-- 尾号 2527 --></span>
						<span class="confirmRight"><img src="https://image.79jr.com/Public/v3/M/img/wode/rightjaio.png"></span>
					</a>
				</div>
				
				<div class="personInformate">
					<div class="informateBox btBorder">
						<span class="optionIcont"><img src="https://image.79jr.com/Public/v3/M/img/wode/safetysj.png"></span>
						<span class="optionFontt">手机号码</span>
						<span class="messageOther">{{userNanme}}</span>
					</div>
					<div class="informateBox btBorder">
						<span class="optionIcont"><img src="https://image.79jr.com/Public/v3/M/img/wode/namesafe.png"></span>
						<span class="optionFontt" v-if="dataInfo.isPerson==1">真实姓名</span>
						<span class="optionFontt" v-if="dataInfo.isPerson==0">企业名称</span>
						<span class="messageOther" v-if="dataInfo.isPerson==1">未认证</span>
						
					</div>
					<div class="informateBox btBorder">
						<span class="optionIcont"><img src="https://image.79jr.com/Public/v3/M/img/wode/depositoryshen.png"></span>
						<span class="optionFontt" v-if="dataInfo.isPerson==1">身份证号</span>
						<span class="optionFontt" v-if="dataInfo.isPerson==0">营业执照</span>
						<span class="messageOther">未认证</span>
					</div>
					<div class="informateBox">
						<span class="optionIcont"><img src="https://image.79jr.com/Public/v3/M/img/wode/depositorycard.png"></span>
						<span class="optionFontt">银行卡</span>
						<span class="messageOther">未认证</span>
					</div>
				</div>
			</div>
			<div class="touzitest">
				<a href="javascript:;">
					<span class="optionIcon touzitesticon"><img src="https://image.79jr.com/Public/v3/M/img/wode/fengxian.png"></span>
					<span class="optionFont">出借风险评测</span>
					<span class="messageShow" v-if="dataInfo.assesstitle!=null">{{ dataInfo.assesstitle }}</span>					
					<span class="confirmRight">
						<img src="https://image.79jr.com/Public/v3/M/img/wode/rightjaio.png">
					</span>
				</a>
			</div>
			<div class="passbox">
				<div class="informateBox btBorder">
					<a href="/m/user/editpass">
						<span class="optionIcont"><img src="https://image.79jr.com/Public/v3/M/img/wode/safetymm.png"></span>
						<span class="optionFontt">修改登录密码</span>
						<span class="confirmRight"><img src="https://image.79jr.com/Public/v3/M/img/wode/rightjaio.png"></span>
					</a>
				</div>
				<div class="informateBox btBorder" id="passwdchange" @click="goChangeCardPwd()">
					<a href="javascript:void(0);">
						<span class="optionIcont"><img src="https://image.79jr.com/Public/v3/M/img/wode/safetyjy.png"></span>
						<span class="optionFontt">修改交易密码</span>
						<span class="confirmRight"><img src="https://image.79jr.com/Public/v3/M/img/wode/rightjaio.png"></span>
					</a>
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
	export default {
		data (){
			return {
				bankInfo:{},
				dataInfo:{},
				userNanme:"",
				cust_show:false
			}
		},
		components:{
			opencust
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
					self.dataInfo= response.data.data,
					self.userNanme = getToken().user_name.substr(0,3)+'****'+getToken().user_name.slice(-4);
					
				}).catch(function (error) {
					Indicator.close();
				});
	   		},
	   		kaihu:function (){
	   			this.cust_show=true;
	   		},
	   		updateMe:function (){
	   			this.cust_show=false;
	   		},
	   		//绑卡
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
					console.log(response.data);
					var res = response.data;
					if(res.status==200){
						window.location.href = res.data.url
					} else {
						Toast({
						  	message: res.data,
						  	position: 'bottom',
						  	duration: 5000
						});
					}
					
				}).catch(function (error) {
					Indicator.close();
				});
		   	},
		   	//绑卡
	   		unbindCard:function(){
		   		Indicator.open();
	   			var self = this;
	   			var url = baseConfig.api+'gbank/unbindcard';
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
					Toast({
					  	message: res.data,
					  	position: 'bottom',
					  	duration: 5000
					});
				}).catch(function (error) {
					Indicator.close();
				});
		    },
		    ifcofirm:function (){
		   		showMessage("确定要解绑吗？",'温馨提示',"解绑",this.unbindCard)
		    },
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
					console.log(response.data);
					var res = response.data;
					if(res.status==200){
						window.location.href = res.data.url
					}else {
						Toast({
						  	message: res.data,
						  	position: 'bottom',
						  	duration: 5000
						});
					}
				}).catch(function (error) {
					Indicator.close();
				});
		    }
		},
		created:function (){
			this.getData()
		}
	}
</script>

<style scoped="scoped">
.custName{
	width: 10rem;
	height: 1.4133rem;
	background-color: #fff;
	margin: 0 auto;
	margin-top: 0.4rem;
	position: relative;
}
.optionFont{
	width: auto;
	height:1.4133rem;
	line-height:1.4133rem;
	text-align: left;
	display:inline-block;
	color: #1a1a1a;
	margin-left:1.3866rem;
	font-size: 0.36rem;
}
.optionFontt{
	width: auto;
	height:1.4133rem;
	line-height:1.4133rem;
	text-align: left;
	display:inline-block;
	color: #1a1a1a;
	margin-left:1.04rem;
	font-size: 0.36rem;
}
.optionIcon{
	width: 0.64rem;
	height: 0.64rem;
	display: inline-block;
	position: absolute;
	left:0.3466rem;
	top:0.3866rem;
}
.optionIcont{
	width: 0.64rem;
	height: 0.64rem;
	display: inline-block;
	position: absolute;
	left:0;
	top:0.3866rem;
}
.optionIcon>img{width: 100%;height: 100%;}
.optionIcont>img{width: 100%;height: 100%;}
.confirmRight{
	width: 0.4266rem;
	height: 0.4266rem;
	display: inline-block;
	position: absolute;
	right:0.3466rem;
	top:0.48rem;
}
.confirmRight>img{
	width: 100%;
	height: 100%;
}
.messageShow{
	color: #666666;
	font-size: 0.36rem;
	height: 1.4133rem;
	line-height: 1.4133rem;
	display: block;
	position: absolute;
	right: 1.0933rem;
	top: 0;
}
.messageOther{
	color: #666666;
	font-size: 0.36rem;
	height: 1.4133rem;
	line-height: 1.4133rem;
	display: block;
	position: absolute;
	right: 0.7466rem;
	top: 0;
}
.bind_card_num{
	right: 1.7466rem;
}
.unbind_card,.rebind_card{
	color: #FF7319;
	font-size: 0.36rem;
	height: 1.4133rem;
	line-height: 1.4133rem;
	display: block;
	position: absolute;
	right: 0.7466rem;
	top: 0;
}
.personInformate{
	width: 10rem;
	/*height: 7rem;*/
	margin: 0 auto;
	background-color: #fff;
	margin-top: 0.2666rem;
}
.informateBox{
	width: 9.3333rem;
	height: 1.4rem;
	margin: 0 auto;
	position: relative;
}
.informateBox a{display: block;}
.btBorder {
    border-bottom: 0.0133rem solid #eeeeee;
}
.passbox{
	width: 10rem;
	height: 2.8rem;
	margin: 0 auto;
	background-color: #fff;
	margin-top: 0.2666rem;
}
.btnStyle{
	position: absolute;
	top:0.32rem;
	right:0.4rem;
}

.touzitest{
	width: 10rem;
	height: 1.4133rem;
	background-color: #fff;
	margin: 0 auto;
	margin-top: 0.4rem;
	position: relative;
}

.touzitesticon{
	width: 0.5rem;
	height: 0.5rem;
	display: inline-block;
	position: absolute;
	left:0.3466rem;
	top:0.455rem;
}                                                                                             
	
</style>