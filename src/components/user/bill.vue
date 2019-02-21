<template>
	<div>
		<div class="m-content">
			<div class="topFunction">
				<span @click="selectThis(0,'')"><img :src="index==0?imgs[0].newimg:imgs[0].greyimg"><p class="down">明细总汇</p></span>
				<span @click="selectThis(1,'recharge')"><img :src="index==1?imgs[1].newimg:imgs[1].greyimg"><p class="down">充值提现</p></span>
				<span @click="selectThis(2,'invest')"><img :src="index==2?imgs[2].newimg:imgs[2].greyimg"><p class="down">出借流水</p></span>
				<span @click="selectThis(3,'reward')"><img :src="index==3?imgs[3].newimg:imgs[3].greyimg"><p class="down">奖励流水</p></span>
			</div>
			<div class="mxConetentBox" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="50">
				<div class="mxConetentList" v-for="item in billList">
					<span v-if="item.affect_money.indexOf('-')>=0" class="stateIcond stateColorTi">
						{{ item.type_s }}
					</span>
					<span v-if="item.affect_money.indexOf('+')>=0" class="stateIcond stateColorXi">
						{{ item.type_s }}
					</span>
					<span v-if="item.affect_money.indexOf('+')<=0&&item.affect_money.indexOf('-')<=0" class="stateIcond stateColorJiang">
						{{ item.type_s }}
					</span>
					<div class="stateContent">	
					    <span class="conts">{{ item.affect_money }}</span>				    
					    <div class="states">
					    	<span class="back">{{ item.type }}</span>
					    	<span class="test">{{item.info}}</span><br>
					    	<span class="time">{{item.add_time | formatDate}}</span>
					    </div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	var qs = require('qs');
	import { Indicator,Toast,MessageBox,InfiniteScroll } from 'mint-ui';
	import { getToken } from '../../../static/common.js'
	import { baseConfig,showMessage } from '../../../static/config.js'
	export default {
		data(){
			return {
				typeone:'',
				loading:false,
				index:0,
				imgs:[
					{
						greyimg:require('../../../static/images/wode/detailedmxgray.png'),
						newimg:require('.../../../static/images/wode/detailedmx.png'),
					},
					{
						greyimg:require('../../../static/images/wode/cztigary.png'),
						newimg:require('../../../static/images/wode/czti.png'),
					},
					{
						greyimg:require('../../../static/images/wode/cashgray.png'),
						newimg:require('../../../static/images/wode/cashh.png'),
					},
					{
						greyimg:require('../../../static/images/wode/rewardjlgray.png'),
						newimg:require('../../../static/images/wode/rewardjl.png'),
					}
				],
				billList:[],
				p:1
			}
		},
		methods:{
			selectThis:function (index,type){ 
				this.typeone=type;
				this.p=1;
				this.billList=[];
				this.index = index;
				this.loading = true;
				this.billData(type);
			},
			billData:function (type){
	   			Indicator.open();
	   			var self = this;
	   			var url = baseConfig.api+'user/bill';
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
		   			p:self.p
		   		}
		   		this.axios.post(url, qs.stringify(params),{emulateJSON : true  //这行最关键。题外话：我们是选项体，也就是文档里的[options]
}).then(function (response) {
					Indicator.close();
					console.log(response.data);
					var res = response.data;
					if(res.status==200){
						if(self.p==1){
							self.billList = res.data.list
						} else {
							self.billList = self.billList.concat(res.data.list);
						}
						if(res.data.list!=null){
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
	   		loadMore() {
				this.loading = true;
			  	this.billData(this.typeone);
			}
		},
		created:function (){
			//this.billData();
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
	}
</script>

<style scoped="scoped">
a{text-decoration: none!important;}
body,html{background-color: #f4f4f4;}
.topFunction{
	width: 10rem;
	height: 2.4533rem;
	margin: 0 auto;
	background-color: #fff;
	position: fixed;
	top: 0;
	z-index: 999;
	border: 0.0133rem solid #efeff4;
}
.topFunction>span{
	width: 2.48rem;
	height: 2.4533rem;
	display: block;
	text-align: center;
}
.topFunction>span>img{
	width: 0.96rem;
	height: 0.96rem;
	display: block;
	margin: 0 auto;
	margin-top: 0.5333rem;
}
.topFunction>span>p{
	color: #333333;
	font-size: 0.3rem;
	margin-top: 0.1333rem;
}
.topFunction>span:nth-of-type(1){
	position: absolute;
	left: 0;
	top: 0;
}
.topFunction>span:nth-of-type(2){
	position: absolute;
	left: 2.48rem;
	top: 0;
}
.topFunction>span:nth-of-type(3){
	position: absolute;
	left:4.96rem;
	top: 0;
}
.topFunction>span:nth-of-type(4){
	position: absolute;
	left: 7.44rem;
	top: 0;
}
.monthShow{
	width: 10rem;
	height: 0.8rem;
	margin: 0 auto;
}
.mxConetentBox{
	width: 10rem;
	height: auto;
	background-color: #fff;
	margin: 0 auto;
	margin-top: 2.6rem;
}
.mxConetentList{
	width: 9.4666rem;
	height: auto;
	border-bottom: 0.0133rem solid #e5e5e5;
	margin: 0 auto;
	position: relative;
}
.stateIcond{
	width: 1.6rem;
    height: 1.6rem;
    border-radius: 1.6rem;
    display: block;
    text-align: center;
    line-height: 1.6rem;
    color: #fff;
    position: absolute;
    top: 0.25rem;
    left: 0.4rem;
    font-size: 0.32rem;
}
.stateContent{
	height: auto;
	padding-left: 2.2rem;
    padding-bottom: 0.25rem;
}
.stateContent .states{
    padding-top: 0.25rem;
}
.stateContent .states .back{
	font-size: 0.4rem;
	color: #555555;
}
.stateContent .states .test{
	font-size: 0.33rem;
    position: relative;
    top: 0.1rem;
    display: inline-block;
    width: 7.3rem;
    word-break: break-all;
    overflow: hidden;
    line-height: 0.45rem;
    color: #999;
}
.stateContent .states .time{
	font-size: 0.35rem;
    position: relative;
    top: 0.1rem;
    color: #999999;
}
.stateContent>span{
	width: auto;
	height: 0.8rem;
	line-height: 0.8rem;
	display: inline-block;
	padding-top: 0.1rem;
    float: right;
	color: #000;
	font-size: 0.32rem;
}
.stateColorJiang{
	background-color: #f7b660;
}
.stateColorXi{
	background-color: #f6705a;
}
.stateColorCar{
	background-color: #54b7b5;
}
.stateColorChong{
	background-color: #dc6a6a;
}
.stateColorKou{
	background-color: #37aad0;
}
.stateColorDong{
	background-color: #699ddc;
}
.stateColorTi{
	background-color: #80ce5a;
}
</style>