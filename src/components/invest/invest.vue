<template>
	<div>
		<div class="morelist" style="height:auto;margin-bottom:1.8rem;" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="50" infinite-scroll-immediate-check="true">
  			<div class="labelList" v-for="item in now_list">
				<router-link  class="jumpNext" :to="{path:'/detail/'+item.id}">
					<div class="designerName">
						<span class="markIcon newl" v-if="item.borrow_sys_type==0">新</span>
			            <span class="markIcon che" v-else-if="item.borrow_sys_type==1">车</span>
			            <span class="markIcon fang" v-else-if="item.borrow_sys_type==2">房</span>
			            <span class="markIcon qi" v-else-if="item.borrow_sys_type==3">企</span>
			            <span class="markIcon ti" v-else-if="item.borrow_sys_type==4">农</span>
			            <span class="markIcon xin" v-else-if="item.borrow_sys_type==5">信</span>
			            <span class="markIcon xin" v-else>{{ item.borrow_name | toSubstring }}</span>
			            <span class="designerTitle" v-html="item.borrow_name"></span>
					</div>
					<div class="standardData">
						<em></em>
						<span>
							<p class="highlightcolor"><b class="fontSpecial">{{ item.borrow_interest_rate }}</b><span>%</span>
								<span class="fontSpecial">+{{ item.reward_num }}%</span>
							</p>
							<p>借款约定年化利率</p>
						</span>
						<span class="dataMoeny">
							<p>期限<b class="lrdistance"><span class="fontSpecial">{{ item.borrow_duration }}</span></b>{{ item.borrow_unit }}</p>
							<p>总额<b class="lrdistance"><span class="money fontSpecial">{{ item.borrow_money }}</span></b>{{item.money_unit}}</p>
						</span>
					</div>
					<div class="markComplete" v-if="item.borrow_status==7"><img src="http://images.79jr.com/Public/v3/M/img/list/complete.jpg"></div>
		            <div class="markRepay" v-else-if="item.borrow_status==6">
		            	<img src="https://image.79jr.com/Public/v3/M/img/list/repayment.png">
		            </div>  
		            <div class="markRepay" v-else-if="item.borrow_status==2">
		            	<circleprogress :progressnum="item.speed"></circleprogress>
		            </div>
				</router-link>
			</div>
			<div class="line_box" v-if="isShow">
				<span class="line"></span>
				<span class="line_text">已售罄项目</span>
			</div>
			<div class="labelList" v-for="item in over_list">
				<router-link  class="jumpNext" :to="{path:'/detail/'+item.id}">
					<div class="designerName">
						<span class="markIcon newl" v-if="item.borrow_sys_type==0">新</span>
			            <span class="markIcon che" v-else-if="item.borrow_sys_type==1">车</span>
			            <span class="markIcon fang" v-else-if="item.borrow_sys_type==2">房</span>
			            <span class="markIcon qi" v-else-if="item.borrow_sys_type==3">企</span>
			            <span class="markIcon ti" v-else-if="item.borrow_sys_type==4">农</span>
			            <span class="markIcon xin" v-else-if="item.borrow_sys_type==5">信</span>
			            <span class="markIcon xin" v-else>{{ item.borrow_name | toSubstring }}</span>
			            <span class="designerTitle" v-html="item.borrow_name"></span>
					</div>
					<div class="standardData">
						<em></em>
						<span><p class="highlightcolor"><b class="fontSpecial">{{ item.borrow_interest_rate }}</b><span>%</span>
								<span class="fontSpecial">+{{ item.reward_num }}%</span>
								</p><p>借款约定年化利率</p>
						</span>
						<span class="dataMoeny">
							<p>期限<b class="lrdistance"><span class="fontSpecial">{{ item.borrow_duration }}</span></b>{{ item.borrow_unit }}</p>
							<p>总额<b class="lrdistance"><span class="money fontSpecial">{{ item.borrow_money }}</span></b>{{item.money_unit}}</p>
						</span>
					</div>
					
					<div class="markComplete" v-if="item.borrow_status==7"><img src="https://image.79jr.com/Public/v3/M/img/list/complete.png"></div>
		            <div class="markRepay" v-else-if="item.borrow_status==6">
		            	<img src="https://image.79jr.com/Public/v3/M/img/list/repayment.png">
		            </div>
		            <div class="markRepay" v-else-if="item.borrow_status==4">
		            	<img src="https://image.79jr.com/Public/v3/M/img/list/verify2.png">
		            </div>
		            <div class="markRepay" v-else-if="item.borrow_status==2">
		            	<circleprogress :progressnum="item.speed"></circleprogress>
		            </div>
				</router-link>
			</div>
		</div>
	</div>	
