<template>
	<div>
		<div class="conton">
            <ul>
                <a @click="select(0,'tending')"><li :class="[index==0?'on':'','comm']">招标中</li></a>
                <a @click="select(1,'tendbacking')"><li :class="index==1?'on':''">还款中</li></a>
                <a @click="select(2,'tenddone')"><li :class="index==2?'on':''">已完成</li></a>
            </ul>
            <span class="paixu" @click="paixu()">{{message}}<i></i></span>        
		</div>
		<div id="morelist" style="position:relative;top:1.2rem;" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="50">
		    <div class="labelList" v-for="item in billList">
		        <a href="" class="jumpNext">
		            <div class="designerName">
		                <span class="markIcon">
		                    <img :src="imgs[0].greyimg"></span>
		                <span class="designerTitle">{{item.borrow_name}}</span>
		                <span class="markTime" v-if="item.borrow_status==2||item.borrow_status==3">到期时间：{{item.add_time | formatDate}}</span>
		            	<span class="markTime" v-if="item.borrow_status==4">到期时间：{{item.full_time | formatDate}}</span>
		            	<span class="markTime" v-if="item.borrow_status==6||item.borrow_status==7">到期时间：{{item.repay_date}}</span>
		            </div>
		            <div class="standardDatas">
		                <span>
		                    <p>出借金额</p>
		                    <p>
		                    <b>{{ item.investor_capital }}</b>元</p>
		                </span>
		                <span>
		                    <p>借款约定年化利率</p>
		                    <p>{{ item.borrow_interest_rate }}%</p>
		                </span>
		                <span>
		                    <p>出借期限</p>
		                    <p>{{ item.borrow_duration }}{{ item.borrow_unit }}</p>
		                </span>
		            </div>
		            <div class="stateMark">
		                <span v-if="item.borrow_status==6">剩余天数：{{ item.days }}天</span>
		                <span v-else>剩余天数：--天</span>
		                <span>预期收益：{{item.investor_interest}}元</span>
		                <span class="stateColorTwo">{{item.invest_status_info}}</span></div>
		        </a>
			</div>
			
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
				loading:false,
				index:0,
				sort:'asc',
				type:'tending',
				imgs:[
					{
						greyimg:require('../../../static/images/home/car.png'),
					}
				],
				message:'正序',
				p:1,
				billList:[],
			}
		},
		methods:{
			select:function (index,type){
				this.type=type;
				this.p=1;
				this.loading=true;
				this.index=index;
				this.getData(type,this.sort);
			},
			getData:function (type,sort){
				Indicator.open();
	   			var self = this;
	   			var url = baseConfig.api+'user/mine';
		   		var p_token
		   		if(getToken()==null){
		   			p_token="";
		   		} else {
		   			p_token = getToken().p_token;
		   		}
		   		var params = {
		   			p_token:p_token,
		   			version:baseConfig.version,
		   			type:type,
		   			sort:sort,
		   			p:self.p
		   		}
		   		this.axios.post(url, qs.stringify(params),{emulateJSON : true  //这行最关键。题外话：我们是选项体，也就是文档里的[options]
}).then(function (response) {
					Indicator.close();
					console.log(response.data);
					var res = response.data;
					self.loading=false;
					if(res.status==200){
						if(self.p==1){
							self.billList = res.data.investor
						} else {
							self.billList = self.billList.concat(res.data.investor);
						}
						if(res.data.investor!=null){
							self.loading = false;
							self.p+=1
						} else {
							self.loading = true;
						}
					}
				}).catch(function (error) {
					Indicator.close();
				});
			},
			paixu:function (){
				console.log(this.sort)
				if(this.sort=='asc'){
					this.message="倒序"
					this.sort='desc';
				} else {
					this.message="正序"
					this.sort='asc';
				}
			},
			loadMore() {
				this.loading = true;
			  	this.getData(this.type,this.sort);
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
	    }
	}
</script>

