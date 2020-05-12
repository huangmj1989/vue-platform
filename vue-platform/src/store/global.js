import {sessionStorage} from '@/utils/storage'
//全局变量，判断访问哪个接口系统
//开发
const globalBaseURL = "http://10.8.0.245:35555/ecp-web-getway/";

//生产
//const globalBaseURL = "http://192.168.111.10:18081/ecp-web-getway/";
// const menuSlider = sessionStorage.getItem('menuSlider') ?  sessionStorage.getItem('menuSlider') : false;//侧边栏是否收起
// const muneCode = sessionStorage.getItem('muneCode') ?  sessionStorage.getItem('muneCode') : '';//当前菜单

export default {
    globalBaseURL,
}