</template>

<script>
	
	import { Indicator } from 'mint-ui';
	import { InfiniteScroll } from 'mint-ui';
	import { getToken } from '../../../static/common.js'
	import circleprogress from '../comm/circleprogress'
	export default{
		data (){
			return {
				p:1,
				loading:false,
				now_list:[],
				over_list:[],
				isShow:false,
			}
		},
		components:{
			circleprogress
		},
		methods:{
			getData:function (){
				Indicator.open();
				var p_token="";
				console.log(getToken())
				if(getToken()==null){
					p_token="";
				} else {
					p_token=getToken().p_token;
				}
				var url = "/api/p/index/getInvest/version/2.3.0/p/"+this.p+"/p_token/"+p_token;
				this.axios.get(url).then((response) => 				{
					var res = response.data;
					this.loading = false;
					this.isShow=true;
					Indicator.close();
					this.now_list = res.data.now_list;
					this.over_list = this.over_list.concat(res.data.over_list);
					this.p += 1;
					console.log(res);
				});
			},
			loadMore() {
				this.loading = true;
			  	this.getData();
			}
		},
		created:function (){
			this.getData();
			//this.$router.addRoutes(this.routers)
			//this.$router.push({path:'/bill3'});
		},
		mounted(){
			//this.addInterceptors()
		},
		filters:{
	        toSubstring(value){//ES6语法
	            return value.substring(0,1);
	        }
	    }
	}
</script>