<style scoped="scoped">
	
body{background-color:#eeeeee;overflow: hidden;font-family: Arial,"Microsoft YaHei",Apple LiGothic Medium,Apple LiSung Light;}
*{margin: 0;padding: 0;}
.conton{
    width: 100%;
    height: 1.2rem;
    background: #fff;
    position: fixed;
    top: 0;
    z-index: 1000;
    border-bottom: 0.0133rem solid #e5e5e5;
}
.conton ul{
	width: 75%;
	overflow: hidden;
}
.conton ul li{
    float: left;
    width: 33.33%;
    height: 1.16rem;
    line-height: 1.2rem;
    text-align: center;
    color: #888;
    font-size: 0.34rem;
    cursor: pointer;
}
.conton ul li.on{
    color: #333;
    border-bottom: 0.04rem solid #ff7319;
}
.conton .paixu{
	display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    width: 2.5rem;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    font-size: 0.34rem;
    color: #888;
}
.conton .paixu i{
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    background: url(https://image.79jr.com/style/home/images/jp-new/down.png) no-repeat;
    background-size: 0.4rem 0.4rem;
    background-position: 0.1rem 0.01rem;
    position: relative;
    top: 0.15rem;
}
.up{
	background: url(https://image.79jr.com/style/home/images/jp-new/up.png) no-repeat!important;
	background-size: 0.4rem 0.4rem!important;
	background-position: 0.1rem 0.01rem!important;
}
.boxs{width: 10rem;background: #eee;margin-top: 1.2rem;}
.inv-img{
    width: 4rem;
    height: 2.8rem;
    margin: 0 auto;
    position: relative;
}
.inv-img img{
	width: 1.6rem;
    height: 1.6rem;
    position: absolute;
    left: 1.2rem;
    top: 0.25rem;
}
.inv-img p{
	width: 4rem;
    text-align: center;
    position: absolute;
    bottom: 0.2rem;
    font-size: 0.36rem;
    color: #999;
}
/* .up{
	color: #333;
	transform: rotate(180deg);
	transition: transform 0.2s; 
    transform-origin: 0.18rem 0.13rem;
    -webkit-transform: rotate(180deg);
    -webkit-transition: transform 0.2s; 
    -webkit-transform-origin: 0.18rem 0.13rem;
} */

.labelList{
	width: 10rem;
	height: 3.8rem;
	background-color: #fff;
	margin: 0 auto;
	margin-top: 0.2666rem;
}
.labelList:last-child{margin-bottom: 1.36rem;}
.designerName{
	width: 8.5333rem;
	height: 1.0133rem;
	border-bottom: 0.0133rem solid #eeeeee;
	margin-left: 1.12rem;
	position:relative;
}
.designerTitle{
	height: 100%;
	display: inline-block;
	line-height:1.0133rem ;
	font-size: 13px;
	color: #333333;
	letter-spacing:0.0133rem;
}
[data-dpr="2"] .designerTitle{
    font-size: 26px;
}
[data-dpr="3"] .designerTitle{
    font-size: 39px;
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
}
[data-dpr="2"] .designerIcon{
    font-size: 22px;
}
[data-dpr="3"] .designerIcon{
    font-size: 33px;
}
.standardDatas{
	width: 8rem;
	height:1.2rem;
	margin-left: 1.2rem;
	padding-top: 0.4rem;
	position: relative;
}
.standardDatas>span{
	display:block;
	text-align: center;
	width: 2.6666rem;
	height: 1.2rem;
}
.standardDatas>span:nth-of-type(1){
	text-align: left;
	position: absolute;
	left: 0;
}
.standardDatas>span:nth-of-type(2){
	position: absolute;
	left:2.6666rem;
}
.standardDatas>span:nth-of-type(3){
	position: absolute;
	left:5.3333rem;
}
.standardDatas>span:nth-of-type(3){
	float: right;
}
.standardDatas>span>p:nth-of-type(1){
	font-size: 12px;
	color: #999999;
}
[data-dpr="2"] .standardDatas>span>p:nth-of-type(1){
    font-size: 24px;
}
[data-dpr="3"] .standardDatas>span>p:nth-of-type(1){
    font-size: 36px;
}
.standardDatas>span>p:nth-of-type(2){
	font-size: 13px;
	color: #ff7319;
	margin-top: 0.2666rem;
	letter-spacing:0.0133rem;
}
[data-dpr="2"] .standardDatas>span>p:nth-of-type(2){
    font-size: 26px;
}
[data-dpr="3"] .standardDatas>span>p:nth-of-type(2){
    font-size: 39px;
}
.standardDatas>span>p:nth-of-type(1)>b{
	font-weight: normal;
	font-size: 21px;
	color: #333333;
	margin-right: 0.0533rem;
}
[data-dpr="2"] .standardDatas>span>p:nth-of-type(1)>b{
    font-size: 42px;
}
[data-dpr="3"] .standardDatas>span>p:nth-of-type(1)>b{
    font-size: 63px;
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
	width:1.6rem;
	height: 1.2266rem;
	position: absolute;
	right: 0;
	top: 0.5rem;
}
.markComplete>img{width: 100%;height: 100%;}
.markRepay{
	width: 1.3333rem;
	height: 1.3333rem;
	position: absolute;
	right: 0;
	top: 0.4rem;
}
.markRepay>img{width: 100%;height: 100%;}
.increaseRate{
	font-size: 12px;
	color: #ff7319;
	font-style:normal;
}
[data-dpr="2"] .increaseRate{
    font-size: 24px;
}
[data-dpr="3"] .increaseRate{
    font-size: 36px;
}
.jumpNext{
	width: 100%;
	height: 100%;
	text-decoration: none!important;
	display: block;
}
.markTime{
	float: right;
	height: 100%;
	line-height:1.0133rem;
	text-align:right;
	color: #888888;
	font-size: 12px;
}
[data-dpr="2"] .markTime{
    font-size: 24px;
}
[data-dpr="3"] .markTime{
    font-size: 36px;
}
.stateMark{
	width: 9.4666rem;
	height: 0.8rem;
	margin: 0 auto;
	margin-top: 0.2666rem;
	border-top: 0.0133rem solid #e5e5e5;
	font-size: 12px;
	color: #888888;
	position: relative;
}
[data-dpr="2"] .stateMark{
    font-size: 24px;
}
[data-dpr="3"] .stateMark{
    font-size: 36px;
}
.stateMark>span{
	width: auto;
	height: 0.8rem;
	display: inline-block;
	text-align: center;
	line-height: 0.8rem;
}
.stateMark>span:nth-of-type(3){
	float: right;
	margin-right:0.5333rem;
}
.stateMark>span:nth-of-type(2){
	margin-left: 0.9866rem;
}
.stateMark>span:nth-of-type(1){
	margin-left:0.2933rem;
}
.stateColorOne{
	width: 1.1466rem!important;
	height: 0.48rem!important;
	line-height: 0.48rem!important;
	background-color: #ff7319;
	border-radius: 0.08rem;
	color: #fff;
	position: absolute;
	top:0.16rem;
	right: 0;
}
.stateColorTwo{
	width: 1.1466rem!important;
	height: 0.48rem!important;
	line-height: 0.48rem!important;
	background-color: #50c166;
	border-radius: 0.08rem;
	color: #fff;
	position: absolute;
	top:0.16rem;
	right: 0;
}
.stateColorThree{
	width: 1.1466rem!important;
	height: 0.48rem!important;
	line-height: 0.48rem!important;
	background-color: #b2b2b2;
	border-radius: 0.08rem;
	color: #fff;
	position: absolute;
	top:0.16rem;
	right: 0;
}
.labelList:last-child{
	margin-bottom: 1.36rem;
}

</style>