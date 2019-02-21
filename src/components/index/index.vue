<template>
	<div style="padding-bottom: 1.5rem;">
		<swiper :bannerList="imgs"></swiper>
		<div class="notice">
			<span class="noticeFont">通知</span>
			<div class="noticHorn">
				<img src="https://image.79jr.com/Public/v3/M/img/home/homehorn.png">
			</div>
			<div class="title">
				<span class="noticeContent">关于阿里云服务器异常…</span>
			</div>
			<span class="more" @click="showme">
				更多>>
			</span>
		</div>
		<div class="barTopFunction">
			<router-link :to="{path:'/guide'}" class="functionOne">
				<span class="functionIcon"><img src="https://image.79jr.com/Public/v3/M/img/home/xinshou.png"></span>
				<p>新手福利</p>
			</router-link>
			<a href="http://srtest.79jr.com/m/about/safety" class="functionTwo">
				<span class="functionIcon"><img src="https://image.79jr.com/Public/v3/M/img/home/safepro.png"></span>
				<p>安全保障</p>
			</a>
			<a href="" class="functionThree">
				<span class="functionIcon"><img src="https://image.79jr.com/Public/v3/M/img/home/yaoqing.png"></span>
				<p>邀请赚钱</p>
			</a>
			<a href="" class="functionFour">
				<span class="functionIcon"><img src="https://image.79jr.com/Public/v3/M/img/home/msgshow.png"></span>
				<p>信息披露</p>
			</a>
		</div>
		<div class="newb">
			<div class="MarkTitle">
				<span class="topIcon"><img src="https://image.79jr.com/Public/v3/M/img/home/markx.png"></span>
				<span class="nameMark">新手专属标</span>
				<span class="conditionMark">限投3次</span>
			</div>
			<div class="listitems">
				<a href="" class="jumpNext" v-for="item in b_new" >
					<router-link :to="{path:'/detail/'+item.bid}" tag="span">
					<div class="markName">{{ item.borrow_name }}<span class="small">单笔限投3万 累计可投9万</span></div>
					<div class="standardDatas">
						<em></em>
					    <span>
					    	<p class="highlightcolor">
					    		<b>{{ item.borrow_interest_rate | toInt}}</b>
					    		<span>%</span>
					    		<span v-if="item.reward_rate">+{{ item.reward_rate | toInt}}%</span>
					    	</p>
					    	<p>借款约定年化利率
					    	</p>
					    </span>
						<span class="dataMoeny">
							<p>期限<b class="lrdistance"><span>{{ item.borrow_duration | toInt }}</span></b>个月</p>
							<p>总额
								<b class="lrdistance">
									<b>
										<span class="money">{{ item.borrow_money | toInt }}</span>
									</b>万
								</b>
							</p>
							<b class="lrdistance"></b>
						</span>
						<div class="markComplete" v-if="item.borrow_status==7"><img src="http://images.79jr.com/Public/v3/M/img/list/complete.jpg"></div>
			            <div class="markRepay" v-else-if="item.borrow_status==6">
			            	<img src="https://image.79jr.com/Public/v3/M/img/list/repayment.png">
			            </div>  
						<b class="lrdistance circlepress" v-else>
							<div class="container" id="" v-bind:data="parseFloat(item.progress)/100">
								<circleprogress :progressnum="parseFloat(item.progress)/100"></circleprogress>
							</div>
						</b>
					</div>
					<b class="lrdistance">
					</b>
					</router-link>
				</a>
			</div>
		</div>
		<div class="newb">
			<div class="MarkTitle">
				<span class="topIcon"><img src="https://image.79jr.com/Public/v3/M/img/home/markj.png"></span>
				<span class="nameMark">推荐标</span>
				<!--<span class="conditionMark">限投3次</span>-->
			</div>
			<div class="listitems">
				<a href="" class="jumpNext" v-for="item in b_tj">
					<router-link :to="{path:'/detail/'+item.bid}" tag="span">
					<div class="markName" v-html="item.borrow_name"></div>
					<div class="standardDatas">
						<em></em>
					    <span>
					    	<p class="highlightcolor">
					    		<b v-html="parseFloat(item.borrow_interest_rate)"></b>
					    		<span>%</span>
					    		<span v-if="parseFloat(item.reward_rate)!=0">+{{ item.reward_rate | toInt}}%</span>
					    	</p>
					    	<p>借款约定年化利率
					    	</p>
					    </span>
						<span class="dataMoeny">
							<p>期限<b class="lrdistance"><span><span class="money">{{ item.borrow_duration | toInt }}</span></span></b>个月</p>
							<p>总额
								<b class="lrdistance">
									<b>
										<span class="money">{{ item.borrow_money | toInt }}</span>
									</b>万
								</b>
							</p>
							<b class="lrdistance"></b>
						</span>
						<div class="markComplete" v-if="item.borrow_status==7"><img src="http://images.79jr.com/Public/v3/M/img/list/complete.jpg"></div>
			            <div class="markRepay" v-else-if="item.borrow_status==6">
			            	<img src="https://image.79jr.com/Public/v3/M/img/list/repayment.png">
			            </div>  
						
						<b class="lrdistance circlepress" v-else>
							<div class="container" id="">
								<circleprogress :progressnum="parseInt(item.progress)/100"></circleprogress>
							</div>
						</b>
					</div>
					<b class="lrdistance">
					</b>
					</router-link>
				</a>
			</div>
		</div>
		<alert :showalert="shows" @closeme='close'></alert>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';
	import swiper from '../comm/swiper'
	import { getToken } from '../../../static/common.js'
	import circleprogress from '../comm/circleprogress'
	import alert from '../comm/alert'
	export default {
		data (){
			return{
				imgs:[],
				activity:[],
				b_new:[],
				b_tj:[],
				news:"",
				news_url:'',
				statis:{},
				shows:false
			}
		},
		components:{
			swiper,
			circleprogress,
			alert
		},
		methods:{
			getBanner:function (){
				this.axios.get("/api/p/index/banner/version/2.2.0").then((response) => 				{
				  	this.imgs = response.data.data.banner
				});
			},
			getData:function (){
				//Indicator.open();
				var p_token="";
				console.log(getToken())
				if(getToken()==null){
					p_token="";
				} else {
					p_token=getToken().p_token;
				}
				console.log(p_token)
				this.axios.get("/api/p/index/index/version/2.3.0/p_token/"+p_token).then((response) => 				{
					Indicator.close();
					console.log(response.data.data);
					this.activity = response.data.data.activity
					this.b_new = response.data.data.b_new
					this.b_tj = response.data.data.b_tj;
					this.news = response.data.data.news
					this.news_url = response.data.data.news_url
					this.statis = response.data.data.statis
				});
			},
			close(data){
				this.shows=false
			},
			showme(){
				this.shows=true
			}
		},
		created:function (){
			//this.getBanner();
			
			//动态添加路由
			//this.$router.addRoutes(this.routers)
			//this.$router.push({path:'/bill3'});
			
		},
		mounted(){
			this.getData();
			this.getBanner();
			//this.addInterceptors()
		},
		filters:{
	        toInt(value){//ES6语法
	            return parseFloat(value)
	        }
	    }
	}
