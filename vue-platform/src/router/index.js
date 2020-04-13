import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      meta:{title:'管理平台-登录'},
      component: ()=>import('@/views/login'),
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      meta:{title:'管理平台-登录'},
      component: ()=>import('@/views/login'),
    },
    {
      path: '/layout',
      name: 'layout',
      meta: {
        requiresAuth: true      // 要求验证的页面,在此情况下其子页面也会被验证.
      },
      component: ()=>import('@/components/layout'),
      redirect: '/welcome',
      children:[
        {
          path: '/welcome',
          name: 'welcome',
          meta:{title:'欢迎页'},
          component: ()=>import('@/views/welcome'),
        },
        {
          path: '/people',
          name: 'people',
          meta:{title:'人员管理-crystalSOng'},
          component: ()=>import('@/views/system/people'),
        },
        {
          path: '/role',
          name: 'role',
          meta:{title:'权限管理-crystalSOng'},
          component: ()=>import('@/views/system/role'),
        },
        {
          path: '/channel',
          name: 'channel',
          meta:{title:'渠道管理-渠道查询'},
          component: ()=>import('@/views/system/channel'),
        },
        {
          path: '/saleReport',
          name: 'saleReport',
          meta:{title:'渠道管理-crystalSOng'},
          component: ()=>import('@/views/channel/saleReport'),
        },
        // 销售统计
        {
          path: '/growth',
          name: 'growth',
          meta:{title:'销售统计-增长统计'},
          component: ()=>import('@/views/sales/growth'),
        },
        {
          path: '/channelArea',
          name: 'channelArea',
          meta:{title:'销售统计-渠道地区分布统计'},
          component: ()=>import('@/views/sales/channelArea'),
        },
        {
          path: '/productSale',
          name: 'productSale',
          meta:{title:'销售统计-产品销量统计'},
          component: ()=>import('@/views/sales/productSale'),
        },
        {
          path: '/distribution',
          name: 'distribution',
          meta:{title:'销售统计-渠道经销商产品销售统计'},
          component: ()=>import('@/views/sales/distribution'),
        },
        {
          path: '/renewalChal',
          name: 'renewalChal',
          meta:{title:'销售统计-用户续费统计（渠道维度）'},
          component: ()=>import('@/views/sales/renewalChal'),
        },
        {
          path: '/renewalPlat',
          name: 'renewalPlat',
          meta:{title:'销售统计-用户续费统计（平台维度）'},
          component: ()=>import('@/views/sales/renewalPlat'),
        },
        {
          path: '/activeCode',
          name: 'activeCode',
          meta:{title:'销售统计-激活码统计'},
          component: ()=>import('@/views/sales/activeCode'),
        },
        {
          path: '/memberDistri',
          name: 'memberDistri',
          meta:{title:'销售统计-会员分布统计'},
          component: ()=>import('@/views/sales/memberDistri'),
        },
      ],
    }
  ]
})