<style scoped="scoped">
*{margin: 0;padding: 0;}
p{ margin: 0; padding: 0}
.labelList{
	width:100%;
	/*height: 3.2rem;*/
	background-color: #fff;
	margin: 0 auto;
	/*margin-top: 0.2666rem;*/
	position:relative;
	height: 3.47rem;
}
#evaluation1 .labelList:last-child{margin-bottom: 1.36rem;}
#evaluation1 .labelList:nth-child(1){margin-top: 0;}
.designerName{
	width: 100%;
	height: 1.47rem;
	position:relative;
	color: #333333;
}
.designerTitle{
	height: 100%;
	display: inline-block;
	line-height:1.52rem ;
	font-size: 0.453rem;
	color: #333333;
	letter-spacing:0.0133rem;
	margin-left: 1.343rem;
}
/*.jiaxi{
    width: auto;
	height: 1.0133rem;
	text-align: right;
	line-height: 1.0133rem;
	color: #fe893e;
	font-size: 0.3rem;
	position: absolute;
	right: 0;
}*/
.hbq{
	display: inline-block;
	height: 0.48rem;
    line-height: 0.48rem;
    font-size: 0.28rem;
    background: #ff7319;
    color: #fff;
    padding: 0 0.15rem;
    border-radius: 0.06rem;
    position: relative;
    left: 0.5rem;
    border: 1px solid #ff7319;
}
.designerIcon{
	width: auto;
	height: 0.4rem;
	display: inline-block;
	border: 0.0133rem solid #ff7319;
	border-radius: 0.0533rem;
	color: #ff7319;
	text-align: center;
	line-height: 0.4rem;
	font-size: 11px;
	margin-left: 0.2133rem;
	padding: 0.0133rem;
	padding-left: 0.08rem;
	padding-right: 0.08rem;
}
.standardData{
	margin: 0 0.5333rem;
	height:2rem;
	padding-top: 0.212rem;
	position: relative;
	border-bottom: 1px solid #eeeeee;
}
.standardData>span{
	display: inline-block;
	position: absolute;
}
.standardData>span:nth-of-type(1){
	left: 0;
}
.standardData>span:nth-of-type(2){
	left:4.3rem;
}
.standardData>span>p:nth-of-type(1){
	font-size: 0.3rem;
	color: #b2b2b2;
	margin-bottom: 0;
}
.standardData>em{
    height: 1.01rem;
    width: 1px;
    background: #eee;
    display: block;
    position: absolute;
    top: 0.54rem;
    left: 3.5rem;
}
.standardData>span>p:nth-of-type(2){
	font-size: 0.3rem;
	color: #b2b2b2;
	margin-top:0.26rem;
	letter-spacing:0.0133rem;
	line-height: 0.3rem
}
.standardData>span>p:nth-of-type(1)>b{
	font-weight: normal;
	font-size: 0.8rem;
	margin-right: 0.0533rem;
}
.highlightcolor{
	color: #ff7319!important;
	line-height: 0.7rem;
	height: 0.7rem;
}
.highlightcolor span{
	font-size: 0.38rem;
}
.lrdistance{
	margin-left: 0.0533rem;
	margin-right:0.0533rem;
}
.dataDay{
	margin-left: 0.6133rem;
}
.dataMoeny{
	/*margin-left: 0.6133rem;*/
}
.dataMoeny p:nth-child(1){
	height: 0.7rem;
	line-height: 0.7rem;
}
.dataMoeny .lrdistance span {
    margin-left: 0.15rem;

}
.duration span{
	color: #4f4f4f;
}
.dataMoeny .duration{
		line-height: 0.7rem
}
.dataMoeny .lrdistance span.money {
    font-weight: normal;
    font-size: 0.3rem;
		margin-top: 0.32rem
}
.container{
	width:1.33rem;
	height:1.33rem;
	position: absolute;
	font-size: 11px;
	right:0.533rem;
	top: 1.6rem;

}
#containers{
	width: 1.3333rem;
	height: 1.3333rem;
	position: absolute;
	font-size: 11px;
	right: 0;
	top:0.4rem;
}
.markIcon{
	width: 0.56rem;
    height: 0.56rem;
    line-height: 0.58rem;
    display: block;
    font-size: 0.41rem;
    position: absolute;
    top: 0.455rem;
    left: 0.533rem;
    text-align: center;
    border-radius: 2px;
    color: #fff;
}
.che{background: #ff9932;}
.qi{background: #7ad2ff;}
.fang{background: #ff8f93;}
.ti{background: #87de9a;}
.xin{background: #33cbdd;}
.newl{background: #bb95ef}

.markComplete{
	width: 1.3333rem;
    height: 1.3333rem;
    position: absolute;
    right: 0.533rem;
    top: 1.5rem;
}
.markComplete>img{width: 100%;height: 100%;}
.markRepay{
	width: 1.3333rem;
	height: 1.3333rem;
	position: absolute;
	right:0.533rem;
	top: 1.5rem;
}
.markRepay>img{width: 100%;height: 100%;}
.increaseRate{
	font-size: 12px;
	color: #ff7319;
	font-style:normal;
}
.jumpNext{
	width: 100%;
	height: 100%;
	text-decoration: none!important;
	display: block;
}
.complateBox{
	width:1.3333rem;
	height: 1.3333rem;
	position: absolute;
	right: 0.533rem;
  top: 1.5rem;
}
.repaymentBox{
	width:1.3333rem;
	height: 1.3333rem;
	position: absolute;
	right: 0.533rem;
  top: 1.5rem;
}
.complateBox>img{width: 100%;height: 100%;}
.repaymentBox>img{width: 100%;height: 100%;}
.warningChun{
    width: 10rem;
    height: 1rem;
    margin: 0 auto;
    background-color: #f5f5f5;
    padding-top: 0.4rem;
    font-size: 9px;
    /*background-image: url(../../../static/image/invest/linebottom.png);*/
    background-repeat: no-repeat;
    background-size: 8.2666rem 0.5333rem;
    background-position: 0.8666rem 0.25rem;
}

.load{
	position: relative;
	width: 100%;
	height: 22px;
	line-height: 22px;
	font-size: 0.34rem;
	text-align: center;
	margin-top: -1rem;
	margin-bottom: 30px;
}
.load>img{
	position: absolute;
	width: 0.48rem;
	height: 0.48rem;
	top: 50%;
	margin-top: -11px;
	margin-left: -22px;
}

.jiaxi{
	font-size: 0.26rem;
  color: #ff7139;
  font-weight: normal;
  /*border: 1px solid #fe7c28;*/
  background: #fcede7;
  padding: 0.07rem 0.1rem 0.03rem 0.1rem;
  position: relative;
  left: 0.15rem;
  border-radius: 0.05rem;
	vertical-align: 0.04rem;
}
.fontSpecial{
	font-family: "special" !important;
}
.line_box{ width: 100%; height: 2.4rem; position:relative;}
.line_box .line{ display: block; width:86%; height: 1px; background-color: #e5e5e5; position: absolute; top: 50%; left: 50%; margin-left: -43%;}
.line_text{ display: block; line-height: 2.4rem; background: #f1f1f1; text-align: center; font-size: 0.4rem; color: #b2b2b2; position: absolute; top: 0;left: 50%; transform: translateX(-50%); -webkit-transform: translateX(-50%); padding: 0 0.2rem}
.gotop{ width: 2.35rem; height: 0.67rem; position: fixed; top: 85%; right: 0;display: none;}
.gotop img{ width: 100%;}


</style>