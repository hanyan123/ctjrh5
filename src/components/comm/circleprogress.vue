<template>
	<progress-bar class="circle" ref="circle" type="circle" :options="options"></progress-bar>
</template>

<script>
	export default{
		props:{
			progressnum:{
				type:Number
			}
		},
		data (){
			return {
				options:{
				  	color: '#ff7319',
					strokeWidth: 4,
					trailWidth: 4,
					easing: 'easeInOut',
					duration: 1400,
					text: {
					   autoStyleContainer: false
					},
					from: { color: '#ff7319', width: 3 },
					to: { color: '#ff7319', width: 3 },
					step: function(state, circle) {
					    circle.path.setAttribute('stroke', state.color)
					    circle.path.setAttribute('stroke-width', state.width)
					    var value = Math.round(circle.value() * 100)
					    if(0<value&&value<1){
					    	circle.setText("1%")
					    } else  {
					    	circle.setText(value+"%")
					    } 
					}
				}
			}
		},
		mounted: function () {
	      	this.$refs.circle.animate(this.progressnum)
	    }
	}		
</script>

<style>
	.circle{ position: relative;}
	.progressbar-text{ font-size:0.44rem}
</style>