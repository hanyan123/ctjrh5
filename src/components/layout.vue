<template>
	<div>
		<router-view></router-view>
		<div class="bottomnav">
			<div class="navs">
				<router-link :to="{path:'/index'}" active-class='active' :class="['icon1',$route.path == '/guide1'?'active':'']">
					<span>
						
					</span>
					<p>首页</p>
				</router-link>
				<router-link :to="{path:'/invest'}" active-class='active' class="icon2">
					<span>
						
					</span>
					<p>项目</p>
				</router-link>
				<router-link :to="{path:'/wode'}"  active-class='active' class="icon3">
					<span v-if="show==1">
					</span>
					<p>我的</p>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data (){
			return {
				show:1,
				routers:''
			}
		},
		methods:{
			
		},
		created:function (){
//			console.log(this.$route);
//			if(this.$route.path=="/guide1"){
//				console.log(1111)
//				this.routers = "/guide1"
//			}
		},
//		watch:{
//			'$route':function(to) {
//				if(to.path=="/guide1"){
//					console.log(1111)
//					this.routers ="/guide1"
//				}
//				
//			 	//console.log(to)
//			}
//		}
	}
</script>

<style scoped="scoped">
	.bottomnav{ background: #f1f1f1; width:100%; position: fixed; bottom: 0; left: 0; border-top: 1px solid #eeeeee; padding: 0.2rem 0;}
	.navs{ width: 100%; overflow:hidden ;}
	.navs a{ display: block; float: left; width: 33.33%; color: #666666;}
	.navs a span{ display: block; margin: 0 auto; width: 0.72rem; height: 0.72rem;}
	.navs .icon1 span{ background: url(../../static/images/home/shouyeone.png) no-repeat; background-size: 100% 100%;}
	.navs .icon2 span{ background: url(../../static/images/home/licaione.png) no-repeat; background-size: 100% 100%;}
	.navs .icon3 span{ background: url(../../static/images/home/wodeone.png) no-repeat; background-size: 100% 100%;}
	.navs .icon1.active span{ background: url(../../static/images/home/shouyetwos.png) no-repeat; background-size: 100% 100%;}
	.navs .icon2.active span{ background: url(../../static/images/home/licaitwos.png) no-repeat; background-size: 100% 100%;}
	.navs .icon3.active span{ background: url(../../static/images/home/wodetwos.png) no-repeat; background-size: 100% 100%;}
	.navs a p{ font-size: 0.32rem; text-align: center;}
	.active p{color: #ff7319;}
</style>