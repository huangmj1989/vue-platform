// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 定义统一基础变量
import global from '@/store/global'
Vue.prototype.global = global;
// 前后端交互，引入axios，修改原型链，axios不是插件
import axios from 'axios'
// 挂载原型
Vue.prototype.axios = axios
// 定义axios访问统一路径
axios.defaults.baseURL = process.env.NODE_ENV == "production" ? Vue.prototype.global : 'apis';

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

// 允许携带cookie
axios.defaults.withCredentials=true

// 引入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

// 引入vuex
import store from '@/store/state'

// 引入加密工具
import encryption from '@/utils/CryptoJs'
Vue.prototype.encryption = encryption;

// 解决ie不支持promise
import Promise from 'es6-promise'
Promise.polyfill()
// 引入阿里图标
import "@/assets/iconfont/iconfont.css"
// 引入reset文件样式初始化
import "@/assets/css/reset.css"
// 公共样式部分
import "@/assets/css/common.css"
/* eslint-disable no-new */

import {sessionStorage} from '@/utils/storage'

// 配置拦截器 放开 即可拦截未登录
// http request 拦截器 将token放于请求中
axios.interceptors.request.use(
  config => {
    let token = store.state.token;
    // let cookieToken = sessionStorage.getItem("loginInfo");
    if(token){
      // 有token 则 请求头加上token
      config.headers.Authorization = token;
    }else{
      store.dispatch('commitToken',{token:'',type:'2'});
      if(router.currentRoute.name != 'register' && router.currentRoute.name != 'login'){
        router.replace({
          name: 'login',
          // param: {redirect: router}
        });
      }
    }
    return config;
  },err=>{
    return Promise.reject(err);
  }
);
// http response 拦截器 异步请求 判断token 是否过期
axios.interceptors.response.use(
  response => {
    // console.log('=============返回请求=============',response)
    if(response.data.ajaxResult == 3 && response.data.errorMessage.length > 0){
      if(response.data.errorMessage[0].code == 'webcore.000003'){
        Vue.prototype.$confirm(response.data.errorMessage[0].message, '提示', {
          confirmButtonText: '确定',
          // cancelButtonText: '取消',
          type: 'warning',
          showClose:false,
          showCancelButton:false,
          closeOnClickModal:false,
          closeOnPressEscape:false,
        }).then(() => {
          sessionStorage.clear();
          router.push({ name: 'login'});
        }).catch(() => {
            
        });
      }else{
        Vue.prototype.$message({
          showClose: true,
          type: 'error',
          message: res.data.errorMessage[0].message
        });
      }
      // Promise.reject(response)
      return '';
    }else{
      return response;
    }
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          store.dispatch('commitToken',{token:'',type:'2'});
          router.replace({
            name: 'login',
            // param: {redirect: router}
          });
        case 404:
          store.dispatch('commitToken',{token:'',type:'2'});
          router.replace({
            name: 'login',
            // param: {redirect: router}
          });
      }
    }
    return Promise.reject(error)   // 返回接口返回的错误信息
  }
);
// 异步请求前判断请求的连接是否需要token
router.beforeEach((to, from, next) => {
  if (to.path === '/' || to.path === '/login' || to.path === '/register') {
    next();
  } else {
    let token = store.state.token;
    // let cookieToken = $cookies.get('p_userinfo');
    // console.log("我是浏览器本地缓存的token: "+cookieToken);
    // if(cookieToken == null || cookieToken == 'null' || cookieToken == ''){
    //   next('/login');
    // }else{
      if (token === 'null' || token === '') {
        next('/login');
      } else {
        next();
      }
    }
  // }
  if (to.matched.some(record => record.meta.requiresAuth)) {     // 哪些需要验证
    if (!store.state.token) {                      // token存在条件   
      next({
        path: '/login',                                               // 验证失败要跳转的页面
        param: {
          //  redirect: to.fullPath                                 // 要传的参数
         }
      });
    } else {
      next();
    }
  } else {
    next();                                                 // 确保一定要调用 next()
  }
});



new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
