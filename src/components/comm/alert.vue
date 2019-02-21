<template>
	<div>
		<div class="alertbox" v-if="showalert">
			<div class="alertext">
				我是弹出框
			</div>
			<span class="closeme" @click="closealert">
				
			</span>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			showalert:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return {
				
			}
		},
		methods:{
			closealert(){
				this.$emit('closeme',false)
			}
		}
	}
</script>

<style>
	.alertbox{ width: 80%; height:200px; background: #FFFFFF; position: fixed; top: 0; border-radius:6px;z-index: 666666;}
	.alertext{ text-align: center; line-height: 40px; margin-top: 80px;}
	.closeme{ display: block; width: 32px; height: 32px; background: #007AFF; position: absolute; top: 0; right: 0;}
</style>