<template>
	<swiper :options="swiperOption" ref="mySwiper">
	    <!-- slides -->
	    <swiper-slide v-for="item in bannerList" >
	    	<img :src="item.img" @click="openWeb(item.url)">
	    </swiper-slide>
	    <!-- Optional controls -->
	    <div class="swiper-pagination"  slot="pagination"></div>
	</swiper>
</template>

<script>
	export default {
	props:{
		bannerList:{
			type:Array,
		}
	},
    data() {
      return {
        swiperOption: {
        	loop : true,
          	autoplay: {
        		delay: 2000,
          	},
        	pagination: {
	    		el: '.swiper-pagination',
	  		},
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      console.log('this is current swiper instance object', this.swiper)
      //this.swiper.slideTo(3, 1000, false)
    },
    methods:{
    	openWeb:function (url){
    		window.location.href = url;
    	}
    }
  }
</script>

<style scoped="scoped">
	img{ display: block;}
	.swiper-container{ width: 100%;}
	.swiper-container .swiper-slide { width: 100%;}
	.swiper-container .swiper-slide  img{ width: 100%;}
</style>