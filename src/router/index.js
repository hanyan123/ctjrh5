import Vue from 'vue';
import Router from 'vue-router';
import layout from '@/components/layout';
import index from '@/components/index/index';
import guide from '@/components/index/guide';
import invest from '@/components/invest/invest';
import itemdetails from '@/components/invest/itemdetails';
import detail from '@/components/invest/details';
import wode from '@/components/user/wode';
import login from '@/components/user/login';
import charge from '@/components/user/charge';
import cash from '@/components/user/cash';
import bill from '@/components/user/bill';
import welfare from '@/components/user/welfare';
import shezhi from '@/components/user/shezhi';
import tyj from '@/components/user/tyj';
import myinvest from '@/components/user/myinvest';
import quolist from '@/components/user/quolist';
import NotFoundComponent from '@/components/notFound'
Vue.use(Router);

export default new Router({
    //mode: 'history',
    //linkActiveClass:'active',
    routes: [
    {
      path: '/',
      name: 'layout',
      redirect:'/index',
      component: layout,
      children:[
			{
				path:'/index',
				component:index,
				meta: { requiresAuth: false,title:"首页" }
			},
			{
				path:'/invest',
				component:invest,
				meta: { requiresAuth: false,title:"项目" }
			},
			{
				path:'/wode',
				component:wode,
				meta: { requiresAuth: true,title:"我的" }
			},
			{
				path:'/guide1',
				component:guide,
				meta: { requiresAuth: true,title:"新手指引" }
			}
		]
    },
    {
		path:'/login',
		component:login,
		meta: { requiresAuth: false,title:"登录" }
	},
    {
		 path:'/detail/:bid',
		 component:detail,
		 meta: { requiresAuth: false,title:"项目详情" }
	},
    {
		 path:'/guide',
		 component:guide,
		 meta: { requiresAuth: false,title:"新手指引" }
	},
	{
		path:'/itemdetails/:showNum/:bid',
		component:itemdetails,
		meta: { requiresAuth: true,title:"项目详情" }
	}
	,
	{
		path:'/charge',
		component:charge,
		meta: { requiresAuth: true,title:"我要充值" }
	},
	{
		path:'/cash',
		component:cash,
		meta: { requiresAuth: true,title:"我要提现" }
	},
	{
		path:'/bill',
		component:bill,
		meta: { requiresAuth: true,title:"账单" }
	},
	{
		path:'/welfare',
		component:welfare,
		meta: { requiresAuth: true,title:"我的福利" }
	},
	{
		path:'/shezhi',
		component:shezhi,
		meta: { requiresAuth: true,title:"设置" }
	},
	{
		path:'/tyj',
		component:tyj,
		meta: { requiresAuth: true,title:"我的体验金" }
	}
	,
	{
		path:'/myinvest',
		component:myinvest,
		meta: { requiresAuth: true,title:"出借记录" }
	},
	{
		path:'/quolist',
		component:quolist,
		meta: { requiresAuth: true,title:"限额列表" }
	},
	{ 	path: '*', 
		component: NotFoundComponent 
	}
  ]
})