</script>

<style>
	.newb{ background: #FFFFFF; margin-top: 0.2rem;}
	.notice{ overflow: hidden; width: 100%; border-bottom: 1px solid #EEEEEE;background: #FFFFFF;}
	.noticeFont{ display: block; width: 1.2rem; font-size: 0.32rem; text-align: center; float: left; line-height: 1rem;}
	.noticHorn{
		float: left;
		height: 1rem;
		width: 1rem;
		
	}
	
	.noticHorn img{ width: 0.48rem; height: 0.48rem; margin-top: 0.26rem; margin-left: 0.26rem;}
	.title{ width: 5.6rem; color: #666666; font-size: 0.32rem; line-height: 1rem; float: left;}
	.more{display: block; width: 2.2rem; font-size: 0.32rem; text-align: center; float: left; line-height: 1rem;}
	.barTopFunction {
	    width: 100%;
	    height: 2.1333rem;
	    margin: 0 auto;
	    background-color: #fff;
	    position: relative;
	}
	.barTopFunction a {
	    width: 25%;
	    height: 2.1333rem;
	    display: block;
	    text-align: center;
	    color: #1a1a1a;
	    text-decoration: none!important;
	    font-size: 0.35rem;
	    float: left;
	    margin-top: 0.22rem;
	}
	.functionIcon {
	    display: block;
	    width: 1.0666rem;
	    height: 1.0666rem;
	    margin: 0 auto;
	}
	.functionIcon img{ width: 100%;}
	
	.MarkTitle {
	    width: 100%;
	    height: 1.0133rem;
	    border-bottom: 0.0133rem solid #eeeeee;
	    position: relative;
	}
	.topIcon {
	    width: 0.5333rem;
	    height: 0.6666rem;
	    display: inline-block;
	    position: absolute;
	    left: 0.4rem;
	}
	.nameMark {
	    width: auto;
	    height: 1.0133rem;
	    text-align: left;
	    line-height: 1.0133rem;
	    display: block;
	    color: #1a1a1a;
	    font-size: 0.4rem;
	    position: absolute;
	    left: 1.3333rem;
	}
	.circlepress{
		width: 1.3333rem;
	    height: 1.3333rem;
	    position: absolute;
	    font-size: 11px;
	    right: 0.6133rem;
	    top: 0.4rem;
	}
.conditionMark {
    width: auto;
    height: 1.0133rem;
    text-align: right;
    line-height: 1.0133rem;
    color: #fe893e;
    font-size: 0.32rem;
    display: block;
    position: absolute;
    right: 0.4rem;
}
.topIcon>img {
    width: 100%;
    height: 100%;
}

.experienceMark{
	font-weight: normal;
	width: 100%;
	height: auto;
	margin: 0 auto;
	margin-top:0.2666rem;
	background-color: #fff;
}
.eBottom{
	border-bottom: 1.36rem solid #f5f5f5;
}
.MarkTitle{
	width: 100%;
	height: 1.0133rem;
	border-bottom: 0.0133rem solid #eeeeee;
	position: relative;
}
.topIcon{
	width: 0.5333rem;
	height: 0.6666rem;
	display: inline-block;
	position: absolute;
	left: 0.4rem;
}
.topIcon>img{width: 100%;height: 100%;}
.nameMark{
	width: auto;
	height: 1.0133rem;
	text-align: left;
	line-height: 1.0133rem;
	display: block;
	color: #1a1a1a;
	font-size: 0.4rem;
	position: absolute;
	left: 1.3333rem;
}
[data-dpr="2"] .nameMark{
	font-size: 0.4rem;
}
[data-dpr="3"] .nameMark{
	font-size: 0.4rem;
}
.conditionMark{
	width: auto;
	height: 1.0133rem;
	text-align: right;
	line-height: 1.0133rem;
	color: #fe893e;
	font-size: 12px;
	display: block;
	position: absolute;
	right: 0.4rem;
}
[data-dpr="2"] .conditionMark{
	font-size: 0.3rem;
}
[data-dpr="3"] .conditionMark{
	font-size: 0.3rem;
}
.standardDatas{
	width: 94%;
    height: auto;
    margin: 0 auto;
    padding-top: 0.4rem;
    position: relative;
    height: 2rem;
}
.standardDatas>span{
	display: block;
    /*float: left;*/
   position: absolute;
}
.standardDatas>em{
    height: 0.9rem;
    width: 1px;
    background: #eee;
    display: block;
    position: absolute;
    top: 0.85rem;
    left: 3.85rem;
}
.standardDatas>span:nth-of-type(1){
    left: 0.5rem;
    /*width:3rem*/
}
.standardDatas>span:nth-of-type(2){
    left: 4rem;
}
.standardDatas>span>p:nth-of-type(1){
	font-size: 12px;
    color: #888888;
    margin-bottom: 0;
}
[data-dpr="2"] .standardDatas>span>p:nth-of-type(1){
    font-size: 0.3rem;
}
[data-dpr="3"] .standardDatas>span>p:nth-of-type(1){
    font-size: 0.3rem;
}
.standardDatas>span>p:nth-of-type(2){
	font-size: 11px;
    color: #888888;
    margin-top:0.2rem;
    letter-spacing:0.0133rem;
}
[data-dpr="2"] .standardDatas>span>p:nth-of-type(2){
    font-size: 0.3rem;
}
[data-dpr="3"] .standardDatas>span>p:nth-of-type(2){
    font-size: 0.3rem;
}
.standardDatas>span>p:nth-of-type(1)>b{
	font-weight: normal;
    font-size: 0.7rem;
}
[data-dpr="2"] .standardDatas>span>p:nth-of-type(1)>b{
    font-size: 0.7rem;
}
[data-dpr="3"] .standardDatas>span>p:nth-of-type(1)>b{
    font-size: 0.7rem;
}
.highlightcolor {
    color: #ff7319!important;
}
.highlightcolor span{
	font-size: 0.38rem;
}
.dataDay{
	margin-left: 0.6133rem;
}
.dataMoeny{
	margin-left: 0.6133rem;
}
.dataMoeny .lrdistance{
	font-weight: normal;
}
.dataMoeny .lrdistance span{
	margin-left: 0.15rem;
}
.dataMoeny .lrdistance span.money{
	font-weight: normal;
    font-size: 0.32rem;
}
.container{
	width: 1.3333rem;
	height: 1.3333rem;
	font-size: 11px;
	
}
[data-dpr="2"] .container{
    font-size: 22px;
}
[data-dpr="3"] .container{
    font-size: 33px;
}
.markIcon{
	width: 0.6133rem;
	height: 0.6133rem;
	display: inline-block;
	position: absolute;
	top: 0.2rem;
	left: -0.8rem;
}
.markIcon>img{width: 100%;height: 100%;}
.markComplete{
    width: 1.3333rem;
    height: 1.3333rem;
    position: absolute;
    right: 0.6133rem;
    top: 0.4rem;
}
.markComplete>img{width: 100%;height: 100%;}
.markRepay{
    width: 1.3333rem;
    height: 1.3333rem;
    position: absolute;
    right: 0.6133rem;
    top: 0.4rem;
}
.markRepay>img{width: 100%;height: 100%;}
.markName{
	color:#1a1a1a;
	margin-left:0.5rem;
	font-size:0.36rem;
	margin-top: 0.2666rem;
	font-weight: normal;
}
.small {
    font-size: 0.26rem;
    color: #ff7139;
    font-weight: normal;
    border: 1px solid #fe7c28;
    background: #fef6f3;
    padding: 0.05rem 0.1rem;
    position: relative;
    left: 0.15rem;
    border-radius: 0.05rem;
}
</style>