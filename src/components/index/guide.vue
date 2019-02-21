<template>
	<div>
		<div class='noviceHeade'><img src="https://www.79jr.com/Public/v3/M/img/home/newones.jpg?20180601"/></div>
		<div class="noviceOne">
		    <img src="https://www.79jr.com/Public/v3/M/img/home/newtwo.jpg?20180116"/>
		   <a class="cunguan" id="recieve"></a>
		</div>
		<div class="noviceTwo">
		    <img src="https://www.79jr.com/Public/v3/M/img/home/newthr.jpg?20180320"/>
		    <router-link class="touone" :to="{path:'/invest'}"></router-link>
		    <router-link class="toutwo" :to="{path:'/invest'}"></router-link>
		    <!-- <a class="touthr" href="http://www.79jr.com/m/index/invest.html"></a> -->
		    		</div>
		<div class="noviceThree"><img src="https://www.79jr.com/Public/v3/M/img/home/newfou.jpg"/></div>
		<div class="question">
		    <div class="quest">
		    	<ul>
					<li @click="showP(0)">
					   <span>1、如何开通银行存管？</span>
	                   <p class="quzi" v-if="showMe==0">
	                    ①点击“开通上饶银行资金银行存管”的弹窗提醒<br>
						②点击“立即开通”，按要求填写相关资料以及填写手机号（须为银行预留手机号）<br>
						③点击“提交”，系统会跳转到上饶银行页面，设置上饶银行登录密码、交易密码，即完成开户。（PC端、APP端、WAP端均可完成开户）
						温馨提醒：<br>
						① 姓名、身份证号、手机号、银行卡号四要素信息须完全匹配方可开户；<br>
						② 开户过程中出现任何问题请致电客服热线 400-079-0080或客服手机171-5081-9999、171-5081-7777咨询处理，或者联系在线客服进行解决。
					   </p>
					</li>
					<li @click="showP(1)">
					   <span>2、存管版提现多久到账？</span>
					   <p class="quzi" v-if="showMe==1">
					        ①工作日0:10-17:00，单笔提现金额大于5万元，正常情况下实时到账，额度无上限；小于等于5万元，最迟2小时内到账；<br>
					        ②工作日17:00- 0:10，单笔提现金额小于等于5万，正常情况下实时到账；单笔大于5万，将会提现失败资金被冻结，两个工作日左右解冻后需重新提交提现申请；<br/>
                            ③周末和法定节假日，单笔金额小于50万元，正常情况下两小时内到账；大于等于50万，将会提现失败资金被冻结，两个工作日左右解冻后需重新提交提现申请；若有紧急需要，可采用多笔小额提现。<br/>
                            温馨提示：<br/>
                            ①以上实际到账时间以各银行为准；<br/>
                            ②单笔提现金额大于5万元时，需按提示输入您绑定的银行卡开户行信息，精确到支行名称。
					   </p>
					</li>
					<li @click="showP(2)">
					   <span>3、出借后什么时候开始计算收益？</span>
					   <p class="quzi" v-if="showMe==2">满标复审后当日计息。</p>
					</li>
				</ul>
		    </div>				
		</div>
		<div class="novicefou"><img src="https://www.79jr.com/Public/v3/M/img/home/newfiv.jpg?20180322"/></div>
	</div>
</template>

<script>
	export default {
		data (){
			return {
				showMe:0,
			}
		},
		methods:{
			showP:function (index){
				this.showMe=index;
				console.log(this.showMe)
			}
		}
	}
</script>

<style scoped="scoped">
	img{ display:block}
.noviceHeade{
	width: 10rem;
	height: 6.4rem;
	margin: 0 auto;
}
.noviceOne{
	width: 10rem;
	height: 6.03rem;
	margin: 0 auto;
	position: relative;
}
.noviceTwo{
	width: 10rem;
	
	margin: 0 auto;
	position: relative;
}
.noviceTwo .touone{
    width: 2.95rem;
    height: 0.96rem;
    position: absolute;
    top: 2.28rem;
    right: 0.9rem;
}
.noviceTwo .toutwo{
    width: 2.95rem;
    height: 0.96rem;
    position: absolute;
    top: 4.88rem;
    right: 0.9rem;
}
.noviceTwo .touthr{
    width: 2.95rem;
    height: 0.96rem;
    position: absolute;
    top: 7.78rem;
    right: 0.9rem;
}
.noviceThree{
	width: 10rem;
	height: 6.55rem;
	margin: 0 auto;
	position: relative;
}
.novicefou{
	width: 10rem;
	height: 3.9rem;
	margin: 0 auto;
	position: relative;
	top: -0.001rem;
}
.question{
	width: 10rem;
	height: auto;
	background: #ffbf94;
	position: relative;
    margin: 0 auto;
	/* background: url(../../img/home/bges.jpg);
	background-repeat: repeat-y;
	background-size: 10rem; 
	padding: 0.01rem 0;*/
}
.quest{
	width: 9.42rem;
	height: auto;
	margin: 0 auto;
	background: #f95659;
}
.question ul{
	width: 9.0rem;
	height: auto;
	margin: 0 auto;
}
.question ul li{
	font-size: 0.35rem;
	border-bottom: 0.01rem solid #fff;
	color: #fff;
	padding: 0.1rem 0;
}
.question ul li .quzi{
    font-size: 0.32rem;
    color: #feb9ba;
    line-height: 0.5rem;
    padding: 0.1rem 0;
}
.question ul li .show{
	display: block;
}
.noviceHeade>img{width: 100%;height: 100%;}
.noviceOne>img{width: 100%;height: 100%;}
.noviceOne a{
    position: absolute;
    top: 2.455rem;
    left: 2.58rem;
    width: 4.82rem;
    height: 1rem;
    border-radius: 0.5rem;
}
.noviceTwo>img{width: 100%;height: 100%;}
.noviceThree>img{width: 100%;height: 100%;}
.novicefou>img{width: 100%;height: 100%;}
.clickButton{
	display: block;
	width:9.4rem;
	font-size: 0.48rem;
	text-align: center;
	line-height: 1.2rem;
	height: 1.2rem;
	color: #fff;
    border-radius: 0.1rem;
	background: #ff7139;
	position: relative;
	margin: 0.2rem auto;
	text-decoration: none;
}
</style>