// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import '../static/js/flexible_css.js'
import '../static/js/flexible.js'
//vue-swiper  https://www.npmjs.com/package/vue-awesome-swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)
//https://www.npmjs.com/package/vue-axios
//https://www.cnblogs.com/wisewrong/p/6402183.html
//https://github.com/wangdahoo/vue-progress
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueProgress from 'vue-progress'

//赋值粘贴板https://blog.csdn.net/babylove_lin/article/details/78824468
import VueClipboard from 'vue-clipboard2'
 
Vue.use(VueClipboard)
Vue.use(VueProgress)
Vue.use(VueAxios, axios)
//Vue.prototype.$http= axios 就可以直接调用this.$http.post
//使用mintui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
Vue.config.productionTip = false
import { getToken } from '../static/common.js'
router.beforeEach((to, from, next) => {	
	console.log(getToken())
	if(getToken()===undefined||!getToken()||getToken()===null){ //未登录
		if (to.matched.some(record => record.meta.requiresAuth)){
			//if(confirm("请先登录")){
		    next({
		       path: '/login',
		    })
			//}
		} else {
		      	next();
				//Indicator.close();
				document.title = to.meta.title
		    }
	} else {//已登录
		document.title = to.meta.title
		if(to.path==="/login"){
			next({
				path:"/wode"
			})
		} else {
			next()
		}
	}
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
