<template>
	<div>
		<div class="mask" style="display: block;" v-if="isShow"></div>
		<div class="shieldLayerOpen" style="display:block;" v-if="isShow">
			<div class="openBox">
			    <p style="position: relative;">
			        <img src="https://image.79jr.com/Public/v3/M/img/opentank.png" alt="春天金融" style="width: 100%;">
			        <a href="http://srtest.79jr.com/m/Gbank/openaccount/type/2.html" class="qibank"></a>
			        <a href="http://srtest.79jr.com/m/user/quotalist" class="gebank"></a>
			        <a href="javascript:;" class="gbi" @click="closeMe()"></a>
			    </p>				    
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			isShow:{
				type:Boolean,
				default:false
			}
		},
		data (){
			return {
				
			}
		},
		methods:{
			closeMe:function (){
				console.log(111)
				this.$emit('closeMe')
			}
		}
	}
</script>

<style scoped="scoped">
	.shieldLayerOpen {
    width: 10rem;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9999999;
   /* background-image: url(../image/wode/fancybox_overlay.png);*/
}
.openBox{
    width: 82%;
    height: auto;
    border-radius: 0.1333rem;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -5.6rem;
    margin-left: -40.5%;
}
.openBox img{
	display: block;
	width: 100%;
}
.mask {
    display: none;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #000;
    opacity: .7;
    z-index: 100;
}
.btBank {
    text-align: center;
    font-size: 0.48rem;
    color: #1a1a1a;
    font-weight: 700;
    font-family: "microsoft yahei";
    margin-top:0.8rem;
}

.parties {
    width:5.3333rem;
    height:2.08rem;
    margin: 0 auto;
    margin-top:0.6133rem;
}
.parties>img{width: 100%;height: 100%;}
.subtitle {
    width:5.6rem;
    height:0.2666rem;
    text-align: center;
    line-height:0.2666rem;
    font-size: 0.35rem;
    color: #888888;
    margin: 0 auto;
    position: relative;
    margin-top:0.8rem;
}

.subtitle > span:nth-of-type(1) {
    left: 0;
    top:0.1066rem;
}
.subtitle > span:nth-of-type(2) {
    right: 0;
    top:0.1066rem;
}
.subtitle > span {
    width:0.8rem;
    height:0.0133rem;
    background-color: #e2e2e2;
    display: block;
    position: absolute;
}
.gContent {
    text-align: center;
    font-size: 0.36rem;
    color: #1a1a1a;
    margin-top:0.2rem;
}

.closeNow {
    width: 0.4rem;
    height: 0.4rem;
    display: block;
    position: absolute;
    right:0.16rem;
    top:0.1066rem;
    cursor: pointer;
}
.closeNow >img{width: 100%;height: 100%;}
.qibank{
    width: 36.5%;
    height: 0.9rem;
    position: absolute;
    bottom: 8.5%;
    left: 9.8%;
    display: block;
    border-radius: 0.08rem;
    margin: 0 auto;
}
.gebank{
    width: 36.5%;
    height: 0.9rem;
    position: absolute;
    bottom: 8.5%;
    right: 9.8%;
    display: block;
    border-radius: 0.08rem;
    margin: 0 auto;
}
.gbi{
    width: 0.5rem;
    height: 0.5rem;
    position: absolute;
    top: 1.5%;
    right: 3%;
    background: url(https://image.79jr.com/Public/v3/M/img/home/close.png) no-repeat;
    background-size: 100%;
}
.pingce{
    display: inline-block;
    width: 25%;
    line-height: 0.7rem;
    height: 0.7rem;
    color: #fff;
    background: #ff7319;
    position: relative;
    left: 0.5rem;
    border-radius: 0.1rem;
}
.close{
    display: inline-block!important;
    width: 0.4rem!important;
    height: 0.4rem!important;
    position: absolute!important;
    top: 0.46rem;
    right: 5%;
}
.close img{width: 100%;height: 100%;}

</style>