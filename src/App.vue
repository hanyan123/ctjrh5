<template>
  <div id="app" style="height: 100%;">
  	<transition :name="transitionName">
    		<router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    //HelloWorld
  },
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  watch: {
    '$route' (to, from) {
      if(to.path == '/'){
        this.transitionName = 'slide-right';
      }else{
        this.transitionName = 'slide-left';
      }
    }
  }

}
</script>

<style>
html,body{ height: 100%; width: 100%; margin: 0; padding: 0; background: #f1f1f1;}
a:active,a:hover,a{ border: none; text-decoration: none;}
.mint-toast-text{
		font-size: 0.4rem !important;
	}
.mint-spinner-snake{ width: 1rem !important; height: 1rem !important;}
.mint-msgbox-title{ font-size: 0.4rem; padding: 0.2rem 0 0 0;}	
.mint-msgbox-message{ font-size: 0.32rem; line-height: 1rem;}
.mint-msgbox-btns{ height: auto;}
.mint-msgbox-btn{ line-height: 1rem;  font-size: 0.32rem;}
.child-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all .5s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}

</style>
