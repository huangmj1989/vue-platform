import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)  //必须有这一行，否则报错

import {sessionStorage} from '@/utils/storage'
// 创建一个store实例
export default new Vuex.Store({
    state:{
        token:sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '',
        menuSlider: sessionStorage.getItem('menuSlider') ?  sessionStorage.getItem('menuSlider') : false,//侧边栏是否收起
        menuCode:sessionStorage.getItem('muneCode') ?  sessionStorage.getItem('muneCode') : '',//当前菜单id
    },
    getters:{
        //相当于 vue 中的computer 计算属性 用于监听state中值的变化 返回赋值计算结果
        getToken(state){
            return state.token;
        },
        getMenuSlider(state){
            return state.menuSlider;
        },
        getMenuCode(state){
            return state.muneCode;
        },
    },
    mutations:{
        // commit调用的方法在此  修改store 数据
        updateToken(state,data){
            state.token = data.token;
            // 1 更新 2 清除
            data.type == '1' ?  sessionStorage.setItem('token',data.token) : sessionStorage.removeItem('token');
        },
        cleanToken(state){
            state.token = '';
            sessionStorage.removeItem('token');
        },
        updateMenuSlider(state,data){
            state.menuSlider = data;
            sessionStorage.setItem('menuSlider',data)
        },
        updateMenuCode(state,data){
            state.token = data;
            sessionStorage.setItem('muneCode',data)
        },
    },
    actions:{
        // 不提倡直接测、修改 调用store so actions=> 调用 mutations 中方法 修改store数据
        // dispatch调用的方法在此 正常传参
        // context 类似于 store示例 访问mutations 直接context.commit('方法名'[,参数])
        commitToken(context,data){
            context.commit('updateToken',data)
        },
        commitMenuSlider(context,data){
            context.commit('updateMenuSlider',data)
        },
        commitMenuCode(context,data){
            context.commit('updateMenuCode',data)
        },
    },
});

