<template>
	<div style="height:100%">
		<div class="m-content" style="height: 100%; background: #FFFFFF; padding-top: 0.2666rem;">
			<div class="loginBox">
				<div class="appearBox">
					<span class="appearIcon">
						<img src="https://image.79jr.com/Public/v3/M/img/wode/nameicon.png"></span>
					<input type="tel" name="username" maxlength="11" placeholder="请输入您的手机号" value="" id="mobile" v-model="username">
					<i></i>
				</div>
				<div class="messageyz">
					<span class="appearIcon">
						<img src="https://image.79jr.com/Public/v3/M/img/wode/lockicon.png"></span>
					<input type="password" name="password" placeholder="请输入登录密码" value="" id="password" class="passshow1" v-model="password">
					<i></i>
					<div class="eyes eyes1">
						<img src="https://image.79jr.com/Public/v3/M/img/wode/eyesoff.png" id="selecteyes1"></div>
				</div>
			</div>
			<div class="bigButton" @click="userLogin()">立即登录</div>
			<div class="register"><span><a href="/m/pub/regist">立即注册</a></span>|<span><a href="/m/pub/findpass">忘记密码</a></span></div>
		</div>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';
	import { baseConfig } from '../../../static/config.js';
	import { setToken } from '../../../static/common.js'
	var qs = require('qs');
	export default{
		data (){
			return {
				username:"18336325611",
				password:"123456",
				code:"",
			}
		},
		methods:{
			userLogin:function (){
				Indicator.open();
				var self = this;
				var param = {
					user_name:this.username,
					user_pass:this.password,
					version:baseConfig.version
				}
				var url = baseConfig.api+'pub/login/version/'+baseConfig.version
				this.axios.post(url, qs.stringify(param),{emulateJSON : true  //这行最关键。题外话：我们是选项体，也就是文档里的[options]
}).then(function (response) {
	Indicator.close();
					var res = response.data
					console.log(response.data);
					if(res.status==200){
						setToken(res.data)
						self.$router.push({path:'/wode'});
					}
				}).catch(function (error) {
					Indicator.close();
				　　 alert(error);
				});
			}
		}
	}
</script>

<style scoped="scoped">
body{background-color: #fff !important;}
.companyLogo{
	width:100%;
	height: auto;
	margin: 0 auto;
}
.companyLogo>img:nth-of-type(1){
	width: 9.9333rem;
	height: 3.3333rem;
	margin: 0 auto;
	display: block;
}
.companyLogo>img:nth-of-type(2){
	width:2.8rem;
	height:2.8rem;
	display: block;
	margin: 1rem auto;
}
.loginBox{
	width: 100%;
	height: auto;
	margin: 0 auto;
	margin-bottom: 0.8rem;
}
.appearBox{
	width: 8.5333rem;
	height: 1.3rem;
	border-bottom: 0.0133rem solid #eeeeee;
	border-radius:0.0533rem ;
	margin:0 auto 0.2666rem auto;
	position: relative;
}
.appearIcon{
	width: 0.64rem;
	height: 0.64rem;
	display: block;
	position: absolute;
	left:0.3733rem;
	top:0.32rem;
}
.appearIcon>img{
	width: 100%;
	height: 100%;
}
.appearBox>input{
	border:none;
	position: absolute;
	right: 0;
	top: 0;
	height: 100%;
	width: 84%;
	font-size: 0.48rem;
	margin-bottom: 0;
	color:#999999!important;
	padding: 0;
}
 ::-webkit-input-placeholder {/*Chrome/Safari*/
    color:#999999;
    }
.bigButton{
	width:8.5333rem;
	height: 1.3rem;
	border-radius:0.1066rem;
	background-color: #ff7319;
	color: #fff;
	text-align: center;
	line-height: 1.3rem;
	margin: 0 auto;
	font-size: 0.43rem;
}
.register {
    margin: 0 auto;
    text-align: center;
    font-size: 0.3rem;
    color: #666666;
    margin-bottom: 0.5333rem;
    margin-top: 0.5333rem;
}
.register span:first-child {
    margin-right:0.5333rem;
    cursor: pointer;
}
.register span:last-child {
    margin-left: 0.5333rem;
    cursor: pointer;
}
.register span>a{
	color: #666666;
}
.banben {
    text-align: center;
    color: #666666;
    font-size: 12px;
}
.messageyz{
	width:8.5333rem;
    height: 1.3rem;
    border-bottom: 0.0133rem solid #eeeeee;
    border-radius: 0.0533rem;
    margin: 0.2666rem auto;
    position: relative;	
}
.messageyz>input {
    border: none;
    position: absolute;
    right:24%;
    top: 0;
    height: 100%;
    width: 60%;
    font-size: 0.48rem;
    margin-bottom: 0;
    color: #999999!important;
    padding: 0;
}
.eyes{
	width: 0.64rem;
	height: 0.64rem;
	position: absolute;
	right: 0;
	top: 0.2666rem;
}
.eyes>img{width: 100%;height: 100%;}
.appearBox>i{
	width:0.0266rem;
	height:0.5333rem;
	display: block;
	background-color:#d2d2d2;
	position: absolute;
	top:0.37rem;
	left:1.1rem;
}
.messageyz>i{
	width:0.0266rem;
	height:0.5333rem;
	display: block;
	background-color:#d2d2d2;
	position: absolute;
	top:0.37rem;
	left:1.1rem;
}
::-webkit-input-placeholder{
    font-size: 0.36rem;
}
</style>